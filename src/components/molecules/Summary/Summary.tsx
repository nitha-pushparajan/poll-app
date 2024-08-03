import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OptionList from '../OptionsList/OptionsList';
import { SummaryProps } from "./Summary.types";
import { addAnswer } from '../../../store/actions';
import { AppState } from '../../../store/types';

const Summary:FC<SummaryProps> = ({ items }) => {

  const classNames = {
    container: 'grid grid-cols-2 h-[100vh] align-middle justify-center',
    question: 'flex items-center justify-start px-[100px] bg-[#4747e4] text-[40px] font-medium',
    optionsList: 'flex flex-col justify-around bg-[#000] w-full',
  };
  const dispatch = useDispatch();
  const answers = useSelector((state: AppState) => state.answers);
  
  const questionAnswers = items.map((question) => {
    const answer = question.options.filter((option) => {
      return option.id === answers[question.id]
    })
    return {
      question: question.question,
      answer: answer?.[0]?.label
    }
  })
  
  return (
    <div className={classNames.container}>
       <div className={classNames.question}>Summary</div>
       <div className={classNames.optionsList}>
       {
        questionAnswers.map(question => (
            <div key={question.question}>
                <div>{question.question}</div>
                <div>{question.answer}</div>
            </div>
        ))
      }          
       </div>
    </div>
  );
};

export default Summary;

Summary.displayName = "Summary";