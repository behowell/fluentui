import { makeStyles, ax } from '@fluentui/react-make-styles';
import { Theme } from '@fluentui/react-theme';
import { TooltipState } from './Tooltip.types';

/**
 * The arrow is created by rotating a square by 45deg.
 * Need to multiply the final size [12, 6] by [cos(45deg), sin(45deg)] to get the initial size.
 */
export const arrowHeight = 6 * Math.SQRT1_2;
export const arrowSquareSize = 12 * Math.SQRT1_2;

/**
 * Gap between the tooltip and the target element
 */
export const tooltipOffset = 4; // REVIEW should this come from the theme?

export const tooltipBorderRadius = (theme: Theme) => theme.global.borderRadius.medium;

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles<TooltipState>([
  [
    null,
    theme => ({
      display: 'inline-block',
      padding: '5px 12px 7px 12px',
      pointerEvents: 'none',
      maxWidth: '240px',
      fontFamily: theme.global.type.fontFamilies.base,
      fontSize: theme.global.type.fontSizes.base[200],
      lineHeight: theme.global.type.lineHeights.base[200],
      borderRadius: tooltipBorderRadius(theme),

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
      width: `${arrowSquareSize}px`,
      height: `${arrowSquareSize}px`,
      background: 'inherit',
      visibility: 'hidden',

      ':before': {
        content: '""',
        position: 'absolute',
        width: 'inherit',
        height: 'inherit',
        background: 'inherit',
        visibility: 'visible',
        borderBottomRightRadius: theme.global.borderRadius.small,
      },
    }),
  ],
  [s => startsWith(s.placement, 'top'), { bottom: `-${arrowHeight}px`, ':before': { transform: 'rotate(45deg)' } }],
  [s => startsWith(s.placement, 'bottom'), { top: `-${arrowHeight}px`, ':before': { transform: 'rotate(225deg)' } }],
  [s => startsWith(s.placement, 'left'), { right: `-${arrowHeight}px`, ':before': { transform: 'rotate(315deg)' } }],
  [s => startsWith(s.placement, 'right'), { left: `-${arrowHeight}px`, ':before': { transform: 'rotate(135deg)' } }],
]);

/**
 * Apply styling to the Tooltip slots based on the state
 * {@docCategory Tooltip}
 */
export const useTooltipStyles = (state: TooltipState): TooltipState => {
  state.className = ax(useRootStyles(state), state.className);

  const arrowClassName = useArrowStyles(state);
  if (state.arrow) {
    state.arrow.className = ax(arrowClassName, state.arrow.className);
  }

  return state;
};
