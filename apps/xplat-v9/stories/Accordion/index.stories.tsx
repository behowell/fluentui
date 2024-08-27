/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import { Default } from './AccordionDefault.stories';
import { Collapsible } from './AccordionCollapsible.stories';
import { Controlled } from './AccordionControlled.stories';
import { Multiple } from './AccordionMultiple.stories';
import { Navigation } from './AccordionNavigation.stories';
import { OpenItems } from './AccordionOpenItems.stories';
import { Sizes } from './AccordionSizes.stories';
import { HeadingLevels } from './AccordionHeaders.stories';
import { Inline } from './AccordionInline.stories';
import { Disabled } from './AccordionDisabled.stories';
import { ExpandIcon } from './AccordionExpandIcon.stories';
import { ExpandIconPosition } from './AccordionExpandIconPosition.stories';
import { WithIcon } from './AccordionWithIcon.stories';

import { Story } from '../util/Story';

export const AccordionStories = () => (
  <div>
    <Story title="Default" story={<Default />} />
    <Story title="Collapsible" story={<Collapsible />} />
    <Story title="Controlled" story={<Controlled />} />
    <Story title="Multiple" story={<Multiple />} />
    <Story title="Navigation" story={<Navigation />} />
    <Story title="Open Items" story={<OpenItems />} />
    <Story title="Sizes" story={<Sizes />} />
    {/* <Story title="Heading Levels" story={<HeadingLevels />} /> */}
    <Story title="Inline" story={<Inline />} />
    <Story title="Disabled" story={<Disabled />} />
    {/* <Story title="Expand Icon" story={<ExpandIcon />} /> */}
    {/* <Story title="Expand Icon Position" story={<ExpandIconPosition />} />  */}
    {/* <Story title="With Icon" story={<WithIcon />} /> */}
  </div>
);
