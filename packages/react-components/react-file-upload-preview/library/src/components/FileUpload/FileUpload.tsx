import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useFileUpload_unstable } from './useFileUpload';
import { renderFileUpload_unstable } from './renderFileUpload';
import { useFileUploadStyles_unstable } from './useFileUploadStyles.styles';
import type { FileUploadProps } from './FileUpload.types';

/**
 * FileUpload component - TODO: add more docs
 */
export const FileUpload: ForwardRefComponent<FileUploadProps> = React.forwardRef((props, ref) => {
  const state = useFileUpload_unstable(props, ref);

  useFileUploadStyles_unstable(state);

  /**
   * @see https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/convergence/custom-styling.md
   *
   * TODO: 💡 once package will become stable (PR which will be part of promoting PREVIEW package to STABLE),
   *      - uncomment this line
   *      - update types {@link file://./../../../../../../../packages/react-components/react-shared-contexts/library/src/CustomStyleHooksContext/CustomStyleHooksContext.ts#CustomStyleHooksContextValue}
   *      - verify that custom global style override works for your component
   */
  // useCustomStyleHook_unstable('useFileUploadStyles_unstable')(state);

  return renderFileUpload_unstable(state);
});

FileUpload.displayName = 'FileUpload';
