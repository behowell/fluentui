/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { RadioItemState, RadioItemSlots } from './RadioItem.types';

/**
 * Render the final JSX of RadioItem
 */
export const renderRadioItem_unstable = (state: RadioItemState) => {
  assertSlots<RadioItemSlots>(state);

  return (
    <state.root>
      <state.input />
      <state.indicator />
      {state.label && <state.label />}
    </state.root>
  );
};
