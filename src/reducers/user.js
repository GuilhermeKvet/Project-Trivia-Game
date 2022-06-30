import { ADD_URL, ADD_USER, RESET, SCORE_USER } from '../actions';

const INICIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  assertions: 0,
  url: '',
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
  case ADD_URL:
    return {
      ...state,
      url: action.url,
    };
  default:
    return state;
  }
};

export default userReducer;
