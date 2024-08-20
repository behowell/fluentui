/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { Default } from './PersonaDefault.stories';
import { TextAlignment } from './PersonaTextAlignment.stories';
import { TextPosition } from './PersonaTextPosition.stories';
import { PresencePreviousBehavior } from './PersonaPresencePreviousBehavior.stories';
import { PresenceSize } from './PersonaPresenceSize.stories';
import { AvatarSize } from './PersonaAvatarSize.stories';

import { Story } from '../util/Story';

export const PersonaStories = () => (
  <div>
    <Story title="Default" story={<Default />} />
    {/* <Story title="Text Alignment" story={<TextAlignment />} />
    <Story title="Text Position" story={<TextPosition />} />
    <Story title="Presence Previous Behavior" story={<PresencePreviousBehavior />} />
    <Story title="Presence Size" story={<PresenceSize />} />
    <Story title="Avatar Size" story={<AvatarSize />} /> */}
  </div>
);
