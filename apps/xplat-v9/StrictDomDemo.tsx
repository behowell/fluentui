import * as React from 'react';

import { Label } from '@fluentui/react-label';
import { mergeClasses, makeStyles, shorthands } from '@fluentui/react-platform-adapter-preview';
import { FluentProvider } from '@fluentui/react-provider';
import { tokens, webLightTheme } from '@fluentui/react-theme';
import { InputStories } from './stories/Input/index.stories';
import { PersonaStories } from './stories/Persona/index.stories';
import { AvatarStories } from './stories/Avatar/index';
import { CheckboxStories } from './stories/Checkbox/index';

const useClassNames = makeStyles({
  root: {
    ...shorthands.border('2px', 'solid', 'red'),
    backgroundColor: tokens.colorNeutralBackground2,
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const StrictDomDemo = () => {
  const classNames = useClassNames();

  return (
    <FluentProvider theme={webLightTheme} className={mergeClasses(classNames.root)}>
      <PersonaStories />
      {/* <InputStories /> */}
      {/* <AvatarStories /> */}
      {/* <CheckboxStories /> */}
    </FluentProvider>
  );
};
