import React from 'react'
import './Navbar.scss'
import {Link} from 'react-router-dom'
import {Menu} from 'antd'
import {TeamOutlined, UserOutlined} from '@ant-design/icons'

export const Navbar: React.FC = () => {

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{height: '100%', borderRight: 0, fontSize: 16, fontWeight: 'bold', backgroundColor: '#f0f2f5'}}
        >
            <Menu.Item key="1" icon={<UserOutlined/>}>
                <Link to={'/profile/'}>
                    Профиль
                </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined/>}>
                <Link to={'/dialogs/'}>
                    Сообщения
                </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined/>}>
                <Link to={'/users/'}>
                    Пользователи
                </Link>
            </Menu.Item>
        </Menu>
    )
}