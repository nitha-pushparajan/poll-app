import { FC } from 'react';
import Question from 'src/components/molecules/Question/Question';
import Summary from 'src/components/molecules/Summary/Summary';
import Swiper from 'src/components/organisms/Swiper/Swiper';
import { VerticalCarouselProps } from './VerticalCarousel.types';

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
