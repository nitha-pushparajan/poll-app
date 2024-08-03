import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Option from './Option';

const mockHandleOptionSelection = jest.fn();

const defaultProps = {
  imageUrl: 'https://example.com/image.jpg',
  label: 'Test Label',
  id: 1,
  isSelected: false,
  handleOptionSelection: mockHandleOptionSelection
};

describe('Option Component', () => {
  beforeEach(() => {
    mockHandleOptionSelection.mockClear();
  });

  test('renders the SVG when isSelected is true', () => {
    render(<Option {...defaultProps} isSelected={true} />);

    // Verify SVG renders when isSelected is true
    const svg = screen.getByRole('img', { hidden: true });
    expect(svg).toBeInTheDocument();
  });

  test('applies the correct classes based on isSelected prop', () => {
    const { rerender } = render(<Option {...defaultProps} isSelected={false} />);

    // Verify classes when isSelected is false
    const label = screen.getByText(defaultProps.label);
    expect(label).toHaveClass(
      'opacity-0 translate-y-[10px] group-hover:opacity-100 group-hover:translate-y-[0] transition ease-in-out delay-350'
    );

    // Re-render with isSelected as true
    rerender(<Option {...defaultProps} isSelected={true} />);

    // Verify classes when isSelected is true
    expect(label).toHaveClass('flex justify-center items-center');
  });
});
