import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OptionsList from './OptionsList';
import Option from 'src/components/atoms/Option/Option';

jest.mock('src/components/atoms/Option/Option', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Option</div>)
}));

describe('OptionsList Component', () => {
  const mockHandleOptionSelection = jest.fn();
  const options = [
    { id: 1, imageUrl: 'https://example.com/image1.jpg', label: 'Option 1', isSelected: true },
    { id: 2, imageUrl: 'https://example.com/image2.jpg', label: 'Option 2', isSelected: false },
    { id: 3, imageUrl: 'https://example.com/image3.jpg', label: 'Option 3', isSelected: false }
  ];

  test('renders without crashing', () => {
    render(
      <OptionsList
        options={options}
        handleOptionSelection={mockHandleOptionSelection}
        selected={1}
      />
    );
  });
});
