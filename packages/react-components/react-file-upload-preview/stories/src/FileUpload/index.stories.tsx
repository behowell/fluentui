import { FileUpload } from '@fluentui/react-file-upload-preview';

import descriptionMd from './FileUploadDescription.md';
import bestPracticesMd from './FileUploadBestPractices.md';

export { Default } from './FileUploadDefault.stories';

export default {
  title: 'Preview Components/FileUpload',
  component: FileUpload,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
