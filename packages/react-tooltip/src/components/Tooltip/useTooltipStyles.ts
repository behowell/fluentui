import { makeStyles, ax } from '@fluentui/react-make-styles';
import { Theme } from '@fluentui/react-theme';
import { TooltipState } from './Tooltip.types';

/**
 * The arrow is created by rotating a square by 45deg.
 * Need to multiply the final size [12, 6] by [cos(45deg), sin(45deg)] to get the initial size.
 */
export const arrowHeight = 6 * Math.SQRT1_2;
export const arrowSquareSize = 12 * Math.SQRT1_2;

export const tooltipBorderRadius = (theme: Theme) => theme.global.borderRadius.medium;

const startsWith = (str: string, start: string) => str.substring(0, start.length) === start;

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({
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

  // s => s.subtle
  subtle: theme => ({
    background: theme.alias.color.neutral.neutralBackground1,
    color: theme.alias.color.neutral.neutralForeground1,
  }),

  arrow: theme => ({
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

  arrowTop: { bottom: `-${arrowHeight}px`, ':before': { transform: 'rotate(45deg)' } },
  arrowBottom: { top: `-${arrowHeight}px`, ':before': { transform: 'rotate(225deg)' } },
  arrowLeft: { right: `-${arrowHeight}px`, ':before': { transform: 'rotate(315deg)' } },
  arrowRight: { left: `-${arrowHeight}px`, ':before': { transform: 'rotate(135deg)' } },
});

/**
 * Apply styling to the Tooltip slots based on the state
 * {@docCategory Tooltip}
 */
export const useTooltipStyles = (state: TooltipState): TooltipState => {
  const styles = useStyles();

  state.className = ax(styles.root, state.subtle && styles.subtle, state.className);

  state.arrow.className = ax(
    styles.arrow,
    startsWith(state.placement, 'top') && styles.arrowTop,
    startsWith(state.placement, 'bottom') && styles.arrowBottom,
    startsWith(state.placement, 'left') && styles.arrowLeft,
    startsWith(state.placement, 'right') && styles.arrowRight,
    state.arrow.className,
  );

  return state;
};
