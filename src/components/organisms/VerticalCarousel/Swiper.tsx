import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import Question from '../../molecules/Question/Question';
import Summary from '../../molecules/Summary/Summary';
import { getRefValue, useStateRef } from './hooks';
import { getTouchEventData } from './dom';
import { VerticalCarouselProps } from "./VerticalCarousel.types";

import './Swiper.css';

const MIN_SWIPE_REQUIRED = 40;

function Swiper({ items }: VerticalCarouselProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const swiperRef = useRef<HTMLDivElement>(null);
  const containerHeightRef = useRef(0);
  const minOffsetYRef = useRef(0);
  const currentOffsetYRef = useRef(0);
  const startYRef = useRef(0);
  const [offsetY, setOffsetY, offsetYRef] = useStateRef(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  const classNames = {
    container: 'vertical-swiper swiper-container w-full h-[100vh] max-h-[100vh] overflow-hidden',
    list: "flex flex-col p-0 m-0",
  };

  const onTouchMove = (e: TouchEvent | MouseEvent) => {
    const currentY = getTouchEventData(e).clientY;

    const diff = getRefValue(startYRef) - currentY;
    let newOffsetY = getRefValue(currentOffsetYRef) - diff;
    const maxOffsetY = 0;
    const minOffsetY = getRefValue(minOffsetYRef);

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
  const onTouchStart = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
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
    console.log(-(swiperHeight * idx))
  };

  return (
    <>
    <div
      className="swiper-container"
      onTouchStart={onTouchStart}
      onMouseDown={onTouchStart}
      ref={swiperRef}
    >
      <ul
        ref={containerRef}
        className={`swiper-list ${isSwiping ? 'is-swiping' : ''}`}
        style={{ transform: `translate3d(0, ${offsetY}px, 0)` }}
      >
        {
          items.map((question, idx) => (
            <div className={clsx({
              "active-slide": currentIdx === idx
            })}>
              <Question {...question} key={question.id} />
            </div>
          ))
        }
          <div className={clsx({
            "active-slide": currentIdx === items.length
          })}>
          <Summary items={items} />
        </div>
      </ul>
    </div>
          <ul className="swiper-indicator">
          {items.map((_item, idx) => (
            <li
              key={idx}
              className={`swiper-indicator-item ${
                currentIdx === idx ? 'active' : ''
              }`}
              onClick={() => indicatorOnClick(idx)}
              data-testid="indicator"
            />
          ))}
            <li
              className={`swiper-indicator-item ${
                currentIdx === items.length ? 'active' : ''
              }`}
              onClick={() => indicatorOnClick(items.length)}
              data-testid="indicator"
            />
        </ul>
        </>
  );
}

export default Swiper;
