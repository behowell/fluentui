import * as React from 'react';
import { useTooltip } from './useTooltip';
import { TooltipProps } from './Tooltip.types';
import { renderTooltip } from './renderTooltip';
import { useTooltipStyles } from './useTooltipStyles';
import { useTooltipPlacement } from './useTooltipPlacement';

/**
 * {@docCategory Tooltip }
 */
export const Tooltip = React.forwardRef<HTMLElement, TooltipProps>((props, ref) => {
  const state = useTooltip(props, ref);
  useTooltipPlacement(state);
  useTooltipStyles(state);
  return renderTooltip(state);
});

Tooltip.displayName = 'Tooltip';
