import React, { ReactNode, useState, useRef, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { getRefValue, useStateRef } from 'src/lib/hooks';
import { getTouchEventData } from 'src/lib/dom';
import './Swiper.css';

export interface SwiperProps {
  children: ReactNode;
}

const MIN_SWIPE_REQUIRED = 40;

function Swiper({ children }: SwiperProps) {
  // For swiper container element
  const containerRef = useRef<HTMLUListElement>(null);
  // For swiper element
  const swiperRef = useRef<HTMLDivElement>(null);
  // For container height
  const containerHeightRef = useRef(0);
  // Min offset Y beyond that it will stick to the last slide
  const minOffsetYRef = useRef(0);
  // offsetY position befor touch start
  const currentOffsetYRef = useRef(0);
  // Touch start point
  const startYRef = useRef(0);
  // Current offsetY position
  const [offsetY, setOffsetY, offsetYRef] = useStateRef(0);
  // isSwiping parameter
  const [isSwiping, setIsSwiping] = useState(false);
  // Current page index
  const [currentIdx, setCurrentIdx] = useState(0);

  const onTouchMove = (e: TouchEvent | MouseEvent) => {
    const currentY = getTouchEventData(e).clientY;

    const diff = getRefValue(startYRef) - currentY;
    let newOffsetY = getRefValue(currentOffsetYRef) - diff;
    const maxOffsetY = 0;
    const minOffsetY = getRefValue(minOffsetYRef);
    // if conditions to prevent swiping from beyong top and bottom end
    if (newOffsetY > maxOffsetY) {
      newOffsetY = maxOffsetY;
    }

    if (newOffsetY < minOffsetY) {
      newOffsetY = minOffsetY;
    }
    setOffsetY(newOffsetY);
  };
  const onTouchEnd = () => {
    const currentOffsetY = getRefValue(currentOffsetYRef);
    const containerHeight = getRefValue(containerHeightRef);
    let newOffsetY = getRefValue(offsetYRef);

    const diff = currentOffsetY - newOffsetY;

    // we need to check difference in absolute/positive value (if diff is more than 40px)
    if (Math.abs(diff) > MIN_SWIPE_REQUIRED) {
      if (diff > 0) {
        // swipe to the right if diff is positive
        newOffsetY = Math.floor(newOffsetY / containerHeight) * containerHeight;
      } else {
        // swipe to the left if diff is negative
        newOffsetY = Math.ceil(newOffsetY / containerHeight) * containerHeight;
      }
    } else {
      // remain in the current slide
      newOffsetY = Math.round(newOffsetY / containerHeight) * containerHeight;
    }

    setIsSwiping(false);
    setOffsetY(newOffsetY);
    setCurrentIdx(Math.abs(newOffsetY / containerHeight));

    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('mouseup', onTouchEnd);
    window.removeEventListener('mousemove', onTouchMove);
  };
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    setIsSwiping(true);

    currentOffsetYRef.current = getRefValue(offsetYRef);
    startYRef.current = getTouchEventData(e).clientY;

    const containerEl = getRefValue(containerRef);
    const swiperEl = getRefValue(swiperRef);
    const containerHeight = swiperEl.offsetHeight;

    containerHeightRef.current = containerHeight;
    minOffsetYRef.current = containerHeight - containerEl.scrollHeight;

    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchEnd);
  };
  const indicatorOnClick = (idx: number) => {
    const swiperEl = getRefValue(swiperRef);
    const swiperHeight = swiperEl.offsetHeight;

    setCurrentIdx(idx);
    setOffsetY(-(swiperHeight * idx));
    console.log(-(swiperHeight * idx));
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const swiperEl = getRefValue(swiperRef);
      const containerHeight = swiperEl.offsetHeight;
      let newIdx = currentIdx;
      if (e.key === 'ArrowUp' && currentIdx > 0) {
        newIdx -= 1;
      } else if (e.key === 'ArrowDown' && currentIdx < React.Children.count(children) - 1) {
        newIdx += 1;
      }

      setCurrentIdx(newIdx);
      setOffsetY(-(containerHeight * newIdx));
    },
    [currentIdx, setOffsetY, children]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, currentIdx]);

  return (
    <div className="flex justify-center flex-col">
      <div
        className="swiper-container"
        data-testid="swiper-container"
        onTouchStart={onTouchStart}
        onMouseDown={onTouchStart}
        ref={swiperRef}
      >
        <ul
          ref={containerRef}
          data-testid="swiper-list"
          className={`swiper-list ${isSwiping ? 'is-swiping' : ''}`}
          style={{ transform: `translate3d(0, ${offsetY}px, 0)` }}
        >
          {React.Children.map(children, (child, idx) => (
            <div
              key={idx}
              className={clsx('swiper-slide', {
                'active-slide': currentIdx === idx
              })}
            >
              {child}
            </div>
          ))}
        </ul>
      </div>
      <ul className="swiper-indicator">
        {React.Children.map(children, (_, idx) => (
          <li
            key={idx}
            className={`swiper-indicator-item ${currentIdx === idx ? 'active' : ''}`}
            onClick={() => indicatorOnClick(idx)}
            data-testid="indicator"
          />
        ))}
      </ul>
    </div>
  );
}

export default Swiper;
