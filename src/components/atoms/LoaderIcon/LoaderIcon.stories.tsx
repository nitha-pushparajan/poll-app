import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import LoaderIcon from './LoaderIcon';

export default {
  title: 'Components/atoms/LoaderIcon',
  component: LoaderIcon,
  argTypes: {
    // Add any arguments you want to control, if applicable
  }
} as Meta<typeof LoaderIcon>;

const Template: StoryFn<typeof LoaderIcon> = () => <LoaderIcon />;

export const Default = Template.bind({});
Default.args = {};
