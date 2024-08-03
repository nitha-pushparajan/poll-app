import React, { FC } from 'react';
import SwiperPagination from '../../molecules/SwiperPagination/SwiperPagination'
import Question from '../../molecules/Question/Question';
import Summary from '../../molecules/Summary/Summary';
import { VerticalCarouselProps } from "./VerticalCarousel.types";

const VerticalCarousel:FC<VerticalCarouselProps> = ({ items }) => {

  const classNames = {
    container: 'vertical-swiper w-full',
  };

  return (
    <div className={classNames.container}>
      {
        items.map(question => (
            <Question {...question} key={question.id} />
        ))
      }
      <Summary items={items} />
      <SwiperPagination items={items.length} active={3} />
    </div>
  );
};

export default VerticalCarousel;

VerticalCarousel.displayName = "VerticalCarousel";