import * as React from 'react';
import { useTooltip } from './useTooltip';
import { TooltipProps } from './Tooltip.types';
import { renderTooltip } from './renderTooltip';
import { useTooltipStyles } from './useTooltipStyles';

/**
 * {@docCategory Tooltip }
 */
export const Tooltip = React.forwardRef<HTMLElement, TooltipProps>((props, ref) => {
  const state = useTooltip(props, ref);

  useTooltipStyles(state);
  return renderTooltip(state);
});

Tooltip.displayName = 'Tooltip';
