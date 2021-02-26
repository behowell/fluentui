import * as React from 'react';
import { useTooltipManager } from './useTooltipManager';
import { TooltipManagerProps } from './TooltipManager.types';
import { renderTooltipManager } from './renderTooltipManager';
import { useTooltipManagerStyles } from './useTooltipManagerStyles';

/**
 * {@docCategory TooltipManager }
 */
export const TooltipManager = React.forwardRef<HTMLElement, TooltipManagerProps>((props, ref) => {
  const state = useTooltipManager(props, ref);

  useTooltipManagerStyles(state);
  return renderTooltipManager(state);
});

TooltipManager.displayName = 'TooltipManager';
