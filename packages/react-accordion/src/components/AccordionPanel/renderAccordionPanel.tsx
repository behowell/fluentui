import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { accordionPanelShorthandProps, AccordionPanelState } from './AccordionPanel.types';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionPanel = (state: AccordionPanelState) => {
  const { slots, slotProps } = getSlots(state, accordionPanelShorthandProps);
  return state.open ? <slots.root {...slotProps.root}>{state.children}</slots.root> : null;
};
