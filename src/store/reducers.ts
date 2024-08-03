import { AppState, ADD_ANSWER, AppActionTypes } from './types';

const initialState: AppState = {
  answers: {}
};

const pollReducer = (state = initialState, action: AppActionTypes): AppState => {
  switch (action.type) {
    case ADD_ANSWER:
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer
        }
      };
    default:
      return state;
  }
};

export default pollReducer;
