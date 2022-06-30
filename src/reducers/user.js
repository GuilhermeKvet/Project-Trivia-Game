import { ADD_USER, RESET, SCORE_USER } from '../actions';

const INICIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  assertions: 0,
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
      assertions: state.assertions + action.assertions,
    };
  case RESET:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
};

export default userReducer;
