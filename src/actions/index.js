export const ADD_USER = 'ADD_USER';

export const fetchApi = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(url);
  const data = response.json();
  return data;
};

export const addUser = (user) => ({
  type: ADD_USER,
  user,
});
