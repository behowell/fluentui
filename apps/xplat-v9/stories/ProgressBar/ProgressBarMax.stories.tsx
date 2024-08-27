/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { ProgressBar } from '@fluentui/react-components';

export const Max = () => {
  return <ProgressBar max={42} value={32} />;
};

Max.parameters = {
  docs: {
    description: {
      story: `You can specify the maximum value of the determinate ProgressBar.
      This is useful for instances where you want to show capacity, or how much of a total has been
      uploaded/downloaded.`,
    },
  },
};
