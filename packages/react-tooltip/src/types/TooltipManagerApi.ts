import { ShorthandProps } from '@fluentui/react-utilities';
import { TooltipProps } from './TooltipProps';

/**
 * Interface to be implemented by the TooltipManager
 */
export interface TooltipManagerApi {
  /**
   * Called by a component with a tooltip, either from onPointerEnter or onFocus.
   */
  showTooltip: (triggerElement: HTMLElement, tooltip: ShorthandProps<TooltipProps>) => void;

  /**
   * Called by a component with a tooltip, either from onPointerLeave or onBlur.
   */
  hideTooltip: (triggerElement: HTMLElement) => void;

  /**
   * Hides any visible tooltip.
   */
  hideAll: () => void;
}
