import React from 'react'
import {Grid} from "semantic-ui-react";
import Navbar from "../Navbar";
import UsersContainer from "./UsersContainer";

const Users = () => {

    return(
        <Grid>
            <Grid.Row centered>
                <Navbar/>
            </Grid.Row>
            <Grid.Row columns={1} centered>
                <UsersContainer/>
            </Grid.Row>
        </Grid>
    )
};

export default Users;