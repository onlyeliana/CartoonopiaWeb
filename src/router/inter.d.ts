import { ReactNode } from "react";

// 指定数据类型
export interface mainRoutesProps {
    key: string,// 侧边栏英雄界面
    icon?: ReactNode,
    label: string,
    title: string,
    element?: ReactNode,
    children?: mainRoutesProps[],
    hidden?: boolean
}