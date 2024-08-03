import { ADD_ANSWER, SET_LOADING, SET_SUBMITTED, AddAnswerAction, SetLoadingAction, SetSubmittedAction } from './types';

export const addAnswer = (questionId: number, answer: number): AddAnswerAction => ({
  type: ADD_ANSWER,
  payload: { questionId, answer }
});

export const setLoading = (isLoading: boolean): SetLoadingAction => ({
  type: SET_LOADING,
  payload: isLoading
});

export const setSubmitted = (isSubmitted: boolean): SetSubmittedAction => ({
  type: SET_SUBMITTED,
  payload: isSubmitted
});
