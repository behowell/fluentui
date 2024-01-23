import * as React from 'react';

import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { useFieldControlProps_unstable } from '../../contexts/index';
import { GroupProps, GroupState } from './Group.types';

/**
 * Create the state required to render Group.
 *
 * The returned state can be modified with hooks such as useGroupStyles_unstable,
 * before being passed to renderGroup_unstable.
 *
 * @param props - props from this instance of Group
 * @param ref - reference to root HTMLElement of Group
 */
export const useGroup_unstable = (props: GroupProps, ref: React.Ref<HTMLDivElement>): GroupState => {
  // Merge props from surrounding <Field>, if any
  props = useFieldControlProps_unstable(props);

  const { layout = 'vertical' } = props;

  return {
    layout,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ...props,
        ref,
        role: 'group',
      }),
      { elementType: 'div' },
    ),
  };
};
