import * as React from 'react';
import { Tooltip, TooltipManager, TooltipProvider, useTooltipProp, WithTooltipProp } from '@fluentui/react-tooltip';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { AvatarProps, renderAvatar, useAvatar, useAvatarStyles } from '@fluentui/react-avatar';

type AvatarWithTooltipProps = AvatarProps & WithTooltipProp;

const AvatarWithTooltip = React.forwardRef((props: AvatarWithTooltipProps, ref: React.Ref<HTMLElement>) => {
  const state = useAvatar(props, ref, {
    tabIndex: 0,
  });

  useTooltipProp(state);
  useAvatarStyles(state);

  return renderAvatar(state);
});

export const TooltipExample = () => (
  <div style={{ padding: '100px' }}>
    <ThemeProvider theme={webLightTheme}>
      <TooltipProvider>
        <AvatarWithTooltip style={{ margin: '10px' }} tooltip={{ children: 'Hello world', placement: 'left-end' }} />
        <AvatarWithTooltip
          style={{ margin: '10px' }}
          tooltip={{ children: 'Hello world', placement: 'top-end', subtle: true }}
        />
        <AvatarWithTooltip style={{ margin: '10px' }} tooltip={{ children: 'Hello world', placement: 'right-start' }} />
        <AvatarWithTooltip
          style={{ margin: '10px' }}
          tooltip={{ children: 'Hello world', placement: 'bottom-start' }}
        />
        <TooltipManager />
      </TooltipProvider>
    </ThemeProvider>
  </div>
);
