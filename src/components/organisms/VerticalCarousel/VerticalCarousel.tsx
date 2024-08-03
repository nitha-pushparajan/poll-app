import React, { FC, useRef, useState } from 'react';
import SwiperPagination from '../../molecules/SwiperPagination/SwiperPagination';
import Question from '../../molecules/Question/Question';
import Summary from '../../molecules/Summary/Summary';
import { VerticalCarouselProps } from './VerticalCarousel.types';

const VerticalCarousel: FC<VerticalCarouselProps> = ({ items }) => {
  const classNames = {
    container: 'vertical-swiper swiper-container w-full h-[100vh] max-h-[100vh] overflow-hidden',
    list: 'flex flex-col p-0 m-0',
    item: ''
  };

  const offsetYRef = useRef(0);
  const currentOffsetYRef = useRef(0);
  const [offsetY, setOffsetY] = useState(0);
  const startYRef = useRef(0);
  const setOffsetYRef = (value: any) => {
    setOffsetY(value);
    offsetYRef.current = value;
  };

  const onMouseMove = (e: MouseEvent) => {
    const currentY = e.clientY;
    const diff = startYRef.current - currentY;
    const newOffsetY = currentOffsetYRef.current - diff;

    setOffsetY(newOffsetY);
  };
  const onMouseUp = () => {
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('mousemove', onMouseMove);
  };
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  //   currentOffsetYRef.current = offsetYRef.current;
  // };

  return (
    <div className={classNames.container} onMouseDown={onMouseDown}>
      <div className={classNames.list} style={{ transform: `translate3d(0,${offsetY}px, 0)` }}>
        {items.map((question) => (
          <div className={classNames.item}>
            <Question {...question} key={question.id} />
          </div>
        ))}
        <div className={classNames.item}>
          <Summary items={items} />
        </div>
      </div>
      <SwiperPagination items={items.length} active={3} />
    </div>
  );
};

export default VerticalCarousel;

VerticalCarousel.displayName = 'VerticalCarousel';
