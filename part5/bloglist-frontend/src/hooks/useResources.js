import axios from 'axios'

// url is the full url to a resource
// const baseUrl = 'http://localhost:3003/api/blogs'

const useResource = (url) => {

    const URL = url;

    const getAll = async () => axios.get(URL);

    const getOne = (id) => axios.get(`${URL}/${id}`);

    const post = (data, config) => axios.post(URL, data, config);

    const put = (id, data, config) => axios.put(`${URL}/${id}`, data, config);

    const del = (id, config) => axios.delete(`${URL}/${id}`, config);

    return {

        getAll,
        getOne,
        post,
        put,
        del

    };
};

export default useResource;