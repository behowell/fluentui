/* eslint-disable no-console */
const FS = require('fs');
const Path = require('path');
const Process = require('process');
const ChildProcess = require('child_process');

function getFilesRecursive(root) {
  const files = [];
  FS.readdirSync(root, { withFileTypes: true }).forEach(file => {
    const fullName = Path.join(root, file.name);
    files.push(Object.assign(file, { fullName }));
    if (file.isDirectory()) {
      files.push(...getFilesRecursive(fullName));
    }
  });
  return files;
}

function moveOrCopy(moveCopyCallback) {
  if (!FS.existsSync('./src/components/Tabs')) {
    FS.mkdirSync('./src/components/Tabs');
  }

  for (const file of getFilesRecursive('./src/components/Pivot')) {
    const newName = file.fullName.replace(/PivotItem/g, 'TabItem').replace(/Pivot/g, 'Tabs');

    if (file.isDirectory() && !FS.existsSync(newName)) {
      FS.mkdirSync(newName);
    } else if (file.isFile()) {
      moveCopyCallback(file.fullName, newName);
    }
  }
}

function move() {
  moveOrCopy((src, target) => ChildProcess.execSync(`git mv -f "${src}" "${target}"`));
}

function copy() {
  moveOrCopy((src, target) => FS.copyFileSync(src, target));
}

function refactorFile(filePath) {
  const fileName = Path.basename(filePath);
  const replacements = [
    ['ms-Pivot', 'ms-Temp1'], // Temp string so style names don't get altered
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

  FS.writeFileSync(
    filePath,
    replacements.reduce(
      (text, [find, replace, { wholeWord = true } = {}]) =>
        text.replace(new RegExp(wholeWord ? `\\b${find}\\b` : find, 'g'), replace),
      FS.readFileSync(filePath).toString(),
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

function reset() {
  if (FS.existsSync('./src/components/Tabs')) {
    const pivot = './src/Pivot.ts ./src/components/Pivot/**';
    const tabs = './src/Tabs.ts ./src/components/Tabs/**';

    ChildProcess.execSync(`git reset -- ${pivot} ${tabs}`);
    ChildProcess.execSync(`git clean -x -f -- ${pivot} ${tabs}`);
    ChildProcess.execSync(`git checkout -- ${pivot}`);
  }
}

function main(args) {
  for (const command of args) {
    switch (command) {
      case 'move':
        console.log('move...');
        move();
        break;
      case 'copy':
        console.log('copy...');
        copy();
        break;
      case 'refactor':
        console.log('refactor...');
        refactor();
        break;
      case 'reset':
        console.log('reset...');
        reset();
        break;
      default:
        console.error(`Unknown command '${command}'`);
        return;
    }
  }
}

if (Process.argv.length <= 2) {
  console.error('Must specify command');
} else {
  main(Process.argv.slice(2));
}
