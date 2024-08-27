/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Default } from './ProgressBarDefault.stories';
import { Color } from './ProgressBarColor.stories';
import { Indeterminate } from './ProgressBarIndeterminate.stories';
import { Max } from './ProgressBarMax.stories';
import { Shape } from './ProgressBarShape.stories';
import { Thickness } from './ProgressBarThickness.stories';

import { Story } from '../util/Story';

export const ProgressBarStories = () => (
  <div>
    <Story title="Default" story={<Default />} />
    <Story title="Color" story={<Color />} />
    <Story title="Indeterminate" story={<Indeterminate />} />
    <Story title="Max" story={<Max />} />
    <Story title="Shape" story={<Shape />} />
    <Story title="Thickness" story={<Thickness />} />
  </div>
);
