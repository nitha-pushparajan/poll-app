import { FC } from 'react';
import Question from '../../molecules/Question/Question';
import Summary from '../../molecules/Summary/Summary';
import Swiper from '../Swiper/Swiper';
import { VerticalCarouselProps } from './VerticalCarousel.types';
import clsx from 'clsx';

const VerticalCarousel: FC<VerticalCarouselProps> = ({ items }) => {
  return (
    <Swiper>
      {items.map((question) => (
        <Question {...question} key={question.id} />
      ))}
      <Summary items={items} />
    </Swiper>
  );
};

export default VerticalCarousel;
