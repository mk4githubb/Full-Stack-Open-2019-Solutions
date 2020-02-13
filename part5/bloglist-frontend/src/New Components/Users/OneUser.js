import React from 'react'
import {Card} from "semantic-ui-react";

const OneUser = ({user}) => {

    return (
        <Card
            as={'a'}
            image={require(`../../resources/avatars/avataaars (${1 + Math.floor(Math.random() * Math.floor(4))}).png`)}
            header={user.username}
            meta={`${user.blogPosts.length} blogs`}
            link={'#'}
        />
    )
};

export default OneUser;