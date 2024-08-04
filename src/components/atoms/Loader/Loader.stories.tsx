import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Loader from './Loader';

export default {
  title: 'Components/atoms/Loader',
  component: Loader
} as Meta<typeof Loader>;

const Template: StoryFn<typeof Loader> = () => <Loader />;

export const Default = Template.bind({});
Default.args = {};
