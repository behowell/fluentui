/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Tab, TabList, tokens } from '@fluentui/react-components';
import { makeStyles, shorthands } from '@fluentui/react-platform-adapter-preview';
import { PlaceholderIcon } from '../util/PlaceholderIcon';

const Airplane = PlaceholderIcon; //bundleIcon(AirplaneFilled, AirplaneRegular);
const AirplaneTakeOff = PlaceholderIcon; // bundleIcon(AirplaneTakeOffFilled, AirplaneTakeOffRegular);
const TimeAndWeather = PlaceholderIcon; // bundleIcon(TimeAndWeatherFilled, TimeAndWeatherRegular);

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    ...shorthands.padding('50px', '20px'),
    rowGap: '20px',
  },
  panels: {
    ...shorthands.padding(0, '10px'),
    '& th': {
      textAlign: 'left',
      ...shorthands.padding(0, '30px', 0, 0),
    },
  },
  propsTable: {
    '& td:first-child': {
      fontWeight: tokens.fontWeightSemibold,
    },
    '& td': {
      ...shorthands.padding(0, '30px', 0, 0),
    },
  },
});

export const WithPanels = () => {
  const styles = useStyles();

  const [selectedValue, setSelectedValue] = React.useState<TabValue>('conditions');

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  const Arrivals = React.memo(() => (
    <div role="tabpanel" aria-labelledby="Arrivals">
      (Arrivals Table)
    </div>
  ));

  const Departures = React.memo(() => (
    <div role="tabpanel" aria-labelledby="Departures">
      (Departures Table)
    </div>
  ));

  const Conditions = React.memo(() => (
    <div role="tabpanel" aria-labelledby="Conditions">
      (Conditions Table)
    </div>
  ));

  return (
    <div className={styles.root}>
      <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
        <Tab id="Arrivals" icon={<Airplane />} value="arrivals">
          Arrivals
        </Tab>
        <Tab id="Departures" icon={<AirplaneTakeOff />} value="departures">
          Departures
        </Tab>
        <Tab id="Conditions" icon={<TimeAndWeather />} value="conditions">
          Conditions
        </Tab>
      </TabList>
      <div className={styles.panels}>
        {selectedValue === 'arrivals' && <Arrivals />}
        {selectedValue === 'departures' && <Departures />}
        {selectedValue === 'conditions' && <Conditions />}
      </div>
    </div>
  );
};

WithPanels.parameters = {
  docs: {
    description: {
      story: 'A tab list can be used to show/hide UI when a tab is selected.',
    },
  },
};
