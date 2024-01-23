import * as React from 'react';
import { Meta } from '@storybook/react';
import { Group } from '@fluentui/react-field';

export { Default } from './GroupDefault.stories';
export { Horizontal } from './GroupHorizontal.stories';

import descriptionMd from './GroupDescription.md';
import bestPracticesMd from './GroupBestPractices.md';

export default {
  title: 'Components/Group',
  component: Group,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;
