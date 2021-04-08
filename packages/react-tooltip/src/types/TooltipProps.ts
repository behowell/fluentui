import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';

export interface TooltipProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * How to position the tooltip relative to the target element. This is a "best effort" placement,
   * but the tooltip may be flipped to the other side if there is not enough room.
   *
   * @defaultvalue top
   */
  placement?: TooltipPlacement;

  /**
   * Color variant with a subtle look
   */
  subtle?: boolean;

  /**
   * Do not render an arrow pointing to the target element
   */
  noArrow?: boolean;

  /**
   * Distance between the tooltip and the target element, in pixels
   *
   * @defaultvalue 4
   */
  offset?: number;

  /**
   * Delay before the tooltip is shown, in milliseconds
   *
   * @defaultvalue 250
   */
  showDelay?: number;

  /**
   * Delay before the tooltip is hidden, in milliseconds
   *
   * @defaultvalue 250
   */
  hideDelay?: number;

  /**
   * Only show the tooltip if the target element's children are truncated (overflowing).
   */
  onlyIfTruncated?: boolean;

  /**
   * The element that this Tooltip points to.
   *
   * Normally this will be set by the TooltipManager when a tooltip is shown by hovering or focusing an element.
   * The target can be specified if the tooltip needs to point to a different element than the one that triggered it.
   */
  targetElement?: HTMLElement | null;

  /**
   * Internal use. This should only be set by the TooltipManager when the tooltip is shown.
   */
  visible?: boolean;
}

/**
 * Defines where the tooltip is placed in relation to the target element.
 *
 * The first half of the name defines which side of the element:
 * * above - top of the target
 * * below - bottom of the target
 * * before - left of the target (right in RTL)
 * * after - right of the target (left in RTL)
 *
 * The second half defines the alignment of the tooltip on that side:
 * * (none) - centered
 * * start - aligned to the left edge (right in RTL)
 * * end - aligned to the right edge (left in RTL)
 * * top - aligned to the top edge
 * * bottom - aligned to the bottom edge
 */
export type TooltipPlacement =
  | 'above'
  | 'above-start'
  | 'above-end'
  | 'below'
  | 'below-start'
  | 'below-end'
  | 'before'
  | 'before-top'
  | 'before-bottom'
  | 'after'
  | 'after-top'
  | 'after-bottom';
