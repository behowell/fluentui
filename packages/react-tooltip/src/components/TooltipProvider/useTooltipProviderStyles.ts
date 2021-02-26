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
  // TODO Add styles conditioned on TooltipProviderState props, for example:
  // [
  //   s => s.exampleProp === 'exampleValue',
  //   theme => ({
  //
  //   }),
  // ],
]);

// TODO Add styles for any other slots, for example:
// const useExampleSlotStyles = makeStyles<TooltipProviderState>([
//   [
//     null,
//     theme => ({
//
//     }),
//   ],
// ]);

/**
 * Apply styling to the TooltipProvider slots based on the state
 * {@docCategory TooltipProvider }
 */
export const useTooltipProviderStyles = (state: TooltipProviderState): TooltipProviderState => {
  state.className = ax(useRootStyles(state), state.className);

  // TODO Hook up slot styles, for example:
  // const exampleSlotClassName = useExampleSlotStyles(state);
  // if (state.exampleSlot)
  // {
  //   state.exampleSlot.className = ax(exampleSlotClassName, state.exampleSlot.className);
  // }

  return state;
};
