/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import type { ButtonProps } from '@fluentui/react-button';
import { Button } from '@fluentui/react-button';
import { Input } from '@fluentui/react-input';
import { Label } from '@fluentui/react-label';
import {
  makeStyles,
  PlaceholderIcon as MicRegular,
  PlaceholderIcon as PersonRegular,
  shorthands,
} from '@fluentui/react-platform-adapter-preview';
import { useId } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('20px'),
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: '600px',
    // Stack the label above the field (with 2px gap per the design system)
    '> div': { display: 'flex', flexDirection: 'column', ...shorthands.gap('2px') },
  },
});

const MicButton: React.FC<ButtonProps> = props => {
  return <Button {...props} appearance="transparent" icon={<MicRegular />} size="small" />;
};

export const ContentBeforeAfter = () => {
  const styles = useStyles();

  const beforeId = useId('content-before');
  const afterId = useId('content-after');
  const beforeAndAfterId = useId('content-before-and-after');
  const beforeLabelId = useId('before-label');
  const afterLabelId = useId('after-label');

  return (
    <div className={styles.root}>
      <div>
        <Label htmlFor={beforeAndAfterId}>Amount to pay</Label>
        <Input
          contentBefore="$"
          contentAfter=".00"
          aria-labelledby={`${beforeAndAfterId} ${beforeLabelId} ${afterLabelId}`}
          id={beforeAndAfterId}
        />
      </div>
    </div>
  );
};

ContentBeforeAfter.parameters = {
  docs: {
    description: {
      story:
        'An input can have elements such as an icon or a button before or after the entered text. ' +
        'These elements are displayed inside the input border.',
    },
  },
};
ContentBeforeAfter.storyName = 'Content before/after';
