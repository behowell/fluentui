import * as React from 'react';

import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { OnVisibleChangeData, TooltipProps } from '../Tooltip/Tooltip.types';

export type TooltipContentImperativeHandle = {
  setDelayedVisible: (
    ev: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement> | undefined,
    data: OnVisibleChangeData,
    delay: number,
  ) => void;
  cancelDelayedVisible: () => void;
  setTargetElement: (targetElement: HTMLElement | undefined) => void;
};

/**
 * Slot properties for TooltipContent
 */
export type TooltipContentSlots = {
  root: NonNullable<Slot<'div'>>;
  arrow?: NonNullable<Slot<'div'>>;
};

/**
 * Properties for TooltipContent
 */
export type TooltipContentProps = ComponentProps<TooltipContentSlots> &
  Pick<
    TooltipProps,
    'appearance' | 'hideDelay' | 'mountNode' | 'onVisibleChange' | 'positioning' | 'showDelay' | 'visible' | 'withArrow'
  > & {
    imperativeHandle?: React.Ref<TooltipContentImperativeHandle>;
    alwaysRender?: boolean;
  };

/**
 * State used in rendering TooltipContent
 */
export type TooltipContentState = ComponentState<TooltipContentSlots> &
  Pick<TooltipContentProps, 'mountNode'> &
  Required<Pick<TooltipContentProps, 'appearance' | 'visible'>> & {
    /**
     * Whether the tooltip should be rendered to the DOM.
     */
    shouldRender?: boolean;
  };
