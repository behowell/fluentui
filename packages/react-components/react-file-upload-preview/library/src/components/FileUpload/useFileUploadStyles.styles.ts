import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { FileUploadSlots, FileUploadState } from './FileUpload.types';

export const fileUploadClassNames: SlotClassNames<FileUploadSlots> = {
  root: 'fui-FileUpload',
  // TODO: add class names for all slots on FileUploadSlots.
  // Should be of the form `<slotName>: 'fui-FileUpload__<slotName>`
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    // TODO Add default styles for the root element
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the FileUpload slots based on the state
 */
export const useFileUploadStyles_unstable = (state: FileUploadState): FileUploadState => {
  'use no memo';

  const styles = useStyles();
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(fileUploadClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
