/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { RadioItemState, RadioItemSlots } from './RadioItem.types';

/**
 * Render the final JSX of RadioItem
 */
export const renderRadioItem_unstable = (state: RadioItemState) => {
  assertSlots<RadioItemSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
