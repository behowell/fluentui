import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';

/**
 * {@docCategory Tooltip }
 */
export interface TooltipProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  // TODO Add props and slots here
}

/**
 * {@docCategory Tooltip }
 */
export interface TooltipState extends TooltipProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
}
