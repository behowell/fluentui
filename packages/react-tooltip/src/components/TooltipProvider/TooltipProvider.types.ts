import * as React from 'react';
import { ComponentProps, ComponentState, ShorthandProps } from '@fluentui/react-utilities';

export interface TooltipProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * How to position the tooltip relative to the target element. This is a "best effort" placement,
   * but the tooltip may be flipped to the other side if there is not enough room.
   *
   * @defaultvalue bottom
   */
  placement?: TooltipPlacement;

  /**
   * Color variant with a subtle look
   */
  subtle?: boolean;

  /**
   * The element that this Tooltip points to.
   *
   * Normally this will be set by the TooltipManager when a tooltip is shown by hovering or focusing an element.
   * The target can be specified if the tooltip needs to point to a different element than the one that triggered it
   * (this is rare).
   */
  targetElement?: HTMLElement | null;
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
  /**
   * Called by a tooltip trigger either onPointerEnter or onFocus.
   */
  onEnter: (triggerElement: HTMLElement, tooltip: ShorthandProps<TooltipProps>, options?: ShowTooltipOptions) => void;

  /**
   * Called by a tooltip trigger either onPointerLeave or onBlur.
   */
  onLeave: (triggerElement: HTMLElement) => void;
}

export type ShowTooltipOptions = {
  /**
   * Supply an ID to the tooltip element for use by aria-describedby.
   */
  id?: string;
};

export interface TooltipProviderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  // TooltipProvider has no additional props
}

export const tooltipProviderShorthandProps = [] as const;

export type TooltipProviderState = ComponentState<TooltipProviderProps, typeof tooltipProviderShorthandProps[number]>;
