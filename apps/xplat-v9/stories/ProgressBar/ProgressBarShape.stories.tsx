/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { ProgressBar } from '@fluentui/react-components';
import { makeStyles, shorthands } from '@fluentui/react-platform-adapter-preview';

const useStyles = makeStyles({
  container: {
    ...shorthands.margin('20px', '0px'),
  },
});

export const Shape = () => {
  const styles = useStyles();

  return (
    <div style={{ width: '100%' }}>
      <ProgressBar className={styles.container} shape="rounded" thickness="large" value={0.5} />
      <span></span>
      <ProgressBar className={styles.container} shape="square" thickness="large" value={0.5} />
    </div>
  );
};

Shape.parameters = {
  docs: {
    description: {
      story: 'The `shape` prop affects the corners of the bar. It can be `rounded` (default) or `square`.',
    },
  },
};
