import React from "react";
import classes from "./FormsControl.module.scss"

export const Textarea = ({input, meta, ...props}) => {

    return (
        <div className={classes.textAreaBlock}>
            <div>
                <textarea className={classes.textArea + " " + meta.error ? classes.error : null} {...input} {...props} />
            </div>
            <div>
                {meta.error ? <span className={classes.errorMessage}>{meta.error}</span> : null}
            </div>
        </div>
    )
}

export const Input = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;

    return (
        <div>
            <input className={classes.textArea + " " + hasError ? classes.error : null} {...input} {...props} />
            {hasError ? <span className={classes.errorMessage}>{meta.error}</span> : null}
        </div>
    )
}