import * as React from 'react';
import { ComponentProps, ObjectShorthandProps } from '@fluentui/react-utilities';
import { TooltipProps } from '../Tooltip';
import { TooltipManagerApi } from '../../TooltipProvider';
// import { TooltipManagerApi } from '@fluentui/react-tooltip-provider';

/** {@docCategory TooltipManager} */
export interface TooltipManagerProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Ref to the imperative interface to show and hide tooltips.
   */
  componentRef?: React.Ref<TooltipManagerApi>;
}

/** {@docCategory TooltipManager} */
export interface TooltipManagerState extends TooltipManagerProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;

  /**
   * The Tooltip being rendered, if any.
   */
  tooltip?: ObjectShorthandProps<TooltipProps>;
}
