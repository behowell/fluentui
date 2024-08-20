/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Field } from '@fluentui/react-field';
import { Input } from '@fluentui/react-input';

export const Default = () => (
  <Field label="Example field" validationState="success" validationMessage="This is a success message.">
    <Input />
  </Field>
);
