/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import { Avatar } from '@fluentui/react-avatar';

export const ColorColorful = () => (
  <>
    <Avatar color="colorful" name="Katri Athokas" />
    <Avatar color="colorful" name="Elvia Atkins" />
    <Avatar color="colorful" name="Cameron Evans" />
    <Avatar color="colorful" name="Wanda Howard" />
    <Avatar color="colorful" name="Mona Kane" />
    <Avatar color="colorful" name="Allan Munger" />
    <Avatar color="colorful" name="Daisy Phillips" />
    <Avatar color="colorful" name="Robert Tolbert" />
    <Avatar color="colorful" name="Kevin Sturgis" />
    <Avatar color="colorful" name="Elliot Woodward" />
  </>
);

ColorColorful.storyName = 'Color: colorful';
ColorColorful.parameters = {
  docs: {
    description: {
      story:
        'An avatar can have the color be automatically picked based on the `name` prop ' +
        '(or `idForColor` can be used if a name is not available).',
    },
  },
};
