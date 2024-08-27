/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Field, ProgressBar } from '@fluentui/react-components';
import { makeStyles, shorthands } from '@fluentui/react-platform-adapter-preview';

const useStyles = makeStyles({
  container: {
    ...shorthands.margin('20px', '0px'),
  },
});

export const Thickness = () => {
  const styles = useStyles();

  return (
    <div style={{ width: '100%' }}>
      <ProgressBar className={styles.container} thickness="medium" value={0.7} />
      <span></span>
      <ProgressBar className={styles.container} thickness="large" value={0.7} />
    </div>
  );
};

Thickness.parameters = {
  docs: {
    description: {
      story: 'The `thickness` prop affects the size of the bar. It can be `medium` (default) or `large`.',
    },
  },
};
