import useResource from "../../hooks/useResources";
import {Card} from "semantic-ui-react";
import React,{useEffect} from 'react'
import OneUser from "./OneUser";
import {connect} from 'react-redux'

const UsersContainer = (props ) => {

    return (
        <Card.Group itemsPerRow={4}>
            {props.users.map(i => <OneUser key={i.id} user={i}/>)}
        </Card.Group>
    )
};

const mapStateToProps = (state) => {
    return{
        users:state.users
    }
};
export default connect(mapStateToProps)(UsersContainer);