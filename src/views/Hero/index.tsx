import { useEffect, useState } from 'react';
import HeroBanner from './components/HeroBanner';
import { Flex, Card, Button, Modal } from 'antd';
import { characterProps } from '../../types/alltype';
import { getCharacterList } from '../../api/test';
import AddCharacterForm from './components/AddCharacterForm';
import { Link } from 'react-router-dom';

interface IAppProps {
}
const { Meta } = Card;
const characterimg: React.CSSProperties = {
    width: '100%',
    height: '160px'
}

export function Hero(props: IAppProps) {
    const [charcterlist, setcharacterlist] = useState<Array<characterProps>>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
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
    useEffect(() => {
        getCharacterList().then(res => {
            console.log(res);
            setcharacterlist(res?.data?.results)
        })
    }, [])
    return (
        <div id='main-content'>
            <HeroBanner></HeroBanner>
            {/* 这里是渲染英雄列表 */}
            {/* 先从一个card 静态数据开始 flex布局*/}
            <h1 style={{ textAlign: "center", fontSize: '60px' }}>
                <div style={{ fontSize: '20px' }}> CHOOSE YOUR</div>
                CHARACTER
            </h1>
            <Flex justify='end'>
                {/* 增加按钮 点击弹出一个model */}
                <Button type='primary' onClick={showModal}>Add character</Button>
            </Flex>
            {/* list 数组渲染 */}
            <Flex wrap='wrap' gap="middle" style={{ padding: '30px' }} justify='space-between'>
                {
                    charcterlist.map(characterData => {
                        return <Link to={'/hero/' + characterData.id} key={'/hero/' + characterData.id}>
                            <Card
                                hoverable
                                style={{ width: 250 }}
                                cover={
                                    <img alt="example" src={require(`../../assets/${characterData.image_url}`)}
                                        style={characterimg}
                                    />}
                            >
                                <Meta title={characterData.name} description={characterData.subtitle} />
                            </Card></Link>
                    })
                }
            </Flex>
            <Modal title="Adding New Characters" open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}>
                {/* 父传子 */}
                <AddCharacterForm onOk={handleOk}></AddCharacterForm>
            </Modal>
        </div>
    );
}
