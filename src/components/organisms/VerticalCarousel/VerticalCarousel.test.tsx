import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import VerticalCarousel from './VerticalCarousel';
import pollReducer from 'src/store/reducers'; // Adjust the import based on your file structure
import { VerticalCarouselProps } from './VerticalCarousel.types';

// Mock Swiper component
jest.mock('src/components/molecules/Question/Question', () => (props: any) => (
  <div data-testid="question" {...props} />
));
jest.mock('src/components/molecules/Summary/Summary', () => (props: any) => (
  <div data-testid="summary" {...props} />
));
jest.mock('src/components/organisms/Swiper/Swiper', () => (props: any) => (
  <div data-testid="swiper">{props.children}</div>
));

const store = createStore(pollReducer);

const mockItems = [
  {
    id: 1,
    question: 'What is your favorite color?',
    options: [
      { id: 1, label: 'Red', imageUrl: 'url1' },
      { id: 2, label: 'Blue', imageUrl: 'url1' },
      { id: 3, label: 'Green', imageUrl: 'url1' }
    ]
  },
  {
    id: 2,
    question: 'What is your favorite animal?',
    options: [
      { id: 1, label: 'Cat', imageUrl: 'url1' },
      { id: 2, label: 'Dog', imageUrl: 'url1' },
      { id: 3, label: 'Bird', imageUrl: 'url1' }
    ]
  }
];

describe('VerticalCarousel Component', () => {
  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <VerticalCarousel items={mockItems} />
      </Provider>
    );
  });

  it('should render Question components with the correct props', () => {
    render(<VerticalCarousel items={mockItems} />);

    const questions = screen.getAllByTestId('question');
    expect(questions).toHaveLength(mockItems.length);
  });

  it('should render Summary component with the correct props', () => {
    render(<VerticalCarousel items={mockItems} />);

    const summary = screen.getByTestId('summary');
    expect(summary).toBeInTheDocument();
  });
});
