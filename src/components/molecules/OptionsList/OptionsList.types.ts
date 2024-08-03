import React from 'react';
import { OptionProps } from '../../atoms/Option';

export interface OptionsListProps {
  options: OptionProps[];
  handleOptionSelection?: (answerId: number) => void;
  selected?: number;
}
