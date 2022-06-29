import { ADD_USER } from '../actions';

const INICIAL_STATE = {
  name: '',
  email: '',
};

const userReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  default:
    return state;
  }
};

export default userReducer;
