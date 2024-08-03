export interface AppState {
  answers: { [key: number]: number };
  isLoading: boolean;
  isSubmitted: boolean;
}

export const ADD_ANSWER = 'ADD_ANSWER';

export const SET_LOADING = 'SET_LOADING';

export const SET_SUBMITTED = 'SET_SUBMITTED';


export type AddAnswerAction = {
  type: typeof ADD_ANSWER;
  payload: {
    questionId: number;
    answer: number;
  };
};

export type SetLoadingAction = {
  type: typeof SET_LOADING;
  payload: boolean;
};

export type SetSubmittedAction = {
  type: typeof SET_SUBMITTED;
  payload: boolean;
};

export type AppActionTypes = AddAnswerAction | SetLoadingAction | SetSubmittedAction;
