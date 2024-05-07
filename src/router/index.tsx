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
import { HeroDetail } from '../views/Hero/HeroDetail';
import { UserProfile } from '../views/User/UserProfile';
import { Community } from '../views/User/Community';
import AddCharacterForm from '../views/Hero/components/AddCharacterForm';
import AddHero from '../views/Hero/AddHero';
import { Favourites } from '../views/User/Favourites';
import { Contributions } from '../views/User/Contributions';
// 如何动态渲染路由 

export const mainRoutes: Array<mainRoutesProps> = [
    // {  不要在主面板  和主面板同级
    //     key: '/login',// 侧边栏英雄界面
    //     label: 'login',
    //     title: 'login',
    //     element: <Login></Login>
    // },
    {
        key: '/hero',// 侧边栏英雄界面
        icon: <PieChartOutlined></PieChartOutlined>,
        label: 'Characters',
        title: 'Characters',
        children: [
            {
                key: '/hero/home',// 处理普通用户请求
                label: 'HeroHome',
                title: 'HeroHome',
                element: <Hero></Hero>
            },
            {
                key: '/hero/addHero',// 处理普通用户请求
                label: 'AddHero',
                title: 'AddHero',
                element: <AddHero></AddHero>
            }
        ]
    },
    {
        key: '/hero/:id',// 侧边栏英雄界面
        icon: <PieChartOutlined></PieChartOutlined>,
        label: 'CharactersDetail',
        title: 'CharactersDetail',
        element: <HeroDetail></HeroDetail>,
        hidden: true
    },
    {
        key: '/user/userprofile/:id',// 访问其他用户的首页
        label: 'UserProfile',
        title: 'UserProfile',
        element: <UserProfile></UserProfile>,
        hidden: true
    },
    {
        key: '/user',// 侧边栏用户信息
        icon: <UserOutlined></UserOutlined>,
        label: 'UserChannel',
        title: 'UserChannel',
        children: [
            {
                key: '/user/userprofile',// 处理普通用户请求
                label: 'UserProfile',
                title: 'UserProfile',
                element: <UserProfile></UserProfile>
            },
            {
                key: '/user/myfavourites',// 显示其他用户 社群 可以点击进入对应的资料界面
                label: 'My Favourites',
                title: 'My Favourites',
                element: <Favourites></Favourites>
            },
            {
                key: '/user/mycontributions',// 显示其他用户 社群 可以点击进入对应的资料界面
                label: 'My Contributions',
                title: 'My Contributions',
                element: <Contributions></Contributions>
            },
            {
                key: '/user/community',// 显示其他用户 社群 可以点击进入对应的资料界面
                label: 'Community',
                title: 'Community',
                element: <Community></Community>
            },
        ]
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