/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { FileUploadState, FileUploadSlots } from './FileUpload.types';

/**
 * Render the final JSX of FileUpload
 */
export const renderFileUpload_unstable = (state: FileUploadState): JSXElement => {
  assertSlots<FileUploadSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
