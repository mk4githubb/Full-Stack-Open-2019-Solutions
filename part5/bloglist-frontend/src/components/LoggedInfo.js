import React from 'react'
import useFormHook from "../hooks/formHook";
import useFeild from "../hooks/feildHook";
import {ac_setNotification_Text} from "../reducers/notificationTextReducer";
import {ac_logout} from "../reducers/loggedInUserReducer";
import {ac_createBlog} from "../reducers/blogsReducer";
import {connect} from 'react-redux'

const LoggedInfo = (props) => {
    const title = useFormHook('text');
    const text = useFormHook('text');

    const logoutHandler = () => {
        props.logout();
    };

    const blogCreateHandler = async (event) => {
        event.preventDefault();

        if (!title || title.value.length === 0 || !text || text.value.length === 0) {
            props.setNotificationText('Title or body cannot be empty');
            return;
        } else if (title.value.length > 50) {
            props.setNotificationText("Length of title can't exceed 50");
            return;
        } else if (text.value.length > 256) {
            props.setNotificationText("Length of title can't exceed 256");
            return;
        }

        const config = {
            headers: {
                Authorization: `bearer ${props.loggedInUser.webToken}`
            }
        };

        const newBlog = {
            title: title.value,
            text: text.value,
        };

        props.createBlog(props.db, config, newBlog);
    };

    return (
        <div className={'loggedInInfo'}>
            <div id={'logoutContainer'}>
                <div>logged in: {props.loggedInUser.name} </div>
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

const mapStateToProps = (state)=>{
    return{
        blogs:state.blogs,
        loggedInUser:state.loggedInUser,
        notificationText:state.notificationText
    }
};

const mapDispatchToProps = (dispatch)=> {
    return{
        setNotificationText:(data) => dispatch(ac_setNotification_Text(data)),
        logout:() => dispatch(ac_logout()),
        createBlog: (db, config, newBlog) => dispatch(ac_createBlog(db, config, newBlog))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInfo);