import React from 'react'
import {Grid, Card, Header, List, Segment, Label} from "semantic-ui-react";
import FavQuotes from "./FavQuotes";
import MyCard from "./MyCard";
import MyProjects from "./MyProjects";
import Navbar from "../Navbar";

const About = ()=>{

    return(
        <Grid>
            <Grid.Column width={16}>
                <Navbar/>
            </Grid.Column>
            <Grid celled='internally'>
                <Grid.Row width={8} style={{marginTop:'2em'}} >
                    <Header size={'huge'} content={'About Me'} color={'teal'} />
                </Grid.Row>
                <MyCard/>
                <MyProjects/>
                <Grid.Column width={16}>
                    <Segment padded>
                        <Label attached='top'>Fanboy Moment</Label>
                        <Header as={'h2'} content={'Favourite One Liners'}/>
                        <FavQuotes/>
                    </Segment>
                </Grid.Column>
            </Grid>
        </Grid>

    )
};

export default About;