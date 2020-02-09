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

export const put = async (id, data) => {
    const retrievedData = await axios.put(`${baseURL}/${id}`, data);
    return retrievedData.data;
};