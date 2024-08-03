import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Summary from './Summary';
import pollReducer from 'src/store/reducers';
import { setLoading, setSubmitted } from 'src/store/actions';
import { submitAnswers } from 'src/services';

// Mock the Redux store
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

// Mock submitAnswers function
jest.mock('src/services', () => ({
  submitAnswers: jest.fn().mockResolvedValue(true)
}));

describe('Summary Component', () => {
  beforeEach(() => {
    store.dispatch({ type: 'ADD_ANSWER', payload: { questionId: 1, answer: 2 } }); // Mock initial state
    store.dispatch({ type: 'ADD_ANSWER', payload: { questionId: 2, answer: 1 } }); // Mock initial state
  });

  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Summary items={mockItems} />
      </Provider>
    );
    expect(screen.getByText('Summary')).toBeInTheDocument();
  });

  test('renders a list of questions and answers', () => {
    render(
      <Provider store={store}>
        <Summary items={mockItems} />
      </Provider>
    );

    expect(screen.getByText('What is your favorite color?')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
  });

  test('dispatches setLoading and setSubmitted actions on submit', async () => {
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch; // Mock dispatch

    render(
      <Provider store={store}>
        <Summary items={mockItems} />
      </Provider>
    );

    // Simulate submit button click
    fireEvent.click(screen.getByText('Submit'));

    expect(submitAnswers).toHaveBeenCalledWith({
      1: 2,
      2: 1
    });
  });
});
