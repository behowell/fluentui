import * as React from 'react';
import { ComponentProps, ShorthandProps } from '@fluentui/react-utilities';
import { TooltipProps } from '../Tooltip';

/**
 * Interface to be implemented by the TooltipManager
 */
export interface TooltipManagerApi {
  show: (target: HTMLElement, tooltip: ShorthandProps<TooltipProps>) => void;
  hide: (target: HTMLElement) => void;
}

/**
 * {@docCategory TooltipProvider }
 */
export interface TooltipProviderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  // TooltipProvider has no additional props
}

/**
 * {@docCategory TooltipProvider }
 */
export interface TooltipProviderState extends TooltipProviderProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
}
