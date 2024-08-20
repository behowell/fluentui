/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Field } from '@fluentui/react-field';
import { Input } from '@fluentui/react-input';
import { makeResetStyles } from '@fluentui/react-platform-adapter-preview';
import { tokens } from '@fluentui/react-theme';

const useStackClassName = makeResetStyles({
  display: 'flex',
  flexDirection: 'column',
  rowGap: tokens.spacingVerticalL,
});

export const Size = () => (
  <div className={useStackClassName()}>
    <Field label="Size small" size="small">
      <Input />
    </Field>
    <Field label="Size medium" size="medium">
      <Input />
    </Field>
    <Field label="Size large" size="large">
      <Input />
    </Field>
  </div>
);

Size.parameters = {
  docs: {
    description: {
      story:
        "The `size` prop affects the size of the Field's label, as well as form controls that support a `size` prop.",
    },
  },
};
