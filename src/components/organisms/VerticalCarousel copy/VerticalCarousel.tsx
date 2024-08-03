import React, { FC, useRef, useState } from 'react';
import SwiperPagination from '../../molecules/SwiperPagination/SwiperPagination';
import Question from '../../molecules/Question/Question';
import Summary from '../../molecules/Summary/Summary';
import Swiper from '../Swiper/Swiper'
import { VerticalCarouselProps } from './VerticalCarousel.types';
import clsx from 'clsx';

const VerticalCarousel: FC<VerticalCarouselProps> = ({ items }) => {

  return (
    <Swiper>
      {items.map((question, idx) => (
        <Question {...question} key={question.id} />
      ))}
      <Summary items={items} />    
    </Swiper>
  );
};

export default VerticalCarousel;

VerticalCarousel.displayName = 'VerticalCarousel';
