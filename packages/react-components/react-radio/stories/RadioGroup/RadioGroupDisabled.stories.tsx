import * as React from 'react';

import { Field, RadioGroup } from '@fluentui/react-components';
import { RadioItem } from '@fluentui/react-radio';

export const Disabled = () => (
  <Field label="Favorite Fruit">
    <RadioGroup defaultValue="apple" disabled>
      <RadioItem value="apple" label="Apple" />
      <RadioItem value="pear" label="Pear" />
      <RadioItem value="banana" label="Banana" />
      <RadioItem value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);

Disabled.parameters = {
  docs: {
    description: {
      story: 'RadioGroup can be disabled, which disables all RadioItems inside.',
    },
  },
};
