/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { Default } from './AvatarDefault.stories';
import { Name } from './AvatarName.stories';
import { Image } from './AvatarImage.stories';
import { Badge } from './AvatarBadge.stories';
import { Square } from './AvatarSquare.stories';
import { ColorBrand } from './AvatarColorBrand.stories';
import { ColorColorful } from './AvatarColorColorful.stories';
import { ColorPalette } from './AvatarColorPalette.stories';
import { Active } from './AvatarActive.stories';
import { ActiveAppearance } from './AvatarActiveAppearance.stories';
import { Initials } from './AvatarInitials.stories';
import { Size } from './AvatarSize.stories';

const Story: React.FC<{ title: string; comp: React.ReactNode }> = ({ title, comp }) => {
  return (
    <div>
      <b>{title}</b>
      <div style={{ display: 'flex', gap: '20px' }}>{comp}</div>
    </div>
  );
};

export const AvatarStories = () => (
  <div>
    <h1>Avatar</h1>
    <Story title="Default" comp={<Default />} />
    <Story title="Name" comp={<Name />} />
    <Story title="Image" comp={<Image />} />
    {/* <Story title="Badge" comp={<Badge />} /> */}
    <Story title="Square" comp={<Square />} />
    <Story title="Color: brand" comp={<ColorBrand />} />
    <Story title="Color: colorful" comp={<ColorColorful />} />
    <Story title="Color: palette" comp={<ColorPalette />} />
    {/* <Story title="Active" comp={<Active />} /> */}
    {/* <Story title="Active Appearance" comp={<ActiveAppearance />} /> */}
    <Story title="Initials" comp={<Initials />} />
    <Story title="Size" comp={<Size />} />
  </div>
);
