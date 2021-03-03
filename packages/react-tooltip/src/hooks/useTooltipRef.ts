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
    const onEnter = () => managerRef.current?.onEnter(triggerElement, tooltip, showOptions);
    const onLeave = () => managerRef.current?.onLeave(triggerElement);

    triggerElement.addEventListener('focus', onEnter);
    triggerElement.addEventListener('blur', onLeave);
    triggerElement.addEventListener('pointerenter', onEnter);
    triggerElement.addEventListener('pointerleave', onLeave);

    return () => {
      triggerElement.removeEventListener('focus', onEnter);
      triggerElement.removeEventListener('blur', onLeave);
      triggerElement.removeEventListener('pointerenter', onEnter);
      triggerElement.removeEventListener('pointerleave', onLeave);
    };
  });
}
