import { ADD_ANSWER, AddAnswerAction } from './types';

export const addAnswer = (questionId: number, answer: number): AddAnswerAction => ({
  type: ADD_ANSWER,
  payload: { questionId, answer },
});