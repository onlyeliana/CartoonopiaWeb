import React, { useEffect, useState } from 'react';
import { Col, Row, Space, Spin, Table, Tag, message } from 'antd';
import type { TableProps } from 'antd';
import { characterProps } from '../../../types/alltype';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useNavigate } from 'react-router';
import { getuserCollect } from '../../../api/user';
import { getCharacterList } from '../../../api/test';
// 规定一下
//这个页面是my favourite 也就是直接从用户id获得
// profile 页面只有list 不比较了
interface dynamicprops {
    [propname: string]: any
}
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


const columns2: TableProps<comparehistoryprops>['columns'] = [
    {
        title: 'compare history',
        dataIndex: 'leftid',
        key: 'leftid',
    },
    {
        dataIndex: 'rightid',
        key: 'rightid',
    },

];

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

interface comparehistoryprops {
    leftid: string,
    rightid: string,
    leftdata: characterProps,
    rightdata: characterProps
}


const FavouriteCom: React.FC = () => {
    // selectedRowKeys是当前被选择的英雄的id组
    // 控制这个数组不能超过两个元素
    // 1 情况1 第三个点击被拒绝
    // 2 情况2 点击已经点击的可以取消
    const [loading, setloading] = React.useState(true)
    const [selectedRowKeys, setSelectedRowKeys]
        = useState<React.Key[]>([]);
    const [selectedRowData, setSelectedRowData] = useState<dynamicprops[]>([])
    const [comparehistory, setcomparehistory] = useState<comparehistoryprops[]>([])
    const [favouriteids, setfavouriteids] = useState<string[]>([]);
    const [favouritelistdata, setfavouritelistdata] = useState<characterProps[]>([])


    const [left_hero_wincount, setleft_hero_wincount] = useState<number>(0);
    const [right_hero_wincount, setright_hero_wincount] = useState<number>(0);
    const handlehistory = (event: comparehistoryprops) => {
        console.log(event);
        const data = [event.leftdata, event.rightdata]
        setSelectedRowKeys([event.leftid, event.rightid])
        setSelectedRowData(data);
    }
    const dynamicShowCompareleftResult = (attributename: string) => {
        return (
            selectedRowData.length === 2 ?
                (selectedRowData[0][attributename] >= selectedRowData[1][attributename] ? <img src={require('./checkbox-marked-circ.png')} alt='' className="check-win-image"></img> : '') : ''
        )
    }
    const dynamicShowComparerightResult = (attributename: string) => {
        return (
            selectedRowData.length === 2 ?
                (selectedRowData[1][attributename] > selectedRowData[0][attributename] ? <img src={require('./checkbox-marked-circ.png')} alt='' className="check-win-image"></img> : '') : ''
        )
    }
    const onSelectChange = (newSelectedRowKeys: React.Key[], newSelectedRows: characterProps[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        console.log(newSelectedRows);

        // 1 情况1 第三个点击被拒绝
        if (newSelectedRowKeys.length > 2 && selectedRowKeys.length === 2) {
            message.warning("Select a maximum of two characters at the same time")
            return;
        }
        // 2 情况2 新数组的数量小于等于2 赋值

        setleft_hero_wincount(0);
        setright_hero_wincount(0);
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedRowData(newSelectedRows)
        if (newSelectedRows.length === 2) {
            const historyitem: comparehistoryprops = {
                leftid: newSelectedRows[0].id,
                rightid: newSelectedRows[1].id,
                leftdata: newSelectedRows[0],
                rightdata: newSelectedRows[1]
            }
            setcomparehistory([...comparehistory, historyitem])
            const left: characterProps = newSelectedRows[0];
            const right: characterProps = newSelectedRows[1];
            let leftwin = 0;
            let rightwin = 0;

            const keys: Array<keyof characterProps> = ["strength", "speed", "skill", "fear_factor", "power", "intelligence", "wealth"]
            keys.forEach(key => {
                if (left[key]! >= right[key]!) {
                    leftwin++;
                } else {
                    rightwin++;
                }
            })
            setleft_hero_wincount(leftwin);
            setright_hero_wincount(rightwin);

        }
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        hideSelectAll: true,
        columnTitle: 'Selected',
    };
    const { user } = useSelector((state: RootState) => state)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user.userInfo) {
            message.warning("please login first")
            navigate('/#/login')
        }
        const user_id = user.userInfo?.objectId;
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
            }
            setloading(false)
        })

    }, [])

    if (loading) {
        return <div>
            <Spin size='large'></Spin>
            <h4>loading</h4>
        </div >
    }

    return <div>
        <Row>
            <Col span={16} >
                <Table
                    style={{
                        width: '100%'
                    }}
                    rowKey={"id"}
                    rowSelection={rowSelection}
                    columns={columns} dataSource={favouritelistdata} /></Col>

            <Col span={6} offset={2}>
                <Table
                    style={{
                        width: '100%'
                    }}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                handlehistory(record)
                            }, // 点击行
                        };
                    }}
                    columns={columns2}
                    dataSource={comparehistory} />
            </Col>
        </Row>
        <div className='compare-show'>
            {/* 渲染 被选择的hero数组的比较结果 
            获取数组的信息 
            监听slectedRowdata数组变化*/}
            <div className="showIcon">
                <div className="center">
                    <div className="hero-left hero">
                        <p id="hero-left-title"></p>
                        <img src={selectedRowData[0] ? require(`../../../assets/${selectedRowData[0].image_url}`) : require('./../assets/questionmark.png')} alt='' />
                    </div>
                    <div className="vs">
                        vs
                    </div>
                    <div className="hero-right hero">
                        <p id="hero-right-title"></p>
                        <img src={selectedRowData[1] ? require(`../../../assets/${selectedRowData[1].image_url}`) : require('./../assets/questionmark.png')} alt='' />
                    </div>
                </div>
            </div>

            <div className="showData">
                <table id="compare-table">
                    <tbody>
                        <tr id="compare-strength">
                            <td className={`hero-left-result ${selectedRowKeys.length === 2 ? (left_hero_wincount > right_hero_wincount ? "win-back" : "loser-back") : ''} 
                        `}>
                                {/* 三种情况
                            只有 */}
                                {
                                    dynamicShowCompareleftResult("strength")}
                            </td>
                            <td className="hero-result-title">STRENGTH</td>
                            <td className={`hero-right-result ${selectedRowKeys.length === 2 ? (left_hero_wincount > right_hero_wincount ? "loser-back" : "win-back") : ''} 
                        `}>
                                {dynamicShowComparerightResult("strength")}

                            </td>
                        </tr>
                        <tr id="compare-speed">
                            <td className={`hero-left-result ${selectedRowKeys.length === 2 ? (left_hero_wincount > right_hero_wincount ? "win-back" : "loser-back") : ''} 
                        `}>
                                {
                                    dynamicShowCompareleftResult("speed")}
                            </td>
                            <td className="hero-result-title">SPEED</td>
                            <td className={`hero-right-result ${selectedRowKeys.length === 2 ? (left_hero_wincount > right_hero_wincount ? "loser-back" : "win-back") : ''} 
                        `}>
                                {dynamicShowComparerightResult("speed")}
                            </td>
                        </tr>
                        <tr id="compare-skill">
                            <td className={`hero-left-result ${selectedRowKeys.length === 2 ? (left_hero_wincount > right_hero_wincount ? "win-back" : "loser-back") : ''} 
                        `}>
                                {
                                    dynamicShowCompareleftResult("skill")}
                            </td>
                            <td className="hero-result-title">SKILL</td>
                            <td className={`hero-right-result ${selectedRowKeys.length === 2 ? (left_hero_wincount > right_hero_wincount ? "loser-back" : "win-back") : ''} 
                        `}>
                                {dynamicShowComparerightResult("skill")}
                            </td>
                        </tr>
                        <tr id="compare-fear">
                            <td className={`hero-left-result ${selectedRowKeys.length === 2 ? (left_hero_wincount > right_hero_wincount ? "win-back" : "loser-back") : ''} 
                        `}>
                                {
                                    dynamicShowCompareleftResult("fear_factor")}
                            </td>
                            <td className="hero-result-title">FEAR</td>
                            <td className={`hero-right-result ${selectedRowKeys.length === 2 ? (left_hero_wincount > right_hero_wincount ? "loser-back" : "win-back") : ''} 
                        `}>
                                {dynamicShowComparerightResult("fear_factor")}
                            </td>
                        </tr>
                        <tr id="compare-power">
                            <td className={`hero-left-result ${selectedRowKeys.length === 2 ? (left_hero_wincount > right_hero_wincount ? "win-back" : "loser-back") : ''} 
                        `}>
                                {
                                    dynamicShowCompareleftResult("power")}
                            </td>
                            <td className="hero-result-title">POWER</td>
                            <td className={`hero-right-result ${selectedRowKeys.length === 2 ? (left_hero_wincount > right_hero_wincount ? "loser-back" : "win-back") : ''} 
                        `}>
                                {dynamicShowComparerightResult("power")}
                            </td>
                        </tr>
                        <tr id="compare-intelligence">
                            <td className={`hero-left-result ${selectedRowKeys.length === 2 ? (left_hero_wincount > right_hero_wincount ? "win-back" : "loser-back") : ''} 
                        `}>
                                {
                                    dynamicShowCompareleftResult("intelligence")}
                            </td>
                            <td className="hero-result-title">INTELLIGENCE</td>
                            <td className={`hero-right-result ${selectedRowKeys.length === 2 ? (left_hero_wincount > right_hero_wincount ? "loser-back" : "win-back") : ''} 
                        `}>
                                {dynamicShowComparerightResult("intelligence")}
                            </td>
                        </tr>
                        <tr id="compare-wealth">
                            <td className={`hero-left-result ${selectedRowKeys.length === 2 ? (left_hero_wincount > right_hero_wincount ? "win-back" : "loser-back") : ''} 
                        `}>
                                {
                                    dynamicShowCompareleftResult("wealth")}
                            </td>
                            <td className="hero-result-title">WEALTH</td>
                            <td className={`hero-right-result ${selectedRowKeys.length === 2 ? (left_hero_wincount > right_hero_wincount ? "loser-back" : "win-back") : ''} 
                        `}>
                                {dynamicShowComparerightResult("wealth")}
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </div>

    </div >
};

export default FavouriteCom;