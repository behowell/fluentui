import { Meta } from '@storybook/react';
import { Carousel } from '@fluentui/react-northstar';
import CarouselExample from '../../examples/components/Carousel/Types/CarouselExample.shorthand';
import CarouselSlideAnimationExample from '../../examples/components/Carousel/Variations/CarouselSlideAnimationExample.shorthand';

export default { component: Carousel, title: 'Carousel' } as Meta<typeof Carousel>;

export { CarouselExample, CarouselSlideAnimationExample };
