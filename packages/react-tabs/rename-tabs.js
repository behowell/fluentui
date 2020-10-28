/* eslint-disable */
const fs = require('fs');
const path = require('path');
const process = require('process');
const child_process = require('child_process');

function getFilesRecursive(root) {
  const files = [];
  fs.readdirSync(root, { withFileTypes: true }).forEach(file => {
    if (file.name.endsWith('.scss.ts')) {
      return;
    }
    const fullName = path.join(root, file.name);
    files.push(Object.assign(file, { fullName }));
    if (file.isDirectory()) {
      files.push(...getFilesRecursive(fullName));
    }
  });
  return files;
}

function getTargetDirs(tabsOrPivot) {
  return [
    './src/components/' + tabsOrPivot,
    './src/next',
    './etc',
    '../react-examples/src/react-tabs',
    `../../apps/public-docsite/src/pages/Controls/${tabsOrPivot}Page`,
  ];
}

function getTargetFiles(tabsOrPivot) {
  return getTargetDirs(tabsOrPivot)
    .map(getFilesRecursive)
    .reduce((result, entry) => result.concat(entry), []);
}

function moveOrCopy(moveCopyCallback, copyCallback = fs.copyFileSync, mkdirCallback = fs.mkdirSync) {
  if (!fs.existsSync('./src/components/Tabs')) {
    fs.mkdirSync('./src/components/Tabs');
  }

  const copyIfExists = (src, dest) => fs.existsSync(src) && copyCallback(src, dest);

  copyIfExists('./src/Pivot.ts', './src/Tabs.ts');
  copyIfExists('../react/src/Pivot.ts', '../react/src/Tabs.ts');
  copyIfExists('../react-next/src/Pivot.ts', '../react-next/src/Tabs.ts');
  copyIfExists(
    '../../apps/public-docsite-resources/src/components/pages/PivotPage.tsx',
    '../../apps/public-docsite-resources/src/components/pages/TabsPage.tsx',
  );
  copyIfExists(
    '../../apps/public-docsite/src/pages/Controls/PivotPage',
    '../../apps/public-docsite/src/pages/Controls/TabsPage',
  );

  const files = getTargetFiles('Pivot');

  for (const file of files) {
    const newName = file.fullName.replace(/PivotItem/g, 'TabItem').replace(/Pivot/g, 'Tabs');
    if (newName === file.fullName) {
      continue;
    }

    if (file.isDirectory() && !fs.existsSync(newName)) {
      mkdirCallback(newName);
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

function debugMove() {
  moveOrCopy(
    (src, target) => console.log('MOVE: ' + src + ' => ' + target),
    (src, target) => console.log('COPY: ' + src + ' => ' + target),
    dir => console.log('MKDIR: ' + dir),
  );
}

const fileNameReplacements = [
  ['PivotItem', 'TabItem'],
  ['Pivot', 'Tabs'],
];

const replacements = [
  ['Pivot', 'Tabs'],
  ['pivot links/tabs', 'tabs'],
  ['pivot header/link', 'tab'],
  ['pivot link', 'tab'],
  ['pivot item link', 'tab'],
  ['item link', 'tab'],
  ['PivotLinkCollection', 'TabItemCollection'],
  ['PivotLink', 'Tab', { wholeWord: false }],
  ['pivotLink', 'tab', { wholeWord: false }],
  ['IPivotProps', 'TabsProps'],
  ['IPivotStyleProps', 'TabsStyleProps'],
  ['IPivotStyles', 'TabsStyles'],
  ['pivot item', 'tab item'],
  ['pivot items', 'tab items'],
  ['IPivotItemProps', 'TabItemProps'],
  ['pivotItemProps', 'tabItemProps'],
  ['PivotItem', 'TabItem', { wholeWord: false }],
  ['IPivot', 'TabsImperativeHandle'],
  ['pivotId', 'baseId'],
  ['PivotBase', 'TabsBase'],
  ['Pivots', 'Tabs'],
  ['Pivot([A-Za-z]+Example(Code)?)', 'Tabs$1'],
  ['pivotRef', 'tabsRef'],
  ['pivot tab', 'tab'],
  ['PivotPage', 'TabsPage'],
  ['PivotPageProps', 'TabsPageProps'],
  ['Default selected key for the pivot', 'Default selected TabItem key'],
  ['pivot', 'Tabs'],
  ['Pivot', 'Tabs', { wholeWord: false }],
  ['Link( ?([Ss]ize|[Ff]ormat))', 'Tab$1', { wholeWord: false }],
  ['link( ?([Ss]ize|[Ff]ormat))', 'tab$1', { wholeWord: false }],
  ['Tabs? Links', 'tabs', { wholeWord: false }],
  ['Links', 'Tabs'],
  ['link(Collection|Content|InMenu|IsSelected)', 'tab$1'],
  ['onRenderItemLink', 'onRenderTab'],
  ['renderLinkContent', 'renderTabContent'],
  ['LinkClick', 'TabClick', { wholeWord: false }],
  ['getLinkItems', 'getTabItems'],
  ['renderLinkCollection', 'renderTabCollection'],
  ['renders link Tabs correctly', 'renders tabs as links correctly'],
  ['// eslint-disable-next-line \\@typescript-eslint/naming-convention\\n', '', { wholeWord: false }],
  ['links', 'tabs', { extensions: ['.base.tsx', '.scss'] }],
  ['link', 'tab'],
  ['Tabs #', 'Item #', { extensions: ['.Example.tsx'] }],
];

const neverReplace = [
  'ms-Pivot',
  'ms-Pivot-link',
  'ms-Pivot-linkContent',
  'ms-Pivot-linkInMenu',
  'semanticColors.link',
];

// Add temporary replacements for the "never replace" items, and then undo those replacements at the end
neverReplace.forEach((str, i) => {
  const temp = str.split('').join('~') + i;
  replacements.unshift([str, temp]);
  replacements.push([temp, str]);
});

function refactorFile(filePath) {
  const fileName = path.basename(filePath);
  let fileText = fs.readFileSync(filePath).toString();

  fileText = replacements
    .filter(([_, __, { extensions } = {}]) => !extensions || extensions.some(ext => fileName.endsWith(ext)))
    .reduce(
      (text, [find, replace, { wholeWord = true } = {}]) =>
        text.replace(new RegExp(wholeWord ? `\\b${find}\\b` : find, 'g'), replace),
      fileText,
    );

  fs.writeFileSync(filePath, fileText);
}

function importsFile(filePath) {
  let fileText = fs.readFileSync(filePath).toString();

  fileText = fileNameReplacements.reduce(
    (text, [find, replace]) => text.replace(new RegExp(`(from '.*)\\b${find}\\b(.*';)`, 'g'), `$1${replace}$2`),
    fileText,
  );

  fs.writeFileSync(filePath, fileText);
}

function processFiles(processFile, tabsOrPivot) {
  // processFile('./src/index.ts');
  if (tabsOrPivot === 'Tabs') {
    processFile('./src/' + tabsOrPivot + '.ts');
    processFile('../react/src/' + tabsOrPivot + '.ts');
    processFile('../react-next/src/' + tabsOrPivot + '.ts');
  }
  processFile(`../../apps/public-docsite-resources/src/components/pages/${tabsOrPivot}Page.tsx`);

  for (const file of getTargetFiles(tabsOrPivot)) {
    if (file.isFile()) {
      processFile(file.fullName);
    }
  }
}

function refactor() {
  processFiles(refactorFile, 'Tabs');
}

function inplace() {
  processFiles(refactorFile, 'Pivot');
}

function imports() {
  processFiles(importsFile, 'Tabs');
}

function importsInplace() {
  processFiles(importsFile, 'Pivot');
}

function reset() {
  const files = [
    '../../apps/public-docsite-resources/src/components/pages/PivotPage.tsx',
    '../../apps/public-docsite-resources/src/components/pages/TabsPage.tsx',
  ];
  const dirs = ['./src/components/Pivot', ...getTargetDirs('Tabs')];
  const getTargets = () =>
    [...dirs.filter(fs.existsSync).map(d => d + '/**'), ...files.filter(fs.existsSync)].join(' ');

  child_process.execSync(`git reset -- ${getTargets()}`);
  child_process.execSync(`git clean -x -f -- ${getTargets()}`);
  child_process.execSync(`git checkout -- ${getTargets()}`);
}

function print() {
  const code = str => (str ? '`' + str + '`' : '');

  console.log('| Find | Replace | Options |');
  console.log('| -------- | -------- | -------- |');
  replacements
    .slice(neverReplace.length, -neverReplace.length)
    .forEach(([find, replace, { wholeWord, extensions } = {}]) => {
      const extra = [];
      if (wholeWord !== undefined) {
        extra.push(wholeWord ? 'whole word only' : 'partial word match');
      }

      if (extensions !== undefined) {
        extra.push('only in ' + extensions.map(code).join(' and '));
      }

      console.log(`| ${code(find)} | ${code(replace)} | ${extra.join('<br> ')} |`);
    });

  console.log();

  console.log('| Special strings: never replace |');
  console.log('| -------- |');
  neverReplace.forEach(str => {
    console.log('| `' + str + '` |');
  });
}

function main(args) {
  const commands = { debugMove, move, copy, refactor, imports, inplace, importsInplace, reset, print };

  args.forEach(arg => {
    if (!commands[arg]) {
      throw `Unknown command ${arg}`;
    }

    console.log(arg);
    commands[arg]();
  });
}

if (process.argv.length <= 2) {
  console.error('Must specify command');
} else {
  main(process.argv.slice(2));
}
