import React from 'react'
import {GridRow, Message} from "semantic-ui-react";
import {connect} from "react-redux";

const NotifMessage = (props) => {

    if (props.notification){
        return(
            <GridRow>
                <Message>
                    {props.notification}
                </Message>
            </GridRow>
        )
    }

    return null;
};

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
};


export default connect(mapStateToProps)(NotifMessage);