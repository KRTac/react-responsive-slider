import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Slider, setModalAppElement } from '..';
import { getClassNameProps } from '../styles/css';
import { generateImgElements } from './assets/unsplash';
import './css/responsive.css';


export default {
  title: 'Examples/Responsive',
  component: Slider
} as ComponentMeta<typeof Slider>;

let imgChildren = generateImgElements();
setModalAppElement('#root');

const StandardTemplate: ComponentStory<typeof Slider> = (props) => {
  return (
    <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto' }}>
      <Slider {...props}>
        {imgChildren}
      </Slider>
    </div>
  );
};

export const Default = StandardTemplate.bind({});
Default.args = {
  ...getClassNameProps(),
  onIndexChange: undefined
};