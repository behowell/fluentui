/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Default } from './SelectDefault.stories';
import { Appearance } from './SelectAppearance.stories';
import { Controlled } from './SelectControlled.stories';
import { Disabled } from './SelectDisabled.stories';
import { InitialValue } from './SelectInitialValue.stories';
import { Size } from './SelectSize.stories';
import { Story } from '../util/Story';

export const SelectStories = () => (
  <div>
    <Story title="Default" story={<Default />} />
    <Story title="Appearance" story={<Appearance />} />
    <Story title="Controlled" story={<Controlled />} />
    <Story title="Disabled" story={<Disabled />} />
    <Story title="Initial Value" story={<InitialValue />} />
    <Story title="Size" story={<Size />} />
  </div>
);
