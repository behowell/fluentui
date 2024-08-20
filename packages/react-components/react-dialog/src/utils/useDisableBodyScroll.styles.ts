import { makeResetStyles } from '@fluentui/react-platform-adapter-preview';

// this style must be applied to the html element to disable scrolling
export const useHTMLNoScrollStyles = makeResetStyles({
  overflowY: ['hidden', 'clip'],
  scrollbarGutter: 'stable',
});

export const useBodyNoScrollStyles = makeResetStyles({
  overflowY: 'hidden',
});
