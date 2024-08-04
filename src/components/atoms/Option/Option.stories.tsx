import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Option from './Option';

export default {
  title: 'Components/atoms/Option',
  component: Option,
  argTypes: {
    handleOptionSelection: { action: 'handleOptionSelection' }
  }
} as Meta<typeof Option>;

const Template: StoryFn<typeof Option> = (args) => <Option {...args} />;

export const Default = Template.bind({});
Default.args = {
  imageUrl: 'https://via.placeholder.com/150',
  label: 'Option Label',
  id: 1,
  isSelected: false,
  handleOptionSelection: (id: number) => console.log(`Option selected: ${id}`)
};

export const Selected = Template.bind({});
Selected.args = {
  imageUrl: 'https://via.placeholder.com/150',
  label: 'Selected Option',
  id: 2,
  isSelected: true,
  handleOptionSelection: (id: number) => console.log(`Option selected: ${id}`)
};
