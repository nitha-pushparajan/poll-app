import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Swiper from './Swiper';

export default {
  title: 'Components/Organisms/Swiper',
  component: Swiper,
  parameters: {
    layout: 'fullscreen' // Adjust based on your preference
  }
} as Meta<typeof Swiper>;

const Template: StoryFn<typeof Swiper> = (args) => (
  <Swiper {...args}>
    <div className="h-[100vh] bg-[lightcoral] text-center pt-[50px]">Slide 1</div>
    <div className="h-[100vh] bg-[lightblue] text-center pt-[50px]">Slide 2</div>
    <div className="h-[100vh] bg-[lightgreen] text-center pt-[50px]">Slide 3</div>
  </Swiper>
);

export const Default = Template.bind({});
Default.args = {};
