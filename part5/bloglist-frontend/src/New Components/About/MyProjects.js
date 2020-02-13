import {Grid, Header, List} from "semantic-ui-react";
import React from "react";


const MyProjects = () =>{

    return(
        <Grid.Column width={10}>
            <Header as={'h2'} content={'Other Projects'}/>
            <List divided relaxed>
                <List.Item>
                    <List.Icon name='node' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>PhoneBook Application</List.Header>
                        <List.Description as='a'>My first ever web app</List.Description>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='code' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>Due Date Tracker</List.Header>
                        <List.Description as='a'>Built to track my assignment dates and job applications</List.Description>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='android' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>Stopwatch Application</List.Header>
                        <List.Description as='a'>A basic Android stopwatch app with lap functionality</List.Description>
                    </List.Content>
                </List.Item>
            </List>
        </Grid.Column>
    )
};

export default MyProjects;