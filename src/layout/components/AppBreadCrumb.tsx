import { Breadcrumb } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { mainRoutesProps } from '../../router/inter';
import { mainRoutes } from '../../router';
import { ReactNode, useEffect, useState } from 'react';
interface IAppProps {
}
type BreadcrumbType = {
    title: string | ReactNode;
};
const breacrumbMap: Record<string, string> = {
    // '/dashboard':"数据统计",
};

const getBreadcrumbMap = (arr: mainRoutesProps[]) => {
    arr.forEach((item) => {
        breacrumbMap[item.key] = item.title;
        if (item.children) {
            getBreadcrumbMap(item.children);
        }
    });
};
getBreadcrumbMap(mainRoutes);

export function AppBreadCrumb(props: IAppProps) {
    const location = useLocation();
    const [items, setItems] = useState<Array<BreadcrumbType>>([]);
    useEffect(() => {
        //如果路径是 /system/role ,期望变成 ['/system','/system/role']
        let pathArr = location.pathname.split("/").filter((i) => i); //['system','role']
        // slice
        let newItems: BreadcrumbType[] = [{
            title: <a href='/home'>home</a>
        }];
        pathArr.forEach((_, i) => {
            let url = `/${pathArr.slice(0, i + 1).join("/")}`;
            newItems.push({
                title: breacrumbMap[url],
            });
        });
        setItems(newItems);
    }, [location.pathname]);

    return (
        <Breadcrumb style={{ margin: '16px 0' }} items={items} />
    );
}
