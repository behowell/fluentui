/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-accordion';

export const Sizes = () => (
  <div>
    <div>
      <Accordion>
        <AccordionItem value="1">
          <AccordionHeader size="small">Accordion Header 1</AccordionHeader>
          <AccordionPanel>
            <div>Accordion Panel 1</div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
    <div>
      <Accordion>
        <AccordionItem value="1">
          <AccordionHeader size="medium">Accordion Header 1</AccordionHeader>
          <AccordionPanel>
            <div>Accordion Panel 1</div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
    <div>
      <Accordion>
        <AccordionItem value="1">
          <AccordionHeader size="large">Accordion Header 1</AccordionHeader>
          <AccordionPanel>
            <div>Accordion Panel 1</div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
    <div>
      <Accordion>
        <AccordionItem value="1">
          <AccordionHeader size="extra-large">Accordion Header 1</AccordionHeader>
          <AccordionPanel>
            <div>Accordion Panel 1</div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
);

Sizes.parameters = {
  docs: {
    description: {
      story: 'An accordion supports `small`, `medium`, `large` and `extra-large` sizes.',
    },
  },
};
