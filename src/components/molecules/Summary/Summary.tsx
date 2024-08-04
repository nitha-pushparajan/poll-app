import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { submitAnswers } from 'src/lib/services';
import { setLoading, setSubmitted } from 'src/lib/store/actions';
import { SummaryProps } from './Summary.types';
import { AppState } from 'src/lib/store/types';

import './Summary.css';

const Summary: FC<SummaryProps> = ({ items }) => {
  const classNames = {
    container:
      'poll-summary flex flex-col md:grid  md:grid-cols-2 h-[100vh] align-middle justify-center',
    question:
      'flex pt-[50px] pb-[50px] items-center justify-center md:justify-start px-[100px] bg-[#4747e4] text-[40px] font-medium z-10',
    answersList:
      'flex-grow answers-list flex flex-col justify-around bg-[#000] w-full p-[20px] md:p-[50px]',
    submitBtn: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
  };

  const answers = useSelector((state: AppState) => state.answers);
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if(Object.keys(answers).length !== questionAnswers.length) {
      toast.error('Please answer all questions and submit again');
    }
    else{
      dispatch(setLoading(true));
      try{
        await submitAnswers(answers);
        dispatch(setSubmitted(true));        
      } catch(error) {
        dispatch(setLoading(false));
        toast.error('An error ocurred in submission. Please submmit again');
      }
    }
  };

  const questionAnswers = items.map((question) => {
    const answer = question.options.filter((option) => {
      return option.id === answers[question.id];
    });
    return {
      question: question.question,
      answer: answer?.[0]?.label || 'Unanswered'
    };
  });

  return (
    <div className={classNames.container}>
      <div className={classNames.question}>Summary</div>
      <div className={classNames.answersList}>
        {questionAnswers.map((question) => (
          <div key={question.question}>
            <div>{question.question}</div>
            <div>{question.answer}</div>
          </div>
        ))}
        <button className={classNames.submitBtn} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Summary;
