import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FullscreenableSlider as FsSlider } from '..';
import { getClassNameProps } from '../styles/css';
import { generateImgElements } from './assets/unsplash';
import './css/responsive.css';


export default {
  title: 'Examples/Responsive',
  component: FsSlider
} as ComponentMeta<typeof FsSlider>;

const StandardTemplate: ComponentStory<typeof FsSlider> = (props) => {
  return (
    <div style={{ width: '100%', maxWidth: '1110px', margin: '0 auto' }}>
      <FsSlider {...props}>
        {generateImgElements()}
      </FsSlider>
    </div>
  );
};

export const Default = StandardTemplate.bind({});
Default.args = {
  ...getClassNameProps(),
  onIndexChange: undefined
};