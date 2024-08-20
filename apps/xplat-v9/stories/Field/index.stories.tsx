/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Default } from './FieldDefault.stories';
import { Horizontal } from './FieldHorizontal.stories';
import { Required } from './FieldRequired.stories';
import { Disabled } from './FieldDisabled.stories';
import { Size } from './FieldSize.stories';
import { ValidationMessage } from './FieldValidationMessage.stories';
import { Hint } from './FieldHint.stories';
import { RenderFunction } from './FieldRenderFunction.stories';

import { Story } from '../util/Story';

export const FieldStories = () => (
  <div>
    <Story title="Default" story={<Default />} />
    <Story title="Horizontal" story={<Horizontal />} />
    <Story title="Required" story={<Required />} />
    <Story title="Disabled" story={<Disabled />} />
    <Story title="Size" story={<Size />} />
    <Story title="Validation Message" story={<ValidationMessage />} />
    <Story title="Hint" story={<Hint />} />
    <Story title="Render Function" story={<RenderFunction />} />
  </div>
);
