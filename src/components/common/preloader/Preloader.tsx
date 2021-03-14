import React from 'react'
import s from './Preloader.module.scss'
import { Spin, Space } from 'antd';

export const Preloader: React.FC = () => {

    return (
        <div className={s.preloader}>
            <Space size="middle">
                <Spin size="large" />
            </Space>
        </div>

    )
}