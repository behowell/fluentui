/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import { Avatar } from '@fluentui/react-avatar';

export const Square = () => <Avatar shape="square" aria-label="square avatar" />;

Square.storyName = 'Shape: square';
Square.parameters = {
  docs: {
    description: {
      story: 'An avatar can have a square shape.',
    },
  },
};
