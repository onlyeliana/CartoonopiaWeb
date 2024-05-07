import * as React from 'react';
import '../assets/index.css'
import { userInfoProps } from '../../../types/alltype';
import { Space, Spin, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { getallusers } from '../../../api/user';
interface IAppProps {
}
// 获得全部的用户 放在table里展示 
// 用户的数据类型
//展示和数组


const columns: TableProps<userInfoProps>['columns'] = [
    // {
    //     title: 'objectId',
    //     dataIndex: 'oid',
    //     key: 'oid',
    //     render: (text) => <a>{text}</a>,
    // },
    {
        title: 'Firstname',
        dataIndex: 'firstname',
        key: 'firstname',
    },
    {
        title: 'Lastname',
        dataIndex: 'lastname',
        key: 'lastname',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a href={'/#/userprofile/' + record.objectId} >visit</a>
            </Space >
        ),
    },
];



export function Community(props: IAppProps) {
    const [userdatas, setuserdatas] = React.useState<userInfoProps[]>([])
    const [loading, setloading] = React.useState(true)

    React.useEffect(() => {
        getallusers().then(res => {
            console.log(res, 'users');
            setloading(false)
            if (res && res.data.results.length > 0) {
                setuserdatas(res.data.results as userInfoProps[])
            }
        })
    })
    if (loading) {
        return <div>
            <Spin size='large'></Spin>
            <h4>loading</h4>
        </div >
    }
    return (

        <div>
            <div className="mini-header" style={{
                position: 'sticky',
                top: 0
            }} id="mini-header">
                <div className="nav-link">
                    <ul className="nav-link-ul">
                        <li className="nav-link-item">
                            <a className="link" href="/#/userprofile" id="nav-anime">profile</a>
                        </li>
                        <li className="nav-link-item"><a className="link" href="/#/userfavourites" id="nav-game">favourites</a>
                        </li>
                        <li className="nav-link-item"><a className="link" href="/#/usercontributions" id="nav-game">contributions</a>
                        </li>
                        <li className="nav-link-item"><a className="link" href="/#/usercommunity" id="nav-live">community</a>
                        </li>
                        <li className="nav-link-item"><a className="link" href="/#/user/userprofile" id="nav-live">return</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="shell">
                <header style={{
                    height: '300px'
                }}>
                    <div className="img"
                        style={{
                            background: `url(${require('../assets/9image.png')})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>

                    </div>
                </header>
                <div className="main">
                    <main>
                        <article style={
                            {
                                width: '90%'
                            }
                        }>
                            <div className='favourite-part'>
                                <h1>Community</h1>
                                <Table columns={columns} dataSource={userdatas} />
                            </div>
                        </article>
                    </main>
                </div>
            </div>
        </div >
    );
}
