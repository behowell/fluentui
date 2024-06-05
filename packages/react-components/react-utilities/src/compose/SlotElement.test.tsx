import * as React from 'react';

import { SlotElement } from './types';

type TestProps = {
  div?: SlotElement<'div'>;
  button?: SlotElement<'button'>;
  img?: SlotElement<'img'>;
};

const Test: React.VoidFunctionComponent<TestProps> = props => {
  return null;
};

export const divTests = (
  <>
    <Test div="test" />
    <Test div={{ children: 'test' }} />
    <Test div={{ className: 'test' }} />
    {/* @ts-expect-error - div doesn't support src prop */}
    <Test div={{ src: 'bar' }} />
    <Test div={<span>hello</span>} />
    <Test div={{ children: (Component, props) => <Component {...props} /> }} />
    {/* @ts-expect-error - can't use shorthand for render function */}
    <Test div={(Component, props) => <Component {...props} />} /> {/* eslint-disable-line react/jsx-no-bind */}
  </>
);

export const buttonTests = (
  <>
    <Test button="test" />
    <Test button={{ children: 'test' }} />
    <Test button={{ className: 'test' }} />
    {/* @ts-expect-error - button doesn't support src prop */}
    <Test button={{ src: 'bar' }} />
    <Test button={<span>hello</span>} />
    <Test button={{ children: (Component, props) => <Component {...props} /> }} />
    {/* @ts-expect-error - can't use shorthand for render function*/}
    <Test button={(Component, props) => <Component {...props} />} />
  </>
);

export const imgTests = (
  <>
    {/* @ts-expect-error - img doesn't support children or shorthand */}
    <Test img="test" />
    {/* @ts-expect-error - img doesn't support children or shorthand */}
    <Test img={{ children: 'test' }} />
    <Test img={{ className: 'test' }} />
    <Test img={{ src: 'bar' }} />
    {/* @ts-expect-error - img doesn't support children or shorthand */}
    <Test img={<span>hello</span>} />
    <Test img={{ children: (Component, props) => <Component {...props} /> }} />
    {/* @ts-expect-error - can't use shorthand for render function */}
    <Test img={(Component, props) => <Component {...props} />} />
  </>
);
