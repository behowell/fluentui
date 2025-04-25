import * as React from 'react';
import { useTooltipContent_unstable } from './useTooltipContent';
import { renderTooltipContent_unstable } from './renderTooltipContent';
// import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useTooltipContentStyles_unstable } from './useTooltipContentStyles.styles';
import type { TooltipContentProps } from './TooltipContent.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * The content of a Tooltip.
 */

export const TooltipContent: ForwardRefComponent<TooltipContentProps> = React.forwardRef((props, ref) => {
  const state = useTooltipContent_unstable(props, ref);

  useTooltipContentStyles_unstable(state);

  // TODO
  // useCustomStyleHook_unstable('useTooltipContentStyles_unstable')(state);

  return renderTooltipContent_unstable(state);
});

TooltipContent.displayName = 'TooltipContent';
