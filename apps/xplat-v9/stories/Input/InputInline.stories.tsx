/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Input } from '@fluentui/react-input';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';

export const Inline = () => {
  const inputId = useId('input');

  return (
    <div>
      <Label htmlFor={inputId} style={{ paddingInlineEnd: '12px' }}>
        Sample inline input
      </Label>

      <div>
        <span>This input is </span>
        <Input placeholder="inline" aria-label="inline" />
        <span> within a paragraph of text.</span>
      </div>
    </div>
  );
};

Inline.parameters = {
  docs: {
    description: {
      story: 'An input can be rendered inline with text.',
    },
  },
};
