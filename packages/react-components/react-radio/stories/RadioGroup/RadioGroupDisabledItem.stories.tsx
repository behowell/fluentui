import * as React from 'react';

import { Field, RadioGroup } from '@fluentui/react-components';
import { RadioItem } from '@fluentui/react-radio';

export const DisabledItem = () => (
  <Field label="Favorite Fruit">
    <RadioGroup defaultValue="apple">
      <RadioItem value="apple" label="Apple" />
      <RadioItem value="pear" label="Pear" />
      <RadioItem value="banana" label="Banana" disabled />
      <RadioItem value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);

DisabledItem.parameters = {
  docs: {
    description: {
      story: 'RadioItems can be disabled individually.',
    },
  },
};
