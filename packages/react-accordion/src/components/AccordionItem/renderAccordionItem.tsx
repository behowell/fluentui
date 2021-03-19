import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { accordionItemShorthandProps, AccordionItemState } from './AccordionItem.types';
import { accordionItemContext } from './useAccordionItemContext';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionItem = (state: AccordionItemState) => {
  const { slots, slotProps } = getSlots(state, accordionItemShorthandProps);
  return (
    <accordionItemContext.Provider value={state.context}>
      <slots.root {...slotProps.root}>{state.children}</slots.root>
    </accordionItemContext.Provider>
  );
};
