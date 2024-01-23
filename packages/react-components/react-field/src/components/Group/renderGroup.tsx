/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import { FieldContextProvider } from '../../contexts/FieldContext';
import { GroupContextValues, GroupSlots, GroupState } from './Group.types';

/**
 * Render the final JSX of Group
 */
export const renderGroup_unstable = (state: GroupState, contextValues: GroupContextValues) => {
  assertSlots<GroupSlots>(state);

  return (
    <FieldContextProvider value={contextValues.field}>
      <state.root />
    </FieldContextProvider>
  );
};
