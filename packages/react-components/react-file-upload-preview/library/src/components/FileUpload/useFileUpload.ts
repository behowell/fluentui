import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { FileUploadProps, FileUploadState } from './FileUpload.types';

/**
 * Create the state required to render FileUpload.
 *
 * The returned state can be modified with hooks such as useFileUploadStyles_unstable,
 * before being passed to renderFileUpload_unstable.
 *
 * @param props - props from this instance of FileUpload
 * @param ref - reference to root HTMLDivElement of FileUpload
 */
export const useFileUpload_unstable = (props: FileUploadProps, ref: React.Ref<HTMLDivElement>): FileUploadState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
