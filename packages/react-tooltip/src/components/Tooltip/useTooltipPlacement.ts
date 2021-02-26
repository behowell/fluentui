import * as React from 'react';
import { TooltipState } from './Tooltip.types';
import * as PopperJs from '@popperjs/core';

/**
 * Positions the tooltip relative to its targetElement
 */
export const useTooltipPlacement = (state: TooltipState): TooltipState => {
  const { ref, targetRef, arrowRef, placement } = state;

  React.useEffect(() => {
    if (!targetRef || !targetRef.current || !ref.current) {
      return;
    }

    // REVIEW what happens if these refs change?
    const popper = PopperJs.createPopper(targetRef.current, ref.current, {
      placement,
      modifiers: [
        {
          name: 'arrow',
          enabled: !!arrowRef.current,
          options: {
            element: arrowRef.current,
          },
        },
      ],
    });

    return () => {
      popper.destroy();
    };
  }, [ref, targetRef, arrowRef, placement]);

  return state;
};
