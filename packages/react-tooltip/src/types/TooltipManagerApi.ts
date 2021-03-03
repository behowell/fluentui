import { ShorthandProps } from '@fluentui/react-utilities';
import { TooltipProps } from './TooltipProps';

/**
 * Interface to be implemented by the TooltipManager
 */
export interface TooltipManagerApi {
  /**
   * Called by a component with a tooltip, either from onPointerEnter or onFocus.
   */
  showTooltip: (
    triggerElement: HTMLElement,
    tooltip: ShorthandProps<TooltipProps>,
    options?: ShowTooltipOptions,
  ) => void;

  /**
   * Called by a component with a tooltip, either from onPointerLeave or onBlur.
   */
  hideTooltip: (triggerElement: HTMLElement) => void;

  /**
   * Hides all tooltips
   */
  hideAll: () => void;
}

export type ShowTooltipOptions = {
  /**
   * Optional ID to add to the tooltip element. This can be used for accessibility (aria-describedby).
   */
  id?: string;

  /**
   * Delay before the tooltip is shown, in milliseconds
   *
   * @defaultvalue 500
   */
  showDelay?: number;

  /**
   * Delay before the tooltip is hidden, in milliseconds
   *
   * @defaultvalue 250
   */
  hideDelay?: number;
};
