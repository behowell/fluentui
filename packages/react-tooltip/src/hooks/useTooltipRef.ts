import { TooltipSlotProps, useTooltipManagerRef } from '../components/TooltipProvider';
import { useRefEffect } from '@fluentui/react-hooks';
import { ShorthandProps } from '@fluentui/react-utilities';

/**
 * Create a ref that, when attached to an element, shows the tooltip on hover or focus.
 *
 * @param tooltip The tooltip to display on hover or focus. Can be a string, JSX element tree, or TooltipSlotProps.
 */
export function useTooltipRef(tooltip: ShorthandProps<TooltipSlotProps>) {
  const managerRef = useTooltipManagerRef();

  return useRefEffect<HTMLElement>(target => {
    const onEnter = () => managerRef.current?.showTooltip(target, tooltip);
    const onLeave = () => managerRef.current?.hideTooltip(target);

    target.addEventListener('focus', onEnter);
    target.addEventListener('blur', onLeave);
    target.addEventListener('pointerenter', onEnter);
    target.addEventListener('pointerleave', onLeave);

    return () => {
      target.removeEventListener('focus', onEnter);
      target.removeEventListener('blur', onLeave);
      target.removeEventListener('pointerenter', onEnter);
      target.removeEventListener('pointerleave', onLeave);
    };
  });
}
