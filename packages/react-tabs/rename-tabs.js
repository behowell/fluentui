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

function moveOrCopy(moveCopyCallback) {
  if (!fs.existsSync('./src/components/Tabs')) {
    fs.mkdirSync('./src/components/Tabs');
  }

  const moveCopyIfExists = (src, dest) => {
    if (fs.existsSync(src)) {
      moveCopyCallback(src, dest);
    }
  };

  moveCopyIfExists('./src/Pivot.ts', './src/Tabs.ts');
  moveCopyIfExists('../react/src/Pivot.ts', '../react/src/Tabs.ts');
  moveCopyIfExists('../react-next/src/Pivot.ts', '../react-next/src/Tabs.ts');

  const dirs = ['./src/components/Pivot', './src/next', '../react-examples/src/react-tabs'];
  const files = dirs.map(getFilesRecursive).reduce((result, entry) => result.concat(entry), []);

  for (const file of files) {
    const newName = file.fullName.replace(/PivotItem/g, 'TabPanel').replace(/Pivot/g, 'Tabs');
    if (newName === file.fullName) {
      continue;
    }

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

const fileNameReplacements = [
  ['PivotItem', 'TabPanel'],
  ['Pivot', 'Tabs'],
];

const replacements = [
  ['Pivot', 'Tabs'],
  ['pivot links/tabs', 'tabs'],
  ['pivot header/link', 'tab'],
  ['pivot link', 'tab'],
  ['PivotLinkCollection', `TabPanelCollection`],
  ['PivotLink', 'Tab', { wholeWord: false }],
  ['pivotLink', 'tab', { wholeWord: false }],
  ['IPivotProps', 'TabsProps'],
  ['IPivotStyleProps', 'TabsStyleProps'],
  ['IPivotStyles', 'TabsStyles'],
  ['pivot item', 'tab item'],
  ['pivot items', 'tab items'],
  ['IPivotItemProps', `TabPanelProps`],
  ['pivotItemProps', `tabPanelProps`],
  ['PivotItem', 'TabPanel', { wholeWord: false }],
  ['IPivot', 'TabsImperativeHandle'],
  ['pivotId', 'baseId'],
  ['PivotBase', 'TabsBase'],
  ['Pivots', 'Tabs'],
  ['Pivot([A-Za-z]+Example(Code)?)', 'Tabs$1'],
  ['pivotRef', 'tabsRef'],
  ['pivot tab', 'tab'],
  ['PivotPageProps', 'TabsPageProps'],
  ['Default selected key for the pivot', `Default selected TabPanel key`],
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
  ['getLinkItems', `getTabPanels`],
  ['renderLinkCollection', 'renderTabCollection'],
  ['renders link Tabs correctly', 'renders tabs as links correctly'],
  ['// eslint-disable-next-line \\@typescript-eslint/naming-convention\\n', '', { wholeWord: false }],
  ['links', 'tabs', { extensions: ['.base.tsx', '.scss'] }],
  ['Tabs #', 'Panel #', { extensions: ['.Example.tsx'] }],
];

const neverReplace = ['ms-Pivot', 'ms-Pivot-linkContent', 'ms-Pivot-linkInMenu'];

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

function processFiles(fnFile, tabsOrPivot) {
  fnFile('./src/index.ts');
  fnFile('./src/' + tabsOrPivot + '.ts');
  fnFile('../react/src/' + tabsOrPivot + '.ts');
  fnFile('../react-next/src/' + tabsOrPivot + '.ts');
  for (const file of getFilesRecursive('./src/components/' + tabsOrPivot)) {
    if (file.isFile()) {
      fnFile(file.fullName);
    }
  }
  for (const file of getFilesRecursive('./src/next')) {
    if (file.isFile()) {
      fnFile(file.fullName);
    }
  }
  for (const file of getFilesRecursive('../react-examples/src')) {
    if (file.isFile()) {
      fnFile(file.fullName);
    }
  }
  for (const file of getFilesRecursive('../azure-themes/src')) {
    if (file.isFile()) {
      fnFile(file.fullName);
    }
  }
  for (const file of getFilesRecursive('../react-docsite-components/src')) {
    if (file.isFile()) {
      fnFile(file.fullName);
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
  const pivot = './src/** ../react-next/src/Pivot.ts';
  const tabs = fs.existsSync('../react-next/src/Tabs.ts') ? '../react-next/src/Tabs.ts' : '';

  child_process.execSync(`git reset -- ${pivot} ${tabs}`);
  child_process.execSync(`git clean -x -f -- ${pivot} ${tabs}`);
  child_process.execSync(`git checkout -- ${pivot}`);
}

function print() {
  console.log('| Find | Replace | Options |');
  console.log('| -------- | -------- | -------- |');
  replacements.forEach(([find, replace, { wholeWord, extensions } = {}]) => {
    const extra = [];
    if (wholeWord !== undefined) {
      extra.push(wholeWord ? 'whole word only' : 'partial word match');
    }

    if (extensions !== undefined) {
      extra.push('only in ' + extensions.map(ext => '`*' + ext + '`').join(' and '));
    }

    console.log('| `' + find + '` | `' + replace + '` | ' + extra.join('<br> ') + ' |');
  });

  console.log();

  console.log('| Special strings: never replace |');
  console.log('| -------- |');
  neverReplace.forEach(str => {
    console.log('| `' + str + '` |');
  });
}

function main(args) {
  const commands = { move, copy, refactor, imports, inplace, importsInplace, reset, print };

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
