import * as React from 'react';

import type { FieldContextValue } from '../Field';
import type { GroupContextValues, GroupState } from '../Group';
import { useFieldContext_unstable } from './FieldContext';

/**
 * Get the context values used when rendering Group.
 */
export const useGroupContextValues_unstable = (state: GroupState): GroupContextValues => {
  const fieldContext = useFieldContext_unstable();

  const field: FieldContextValue | undefined = React.useMemo(
    () =>
      fieldContext && {
        hintId: fieldContext.hintId,
        orientation: fieldContext.orientation,
        size: fieldContext.size,
        validationMessageId: fieldContext.validationMessageId,
      },
    [fieldContext],
  );

  return { field };
};
