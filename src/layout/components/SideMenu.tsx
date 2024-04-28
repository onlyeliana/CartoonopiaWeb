import * as React from 'react';
import { Menu } from 'antd';
import { mainRoutes } from '../../router';
import { useNavigate, useLocation } from 'react-router-dom';

interface IAppProps {
}


export default function SideMenu(props: IAppProps) {
    let navigate = useNavigate();//获取编程导航 
    let location = useLocation();
    console.log(location);
    function handleMenu({ key }: { key: string }) {
        navigate(key); //页面跳转
    }

    return (
        <div>
            <Menu defaultSelectedKeys={['1']} mode="inline" items={mainRoutes}
                onClick={handleMenu}
                selectedKeys={[location.pathname]} />
        </div>
    );
}
