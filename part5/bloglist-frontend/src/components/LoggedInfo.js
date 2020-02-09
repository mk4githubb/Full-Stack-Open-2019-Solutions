import React from 'react'
import useFormHook from "../hooks/formHook";
import useFeild from "../hooks/feildHook";
import './LoggedInfo.css'

const LoggedInfo = ({name, syncer}) => {
    const title = useFormHook('text');
    const text = useFormHook('text');

    const logoutHandler = () => {
        window.localStorage.clear();
        syncer.loggedInUserName.clear();
        syncer.loggedInsName.clear();
        syncer.blogs.clear();
    };


    const blogCreateHandler = async (event) => {
        event.preventDefault();

        if (!title || title.value.length === 0 || !text || text.value.length === 0) {
            syncer.notificationConfig('Title or body cannot be empty');
            return;
        } else if (title.value.length > 50) {
            syncer.notificationConfig("Length of title can't exceed 50");
            return;
        } else if (text.value.length > 256) {
            syncer.notificationConfig("Length of title can't exceed 256");
            return;
        }


        const parsedToken = JSON.parse(window.localStorage.getItem('token'));

        const getTokenConfig = () => {
            return `bearer ${parsedToken.webToken}`
        };

        const config = {
            headers: {
                Authorization: getTokenConfig()
            }
        };

        const newBlog = {
            title: title.value,
            text: text.value,
        };

        try {
            const receivedData = await syncer.blogsDB.post(newBlog, config);
            syncer.notificationConfig('Blog Saved');
            syncer.blogs.append(receivedData.data);
            title.clear();
            text.clear();
        } catch (exception) {
            syncer.notificationConfig('Error occurred while saving blog');
        }
    };

    return (
        <div className={'loggedInInfo'}>
            <div id={'logoutContainer'}>
                <div>logged in: {name} </div>
                <Button text={'Logout'} handler={logoutHandler}/>
            </div>
            <CreateBlogForm title={title} text={text} handler={blogCreateHandler}/>
        </div>
    )
};

const Button = ({text, handler}) => {
    return (
        <button onClick={handler}>{text}</button>
    )
};

const CreateBlogForm = ({title, text, handler}) => {
    const fullFormVisible = useFeild(false);

    const toggleButtonHandler = () => {
        fullFormVisible.update(!fullFormVisible.value)
    };

    if (fullFormVisible.value) {
        return <Button text={'create a new Note'} handler={toggleButtonHandler}/>
    }

    return (
        <div id={'blogCreationContainer'}>
            <h2 id={'label'}>Create A new Blog</h2>
            <form onSubmit={handler} className={'blogCreationForm'}>
                <div className={'blogCreationFormDiv'}>
                    <label className={'formLabel'}>Title</label>
                    <input className={'inputField'} type={title.type} value={title.value} onChange={title.update}
                           placeholder={'title'}/>
                </div>
                <div className={'blogCreationFormDiv'}>
                    <label className={'formLabel'}>Text</label>
                    <textarea className={'inputField'} id={'blogBody'} value={text.value} type={text.type}
                              onChange={text.update} placeholder={'..write something about the experience.'}/>
                </div>
                <div id={'createBlogButton'}>
                    <Button id={'createBlogButton'} type={'submit'} text={'Create'}/>
                </div>
            </form>
            <Button text={'Cancel'} handler={toggleButtonHandler}/>
        </div>
    )
};

export default LoggedInfo;