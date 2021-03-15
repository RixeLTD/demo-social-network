import React, {useEffect, useState} from 'react'
import './Navbar.scss'
import {Link, RouteComponentProps, withRouter} from 'react-router-dom'
import {Grid, Menu} from 'antd'
import {TeamOutlined, UserOutlined} from '@ant-design/icons'
import {Preloader} from '../common/preloader/Preloader'

type PropsType = {
    setCollapsed: (collapsed: boolean) => void
}
const Navbar: React.FC<PropsType & RouteComponentProps<{ key: string }>> = ({
                                      setCollapsed,
                                     location
                                  }) => {
    const [key, setKey] = useState<string>('')

    useEffect(() => {
        setKey(location.pathname)
    }, [location.pathname])

    const {useBreakpoint} = Grid
    const {md} = useBreakpoint()

    const onClick = () => {
        window.scrollTo({top: 0})
        if (!md) {
            setCollapsed(true)
        }
    }

    if (!key) {
        return <Preloader />
    }

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={[key]}
            style={{height: '100%', borderRight: 0, fontSize: 16, fontWeight: 'bold', backgroundColor: '#f0f2f5'}}
        >
            <Menu.Item key="/profile/" icon={<UserOutlined/>}>
                <Link to={'/profile/'} onClick={onClick}>
                    Профиль
                </Link>
            </Menu.Item>
            <Menu.Item key="/dialogs/" icon={<UserOutlined/>}>
                <Link to={'/dialogs/'} onClick={onClick}>
                    Сообщения
                </Link>
            </Menu.Item>
            <Menu.Item key="/users/" icon={<TeamOutlined/>}>
                <Link to={'/users/'} onClick={onClick}>
                    Пользователи
                </Link>
            </Menu.Item>
        </Menu>
    )
}

export default withRouter(Navbar)