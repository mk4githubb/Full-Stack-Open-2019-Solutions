import React from 'react'
import {Responsive, Segment, Input} from "semantic-ui-react";
import Navbar from "./Navbar";
import MidSection from "./MidSection";

const AppHeader = () =>{
    const getWidth = () => {
        const isSSR = typeof window === 'undefined';

        return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
    };

    return(
        <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
           <Segment inverted textAlign={'center'} vertical style={{ minHeight: 300, padding: '1em 0em' }}>
                <Navbar/>
               <MidSection/>
           </Segment>
        </Responsive>
    )
};

export default AppHeader;