import axios from 'axios';

const url = '/api/persons';

const getAll = () => axios.get(url);

const add = (newPerson) => axios.post(url, newPerson);

const delContact = (id) => axios.delete(`${url}/${id}`);

const update = (id, obj) => axios.put(`${url}/${id}`, obj);

export default {getAll, add, delContact, update};

