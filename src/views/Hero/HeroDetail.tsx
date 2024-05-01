import * as React from 'react';
import { characterProps } from '../../types/alltype';
import { ProCard } from '@ant-design/pro-components';
import { Button, Col, Drawer, Image, Row, Spin } from 'antd';
import { getCharacterbyid } from '../../api/test';
import { useParams } from 'react-router-dom';
import EditCharacterForm from './components/EditCharacterForm';

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
    const [characterData, setCharacterData] = React.useState<characterProps>({} as characterProps);
    const [loading, setloading] = React.useState(true)
    const [open, setOpen] = React.useState(false);
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const { id } = useParams();
    console.log(id);
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
                <Row justify="end">
                    <Col>
                        <Button type='primary' size='large' shape='round'
                            onClick={showDrawer}
                        >
                            Edit Character
                        </Button></Col>
                </Row>
            </div>
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
