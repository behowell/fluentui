/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Default } from './ComboboxDefault.stories';
import { ComplexOptions } from './ComboboxComplexOptions.stories';
import { CustomOptions } from './ComboboxCustomOptions.stories';
import { Controlled } from './ComboboxControlled.stories';
import { Clearable } from './ComboboxClearable.stories';
import { Filtering } from './ComboboxFiltering.stories';
import { Freeform } from './ComboboxFreeform.stories';
import { Multiselect } from './ComboboxMultiselect.stories';
import { MultiselectWithTags } from './ComboboxMultiselectWithTags.stories';
import { MultiselectWithValueString } from './ComboboxMultiselectWithValueString.stories';
import { Grouped } from './ComboboxGrouped.stories';
import { Appearance } from './ComboboxAppearance.stories';
import { Size } from './ComboboxSize.stories';
import { Disabled } from './ComboboxDisabled.stories';
import { ActiveOptionChange } from './ComboboxActiveOptionChange.stories';
import { Story } from '../util/Story';

export const ComboboxStories = () => (
  <div>
    <Story title="Default" story={<Default />} />
    {/* <Story title="Complex Options" story={<ComplexOptions />} /> */}
    {/* <Story title="Custom Options" story={<CustomOptions />} /> */}
    {/* <Story title="Controlled" story={<Controlled />} /> */}
    <Story title="Clearable" story={<Clearable />} />
    {/* <Story title="Filtering" story={<Filtering />} /> */}
    <Story title="Freeform" story={<Freeform />} />
    <Story title="Multiselect" story={<Multiselect />} />
    <Story title="Multiselect with Tags" story={<MultiselectWithTags />} />
    <Story title="Multiselect with Value String" story={<MultiselectWithValueString />} />
    <Story title="Grouped" story={<Grouped />} />
    <Story title="Appearance" story={<Appearance />} />
    <Story title="Size" story={<Size />} />
    <Story title="Disabled" story={<Disabled />} />
    <Story title="Active Option Change" story={<ActiveOptionChange />} />
  </div>
);
