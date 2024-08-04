import { fireEvent, render, screen } from '@testing-library/react';
import { setReadOnlyProperty } from 'src/components/lib/test-helpers';
import Swiper from './Swiper';

describe('<Swiper />', () => {
  const renderComponent = () =>
    render(
      <Swiper>
        <div key="1">Slide 1</div>,<div key="2">Slide 2</div>,<div key="3">Slide 3</div>
      </Swiper>
    );

  it('should display the slides', () => {
    renderComponent();
    const slideEl = screen.getByText('Slide 1') as HTMLImageElement;

    expect(slideEl).toBeInTheDocument();
  });

  it('should swipe items on mouse move', () => {
    renderComponent();

    const containerHeight = 500;
    const containerScrollHeight = 500 * 3;

    const containerEl = screen.queryAllByTestId('swiper-container')[0];
    const listEl = screen.queryAllByTestId('swiper-list')[0];

    // override list element's read-only properties
    setReadOnlyProperty(containerEl, 'offsetHeight', containerHeight);
    setReadOnlyProperty(listEl, 'scrollHeight', containerScrollHeight);

    // verify start position is 0
    expect(listEl).toHaveStyle({
      transform: 'translate3d(0, 0px, 0)'
    });

    // verify should move to the top
    let startY = 0;

    let endY = -55;

    fireEvent.mouseDown(listEl, { clientY: startY });
    fireEvent.mouseMove(listEl, { clientY: endY });
    fireEvent.mouseUp(listEl);

    expect(listEl).toHaveStyle({
      transform: `translate3d(0, ${-containerHeight}px, 0)`
    });

    // verify should move to the bottom
    startY = 0;
    endY = 41;

    fireEvent.mouseDown(listEl, { clientY: startY });
    fireEvent.mouseMove(listEl, { clientY: endY });
    fireEvent.mouseUp(listEl);

    expect(listEl).toHaveStyle({
      transform: `translate3d(0, 0px, 0)`
    });

    // verify should stay in position if less than minimum move
    startY = 0;
    endY = 30;

    fireEvent.mouseDown(listEl, { clientY: startY });
    fireEvent.mouseMove(listEl, { clientY: endY });
    fireEvent.mouseUp(listEl);

    expect(listEl).toHaveStyle({
      transform: `translate3d(0, 0px, 0)`
    });

    // // verify shouldn't move further bottom if already at the start
    startY = 0;
    endY = 1;

    fireEvent.mouseDown(listEl, { clientY: startY });
    fireEvent.mouseMove(listEl, { clientY: endY });
    fireEvent.mouseUp(listEl);

    expect(listEl).toHaveStyle({
      transform: `translate3d(0, 0px, 0)`
    });
  });

  it('should swipe items on touch move', () => {
    renderComponent();

    const containerHeight = 500;
    const containerScrollHeight = 500 * 3;

    const containerEl = screen.queryAllByTestId('swiper-container')[0];
    const listEl = screen.queryAllByTestId('swiper-list')[0];

    // override list element's read-only properties
    setReadOnlyProperty(containerEl, 'offsetHeight', containerHeight);
    setReadOnlyProperty(listEl, 'scrollHeight', containerScrollHeight);

    // verify start position is 0
    expect(listEl).toHaveStyle({
      transform: 'translate3d(0, 0px, 0)'
    });

    // verify should move to the top
    let startY = 0;
    let endY = -41;

    fireEvent.touchStart(listEl, { changedTouches: [{ clientY: startY }] });
    fireEvent.touchMove(listEl, { changedTouches: [{ clientY: endY }] });
    fireEvent.touchEnd(listEl);

    expect(listEl).toHaveStyle({
      transform: `translate3d(0, ${-containerHeight}px, 0)`
    });
  });
});
