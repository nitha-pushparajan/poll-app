import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Swiper from './Swiper';

jest.mock('./hooks', () => ({
  useStateRef: (initialValue: any) => [initialValue, jest.fn(), { current: initialValue }],
  getRefValue: (ref: any) => ref.current
}));

jest.mock('./dom', () => ({
  getTouchEventData: (e: any) => ({ clientY: e.touches ? e.touches[0].clientY : e.clientY })
}));

describe('Swiper Component', () => {
  const items = [
    <div key="1">Slide 1</div>,
    <div key="2">Slide 2</div>,
    <div key="3">Slide 3</div>
  ];

  it('should render the Swiper with slides and indicators', () => {
    render(<Swiper>{items}</Swiper>);

    expect(screen.getByTestId('swiper-container')).toBeInTheDocument();
    items.forEach((_, idx) => {
      expect(screen.getByText(`Slide ${idx + 1}`)).toBeInTheDocument();
    });

    const indicators = screen.getAllByTestId('indicator');
    expect(indicators).toHaveLength(items.length);
  });

  it('should handle swipe up and down', () => {
    render(<Swiper>{items}</Swiper>);

    const swiperContainer = screen.getByTestId('swiper-container');

    // Simulate swipe down
    fireEvent.touchStart(swiperContainer, { touches: [{ clientY: 100 }] });
    fireEvent.touchMove(swiperContainer, { touches: [{ clientY: 50 }] });
    fireEvent.touchEnd(swiperContainer);

    // Assert that the swiper is still on Slide 1
    expect(screen.getByText('Slide 1')).toBeInTheDocument();

    // Simulate swipe up
    fireEvent.touchStart(swiperContainer, { touches: [{ clientY: 50 }] });
    fireEvent.touchMove(swiperContainer, { touches: [{ clientY: 100 }] });
    fireEvent.touchEnd(swiperContainer);

    // Assert that the swiper has moved to Slide 2
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
  });

  it('should change slide on indicator click', () => {
    render(<Swiper>{items}</Swiper>);

    const indicators = screen.getAllByTestId('indicator');

    // Click the second indicator (index 1)
    fireEvent.click(indicators[1]);

    // Assert that the swiper has moved to Slide 2
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
  });
});
