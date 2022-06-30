import { ADD_USER, SCORE_USER } from '../actions';

const INICIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  correct: 0,
};

const userReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  case SCORE_USER:
    return {
      ...state,
      score: state.score + action.score,
      correct: state.correct + action.correct,
    };
  default:
    return state;
  }
};

export default userReducer;
