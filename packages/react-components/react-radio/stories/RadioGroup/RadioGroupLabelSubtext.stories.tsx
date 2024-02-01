import * as React from 'react';

import { Field, RadioGroup, Text } from '@fluentui/react-components';
import { RadioItem } from '@fluentui/react-radio';

export const LabelSubtext = () => (
  <Field label="Favorite Fruit">
    <RadioGroup>
      <RadioItem
        value="A"
        label={
          <>
            Banana
            <br />
            <Text size={200}>This is an example subtext of the first option</Text>
          </>
        }
      />
      <RadioItem
        value="B"
        label={
          <>
            Pear
            <br />
            <Text size={200}>This is some more example subtext</Text>
          </>
        }
      />
    </RadioGroup>
  </Field>
);

LabelSubtext.parameters = {
  docs: {
    description: {
      story:
        "RadioItem's label supports any formatted text. In this example, smaller text is below the main label text.",
    },
  },
};
