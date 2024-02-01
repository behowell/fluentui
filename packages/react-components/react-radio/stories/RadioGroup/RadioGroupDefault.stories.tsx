import * as React from 'react';

import type { RadioGroupProps } from '@fluentui/react-components';
import { Field, RadioGroup } from '@fluentui/react-components';
import { RadioItem } from '@fluentui/react-radio';

export const Default = (props: Partial<RadioGroupProps>) => (
  <Field label="Favorite Fruit">
    <RadioGroup {...props}>
      <RadioItem value="apple" label="Apple" />
      <RadioItem value="pear" label="Pear" />
      <RadioItem value="banana" label="Banana" />
      <RadioItem value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);
