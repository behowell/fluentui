/* eslint-disable */
const fs = require('fs');
const path = require('path');
const process = require('process');
const child_process = require('child_process');

function getFilesRecursive(root) {
  const files = [];
  fs.readdirSync(root, { withFileTypes: true }).forEach(file => {
    const fullName = path.join(root, file.name);
    files.push(Object.assign(file, { fullName }));
    if (file.isDirectory()) {
      files.push(...getFilesRecursive(fullName));
    }
  });
  return files;
}

function moveOrCopy(moveCopyCallback) {
  if (!fs.existsSync('./src/components/Tabs')) {
    fs.mkdirSync('./src/components/Tabs');
  }

  moveCopyCallback('./src/Pivot.ts', './src/Tabs.ts');

  for (const file of getFilesRecursive('./src/components/Pivot')) {
    const newName = file.fullName.replace(/PivotItem/g, 'TabItem').replace(/Pivot/g, 'Tabs');

    if (file.isDirectory() && !fs.existsSync(newName)) {
      fs.mkdirSync(newName);
    } else if (file.isFile()) {
      moveCopyCallback(file.fullName, newName);
    }
  }
}

function move() {
  moveOrCopy((src, target) => child_process.execSync(`git mv -f "${src}" "${target}"`));
}

function copy() {
  moveOrCopy(fs.copyFileSync);
}

function refactorFile(filePath) {
  const fileName = path.basename(filePath);
  const replacements = [
    ['ms-Pivot', 'ms-Temp1'], // Temp string so style names don't get altered (undone at end)
    ['Pivot', 'Tabs'],
    ['pivot links/tabs', 'tab headers'],
    ['pivot header/link', 'tab header'],
    ['pivot link', 'tab header'],
    ['PivotLink', 'TabHeader', { wholeWord: false }],
    ['pivotLink', 'tabHeader', { wholeWord: false }],
    ['IPivotProps', 'TabsProps'],
    ['IPivotStyleProps', 'TabsStyleProps'],
    ['IPivotStyles', 'TabsStyles'],
    ['pivot item', 'tab item'],
    ['pivot items', 'tab items'],
    ['IPivotItemProps', 'TabItemProps'],
    ['pivotItemProps', 'tabItemProps'],
    ['PivotItem', 'TabItem', { wholeWord: false }],
    ['IPivot', 'TabsComponent'],
    ['pivotId', 'tabsId'],
    ['PivotBase', 'TabsBase'],
    ['Pivots', 'Tabs'],
    ['Pivot([A-Za-z]+Example(Code)?)', 'Tabs$1'],
    ['pivotRef', 'tabsRef'],
    ['pivot tab', 'tab'],
    ['PivotPageProps', 'TabsPageProps'],
    ['Default selected key for the pivot', 'Default selected TabItem key'],
    ['pivot', 'Tabs'],
    ['Pivot', 'Tabs', { wholeWord: false }],
    ['Link( ?([Ss]ize|[Ff]ormat))', 'Header$1', { wholeWord: false }],
    ['link( ?([Ss]ize|[Ff]ormat))', 'header$1', { wholeWord: false }],
    ['Tabs? Links', 'headers', { wholeWord: false }],
    ['Links', 'Headers'],
    ['link(Collection|Content|InMenu|IsSelected)', 'header$1'],
    ['onRenderItemLink', 'onRenderItemHeader'],
    ['renderLinkContent', 'renderHeaderContent'],
    ['LinkClick', 'HeaderClick', { wholeWord: false }],
    ['getLinkItems', 'getHeaderItems'],
    ['renderLinkCollection', 'renderHeaderCollection'],
    ['renders link Tabs correctly', 'renders headers as links correctly'],
    (fileName.endsWith('.base.tsx') || fileName.endsWith('.scss')) && ['links', 'headers'],
    fileName.endsWith('.Example.tsx') && ['Tabs #', 'Item #'],
    ['ms-Temp1', 'ms-Pivot'], // Undo temp replacement
  ].filter(entry => entry); // remove false entries;

  fs.writeFileSync(
    filePath,
    replacements.reduce(
      (text, [find, replace, { wholeWord = true } = {}]) =>
        text.replace(new RegExp(wholeWord ? `\\b${find}\\b` : find, 'g'), replace),
      fs.readFileSync(filePath).toString(),
    ),
  );
}

function refactor() {
  refactorFile('./src/Tabs.ts');
  for (const file of getFilesRecursive('./src/components/Tabs')) {
    if (file.isFile()) {
      refactorFile(file.fullName);
    }
  }
}

function refactorInPlace() {
  refactorFile('./src/Pivot.ts');
  for (const file of getFilesRecursive('./src/components/Pivot')) {
    if (file.isFile()) {
      refactorFile(file.fullName);
    }
  }
}

function reset() {
  const pivot = './src/Pivot.ts ./src/components/Pivot/**';
  const tabs =
    (fs.existsSync('./src/Tabs.ts') ? './src/Tabs.ts ' : '') +
    (fs.existsSync('./src/components/Tabs') ? './src/components/Tabs/** ' : '');

  child_process.execSync(`git reset -- ${pivot} ${tabs}`);
  child_process.execSync(`git clean -x -f -- ${pivot} ${tabs}`);
  child_process.execSync(`git checkout -- ${pivot}`);
}

function main(args) {
  const queue = [];
  for (const command of args) {
    switch (command) {
      case 'move':
        queue.push(move);
        break;
      case 'copy':
        queue.push(copy);
        break;
      case 'refactor':
        queue.push(refactor);
        break;
      case 'inplace':
        queue.push(refactorInPlace);
        break;
      case 'reset':
        queue.push(reset);
        break;
      default:
        console.error(`Unknown command '${command}'`);
        return;
    }
  }
  queue.forEach(command => command());
}

if (process.argv.length <= 2) {
  console.error('Must specify command');
} else {
  main(process.argv.slice(2));
}
