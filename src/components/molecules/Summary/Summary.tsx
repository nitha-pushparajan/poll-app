import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitAnswers } from 'src/services';
import { setLoading, setSubmitted } from 'src/store/actions';
import { SummaryProps } from './Summary.types';
import { AppState } from 'src/store/types';

import './Summary.css';

const Summary: FC<SummaryProps> = ({ items }) => {
  const classNames = {
    container: 'poll-summary grid grid-cols-2 h-[100vh] align-middle justify-center',
    question: 'flex items-center justify-start px-[100px] bg-[#4747e4] text-[40px] font-medium z-10',
    answersList: 'answers-list flex flex-col justify-around bg-[#000] w-full p-[50px]',
    submitBtn: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
  };

  const answers = useSelector((state: AppState) => state.answers);
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    dispatch(setLoading(true));
    await submitAnswers(answers);
    dispatch(setSubmitted(true));
  };

  const questionAnswers = items.map((question) => {
    const answer = question.options.filter((option) => {
      return option.id === answers[question.id];
    });
    return {
      question: question.question,
      answer: answer?.[0]?.label || "Unanswered"
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
