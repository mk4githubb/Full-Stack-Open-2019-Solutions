import React from 'react'
import './Notification.css'

const Notification = ({text}) => {
    if (text == null) {
        return null;
    }
    return (
        <div className={'notification'}>
            <p> {text} </p>
        </div>
    )
};

export default Notification;