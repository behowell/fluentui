import * as React from 'react';

import { Field, RadioGroup } from '@fluentui/react-components';
import { RadioItem } from '@fluentui/react-radio';

export const HorizontalStacked = () => (
  <Field label="Favorite Fruit">
    <RadioGroup layout="horizontal-stacked">
      <RadioItem value="apple" label="Apple" />
      <RadioItem value="pear" label="Pear" />
      <RadioItem value="banana" label="Banana" />
      <RadioItem value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);

HorizontalStacked.storyName = 'Layout: horizontal-stacked';
HorizontalStacked.parameters = {
  docs: {
    description: {
      story: 'The `horizontal-stacked` layout places each RadioItem in a row, with labels below the radio indicator.',
    },
  },
};
