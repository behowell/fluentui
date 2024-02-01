import * as React from 'react';

import { Field, RadioGroup } from '@fluentui/react-components';
import { RadioItem } from '@fluentui/react-radio';

export const Horizontal = () => (
  <Field label="Favorite Fruit">
    <RadioGroup layout="horizontal">
      <RadioItem value="apple" label="Apple" />
      <RadioItem value="pear" label="Pear" />
      <RadioItem value="banana" label="Banana" />
      <RadioItem value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);

Horizontal.storyName = 'Layout: horizontal';
Horizontal.parameters = {
  docs: {
    description: {
      story: 'The `horizontal` layout places each RadioItem in a row, with labels after the radio indicator.',
    },
  },
};
