import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RadioItemSlots, RadioItemState } from './RadioItem.types';

export const radioItemClassNames: SlotClassNames<RadioItemSlots> = {
  root: 'fui-RadioItem',
  // TODO: add class names for all slots on RadioItemSlots.
  // Should be of the form `<slotName>: 'fui-RadioItem__<slotName>`
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
 * Apply styling to the RadioItem slots based on the state
 */
export const useRadioItemStyles_unstable = (state: RadioItemState): RadioItemState => {
  const styles = useStyles();
  state.root.className = mergeClasses(radioItemClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
