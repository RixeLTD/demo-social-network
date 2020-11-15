import React, {useEffect, useRef} from "react";

const AutoHeightTextarea = ({ className, placeholder, value, onChange, name, autoFocus = false}) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        textareaRef.current.style.height = "0px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            className={className}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            name={name}
            autoFocus={autoFocus}
        />
    );
};

export default AutoHeightTextarea;