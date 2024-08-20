/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Combobox, Option } from '@fluentui/react-combobox';
import { Label } from '@fluentui/react-label';
import { makeStyles, shorthands } from '@fluentui/react-platform-adapter-preview';
import { useId } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto auto',
    justifyItems: 'start',
    ...shorthands.gap('2px'),
  },
});

export const Clearable = () => {
  const comboboxId = useId('combobox');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label id={comboboxId}>Pick a color</Label>
      <Combobox clearable aria-labelledby={comboboxId} placeholder="Select a color">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>
    </div>
  );
};

Clearable.parameters = {
  docs: {
    description: {
      story:
        'A Combobox can be clearable and let users remove their selection. Note: this is not supported in multiselect mode yet.',
    },
  },
};
