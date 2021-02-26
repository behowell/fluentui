import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';

/**
 * {@docCategory TooltipManager }
 */
export interface TooltipManagerProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  // TODO Add props and slots here
}

/**
 * {@docCategory TooltipManager }
 */
export interface TooltipManagerState extends TooltipManagerProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
}
