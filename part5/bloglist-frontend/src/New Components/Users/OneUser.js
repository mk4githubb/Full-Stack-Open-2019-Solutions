import React from 'react'
import {Card} from "semantic-ui-react";
import {Link} from "react-router-dom";

const OneUser = ({user}) => {

    return (
        <Card
            as={Link}
            to={`/users/${user.id}`}
            image={require(`../../resources/avatars/avataaars (${1 + Math.floor(Math.random() * Math.floor(5))}).png`)}
            header={user.username}
            meta={`${user.blogPosts.length} blogs`}
            raised
            color={'teal'}
        />
    )
};

export default OneUser;