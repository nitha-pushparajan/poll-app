import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OptionList from 'src/components/molecules/OptionsList/OptionsList';
import { QuestionProps } from './Question.types';
import { addAnswer } from 'src/store/actions';
import { AppState } from 'src/store/types';

const Question: FC<QuestionProps> = ({ question, id, options }) => {
  const classNames = {
    container: 'flex flex-col md:grid md:grid-cols-2 h-[100vh] align-middle justify-center',
    question: 'flex pt-[50px] pb-[50px] items-center justify-center md:justify-start px-[100px] bg-[#4747e4] text-[30px] md:text-[40px] font-medium',
    optionsList: 'flex flex-grow items-center justify-center bg-[#fff] w-full]'
  };
  const dispatch = useDispatch();
  const answers = useSelector((state: AppState) => state.answers);
  const selectedAnswer = answers[id];
  const handleOptionSelection = (answerId: number) => {
    dispatch(addAnswer(id, answerId));
  };

  return (
    <div className={classNames.container}>
      <div className={classNames.question}>{question}</div>
      <div className={classNames.optionsList}>
        <OptionList
          options={options}
          handleOptionSelection={handleOptionSelection}
          selected={selectedAnswer}
        />
      </div>
    </div>
  );
};

export default Question;
