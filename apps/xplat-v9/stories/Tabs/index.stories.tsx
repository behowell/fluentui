/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Default } from './TabListDefault.stories';
import { Horizontal } from './TabListHorizontal.stories';
import { Vertical } from './TabListVertical.stories';
import { Appearance } from './TabListAppearance.stories';
import { Disabled } from './TabListDisabled.stories';
import { SizeSmall } from './TabListSizeSmall.stories';
import { SizeMedium } from './TabListSizeMedium.stories';
import { SizeLarge } from './TabListSizeLarge.stories';
import { WithIcon } from './TabListWithIcon.stories';
import { IconOnly } from './TabListIconOnly.stories';
import { SelectTabOnFocus } from './TabListSelectTabOnFocus.stories';
import { WithOverflow } from './TabListWithOverflow.stories';
import { WithPanels } from './TabListWithPanels.stories';
import { Story } from '../util/Story';

export const TabsStories = () => (
  <div>
    <Story title="Default" story={<Default />} />
    <Story title="Horizontal" story={<Horizontal />} />
    {/*  <Story title="Vertical" story={<Vertical />} />
    <Story title="Appearance" story={<Appearance />} />
    <Story title="Disabled" story={<Disabled />} />
    <Story title="Size Small" story={<SizeSmall />} />
    <Story title="Size Medium" story={<SizeMedium />} />
    <Story title="Size Large" story={<SizeLarge />} />
    <Story title="With Icon" story={<WithIcon />} />
    <Story title="Icon Only" story={<IconOnly />} />
    <Story title="Select Tab On Focus" story={<SelectTabOnFocus />} />
    <Story title="With Overflow" story={<WithOverflow />} />
    <Story title="With Panels" story={<WithPanels />} /> */}
  </div>
);
