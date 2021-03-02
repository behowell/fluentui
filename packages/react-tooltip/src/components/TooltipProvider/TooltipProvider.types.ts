import * as React from 'react';
import { ComponentProps, ShorthandProps } from '@fluentui/react-utilities';

export interface TooltipSlotProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * How to position the tooltip relative to the target element. This is a "best effort" placement,
   * but the tooltip may be flipped to the other side if there is not enough room.
   *
   * @defaultvalue bottom
   */
  placement?: TooltipPlacement;

  /**
   * Subtle color variant
   */
  subtle?: boolean;
}

export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';

/**
 * Interface to be implemented by the TooltipManager
 */
export interface TooltipManagerApi {
  showTooltip: (
    target: HTMLElement,
    tooltip: ShorthandProps<TooltipSlotProps>,
    defaultProps?: TooltipSlotProps,
  ) => void;
  hideTooltip: (target: HTMLElement) => void;
}

export interface TooltipProviderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  // TooltipProvider has no additional props
}

export interface TooltipProviderState extends TooltipProviderProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
}
