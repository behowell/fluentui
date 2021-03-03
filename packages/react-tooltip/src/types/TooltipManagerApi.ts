import { ShorthandProps } from '@fluentui/react-utilities';
import { TooltipProps } from './TooltipProps';

/**
 * Interface to be implemented by the TooltipManager
 */
export interface TooltipManagerApi {
  /**
   * Called by a component with a tooltip, either from onPointerEnter or onFocus.
   */
  showTooltip: (triggerElement: HTMLElement, tooltip: ShorthandProps<TooltipProps>, options?: TooltipOptions) => void;

  /**
   * Called by a component with a tooltip, either from onPointerLeave or onBlur.
   */
  hideTooltip: (triggerElement: HTMLElement) => void;

  /**
   * Hides any visible tooltip.
   */
  hideAll: () => void;
}

export type TooltipOptions = {
  /**
   * Optional ID to add to the tooltip element. This can be used for accessibility (aria-describedby).
   */
  id?: string;

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
};
