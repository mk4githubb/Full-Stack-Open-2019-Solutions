import React from 'react'
import AppHeader from "./AppHeader"
import {Grid, Header, Image} from "semantic-ui-react";
import BlogsContainer from "./BlogConatiner";

const LandingPage = (props) => {

    return(
        <Grid>
          <AppHeader/>
          <Grid.Row style={{height:'40vh'}} columns={1} centered >
              <BlogsContainer db={props.db}/>
          </Grid.Row>
        </Grid>
    )
};

export default LandingPage;