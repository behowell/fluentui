/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Button } from '@fluentui/react-button';
import { Field } from '@fluentui/react-field';
import { Radio, RadioGroup } from '@fluentui/react-radio';

export const ControlledValue = () => {
  const [value, setValue] = React.useState('banana');
  return (
    <>
      <Field label="Favorite Fruit">
        <RadioGroup value={value} onChange={(_, data) => setValue(data.value)}>
          <Radio value="apple" label="Apple" />
          <Radio value="pear" label="Pear" />
          <Radio value="banana" label="Banana" />
          <Radio value="orange" label="Orange" />
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
