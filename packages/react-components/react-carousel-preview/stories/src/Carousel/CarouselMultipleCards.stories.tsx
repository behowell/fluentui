import { makeStyles, tokens, Tooltip, typographyStyles } from '@fluentui/react-components';
import {
  Carousel,
  CarouselButton,
  CarouselCard,
  CarouselNav,
  CarouselNavImageButton,
  CarouselSlider,
} from '@fluentui/react-carousel-preview';
import * as React from 'react';

const SWAP_IMAGE = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';
const useClasses = makeStyles({
  card: {
    flex: '0 0 45%',
    margin: '0px 10px',
  },
  test: {
    ...typographyStyles.largeTitle,
    alignContent: 'center',
    borderRadius: tokens.borderRadiusLarge,
    height: '200px',
    textAlign: 'center',
  },
});

const TestComponent: React.FC<{ accentColor: string; children: string }> = props => {
  const { accentColor, children } = props;
  const classes = useClasses();

  return (
    <div className={classes.test} style={{ backgroundColor: accentColor }}>
      {children}
    </div>
  );
};

export const MultipleCards = () => {
  const classes = useClasses();

  return (
    <Carousel>
      <CarouselSlider>
        <CarouselCard className={classes.card}>
          <TestComponent accentColor="#B99095">Card 1</TestComponent>
        </CarouselCard>
        <CarouselCard className={classes.card}>
          <TestComponent accentColor="#FCB5AC">Card 2</TestComponent>
        </CarouselCard>
        <CarouselCard className={classes.card}>
          <TestComponent accentColor="#B5E5CF">Card 3</TestComponent>
        </CarouselCard>
        <CarouselCard className={classes.card}>
          <TestComponent accentColor="#3D5B59">Card 4</TestComponent>
        </CarouselCard>
        <CarouselCard className={classes.card}>
          <TestComponent accentColor="#F9EAC2">Card 5</TestComponent>
        </CarouselCard>
        <CarouselCard className={classes.card}>
          <TestComponent accentColor="#FEE7E6">Card 6</TestComponent>
        </CarouselCard>
        <CarouselCard className={classes.card}>
          <TestComponent accentColor="#FFD898">Card 7</TestComponent>
        </CarouselCard>
      </CarouselSlider>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Tooltip content={'Go To Previous Page'} relationship={'label'}>
          <CarouselButton navType="prev" aria-label={'Previous Carousel Page Button'} />
        </Tooltip>
        <CarouselNav>
          {index => <CarouselNavImageButton image={{ src: SWAP_IMAGE }} aria-label={`Carousel Nav Button ${index}`} />}
        </CarouselNav>
        <Tooltip content={'Go To Next Page'} relationship={'label'}>
          <CarouselButton navType="next" aria-label={'Next Carousel Page Button'} />
        </Tooltip>
      </div>
    </Carousel>
  );
};
