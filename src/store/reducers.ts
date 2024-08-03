import { AppState, ADD_ANSWER, AppActionTypes, SET_LOADING, SET_SUBMITTED } from './types';

const initialState: AppState = {
  answers: {},
  isLoading: false,
  isSubmitted: false
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
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_SUBMITTED:
      return {
        ...state,
        isLoading: false,
        isSubmitted: action.payload
      };
    default:
      return state;
  }
};

export default pollReducer;
