import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import OptionsList from './OptionsList';
import { OptionsListProps } from './OptionsList.types';

export default {
  title: 'Components/Molecules/OptionsList',
  component: OptionsList
} as Meta<typeof OptionsList>;

const Template: StoryFn<typeof OptionsList> = (args) => <OptionsList {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: [
    { id: 1, label: 'Option 1', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, label: 'Option 2', imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, label: 'Option 3', imageUrl: 'https://via.placeholder.com/150' }
  ],
  selected: 1,
  handleOptionSelection: (id: number) => console.log(`Selected option: ${id}`)
};
