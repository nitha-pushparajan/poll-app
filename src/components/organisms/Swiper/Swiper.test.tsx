import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Swiper from './Swiper';

// Utility function to simulate swipe
const simulateSwipe = (element: HTMLElement, startY: number, endY: number) => {
  fireEvent.touchStart(element, { touches: [{ clientY: startY }] });
  fireEvent.touchMove(element, { touches: [{ clientY: endY }] });
  fireEvent.touchEnd(element);
};

// Mock children for testing
const mockChildren = [
  <div key="1">Slide 1</div>,
  <div key="2">Slide 2</div>,
  <div key="3">Slide 3</div>
];

describe('Swiper Component', () => {
  test('renders correctly with children', () => {
    render(<Swiper>{mockChildren}</Swiper>);
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });
});
