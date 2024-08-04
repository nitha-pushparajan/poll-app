import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoaderIcon from './LoaderIcon';

describe('LoaderIcon', () => {
  test('renders without crashing', () => {
    render(<LoaderIcon />);
  });

  test('contains an svg element', () => {
    const { container } = render(<LoaderIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('svg has correct class names', () => {
    const { container } = render(<LoaderIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600');
  });
});
