import React, { useEffect, useState } from 'react';
import { Spin, Table, message } from 'antd';
import type { TableProps } from 'antd';
import { characterProps } from '../../../types/alltype';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useLocation, useNavigate, useParams } from 'react-router';
import { getuserCollect } from '../../../api/user';
import { getCharacterList } from '../../../api/test';
// 规定一下
//这个页面是my favourite 也就是直接从用户id获得
// profile 页面只有list 不比较了

interface CharacterListType {
    "name": string,
    "strength": number,
    "speed": number,
    "skill": number,
    "fear_factor": number,
    "power": number,
    "intelligence": number,
    "wealth": number
}




const columns: TableProps<characterProps>['columns'] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
            return <a href={'/#/hero/' + record.id}> {text}</a >
        }
    },
    {
        title: 'Strength',
        dataIndex: 'strength',
        key: 'strength',
    },
    {
        title: 'Speed',
        dataIndex: 'speed',
        key: 'speed',
    },
    {
        title: 'Skill',
        key: 'skill',
        dataIndex: 'skill',
    },
    {
        title: 'Fear Factor',
        key: 'fear_factor',
        dataIndex: 'fear_factor',
    },
    {
        title: 'Power',
        key: 'power',
        dataIndex: 'power',
    },
    {
        title: 'Intelligence',
        key: 'intelligence',
        dataIndex: 'intelligence',
    },
    {
        title: 'Wealth',
        key: 'wealth',
        dataIndex: 'wealth',
    },
];




const SimpleFavouriteTable: React.FC = () => {
    // selectedRowKeys是当前被选择的英雄的id组
    // 控制这个数组不能超过两个元素
    // 1 情况1 第三个点击被拒绝
    // 2 情况2 点击已经点击的可以取消
    const [loading, setloading] = React.useState(true)
    const [favouriteids, setfavouriteids] = useState<string[]>([]);
    const [favouritelistdata, setfavouritelistdata] = useState<characterProps[]>([])



    const { user } = useSelector((state: RootState) => state)
    const navigate = useNavigate()
    const params = useParams();
    const location = useLocation()
    useEffect(() => {
        //要判断这是自己的还是带有id的
        console.log(params, 'params');
        console.log(location, 'location');
        let user_id: string | undefined = '';
        if (params && params.id && params.id.length > 0) {
            user_id = params.id;
        } else {
            if (!user.userInfo) {
                message.warning("please login first")
                navigate('/#/login')
            }
            user_id = user.userInfo?.objectId;
        }
        getuserCollect(user_id!).then(res => {
            console.log(res);
            if (res.data.results.length > 0) {
                const characters: string[] = res.data.results[0].characters;
                if (characters.length > 0) {
                    getCharacterList().then(res => {
                        // 遍历整个数组找到喜欢的hero
                        const list: characterProps[] = res.data.results;
                        const favoritelist: characterProps[] = []
                        list.forEach(item => {
                            if (characters.includes(item.id)) {
                                console.log(item, 'favourite');
                                favoritelist.push(item)
                            }
                        })
                        setfavouriteids(characters);
                        setfavouritelistdata(favoritelist)
                        setloading(false)
                    })
                }
            } else {
                console.log('喜欢列表为空');
                setloading(false)

            }
        })
    }, [])

    if (loading) {
        return <div>
            <Spin size='large'></Spin>
            <h4>loading</h4>
        </div >
    }

    return <div>
        <Table
            style={{
                width: '100%'
            }}
            rowKey={"id"}
            columns={columns} dataSource={favouritelistdata} />

    </div >
};
export default SimpleFavouriteTable;