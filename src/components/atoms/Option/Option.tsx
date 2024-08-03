import React, { FC } from 'react';
import clsx from 'clsx';
import { OptionProps } from './Option.types';

const Option: FC<OptionProps> = ({ imageUrl, label, id, isSelected, handleOptionSelection }) => {
  const classNames = {
    option: 'options flex justify-start items-center flex-col group',
    label: clsx('text-[#000] ', {
      'opacity-0 translate-y-[50px] group-hover:opacity-100 group-hover:translate-y-[0] transition duration-500 ease-in-out delay-350':
        !isSelected,
      'flex justify-center items-center': isSelected
    })
  };

  return (
    <div
      className={classNames.option}
      data-testid="option-div"
      onClick={() => {
        handleOptionSelection?.(id);
      }}
    >
      <img src={imageUrl} alt={label} className="w-[100px] h-auto" />
      <span className={classNames.label}>
        {isSelected && (
          <svg
            data-testid="option-selection"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="48px"
            height="48px"
          >
            <path
              fill="#c8e6c9"
              d="M36,42H12c-3.314,0-6-2.686-6-6V12c0-3.314,2.686-6,6-6h24c3.314,0,6,2.686,6,6v24C42,39.314,39.314,42,36,42z"
            />
            <path
              fill="#4caf50"
              d="M34.585 14.586L21.014 28.172 15.413 22.584 12.587 25.416 21.019 33.828 37.415 17.414z"
            />
          </svg>
        )}
        {label}
      </span>
    </div>
  );
};

export default Option;
