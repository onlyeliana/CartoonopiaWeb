import * as React from 'react';
import { characterProps, favouriteAddParams, favouriteDatasetProps } from '../../types/alltype';
import { ProCard } from '@ant-design/pro-components';
import { Button, Col, Drawer, Image, Modal, Row, Spin, message } from 'antd';
import { getCharacterbyid } from '../../api/test';
import { useParams } from 'react-router-dom';
import EditCharacterForm from './components/EditCharacterForm';
import { HeartTwoTone } from '@ant-design/icons';
import { Space } from 'antd';
import { adduserCollect, getuserCollect, removeuserCollect } from '../../api/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface IAppProps {
}
// const characterData: characterProps = {
//     "id": "batman",
//     "active": true,
//     "name": "Batman",
//     "subtitle": "The Dark Knight",
//     "description": "Batman is a fictional superhero appearing in American comic books published by DC Comics. The character was created by artist Bob Kane and writer Bill Finger, and first appeared in Detective Comics #27 in 1939.",
//     "image_url": "images/batman.jpg",
//     "strength": 40,
//     "speed": 40,
//     "skill": 90,
//     "fear_factor": 80,
//     "power": 80,
//     "intelligence": 90,
//     "wealth": 100
// }
const rowstyle: React.CSSProperties = {
    height: '800px',
    color: 'grey'
}
const rowdata: React.CSSProperties = {
    color: 'grey',
    lineHeight: '30px',
    fontWeight: 700

}
const headstyle: React.CSSProperties = {
    height: '170px',
    backgroundColor: '#08101A',
    fontStyle: 'italic',
    fontSize: '30px',
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundImage: "url(" + require("../../assets/pink-purple-smoke.jpg") + ")",
    backgroundPosition: "center",
    paddingTop: 50
}
const leftspan = 4;
const rightspan = 10;
const offset = 10;

const label: React.CSSProperties = {
    fontSize: '16px',
}

export function HeroDetail() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const [characterData, setCharacterData] = React.useState<characterProps>({} as characterProps);
    const [collect, setCollect] = React.useState(false)
    const [loading, setloading] = React.useState(true)
    const [open, setOpen] = React.useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        handleUnCollect()
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onClose = () => {
        setOpen(false);
    };
    const { id } = useParams();
    const { user } = useSelector((state: RootState) => state)
    console.log(id);
    const handleUnCollect = () => {
        if (collect) {
            const user_id = user.userInfo?.objectId;

            if (user_id && id) {
                const favouriteRemoveParams = {
                    user_id,
                    characters: id
                }
                removeuserCollect(favouriteRemoveParams).then(
                    res => {
                        if (res.status === 200) {
                            setCollect(false);
                            message.warning("Cancel like success")
                        }
                    }
                )
            }

        }
    }
    const handleCollect = () => {
        if (!collect) {
            const user_id = user.userInfo?.objectId;
            if (user_id && user_id.length > 0 && id) {
                const data: favouriteAddParams = {
                    user_id,
                    characters: id
                }
                console.log(data);

                adduserCollect(data).then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        message.success("Add to favourite success")
                    }
                    setCollect(true)
                    // getuserCollect(user_id).then(res => {
                    //     console.log(res)
                    //     setCollect(true)
                    // })
                })
            } else {
                message.warning("please login first")
            }
        }
    }
    React.useEffect(() => {
        if (id?.length === 0) {
            return
        }
        getCharacterbyid({
            id: id as string,
        }).then(res => {
            const realdata = res.data.results[0];
            setCharacterData(realdata);
            setloading(false);
        })
        // 从数据库查找用户 收藏夹
        // 三种情况 1 没有建立过收藏夹 2 有收藏夹但是没有这个英雄 3 有收藏夹且收藏了这个英雄
        const user_id = user.userInfo?.objectId; // 用户id获得
        if (user_id) {
            getuserCollect(user_id).then(res => {
                // 1 没有建立过收藏夹
                console.log();
                if (res.data.results.length === 0) {
                } else {
                    const data: favouriteDatasetProps = res.data.results[0];
                    const { characters } = data;
                    //2 有收藏夹但是没有这个英雄 
                    characters.forEach(item => {
                        if (item === id) {
                            //3 有收藏夹且收藏了这个英雄
                            setCollect(true);
                            console.log('shoucangle ');
                        }
                    })
                }
            })
        }

    }, [])
    if (loading) {
        return <div>
            <Spin size='large'></Spin>
            <h4>loading</h4>
        </div >
    }
    return (
        <div id='hero_detail_main'>
            <div className='header' style={headstyle}>
                <div>{characterData.subtitle}</div>
                <div>{characterData.name}</div>
            </div>
            <div id='main-action' style={{ margin: 20 }}>
                <Row justify="space-between">

                    <Col>
                        <Button type='primary' size='large' shape='round'
                            onClick={showDrawer}
                        >
                            Edit Character
                        </Button></Col>
                    <Col>
                        {collect ? <Button type='text' shape='round'
                            onClick={showModal}
                            className='handelCollectButton'
                        >
                            {
                                <HeartTwoTone twoToneColor="#000000"
                                    style={{
                                        fontSize: 25
                                    }} />
                            }
                        </Button>
                            : <Button type='text' shape='round'
                                onClick={handleCollect}
                                className='unCollectButton'
                            >
                                {
                                    <HeartTwoTone twoToneColor="#eb2f96"
                                        style={{
                                            fontSize: 25
                                        }} />
                                }

                            </Button>}
                    </Col>
                </Row>
            </div>
            <Modal title="Cancel Favourite " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                Are you sure you don't like this hero anymore？
            </Modal>
            <ProCard split="vertical" style={rowstyle}>
                <ProCard colSpan="55%" title={<h1 style={{
                    color: 'grey',
                }}>{characterData.subtitle}</h1>}>
                    <Image width="100%" src={require(`../../assets/${characterData.image_url}`)}></Image>
                </ProCard>
                <ProCard title={<h2 style={{ color: 'grey' }}>{characterData.name}</h2>} headerBordered >
                    <div style={{ height: "100%" }}>
                        <Row style={rowdata}>
                            <Col span={leftspan} style={label}>name</Col>
                            <Col offset={offset} span={rightspan} style={label}>{characterData.name}</Col>
                        </Row>
                        <Row style={rowdata}>
                            <Col span={4} style={label}>subtitle</Col>
                            <Col offset={offset} span={rightspan} style={label}>{characterData.subtitle}</Col>
                        </Row>
                        <Row style={rowdata}>
                            <Col span={leftspan} style={label}>description</Col>
                            <Col offset={offset} span={rightspan} style={label}>{characterData.description}</Col>
                        </Row>
                        <Row style={rowdata}>
                            <Col span={leftspan} style={label}>createdBy</Col>
                            <Col offset={offset} span={rightspan} style={label}>{characterData.createdBy}</Col>
                        </Row>
                        <Row style={rowdata}>
                            <Col span={leftspan} style={label}>updatedBy</Col>
                            <Col offset={offset} span={rightspan} style={label}>{characterData.updatedBy}</Col>
                        </Row>
                        <h4 style={{ color: 'purple' }}>ATTRIBUTES</h4>
                        <Row style={rowdata}>
                            <Col span={leftspan} style={label}>strength</Col>
                            <Col offset={offset} span={rightspan} style={label}>{characterData.strength}</Col>
                        </Row>
                        <Row style={rowdata}>
                            <Col span={leftspan} style={label}>speed</Col>
                            <Col offset={offset} span={rightspan} style={label}>{characterData.speed}</Col>
                        </Row>
                        <Row style={rowdata}>
                            <Col span={leftspan} style={label}>skill</Col>
                            <Col offset={offset} span={rightspan} style={label}>{characterData.skill}</Col>
                        </Row>
                        <Row style={rowdata}>
                            <Col span={leftspan} style={label}>fear_factor</Col>
                            <Col offset={offset} span={rightspan} style={label}>{characterData.fear_factor}</Col>
                        </Row>
                        <Row style={rowdata}>
                            <Col span={leftspan} style={label}>power</Col>
                            <Col offset={offset} span={rightspan} style={label}>{characterData.power}</Col>
                        </Row>
                        <Row style={rowdata}>
                            <Col span={leftspan} style={label}>intelligence</Col>
                            <Col offset={offset} span={rightspan} style={label}>{characterData.intelligence}</Col>
                        </Row>
                        <Row style={rowdata}>
                            <Col span={4} style={label}>wealth</Col>
                            <Col offset={offset} span={rightspan} style={label}>{characterData.wealth}</Col>
                        </Row>
                    </div>
                </ProCard>
            </ProCard>
            <Drawer title="Editing Characters" onClose={onClose} open={open} width={450}>
                <EditCharacterForm cid={characterData.id} characterdata={characterData} ></EditCharacterForm>
            </Drawer>
        </div >
    );
}
