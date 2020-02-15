import React from 'react'
import {Menu, Grid, Container, Button, Dropdown} from "semantic-ui-react";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {ac_logout} from "../reducers/loggedInUserReducer";

const Navbar = (props) => {

    const Login_Logout = () => {

        if(props.loggedInUser){
            return (
                <Dropdown className='button icon' floating text={props.loggedInUser.username}>
                    <Dropdown.Menu>
                        <Dropdown.Item text='My Account'/>
                        <Dropdown.Item as={Link} text='Change password' to={'/myprofile'}/>
                        <Dropdown.Item as={Link} text='Logout' onClick={props.logout} to={'/home'}/>
                    </Dropdown.Menu>
                </Dropdown>
            )
        }

        return (
            <Button.Group>
                <Button><Link to={'/login'}>Log in</Link></Button>
                <Button.Or />
                <Button positive><Link to={'/signup'}>Sign up</Link></Button>
            </Button.Group>
        )
    };

    return(
        <Menu inverted size={'large'}>
            <Container>
                <Menu.Item active><Link to={'/home'}>Home</Link></Menu.Item>
                <Menu.Item><Link to={'/about'}>About</Link></Menu.Item>
                <Menu.Item><Link to={'/users'}>Users</Link></Menu.Item>
                <Menu.Item position={'right'}>
                    {Login_Logout()}
                </Menu.Item>
            </Container>
        </Menu>
    )
};


const mapStateToProps = (state)=>{
    return{
        loggedInUser:state.loggedInUser,
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        logout: () => dispatch(ac_logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);