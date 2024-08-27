/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { ProgressBar } from '@fluentui/react-components';
import { makeStyles } from '@fluentui/react-platform-adapter-preview';

const useStyles = makeStyles({
  container: {
    // display: 'flex',
    // flexDirection: 'column',
    // rowGap: '20px',
    width: '100%',
  },
});

export const Color = () => {
  const styles = useStyles();
  return (
    <div style={{ width: '100%' }}>
      <ProgressBar value={0.75} color="error" />
      <span></span>
      <ProgressBar value={0.95} color="warning" />
      <span></span>
      <ProgressBar value={1} color="success" />
    </div>
  );
};

Color.parameters = {
  docs: {
    name: 'Validation State',
    description: {
      story:
        'The `color` prop can be used to indicate a `"brand"` state (default), `"error"` state (red), `"warning"` state (orange), ' +
        'or `"success"` state (green).',
    },
  },
};
