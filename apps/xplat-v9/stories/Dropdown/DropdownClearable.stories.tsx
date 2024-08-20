/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Dropdown, Option } from '@fluentui/react-combobox';
import { Label } from '@fluentui/react-label';
import { makeStyles, shorthands } from '@fluentui/react-platform-adapter-preview';
import { useId } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    ...shorthands.gap('2px'),
    maxWidth: '400px',
  },
});

export const Clearable = () => {
  const dropdownId = useId('');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label id={dropdownId}>Pick a color</Label>
      <Dropdown clearable aria-labelledby={dropdownId} placeholder="Select a color">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>
    </div>
  );
};

Clearable.parameters = {
  docs: {
    description: {
      story:
        'A Dropdown can be clearable and let users remove their selection. Note: this is not supported in multiselect mode yet.',
    },
  },
};
