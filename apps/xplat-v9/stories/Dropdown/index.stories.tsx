/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Default } from './DropdownDefault.stories';
import { Appearance } from './DropdownAppearance.stories';
import { Grouped } from './DropdownGrouped.stories';
import { Clearable } from './DropdownClearable.stories';
import { ComplexOptions } from './DropdownComplexOptions.stories';
import { CustomOptions } from './DropdownCustomOptions.stories';
import { Controlled } from './DropdownControlled.stories';
import { Multiselect } from './DropdownMultiselect.stories';
import { Size } from './DropdownSize.stories';
import { Disabled } from './DropdownDisabled.stories';
import { TruncatedValue } from './DropdownTruncation.stories';
import { ActiveOptionChange } from './DropdownActiveOptionChange.stories';
import { Story } from '../util/Story';

export const DropdownStories = () => (
  <div>
    <Story title="Default" story={<Default />} />
    <Story title="Appearance" story={<Appearance />} />
    <Story title="Grouped" story={<Grouped />} />
    <Story title="Clearable" story={<Clearable />} />
    <Story title="Complex Options" story={<ComplexOptions />} />
    <Story title="Custom Options" story={<CustomOptions />} />
    <Story title="Controlled" story={<Controlled />} />
    <Story title="Multiselect" story={<Multiselect />} />
    <Story title="Size" story={<Size />} />
    <Story title="Disabled" story={<Disabled />} />
    <Story title="Truncated Value" story={<TruncatedValue />} />
    <Story title="Active Option Change" story={<ActiveOptionChange />} />
  </div>
);
