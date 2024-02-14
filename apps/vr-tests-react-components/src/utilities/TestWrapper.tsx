import * as React from 'react';

import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { Step, Steps, StoryWright } from 'storywright';

export type TestWrapperProps = {
  children?: React.ReactNode;
  steps?: Step[];

  fixedWidth?: boolean;
  fullWidth?: boolean;
  tall?: boolean;

  className?: string;
  style?: React.CSSProperties;
};

const useTestWrapperStyles = makeStyles({
  base: {
    ...shorthands.padding('10px'),
    ...shorthands.overflow('hidden'),
  },

  tall: {
    paddingBottom: '120px',
  },

  fixedWidth: {
    width: '300px',
  },

  fullWidth: {
    width: '100%',
  },
});

export const TestWrapper: React.FunctionComponent<TestWrapperProps> = props => {
  const {
    children,
    className,
    fixedWidth,
    fullWidth,
    steps = new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
    style,
    tall,
  } = props;

  const classes = useTestWrapperStyles();

  return (
    <StoryWright steps={steps}>
      <div style={{ display: 'flex' }}>
        <div
          className={mergeClasses(
            'testWrapper',
            classes.base,
            tall && classes.tall,
            fixedWidth && classes.fixedWidth,
            fullWidth && classes.fullWidth,
            className,
          )}
          style={style}
        >
          {children}
        </div>
      </div>
    </StoryWright>
  );
};
