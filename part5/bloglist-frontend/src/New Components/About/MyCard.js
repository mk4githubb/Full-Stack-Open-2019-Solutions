import {Card, Grid} from "semantic-ui-react";
import React from "react";


const MyCard = () => {

    return(
        <Grid.Column width={6}>
            <Card
                image={require('../../resources/programmer.png')}
                header='back_slash'
                meta='developer in the making'
                description='Fan of Jon Skeet, Amateur Programmer, Civil Engineer, Atheist, Piscean, Swimmer, Follows Right Wing, Jai Australia - Jai Hind.'
                color={'orange'}
                raised
                centered
            />
        </Grid.Column>
    )
};

export default MyCard;