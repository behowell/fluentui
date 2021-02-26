import * as React from 'react';
import { ShorthandProps } from '@fluentui/react-utilities';
import { TooltipProps } from '../components/Tooltip';
import { useTooltipManagerRef } from '../components/TooltipProvider';

export interface WithTooltipProp {
  tooltip?: ShorthandProps<TooltipProps>;
}

export function useTooltipProp<State extends React.HTMLAttributes<HTMLElement> & WithTooltipProp>(state: State): State {
  const managerRef = useTooltipManagerRef();

  if (state.tooltip) {
    const { tooltip, onFocus, onBlur, onPointerEnter, onPointerLeave } = state;

    state.onFocus = ev => {
      managerRef.current?.show(ev.currentTarget, tooltip);
      onFocus?.(ev);
    };

    state.onPointerEnter = ev => {
      managerRef.current?.show(ev.currentTarget, tooltip);
      onPointerEnter?.(ev);
    };

    state.onBlur = ev => {
      managerRef.current?.hide(ev.currentTarget);
      onBlur?.(ev);
    };

    state.onPointerLeave = ev => {
      managerRef.current?.hide(ev.currentTarget);
      onPointerLeave?.(ev);
    };
  }

  return state;
}
