import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';

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
   * If true, does not render an arrow pointing to the target element
   */
  noArrow?: boolean;

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
