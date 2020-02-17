import React from 'react'
import {Grid, GridRow, GridColumn, Header, Image, Divider, Icon, Search, Segment} from "semantic-ui-react";
import BlogsContainer from "./BlogConatiner";
import Navbar from "./Navbar";
import MidSection from "./MidSection";
import NotifMessage from "./Message/Message";

const LandingPage = (props) => {

    return(
        <Grid>
            <GridRow>
                <Navbar/>
            </GridRow>
           <NotifMessage/>
            <GridRow columns={1} centered verticalAlign={'middle'} style={{border:'2px solid red'}}>
                <MidSection/>
            </GridRow>
            <GridRow style={{height:'40vh'}} columns={1} centered >
                <BlogsContainer db={props.db}/>
             </GridRow>
        </Grid>
    )
};

export default LandingPage;