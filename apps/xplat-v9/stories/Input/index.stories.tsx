/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { Default } from './InputDefault.stories';
import { Appearance } from './InputAppearance.stories';
import { ContentBeforeAfter } from './InputContentBeforeAfter.stories';
import { Disabled } from './InputDisabled.stories';
import { Inline } from './InputInline.stories';
import { Placeholder } from './InputPlaceholder.stories';
import { Size } from './InputSize.stories';
import { Type } from './InputType.stories';
import { Uncontrolled } from './InputUncontrolled.stories';
import { Controlled } from './InputControlled.stories';

import { Story } from '../util/Story';

export const InputStories = () => (
  <div>
    <Story title="Default" story={<Default />} />
    <Story title="Appearance" story={<Appearance />} />
    <Story title="Content before/after" story={<ContentBeforeAfter />} />
    <Story title="Disabled" story={<Disabled />} />
    <Story title="Inline" story={<Inline />} />
    <Story title="Placeholder" story={<Placeholder />} />
    <Story title="Size" story={<Size />} />
    <Story title="Uncontrolled" story={<Uncontrolled />} />
    <Story title="Controlled" story={<Controlled />} />
  </div>
);
