import React, { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import SideMenu from './components/SideMenu';
import { AppHeader } from './components/AppHeader';
import { Route, Routes, Navigate } from 'react-router-dom';
import { mainRoutesProps } from '../router/inter';

import { mainRoutes } from '../router';
import { AppBreadCrumb } from './components/AppBreadCrumb';

const { Content, Sider } = Layout;

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [realRoutes, setRealRoutes] = useState<Array<mainRoutesProps>>([]);
    useEffect(() => {
        let arr: mainRoutesProps[] = [];
        mainRoutes.forEach((item) => {
            if (item.children) {
                arr = [...arr, ...item.children]
            } else {
                arr.push(item);
            }
        })
        setRealRoutes(arr)
    }, [])
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <h1 style={{ textAlign: "center" }}>Cartoonopia</h1>
                <div className="demo-logo-vertical" />
                <SideMenu></SideMenu>
            </Sider>
            <Layout>
                <AppHeader></AppHeader>
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
                        <Routes>
                            <Route path='/' element={<Navigate to={'/hero'}></Navigate>}></Route>
                            {realRoutes.map(item => {
                                return <Route path={item.key} element={item.element}></Route>
                            })}
                        </Routes>
                    </div>
                </Content>

            </Layout>
        </Layout >
    );
};

export default MainLayout;