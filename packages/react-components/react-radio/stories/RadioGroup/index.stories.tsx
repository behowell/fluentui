import { RadioGroup } from '@fluentui/react-components';
import { RadioItem } from '@fluentui/react-radio';
import bestPracticesMd from './RadioGroupBestPractices.md';
import descriptionMd from './RadioGroupDescription.md';

export { Default } from './RadioGroupDefault.stories';
export { Horizontal } from './RadioGroupHorizontal.stories';
export { HorizontalStacked } from './RadioGroupHorizontalStacked.stories';
export { DefaultValue } from './RadioGroupDefaultValue.stories';
export { ControlledValue } from './RadioGroupControlledValue.stories';
export { Required } from './RadioGroupRequired.stories';
export { Disabled } from './RadioGroupDisabled.stories';
export { DisabledItem } from './RadioGroupDisabledItem.stories';
export { LabelSubtext } from './RadioGroupLabelSubtext.stories';

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  subcomponents: {
    RadioItem,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
