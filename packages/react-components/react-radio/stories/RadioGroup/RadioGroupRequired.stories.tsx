import * as React from 'react';

import { Field, RadioGroup } from '@fluentui/react-components';
import { RadioItem } from '@fluentui/react-radio';

export const Required = () => (
  <Field label="Favorite Fruit" required>
    <RadioGroup>
      <RadioItem value="apple" label="Apple" />
      <RadioItem value="pear" label="Pear" />
      <RadioItem value="banana" label="Banana" />
      <RadioItem value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);

Required.parameters = {
  docs: {
    description: {
      story:
        'Use the `required` prop to indicate that one of the RadioItems must be selected. ' +
        'Or, if the RadioGroup is inside a Field, it will inherit the `required` prop from the Field.',
    },
  },
};
