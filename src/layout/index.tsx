import React, { useEffect, useState } from 'react';
import { Col, Dropdown, Layout, Row, message, theme } from 'antd';
import SideMenu from './components/SideMenu';
import { AppHeader } from './components/AppHeader';
import { Outlet, useLocation } from 'react-router-dom';
import { mainRoutesProps } from '../router/inter';
import { UserOutlined, HeartTwoTone, RightCircleTwoTone } from '@ant-design/icons';

import { mainRoutes } from '../router';
import { AppBreadCrumb } from './components/AppBreadCrumb';
import { MenuProps } from 'antd/lib';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { loginFail } from '../store/modules/user';


const { Content, Sider } = Layout;
const hidden: React.CSSProperties = {
    display: "none",
}
const userbar: React.CSSProperties = {
    marginTop: '5px',
    paddingRight: '30px',
}

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation()
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const dispatch = useDispatch()
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        // message.info('Click on menu item.');

        console.log('click', e);
        if (e.key === '2') {
            dispatch(loginFail());
            message.warning("You have logged out")
        }
    };
    const items: MenuProps['items'] = [
        {
            label: 'Setting',
            key: '1',
            icon: <HeartTwoTone twoToneColor="#eb2f96" />
        },
        {
            icon: <RightCircleTwoTone twoToneColor="#eb2f96" />,
            label: 'sign Out',
            key: '2',
        }]
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const { user } = useSelector((state: RootState) => state);
    console.log(user);

    useEffect(() => {
        let arr: mainRoutesProps[] = [];
        mainRoutes.forEach((item) => {
            if (item.children) {
                arr = [...arr, ...item.children]
            } else {
                arr.push(item);
            }
        })


    }, [])

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <h1 style={{ textAlign: "center" }}>Cartoonopia</h1>
                <div className="demo-logo-vertical" />
                <SideMenu></SideMenu>
            </Sider>
            <Layout>
                <div style={location.pathname.includes("/hero") ? hidden : {}}><AppHeader></AppHeader> <Row id='userbar' style={userbar} justify={"end"}>
                    <Col>
                        <Dropdown.Button
                            type='link'
                            menu={menuProps}
                            icon={<UserOutlined />}>
                            {user.userInfo ? user.userInfo.firstname : 'Not login'}
                        </Dropdown.Button></Col>
                </Row></div>

                <Content style={{ margin: '0 16px' }}>
                    <AppBreadCrumb></AppBreadCrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {/*  显示的页面 
                        配置路由 显示views
                         */}
                        <Outlet></Outlet>
                    </div>
                </Content>

            </Layout>
        </Layout >
    );
};

export default MainLayout;