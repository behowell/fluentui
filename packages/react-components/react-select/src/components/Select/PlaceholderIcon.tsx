/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { makeStyles, shorthands } from '@fluentui/react-platform-adapter-preview';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'pink',
    ...shorthands.border('1px', 'solid', 'darkred'),
    width: '12px',
    height: '12px',
  },
});

export const PlaceholderIcon: React.FC<any> = () => {
  return <div className={useStyles().root} />;
};
