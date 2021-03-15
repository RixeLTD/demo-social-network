import React, {ChangeEvent, useEffect, useRef} from 'react'

type Props = {
    className?: string
    placeholder?: string
    value: string
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
    name?: string
    focus?: boolean
}
const AutoHeightTextarea: React.FC<Props> = ({
                                                 className,
                                                 placeholder,
                                                 value,
                                                 onChange,
                                                 name,
                                                 focus
                                             }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (textareaRef && textareaRef.current) {
            textareaRef.current.style.height = '0px'
            const scrollHeight = textareaRef.current.scrollHeight
            textareaRef.current.style.height = scrollHeight + 'px'
            if (focus) {
                textareaRef.current.focus()
            }
        }
    }, [value])

    return (
        <textarea
            ref={textareaRef}
            className={className}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            name={name}
        />
    )
}

export default AutoHeightTextarea