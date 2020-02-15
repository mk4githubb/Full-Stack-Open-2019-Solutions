import React from 'react'
import {Button, Header, Segment, TransitionablePortal} from "semantic-ui-react";
import {useState} from 'react'
import CreateBlog from "../CreateBlog/CreateBlog";


const TransitionPortal = () =>{

    const [open, setOpen] = useState(false);

    return(
        <TransitionablePortal

            onClose={() => setOpen(false)}
            open={open}
            trigger={
                <Button
                    content={open ? 'Cancel' : 'Create Blog' }
                    negative={open}
                    positive={!open}
                    onClick={()=>setOpen(!open)}

                />
            }
            style={{border:'2px solid green', height:'100vh'}}
        >
            <CreateBlog/>
        </TransitionablePortal>
    )
};

export default TransitionPortal;