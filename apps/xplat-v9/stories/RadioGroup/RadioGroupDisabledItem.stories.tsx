/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Field } from '@fluentui/react-field';
import { Radio, RadioGroup } from '@fluentui/react-radio';

export const DisabledItem = () => (
  <Field label="Favorite Fruit">
    <RadioGroup defaultValue="apple">
      <Radio value="apple" label="Apple" />
      <Radio value="pear" label="Pear" />
      <Radio value="banana" label="Banana" disabled />
      <Radio value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);

DisabledItem.parameters = {
  docs: {
    description: {
      story: 'Radio items can be disabled individually.',
    },
  },
};
