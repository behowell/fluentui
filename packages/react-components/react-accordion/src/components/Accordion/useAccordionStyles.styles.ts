import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses } from '@fluentui/react-platform-adapter-preview';
import type { AccordionSlots, AccordionState } from './Accordion.types';

export const accordionClassNames: SlotClassNames<AccordionSlots> = {
  root: 'fui-Accordion',
};

export const useAccordionStyles_unstable = (state: AccordionState) => {
  state.root.className = mergeClasses(accordionClassNames.root, state.root.className);

  return state;
};
