import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Option from './Option';

describe('Option Component', () => {
  const mockHandleOptionSelection = jest.fn();

  const defaultProps = {
    imageUrl: 'https://example.com/image.jpg',
    label: 'Sample Label',
    id: 1,
    isSelected: false,
    handleOptionSelection: mockHandleOptionSelection
  };

  test('renders without crashing', () => {
    render(<Option {...defaultProps} />);
  });

  test('renders the image with the correct src and alt', () => {
    render(<Option {...defaultProps} />);
    const img = screen.getByAltText('Sample Label');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  test('renders the label text', () => {
    render(<Option {...defaultProps} />);
    const label = screen.getByText('Sample Label');
    expect(label).toBeInTheDocument();
  });

  test('shows the selected indicator when isSelected is true', () => {
    render(<Option {...defaultProps} isSelected={true} />);
    const svg = screen.getByTestId('option-selection');
    expect(svg).toBeInTheDocument();
  });

  test('calls handleOptionSelection when clicked', () => {
    render(<Option {...defaultProps} />);
    const optionDiv = screen.getByTestId('option-div');
    fireEvent.click(optionDiv);
    expect(mockHandleOptionSelection).toHaveBeenCalledWith(1);
  });
});
