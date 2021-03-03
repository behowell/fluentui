import { useTooltipManagerRef } from '../components/TooltipProvider';
import { ShowTooltipOptions, TooltipProps } from '../types';
import { useRefEffect } from '@fluentui/react-hooks';
import { ShorthandProps } from '@fluentui/react-utilities';

/**
 * Create a ref that, when attached to an element, shows the tooltip on hover or focus.
 *
 * @param tooltip - The tooltip to display on hover or focus. Can be a string, JSX element tree, or TooltipProps.
 * @param showOptions - Options when showing the tooltip, such as an ID to use for aria-describedby on the host element.
 */
export function useTooltipRef(tooltip: ShorthandProps<TooltipProps>, showOptions?: ShowTooltipOptions) {
  const managerRef = useTooltipManagerRef();

  return useRefEffect<HTMLElement>(triggerElement => {
    const showTooltip = () => managerRef.current?.showTooltip(triggerElement, tooltip, showOptions);
    const hideTooltip = () => managerRef.current?.hideTooltip(triggerElement);

    triggerElement.addEventListener('focus', showTooltip);
    triggerElement.addEventListener('blur', hideTooltip);
    triggerElement.addEventListener('pointerenter', showTooltip);
    triggerElement.addEventListener('pointerleave', hideTooltip);

    return () => {
      triggerElement.removeEventListener('focus', showTooltip);
      triggerElement.removeEventListener('blur', hideTooltip);
      triggerElement.removeEventListener('pointerenter', showTooltip);
      triggerElement.removeEventListener('pointerleave', hideTooltip);
    };
  });
}
