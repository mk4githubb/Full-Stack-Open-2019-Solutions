import useResource from "../hooks/useResources";

const initialState = {
    blogsDB : useResource('http://localhost:3003/api/blogs'),
    usersDB : useResource('http://localhost:3003/api/users')
};

const dbReducer = (state = initialState , act)=>{

}