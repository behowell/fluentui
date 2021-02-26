import { makeStyles, ax } from '@fluentui/react-make-styles';
import { TooltipManagerState } from './TooltipManager.types';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles<TooltipManagerState>([
  [
    null,
    theme => ({
      // TODO Add default styles
    }),
  ],
  // TODO Add styles conditioned on TooltipManagerState props, for example:
  // [
  //   s => s.exampleProp === 'exampleValue',
  //   theme => ({
  //
  //   }),
  // ],
]);

// TODO Add styles for any other slots, for example:
// const useExampleSlotStyles = makeStyles<TooltipManagerState>([
//   [
//     null,
//     theme => ({
//
//     }),
//   ],
// ]);

/**
 * Apply styling to the TooltipManager slots based on the state
 * {@docCategory TooltipManager }
 */
export const useTooltipManagerStyles = (state: TooltipManagerState): TooltipManagerState => {
  state.className = ax(useRootStyles(state), state.className);

  // TODO Hook up slot styles, for example:
  // const exampleSlotClassName = useExampleSlotStyles(state);
  // if (state.exampleSlot)
  // {
  //   state.exampleSlot.className = ax(exampleSlotClassName, state.exampleSlot.className);
  // }

  return state;
};
