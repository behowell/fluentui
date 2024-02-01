import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { RadioItemProps, RadioItemState } from './RadioItem.types';

/**
 * Create the state required to render RadioItem.
 *
 * The returned state can be modified with hooks such as useRadioItemStyles_unstable,
 * before being passed to renderRadioItem_unstable.
 *
 * @param props - props from this instance of RadioItem
 * @param ref - reference to root HTMLDivElement of RadioItem
 */
export const useRadioItem_unstable = (props: RadioItemProps, ref: React.Ref<HTMLDivElement>): RadioItemState => {
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
