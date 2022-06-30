export const ADD_USER = 'ADD_USER';
export const SCORE_USER = 'SCORE_USER';
export const RESET = 'RESET';
export const ADD_URL = 'ADD_URL';

export const fetchApi = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(url);
  const data = response.json();
  return data;
};

export const addUrl = (url) => ({
  type: ADD_URL,
  url,
});

export const addUser = (name, email) => ({
  type: ADD_USER,
  name,
  email,
});

export const scoreUser = (score, assertions) => ({
  type: SCORE_USER,
  score,
  assertions,
});

export const reset = () => ({
  type: RESET,
});
