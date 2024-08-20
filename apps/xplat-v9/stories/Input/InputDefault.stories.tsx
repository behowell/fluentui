/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Input } from '@fluentui/react-input';
import { Label } from '@fluentui/react-label';
import { makeStyles, shorthands } from '@fluentui/react-platform-adapter-preview';
import { useId } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field
    display: 'flex',
    flexDirection: 'column',
    // Use 2px gap below the label (per the design system)
    ...shorthands.gap('2px'),
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: '400px',
  },
});

export const Default = () => {
  const inputId = useId('input');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label htmlFor={inputId}>Sample input</Label>
      <Input id={inputId} />
    </div>
  );
};
