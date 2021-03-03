import { useTooltipManagerRef } from '../components/TooltipProvider';
import { TooltipProps } from '../types';
import { useRefEffect } from '@fluentui/react-hooks';
import { ShorthandProps } from '@fluentui/react-utilities';

/**
 * Create a ref that, when attached to an element, shows the tooltip on hover or focus.
 *
 * @param tooltip - The tooltip to display on hover or focus. Can be a string, JSX element tree, or TooltipProps.
 */
export function useTooltipRef(tooltip: ShorthandProps<TooltipProps>) {
  const managerRef = useTooltipManagerRef();

  return useRefEffect<HTMLElement>(triggerElement => {
    const onEnter = () => managerRef.current?.onEnter(triggerElement, tooltip);
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
