/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Default } from './DialogDefault.stories';
import { NonModal } from './DialogNonModal.stories';
import { Alert } from './DialogAlert.stories';
import { ScrollingLongContent } from './DialogScrollingLongContent.stories';
import { Actions } from './DialogActions.stories';
import { FluidActions } from './DialogFluidDialogActions.stories';
import { NoFocusableElement } from './DialogNoFocusableElement.stories';
import { ControllingOpenAndClose } from './DialogControllingOpenAndClose.stories';
import { ChangeFocus } from './DialogChangeFocus.stories';
import { TriggerOutsideDialog } from './DialogTriggerOutsideDialog.stories';
import { CustomTrigger } from './DialogCustomTrigger.stories';
import { WithForm } from './DialogWithForm.stories';
import { TitleCustomAction } from './DialogTitleCustomAction.stories';
import { TitleNoAction } from './DialogTitleNoAction.stories';

import { Story } from '../util/Story';

export const DialogStories = () => (
  <div>
    <Story title="Default" story={<Default />} />
    <Story title="Non-modal" story={<NonModal />} />
    <Story title="Alert" story={<Alert />} />
    <Story title="Scrolling Long Content" story={<ScrollingLongContent />} />
    <Story title="Actions" story={<Actions />} />
    <Story title="Fluid Dialog Actions" story={<FluidActions />} />
    <Story title="No Focusable Element" story={<NoFocusableElement />} />
    <Story title="Controlling Open And Close" story={<ControllingOpenAndClose />} />
    <Story title="Change Focus" story={<ChangeFocus />} />
    <Story title="Trigger Outside Dialog" story={<TriggerOutsideDialog />} />
    <Story title="Custom Trigger" story={<CustomTrigger />} />
    <Story title="With Form" story={<WithForm />} />
    <Story title="Title Custom Action" story={<TitleCustomAction />} />
    <Story title="Title No Action" story={<TitleNoAction />} />
  </div>
);
