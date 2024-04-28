import { Header } from 'antd/es/layout/layout';
import * as React from 'react';


interface IAppProps {
}

export function AppHeader(props: IAppProps) {
    return (
        <div>
            <Header style={{
                padding: 0, background: '#efdbff', height: "100px", backgroundImage: "url(" + require("../../assets/pink-purple-smoke.jpg") + ")",
                backgroundPosition: "center"
            }}>
            </Header>
        </div >
    );
}

