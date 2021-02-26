import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';

/**
 * {@docCategory TooltipProvider }
 */
export interface TooltipProviderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  // TODO Add props and slots here
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
