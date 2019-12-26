import axios from 'axios';

const url = "http://localhost:3001/persons"

const getAll = () => axios.get(url);

const add = (newPerson) =>axios.post(url, newPerson);



export default {getAll, add};

