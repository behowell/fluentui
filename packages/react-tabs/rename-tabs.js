/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

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

function refactor(filePath) {
  const replacements = [
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
  ];

  const baseName = path.basename(filePath);

  if (baseName === 'Pivot.base.tsx' || baseName === 'Pivot.scss') {
    replacements.push(['links', 'headers']);
  }

  if (baseName.endsWith('.Example.tsx')) {
    replacements.push(['Tabs #', 'Item #']);
  }

  const replace = (text, [find, replacement, { wholeWord = true } = {}]) => {
    return text.replace(new RegExp(wholeWord ? `\\b${find}\\b` : find, 'g'), replacement);
  };

  return replacements.reduce(replace, fs.readFileSync(filePath).toString());
}

function main() {
  if (!fs.existsSync('./src/components/Tabs')) {
    fs.mkdirSync('./src/components/Tabs');
  }

  fs.writeFileSync('./src/Tabs.ts', refactor('./src/Pivot.ts'));

  for (const file of getFilesRecursive('./src/components/Pivot')) {
    const newName = file.fullName.replace(/PivotItem/g, 'TabItem').replace(/Pivot/g, 'Tabs');

    if (file.isFile()) {
      fs.writeFileSync(newName, refactor(file.fullName));

      console.log(newName);
    } else if (!fs.existsSync(newName)) {
      fs.mkdirSync(newName);
    }
  }
}

main();
