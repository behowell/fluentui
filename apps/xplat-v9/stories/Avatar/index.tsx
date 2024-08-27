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
import { Story } from '../util/Story';

export const AvatarStories = () => (
  <div>
    <h1>Avatar</h1>
    <Story title="Default" story={<Default />} />
    <Story title="Name" story={<Name />} />
    <Story title="Image" story={<Image />} />
    <Story title="Badge" story={<Badge />} />
    <Story title="Square" story={<Square />} />
    <Story title="Color: brand" story={<ColorBrand />} />
    <Story title="Color: colorful" story={<ColorColorful />} />
    <Story title="Color: palette" story={<ColorPalette />} />
    {/* <Story title="Active" story={<Active />} /> */}
    {/* <Story title="Active Appearance" story={<ActiveAppearance />} /> */}
    <Story title="Initials" story={<Initials />} />
    <Story title="Size" story={<Size />} />
  </div>
);
