import * as React from 'react';

import { Checkbox, Field } from '@fluentui/react-components';
import { Group } from '@fluentui/react-field';

export const GroupOfControls = () => (
  <Field label="Example field" validationState="success" validationMessage="This is a success message.">
    <Group>
      <Checkbox label="Option A" />
      <Checkbox label="Option B" />
      <Checkbox label="Option C" />
    </Group>
  </Field>
);
