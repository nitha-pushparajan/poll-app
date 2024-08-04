import React, { useEffect } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Summary from './Summary';
import pollReducer from 'src/lib/store/reducers';

// Create a mock store for Storybook
const store = createStore(pollReducer);

const mockItems = [
  {
    id: 1,
    question: 'What is your favorite color?',
    options: [
      { id: 1, imageUrl: 'url1', label: 'Red' },
      { id: 2, imageUrl: 'url2', label: 'Blue' },
      { id: 3, imageUrl: 'url3', label: 'Green' }
    ]
  },
  {
    id: 2,
    question: 'What is your favorite animal?',
    options: [
      { id: 1, imageUrl: 'url1', label: 'Cat' },
      { id: 2, imageUrl: 'url2', label: 'Dove' },
      { id: 3, imageUrl: 'url3', label: 'None' }
    ]
  }
];

export default {
  title: 'Components/Molecules/Summary',
  component: Summary,
  parameters: {
    // Add any Storybook parameters here
  }
} as Meta<typeof Summary>;

const Template: StoryFn<typeof Summary> = (args) => {
  useEffect(() => {
    store.dispatch({ type: 'ADD_ANSWER', payload: { questionId: 1, answer: 2 } }); // Mock initial state
    store.dispatch({ type: 'ADD_ANSWER', payload: { questionId: 2, answer: 1 } }); // Mock initial state
  }, []);

  return (
    <Provider store={store}>
      <div className="active-slide">
        <Summary {...args} />
      </div>
    </Provider>
  );
};

export const Default = Template.bind({});
Default.args = {
  items: mockItems
};
