import React from "react";

const Notification = ({text})=> {
    console.log("in notif ", text)
    if (text == null){
        return null;
    }
    return <div className= 'notification'>{text}</div>
};

export default Notification;