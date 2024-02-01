import { RadioItem } from '@fluentui/react-radio';

import descriptionMd from './RadioItemDescription.md';
import bestPracticesMd from './RadioItemBestPractices.md';

export { Default } from './RadioItemDefault.stories';

export default {
  title: 'Components/RadioItem',
  component: RadioItem,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
