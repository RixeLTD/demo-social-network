import React from 'react';
import classes from "./GlobalError.module.css";

const GlobalError = (props) => {

    return (
        <div>
            <button class={classes.toggleButton} id={classes.centeredToggleButton}>Toggle</button>
            <div class={classes.modal} id={classes.modal}>
                <h2>Modal Window</h2>
                <div class={classes.content}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis deserunt corrupti, ut fugit magni qui quasi nisi amet repellendus non fuga omnis a sed impedit explicabo accusantium nihil doloremque consequuntur.</div>
                <div class={classes.actions}>
                    <button class={classes.toggleButton}>OK</button>
                </div>
            </div>
        </div>
    )
}

export default GlobalError;