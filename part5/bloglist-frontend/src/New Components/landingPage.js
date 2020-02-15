import React from 'react'
import {Grid, GridRow, GridColumn, Header, Image, Divider, Icon, Search, Segment} from "semantic-ui-react";
import BlogsContainer from "./BlogConatiner";
import Navbar from "./Navbar";
import MidSection from "./MidSection";
import NotifMessage from "./Message/Message";
import TransitionPortal from "./LoggedInUserPage/transitionPortal";

const LandingPage = (props) => {

    return(
        <Grid>
            <GridRow>
                <Navbar/>
            </GridRow>
           <NotifMessage/>
            <GridRow columns={1} centered verticalAlign={'middle'} style={{border:'2px solid red'}}>
                <Segment style={{border:'2px solid green'}} placeholder>
                    <Grid columns={2}  stackable textAlign='center'>
                        <Divider vertical>Or</Divider>
                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column>
                                <Header icon>
                                    <Icon name='newspaper' />
                                    Create a blog...
                                </Header>
                                <TransitionPortal/>
                            </Grid.Column>

                            <Grid.Column>
                                <Header icon>
                                    <Icon name='search' />
                                    Find a Blog
                                </Header>

                                <Search placeholder='Search blogs...' />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </GridRow>
            <GridRow style={{height:'40vh'}} columns={1} centered >
                <BlogsContainer db={props.db}/>
             </GridRow>
        </Grid>
    )
};

export default LandingPage;