export interface AppState {
  answers: { [key: number]: number };
}

export const ADD_ANSWER = 'ADD_ANSWER';

export type AddAnswerAction = {
  type: typeof ADD_ANSWER;
  payload: {
    questionId: number;
    answer: number;
  };
};

export type AppActionTypes = AddAnswerAction;
