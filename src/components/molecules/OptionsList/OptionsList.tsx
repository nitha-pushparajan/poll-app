import React, { FC } from 'react';
import Option from '../../atoms/Option/Option';
import { OptionsListProps } from "./OptionsList.types";

const OptionsList:FC<OptionsListProps> = ({ options, handleOptionSelection, selected }) => {

  const classNames = {
    container: 'grid grid-cols-3 gap-10 w-full'
  };

  return (
    <div className={classNames.container}>
      {
        options.map(option => (
            <Option {...option} key={option.id} handleOptionSelection={handleOptionSelection} isSelected={option.id === selected} />
        ))
      }
    </div>
  );
};

export default OptionsList;

OptionsList.displayName = "OptionsList";