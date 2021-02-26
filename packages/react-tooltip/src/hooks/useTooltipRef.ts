import { useTooltipManagerRef } from '../components/TooltipProvider';
import { useRefEffect } from '@fluentui/react-hooks';
import { TooltipProps } from '../Tooltip';
import { ShorthandProps } from '@fluentui/react-utilities';

export const useTooltipRef = (tooltip: ShorthandProps<TooltipProps>) => {
  const managerRef = useTooltipManagerRef();

  return useRefEffect<HTMLElement>(target => {
    const onEnter = () => managerRef.current?.show(target, tooltip);
    const onLeave = () => managerRef.current?.hide(target);

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
};
