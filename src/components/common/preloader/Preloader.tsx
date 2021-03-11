import React from 'react'
import s from './Preloader.module.scss'

export const Preloader: React.FC = () => {

    return (
        <div className={s.ldsBlock}>
            <div className={s.ldsDefault}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}