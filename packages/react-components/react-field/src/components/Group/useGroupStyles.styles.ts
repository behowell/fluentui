import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import { GroupSlots, GroupState } from './Group.types';

export const groupClassNames: SlotClassNames<GroupSlots> = {
  root: 'fui-Group',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
  },

  vertical: {
    flexDirection: 'column',
  },
});

/**
 * Apply styling to the Group slots based on the state
 */
export const useGroupStyles_unstable = (state: GroupState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    groupClassNames.root,
    styles.root,
    state.layout === 'vertical' && styles.vertical,
    state.root.className,
  );
};
