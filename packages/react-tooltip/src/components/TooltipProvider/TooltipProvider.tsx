import * as React from 'react';
import { useTooltipProvider } from './useTooltipProvider';
import { TooltipProviderProps } from './TooltipProvider.types';
import { renderTooltipProvider } from './renderTooltipProvider';
import { useTooltipProviderStyles } from './useTooltipProviderStyles';

/**
 * {@docCategory TooltipProvider}
 */
export const TooltipProvider = React.forwardRef<HTMLElement, TooltipProviderProps>((props, ref) => {
  const state = useTooltipProvider(props, ref);

  useTooltipProviderStyles(state);
  return renderTooltipProvider(state);
});

TooltipProvider.displayName = 'TooltipProvider';
