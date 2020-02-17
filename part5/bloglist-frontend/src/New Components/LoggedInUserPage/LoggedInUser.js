import React from 'react'
import {Grid, Button, Divider, Header, Icon, Search, Segment} from "semantic-ui-react";
import Navbar from "../Navbar";
import MidSection from "../MidSection";
import BlogsContainer from "../BlogConatiner";
import NotifMessage from "../Message/Message";

const LoggedInUser = () => {
  return (
      <Grid>
          <Grid.Row >
              <Navbar/>
          </Grid.Row>
          <Grid.Row>
              <NotifMessage/>
          </Grid.Row>
          <Grid.Row columns={1} centered verticalAlign={'middle'} >
              <MidSection/>
          </Grid.Row>
          <Grid.Row>
              <BlogsContainer/>
          </Grid.Row>
      </Grid>
  )
};

export default LoggedInUser;