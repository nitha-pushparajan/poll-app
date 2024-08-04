import React, { useEffect } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Provider } from 'react-redux';
import PollCarousel from './PollCarousel';
import { createStore } from 'redux';
import { PollCarouselProps } from './PollCarousel.types';
import pollReducer from 'src/lib/store/reducers';

export default {
  title: 'Components/Organisms/PollCarousel',
  component: PollCarousel,
  parameters: {
    layout: 'fullscreen' // Adjust based on your preference
  }
} as Meta<typeof PollCarousel>;

const store = createStore(pollReducer);

const mockItems: PollCarouselProps['items'] = [
  {
    id: 1,
    question: 'What is your favorite color?',
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
  },
  {
    id: 2,
    question: 'What is your favorite animal?',
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
  }
];

const Template: StoryFn<typeof PollCarousel> = (args) => {
  useEffect(() => {
    store.dispatch({ type: 'ADD_ANSWER', payload: { questionId: 1, answer: 2 } }); // Mock initial state
    store.dispatch({ type: 'ADD_ANSWER', payload: { questionId: 2, answer: 1 } }); // Mock initial state
  }, []);

  return (
    <Provider store={store}>
      <PollCarousel {...args} />
    </Provider>
  );
};

export const Default = Template.bind({});
Default.args = {
  items: mockItems
};
