import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Question from './Question';
import pollReducer from 'src/lib/store/reducers'; // Adjust the import path as needed
import { AppState } from 'src/lib/store/types';

// Create a mock Redux store
const store = createStore(pollReducer);

export default {
  title: 'Components/Molecules/Question',
  component: Question,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  ]
} as Meta;

const Template: StoryFn<any> = (args) => <Question {...args} />;

export const Default = Template.bind({});
Default.args = {
  question: 'What is your favorite color?',
  id: 1,
  options: [
    {
      id: 1,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTeladnREDXJFeEip-hI8JGYCQXBKnNt-ozg&s',
      label: 'Option 1'
    },
    {
      id: 2,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTeladnREDXJFeEip-hI8JGYCQXBKnNt-ozg&s',
      label: 'Option 2'
    },
    {
      id: 3,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTeladnREDXJFeEip-hI8JGYCQXBKnNt-ozg&s',
      label: 'Option 3'
    }
  ]
};
