import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import { RootState } from 'src/store/types';
import Question from './Question';
import OptionList from 'src/components/molecules/OptionsList/OptionsList';
import { addAnswer } from 'src/store/actions';
import pollReducer from 'src/store/reducers';

// Mock the Redux store
const store = createStore(pollReducer);

const mockOptions = [
  { id: 1, imageUrl: 'url1', label: 'Option 1' },
  { id: 2, imageUrl: 'url2', label: 'Option 2' },
  { id: 3, imageUrl: 'url3', label: 'Option 3' }
];

describe('Question Component', () => {
  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Question question="Sample Question" id={1} options={mockOptions} />
      </Provider>
    );
    // Check if question text is rendered
    expect(screen.getByText('Sample Question')).toBeInTheDocument();
  });

  test('passes correct props to OptionList', () => {
    render(
      <Provider store={store}>
        <Question question="Sample Question" id={1} options={mockOptions} />
      </Provider>
    );
    const optionDivs = screen.getAllByTestId('option-div');
    expect(optionDivs.length).toEqual(mockOptions.length);
  });

  test('dispatches addAnswer action when option is selected', () => {
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch; // Mock dispatch

    render(
      <Provider store={store}>
        <Question question="Sample Question" id={1} options={mockOptions} />
      </Provider>
    );

    // Simulate option selection
    const optionDivs = screen.getAllByTestId('option-div');
    fireEvent.click(optionDivs[0]);

    // Verify if dispatch was called with correct arguments
    expect(mockDispatch).toHaveBeenCalledWith(addAnswer(1, 1));
  });
});
