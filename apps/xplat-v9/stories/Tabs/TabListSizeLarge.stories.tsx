/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { PlaceholderIcon, makeStyles, shorthands } from '@fluentui/react-platform-adapter-preview';
import { Tab, TabList } from '@fluentui/react-components';

const CalendarMonth = PlaceholderIcon;

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    ...shorthands.padding('50px', '20px'),
    rowGap: '20px',
  },
});

export const SizeLarge = () => {
  const styles = useStyles();

  const renderTabs = () => {
    return (
      <>
        <Tab value="tab1">First Tab</Tab>
        <Tab icon={<CalendarMonth />} value="tab2">
          Second Tab
        </Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </>
    );
  };

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab2" size="large">
        {renderTabs()}
      </TabList>
      <TabList defaultSelectedValue="tab2" size="large" vertical>
        {renderTabs()}
      </TabList>
    </div>
  );
};

SizeLarge.parameters = {
  docs: {
    description: {
      story: 'A tab list can have `large` tabs.',
    },
  },
};
