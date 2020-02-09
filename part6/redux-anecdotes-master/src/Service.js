import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes';

export const getAll = async () => {
    const retrievedData = await axios.get(baseURL);
    return retrievedData.data;
};

export const post = async (data) => {
  const retrievedData = await axios.post(baseURL, data);
  return retrievedData.data;
};