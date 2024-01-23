import * as React from 'react';

import { Checkbox, Field } from '@fluentui/react-components';
import { Group, GroupProps } from '@fluentui/react-field';

export const Default = (props: Partial<GroupProps>) => (
  <Field label="Example field" validationState="success" validationMessage="This is a success message.">
    <Group {...props}>
      <Checkbox label="Option A" />
      <Checkbox label="Option B" />
      <Checkbox label="Option C" />
    </Group>
  </Field>
);
