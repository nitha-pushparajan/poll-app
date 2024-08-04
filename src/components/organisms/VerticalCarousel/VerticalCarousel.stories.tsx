import React, { useEffect } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Provider } from 'react-redux';
import VerticalCarousel from './VerticalCarousel';
import { createStore } from 'redux';
import { VerticalCarouselProps } from './VerticalCarousel.types';
import pollReducer from 'src/lib/store/reducers';

export default {
  title: 'Components/Organisms/VerticalCarousel',
  component: VerticalCarousel,
  parameters: {
    layout: 'fullscreen' // Adjust based on your preference
  }
} as Meta<typeof VerticalCarousel>;

const store = createStore(pollReducer);

const mockItems: VerticalCarouselProps['items'] = [
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

const Template: StoryFn<typeof VerticalCarousel> = (args) => {
  useEffect(() => {
    store.dispatch({ type: 'ADD_ANSWER', payload: { questionId: 1, answer: 2 } }); // Mock initial state
    store.dispatch({ type: 'ADD_ANSWER', payload: { questionId: 2, answer: 1 } }); // Mock initial state
  }, []);

  return (
    <Provider store={store}>
      <VerticalCarousel {...args} />
    </Provider>
  );
};

export const Default = Template.bind({});
Default.args = {
  items: mockItems
};
