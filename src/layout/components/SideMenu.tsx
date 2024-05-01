import * as React from 'react';
import { Menu } from 'antd';
import { mainRoutes } from '../../router';
import { useNavigate, useLocation } from 'react-router-dom';
import { cloneDeep } from 'lodash-es'
import { mainRoutesProps } from '../../router/inter';

interface IAppProps {
}
// 递归
function filterRoutes(initialRoutes: mainRoutesProps[]) {
    //深拷贝 不能影响原始数据 lodash-es
    let routes = cloneDeep(initialRoutes);
    function loop(arr: mainRoutesProps[]) {
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i].hidden) {
                arr.splice(i, 1)
            } else if (arr[i] && arr[i].children) {
                loop(arr[i].children as mainRoutesProps[])
            }
        }
    }
    loop(routes);
    return routes;
}

export default function SideMenu(props: IAppProps) {
    let navigate = useNavigate();//获取编程导航 
    let location = useLocation();
    let [realRoutes, setRealRoutes] = React.useState<Array<mainRoutesProps>>([]);
    React.useEffect(() => {
        const routes = filterRoutes(mainRoutes);
        setRealRoutes(routes)
    }, [])
    console.log(location);
    function handleMenu({ key }: { key: string }) {
        navigate(key); //页面跳转
    }
    return (
        <div>
            <Menu defaultSelectedKeys={['1']} mode="inline" items={realRoutes}
                onClick={handleMenu}
                selectedKeys={[location.pathname]} />
        </div>
    );
}
