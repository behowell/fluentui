import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type FileUploadSlots = {
  root: Slot<'div'>;
};

/**
 * FileUpload Props
 */
export type FileUploadProps = ComponentProps<FileUploadSlots> & {};

/**
 * State used in rendering FileUpload
 */
export type FileUploadState = ComponentState<FileUploadSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from FileUploadProps.
// & Required<Pick<FileUploadProps, 'propName'>>
