import * as React from 'react';

import { useFocusWithin } from '@fluentui/react-tabster';
import { getPartitionedNativeProps, slot, useId } from '@fluentui/react-utilities';
import { useRadioGroupContextValue_unstable } from '../../contexts/RadioGroupContext';
import type { RadioItemProps, RadioItemState } from './RadioItem.types';

/**
 * Create the state required to render RadioItem.
 *
 * The returned state can be modified with hooks such as useRadioItemStyles_unstable,
 * before being passed to renderRadioItem_unstable.
 *
 * @param props - props from this instance of RadioItem
 * @param ref - reference to the HTMLInputElement of RadioItem
 */
export const useRadioItem_unstable = (props: RadioItemProps, ref: React.Ref<HTMLInputElement>): RadioItemState => {
  const group = useRadioGroupContextValue_unstable();

  const { name, required } = group;

  const {
    labelPosition = group.layout === 'horizontal-stacked' ? 'below' : 'after',
    disabled = group.disabled,
    'aria-describedby': ariaDescribedBy = group['aria-describedby'],
  } = props;

  const nativeProps = getPartitionedNativeProps({ props, primarySlotTagName: 'input' });

  const input = slot.always(props.input, {
    elementType: 'input',
    defaultProps: {
      ref,
      type: 'radio',
      id: useId('radio-', nativeProps.primary.id),
      name,
      checked: group.value !== undefined ? group.value === props.value : undefined,
      disabled,
      required,
      'aria-describedby': ariaDescribedBy,
      ...nativeProps.primary,
    },
  });

  const root = slot.always(props.root, {
    elementType: 'label',
    defaultProps: {
      ref: useFocusWithin<HTMLLabelElement>(),
      htmlFor: input.id,
      ...nativeProps.root,
    },
  });

  const { hover, active } = useMouseHoverActive(root);

  const label = slot.optional(props.label, {
    elementType: 'span',
  });

  const indicator = slot.always(props.indicator, {
    elementType: 'div',
    defaultProps: { 'aria-hidden': true },
  });

  return {
    hover,
    active,
    labelPosition,
    components: {
      root: 'label',
      input: 'input',
      label: 'span',
      indicator: 'div',
    },
    root,
    input,
    label,
    indicator,
  };
};

function useMouseHoverActive<
  Slot extends Pick<React.HTMLAttributes<unknown>, 'onMouseEnter' | 'onMouseLeave' | 'onMouseDown' | 'onMouseUp'>,
>(root: Slot) {
  const {
    onMouseEnter: onMouseEnterUser,
    onMouseDown: onMouseDownUser,
    onMouseUp: onMouseUpUser,
    onMouseLeave: onMouseLeaveUser,
  } = root;

  const [mouseIn, setMouseIn] = React.useState(false);
  const [mouseDown, setMouseDown] = React.useState(false);

  root.onMouseEnter = React.useCallback(
    ev => {
      setMouseIn(true);
      setMouseDown(curMouseDown => curMouseDown && !!ev.buttons);
      onMouseEnterUser?.(ev);
    },
    [onMouseEnterUser],
  );

  root.onMouseLeave = React.useCallback(
    ev => {
      setMouseIn(false);
      onMouseLeaveUser?.(ev);
    },
    [onMouseLeaveUser],
  );

  root.onMouseDown = React.useCallback(
    ev => {
      setMouseDown(true);
      onMouseDownUser?.(ev);
    },
    [onMouseDownUser],
  );

  root.onMouseUp = React.useCallback(
    ev => {
      setMouseDown(false);
      onMouseUpUser?.(ev);
    },
    [onMouseUpUser],
  );

  return {
    hover: mouseIn,
    active: mouseIn && mouseDown,
  };
}
