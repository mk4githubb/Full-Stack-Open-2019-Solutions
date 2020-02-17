import React from 'react'
import {Grid, GridRow, Message} from "semantic-ui-react";
import {connect} from "react-redux";

const NotifMessage = (props) => {

    if (props.notificationText){
        return(
            <GridRow columns={1} centered>
                <Message>
                    {props.notificationText}
                </Message>
            </GridRow>
        )
    }

    return null;
};

const mapStateToProps = (state) => {
    return {
        notificationText: state.notificationText
    }
};


export default connect(mapStateToProps)(NotifMessage);