import React, {ChangeEvent, useEffect} from 'react'
import {Input} from 'antd'

export type AutoSizeTextareaProps = {
    name?: string
    placeholder?: string
    focus?: {}
    value?: string
    onChange?: (value: ChangeEvent<HTMLTextAreaElement>) => void
    style?: {}
    maxLength?: number
    autoSize?: { minRows: number } | boolean
    showCount?: boolean
    onBlur?: () => void
    onPressEnter?: () => void
    onKeyUp: (e: any) => void
}
export const AutoSizeTextarea = ({sharedProps}: any) => {

    const inputRef = React.useRef<any>(null)

    useEffect(() => {
        if (sharedProps.focus) inputRef.current!.focus(sharedProps.focus)
    }, [sharedProps.focus ,inputRef])

    return (
        <Input.TextArea
            {...sharedProps}
            ref={inputRef}
        />
    )
}