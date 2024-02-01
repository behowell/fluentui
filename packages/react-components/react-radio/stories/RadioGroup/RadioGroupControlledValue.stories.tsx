import * as React from 'react';

import { Field, RadioGroup, Button } from '@fluentui/react-components';
import { RadioItem } from '@fluentui/react-radio';

export const ControlledValue = () => {
  const [value, setValue] = React.useState('banana');
  return (
    <>
      <Field label="Favorite Fruit">
        <RadioGroup value={value} onChange={(_, data) => setValue(data.value)}>
          <RadioItem value="apple" label="Apple" />
          <RadioItem value="pear" label="Pear" />
          <RadioItem value="banana" label="Banana" />
          <RadioItem value="orange" label="Orange" />
        </RadioGroup>
      </Field>
      <Button disabled={!value} onClick={() => setValue('')}>
        Clear selection
      </Button>
    </>
  );
};

ControlledValue.parameters = {
  docs: {
    description: {
      story: 'The selected radio item can be controlled using the `value` and `onChange` props.',
    },
  },
};
