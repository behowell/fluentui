import * as React from 'react';
import { TooltipState } from './Tooltip.types';
import * as PopperJs from '@popperjs/core';

/**
 * Positions the tooltip relative to its targetElement
 */
export const useTooltipPlacement = (state: TooltipState): TooltipState => {
  const { ref, targetRef, arrowRef, placement } = state;

  const [root, setRoot] = React.useState<HTMLElement | null>(ref.current);
  const [target, setTarget] = React.useState<HTMLElement | null>(targetRef?.current || null);
  const [arrow, setArrow] = React.useState<HTMLElement | null>(arrowRef.current);

  if (root !== ref.current || target !== targetRef?.current || arrow !== arrowRef.current) {
    setRoot(ref.current);
    setTarget(targetRef?.current || null);
    setArrow(arrowRef.current);
  }

  React.useLayoutEffect(() => {
    if (root !== ref.current || target !== targetRef?.current || arrow !== arrowRef.current) {
      setRoot(ref.current);
      setTarget(targetRef?.current || null);
      setArrow(arrowRef.current);
      return;
    }

    if (!target || !root) {
      return;
    }

    const popper = PopperJs.createPopper(target, root, {
      placement,
      modifiers: [{ name: 'arrow', enabled: !!arrow, options: { element: arrow } }],
    });

    return () => {
      popper.destroy();
    };
  }, [target, root, arrow, ref, targetRef, arrowRef, placement]);

  return state;
};
