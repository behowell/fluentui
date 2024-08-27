/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { ProgressBar, ProgressBarProps } from '@fluentui/react-components';

export const Default = (props: Partial<ProgressBarProps>) => {
  return (
    <>
      <ProgressBar {...props} value={0.5} />
    </>
  );
};
