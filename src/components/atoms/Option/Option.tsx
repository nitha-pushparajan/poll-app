import React, { FC } from 'react';
import clsx from 'clsx';
import { OptionProps } from './Option.types';

const Option: FC<OptionProps> = ({ imageUrl, label, id, isSelected, handleOptionSelection }) => {
  const classNames = {
    option: 'options flex justify-start items-center flex-col group',
    label: clsx('text-[#000] text-[20px] md:text-[25px]', {
      'opacity-0 translate-y-[50px] group-hover:opacity-100 group-hover:translate-y-[0] transition duration-500 ease-in-out delay-350':
        !isSelected,
      'flex justify-center items-center': isSelected
    }),
    image: 'w-[30px]'
  };

  return (
    <div
      className={classNames.option}
      data-testid="option-div"
      onClick={() => {
        handleOptionSelection?.(id);
      }}
    >
      <img src={imageUrl} alt={label} className="w-[40px] md:w-[100px] h-auto" draggable={false} />
      <span className={classNames.label}>
        {isSelected && (
          <img
            src="https://cdn-icons-png.freepik.com/512/5290/5290058.png"
            alt="selected option"
            draggable={false}
            className={classNames.image}
            data-testid="option-selection"
          />
        )}
        {label}
      </span>
    </div>
  );
};

export default Option;
