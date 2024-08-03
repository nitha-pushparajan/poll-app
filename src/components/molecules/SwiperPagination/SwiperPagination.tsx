import React, { FC } from 'react';
import { SwiperPaginationProps } from "./SwiperPagination.types";

const SwiperPagination:FC<SwiperPaginationProps> = ({ items, active }) => {

  const classNames = {
    dots: 'absolute left-0 top-1/2 -translate-y-1/2 h-[100vh] w-[50px] flex gap-[10px] flex-col justify-center items-center',
    dot: 'h-[10px] w-[10px] rounded-full border-solid border-primary  bg-green '
  };

  return (
    <div className={classNames.dots}>
    {
      [...Array(items)].map((question, index) => (
          <div key={index} className={classNames.dot} />
      ))
    }        
  </div>
  );
};

export default SwiperPagination;

SwiperPagination.displayName = "SwiperPagination";