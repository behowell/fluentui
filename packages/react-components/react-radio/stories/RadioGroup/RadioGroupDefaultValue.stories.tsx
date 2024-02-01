import * as React from 'react';

import { Field, RadioGroup } from '@fluentui/react-components';
import { RadioItem } from '@fluentui/react-radio';

export const DefaultValue = () => (
  <Field label="Favorite Fruit">
    <RadioGroup defaultValue="pear">
      <RadioItem value="apple" label="Apple" />
      <RadioItem value="pear" label="Pear" />
      <RadioItem value="banana" label="Banana" />
      <RadioItem value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);

DefaultValue.parameters = {
  docs: {
    description: {
      story: 'The initially selected item can be set by setting the `defaultValue` of RadioGroup.',
    },
  },
};
