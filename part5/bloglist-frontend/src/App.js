import React, {useEffect} from 'react';
import './App.css';
import LoginForm from './components/LoginForm'
import Blog from "./components/Blog";
import useFeild from "./hooks/feildHook";
import LoggedInfo from './components/LoggedInfo'
import useListHook from "./hooks/listHook";
import Notification from "./components/Notification";
import Header from "./components/Header";
import useResource from './hooks/useResources'

function App() {

    const blogs = useListHook([]);
    const loggedInUserName = useFeild(null);
    const loggedInsName = useFeild(null);
    const notification = useFeild(null);
    const blogsDB = useResource('http://localhost:3003/api/blogs');
    const usersDB = useResource('http://localhost:3003/api/users');

    const notificationConfig = (text) => {
        notification.update(text);
        setTimeout(() => notification.clear(null), 2000)
    };

    const syncer = {
        blogs: blogs,
        loggedInUserName: loggedInUserName,
        loggedInsName: loggedInsName,
        'notificationConfig': notificationConfig,
        blogsDB: blogsDB,
        usersDB: usersDB
    };

    const loggedInUsersBlogs = async () => {
        const queryData = await blogsDB.getAll();
        const retrievedBlogs = queryData.data;
        const filtered = retrievedBlogs.filter(i => i.author.username === loggedInUserName.value);
        blogs.update(filtered);
    };

    useEffect(() => {
        const alreadyLoggedInUser = window.localStorage.getItem('token');

        if (alreadyLoggedInUser) {
            let parsed = JSON.parse(alreadyLoggedInUser);
            loggedInUserName.update(parsed.username);
            loggedInsName.update(parsed.name);
        }

    }, []);

    useEffect(() => {

        if (loggedInUserName.value) {
            loggedInUsersBlogs();
        } else {
            blogsDB.getAll()
                .then(response => {
                    console.log(response.data);
                    blogs.update(response.data);
                });
        }

    }, [loggedInUserName.value]);

    return (
        <div className={'App'}>
            <div className={'headerLoginContainer'}>
                <Header/>
                {loggedInUserName.value == null ? <LoginForm syncer={syncer}/> : null}
            </div>
            <Notification text={notification.value}/>
            {loggedInUserName.value != null ? <LoggedInfo name={loggedInsName.value} syncer={syncer}/> : null}
            <div className={'allBlogsContainer'}>
                {blogs.value.map(i => <Blog syncer={syncer} blog={i} key={i.id}/>)}
            </div>
        </div>
    )
}

export default App;
