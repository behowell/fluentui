import { makeStyles, ax } from '@fluentui/react-make-styles';
import { TooltipProviderState } from './TooltipProvider.types';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles<TooltipProviderState>([
  [
    null,
    theme => ({
      // TODO Add default styles
    }),
  ],
]);

/**
 * Apply styling to the TooltipProvider slots based on the state
 * {@docCategory TooltipProvider }
 */
export const useTooltipProviderStyles = (state: TooltipProviderState): TooltipProviderState => {
  state.className = ax(useRootStyles(state), state.className);
  return state;
};
