import { makeStyles, ax } from '@fluentui/react-make-styles';
import { TooltipState } from './Tooltip.types';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles<TooltipState>([
  [
    null,
    theme => ({
      position: 'absolute',
      margin: '6px',
      padding: '5px 12px 7px 12px',
      maxWidth: '240px',
      fontFamily: theme.global.type.fontFamilies.base,
      fontSize: theme.global.type.fontSizes.base[200],
      lineHeight: theme.global.type.lineHeights.base[200],
      borderRadius: theme.global.borderRadius.medium,

      background: theme.alias.color.neutral.neutralForeground2, // TODO should be neutralBackgroundInverted
      color: theme.alias.color.neutral.neutralForegroundInverted,

      filter: theme.alias.shadow.shadowFilter8,
    }),
  ],

  [
    s => s.subtle,
    theme => ({
      background: theme.alias.color.neutral.neutralBackground1,
      color: theme.alias.color.neutral.neutralForeground1,
    }),
  ],
]);

const startsWith = (str: string, start: string) => str.substring(0, start.length) === start;

const useArrowStyles = makeStyles<TooltipState>([
  [
    null,
    theme => ({
      position: 'absolute',
      width: '8.485px',
      height: '8.485px',
      background: 'inherit',
      visibility: 'hidden',

      ':before': {
        content: '""',
        position: 'absolute',
        width: '8.485px',
        height: '8.485px',
        background: 'inherit',
        visibility: 'visible',
        borderBottomRightRadius: theme.global.borderRadius.small,
      },
    }),
  ],

  [s => startsWith(s.placement, 'top'), { bottom: '-4.243px', ':before': { transform: 'rotate(45deg)' } }],
  [s => startsWith(s.placement, 'bottom'), { top: '-4.243px', ':before': { transform: 'rotate(225deg)' } }],
  [s => startsWith(s.placement, 'left'), { right: '-4.243px', ':before': { transform: 'rotate(315deg)' } }],
  [s => startsWith(s.placement, 'right'), { left: '-4.243px', ':before': { transform: 'rotate(135deg)' } }],
]);

/**
 * Apply styling to the Tooltip slots based on the state
 * {@docCategory Tooltip }
 */
export const useTooltipStyles = (state: TooltipState): TooltipState => {
  state.className = ax(useRootStyles(state), state.className);

  const arrowClassName = useArrowStyles(state);
  if (state.arrow) {
    state.arrow.className = ax(arrowClassName, state.arrow.className);
  }

  return state;
};
