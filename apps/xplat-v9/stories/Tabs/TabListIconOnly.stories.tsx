/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { makeStyles, shorthands } from '@fluentui/react-platform-adapter-preview';
import { Tab, TabList } from '@fluentui/react-components';
import { PlaceholderIcon } from '../util/PlaceholderIcon';

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

export const IconOnly = () => {
  const styles = useStyles();

  const renderTabs = () => {
    return (
      <>
        <Tab icon={<CalendarMonth />} value="tab1" aria-label="First Tab" />
        <Tab icon={<CalendarMonth />} value="tab2" aria-label="Second Tab" />
        <Tab icon={<CalendarMonth />} value="tab3" aria-label="Third Tab" />
        <Tab icon={<CalendarMonth />} value="tab4" aria-label="Fourth Tab" />
      </>
    );
  };

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab2">{renderTabs()}</TabList>
      {/* <TabList defaultSelectedValue="tab2" vertical>
        {renderTabs()}
      </TabList> */}
    </div>
  );
};

IconOnly.parameters = {
  docs: {
    description: {
      story: 'Tabs can have an `icon` slot filled and no content..',
    },
  },
};
