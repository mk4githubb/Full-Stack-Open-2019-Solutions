import React from 'react'
import AppHeader from "./AppHeader"
import {Grid, Header, Image} from "semantic-ui-react";
import BlogsContainer from "./BlogConatiner";

const LandingPage = (props) => {

    return(
        <Grid>
          <AppHeader/>
          <BlogsContainer db={props.db}/>
        </Grid>
    )
};

export default LandingPage;