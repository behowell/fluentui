import { makeStyles, ax } from '@fluentui/react-make-styles';
import { TooltipState } from './Tooltip.types';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles<TooltipState>([
  [
    null,
    theme => ({
      // TODO Add default styles
    }),
  ],
  // TODO Add styles conditioned on TooltipState props, for example:
  // [
  //   s => s.exampleProp === 'exampleValue',
  //   theme => ({
  //
  //   }),
  // ],
]);

// TODO Add styles for any other slots, for example:
// const useExampleSlotStyles = makeStyles<TooltipState>([
//   [
//     null,
//     theme => ({
//
//     }),
//   ],
// ]);

/**
 * Apply styling to the Tooltip slots based on the state
 * {@docCategory Tooltip }
 */
export const useTooltipStyles = (state: TooltipState): TooltipState => {
  state.className = ax(useRootStyles(state), state.className);

  // TODO Hook up slot styles, for example:
  // const exampleSlotClassName = useExampleSlotStyles(state);
  // if (state.exampleSlot)
  // {
  //   state.exampleSlot.className = ax(exampleSlotClassName, state.exampleSlot.className);
  // }

  return state;
};
