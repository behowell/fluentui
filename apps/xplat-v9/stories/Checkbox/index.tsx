/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Default } from './CheckboxDefault';
import { Checked } from './CheckboxChecked';
import { Mixed } from './CheckboxMixed';
import { Disabled } from './CheckboxDisabled';
import { Large } from './CheckboxLarge';
import { LabelBefore } from './CheckboxLabelBefore';
import { LabelWrapping } from './CheckboxLabelWrapping';
import { Required } from './CheckboxRequired';
import { Circular } from './CheckboxCircular';

import { Story } from '../util/Story';

export const CheckboxStories = () => (
  <div>
    <Story title="Default" story={<Default />} />
    <Story title="Checked" story={<Checked />} />
    <Story title="Mixed" story={<Mixed />} />
    <Story title="Disabled" story={<Disabled />} />
    <Story title="Large" story={<Large />} />
    <Story title="Label before" story={<LabelBefore />} />
    <Story title="Label wrapping" story={<LabelWrapping />} />
    <Story title="Required" story={<Required />} />
    <Story title="Circular" story={<Circular />} />
  </div>
);
