import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Loader from 'src/components/atoms/Loader/Loader';

describe('Loader Component', () => {
  test('renders without crashing', () => {
    render(<Loader />);
  });

  test('contains a div with the correct role', () => {
    render(<Loader />);
    const statusDiv = screen.getByRole('status');
    expect(statusDiv).toBeInTheDocument();
  });

  test('LoaderIcon is rendered with the correct class', () => {
    render(<Loader />);
    const loaderIcon = screen.getByRole('status').querySelector('svg');
    expect(loaderIcon).toHaveClass('w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600');
  });
});