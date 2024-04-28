import {
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Hero } from '../views/Hero';
import { User } from '../views/User/Index';
import { Admin } from '../views/Admin';
import { Role } from '../views/System/Role';
import { mainRoutesProps } from './inter';
import { Request } from '../views/System/Request';
// 如何动态渲染路由 

export const mainRoutes: Array<mainRoutesProps> = [
    {
        key: '/hero',// 侧边栏英雄界面
        icon: <PieChartOutlined></PieChartOutlined>,
        label: 'Characters',
        title: 'Characters',
        element: <Hero></Hero>
    },
    {
        key: '/user',// 侧边栏用户信息
        icon: <UserOutlined></UserOutlined>,
        label: 'User Profile',
        title: 'User Profile',
        element: <User></User>
    },
    {
        key: '/admin',// 侧边栏管理管理页面
        icon: <TeamOutlined></TeamOutlined>,
        label: 'Admin',
        title: 'Admin',
        element: <Admin></Admin>
    },
    {
        key: '/system',// 侧边栏系统管理页面 只有管理员可以访问这个路由
        icon: <TeamOutlined></TeamOutlined>,
        label: 'System',
        title: 'System',
        children: [
            {
                key: '/system/request',// 处理普通用户请求
                label: 'Request',
                title: 'Request',
                element: <Request></Request>
            },
            {
                key: '/system/role',// 修改用户的权限
                label: 'Role',
                title: 'Role',
                element: <Role></Role>
            },
        ]
    }
]