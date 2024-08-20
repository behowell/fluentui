/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { Default } from './RadioGroupDefault.stories';
import { Horizontal } from './RadioGroupHorizontal.stories';
import { HorizontalStacked } from './RadioGroupHorizontalStacked.stories';
import { DefaultValue } from './RadioGroupDefaultValue.stories';
import { ControlledValue } from './RadioGroupControlledValue.stories';
import { Required } from './RadioGroupRequired.stories';
import { Disabled } from './RadioGroupDisabled.stories';
import { DisabledItem } from './RadioGroupDisabledItem.stories';

import { Story } from '../util/Story';

export const RadioGroupStories = () => (
  <div>
    <Story title="Default" story={<Default />} />
    <Story title="Horizontal" story={<Horizontal />} />
    <Story title="Horizontal Stacked" story={<HorizontalStacked />} />
    <Story title="Default Value" story={<DefaultValue />} />
    <Story title="Controlled Value" story={<ControlledValue />} />
    <Story title="Required" story={<Required />} />
    <Story title="Disabled" story={<Disabled />} />
    <Story title="Disabled Item" story={<DisabledItem />} />
  </div>
);
