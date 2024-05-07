import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { userLoginAsync } from '../../store/modules/user';
import { userInfoProps } from '../../types/alltype';
import { useNavigate } from 'react-router-dom';
const onstyle: React.CSSProperties = {
    position: "absolute",
    width: "1600px",

}


const offstyle: React.CSSProperties = {
    position: "absolute",
    width: "1600px",
    opacity: 0
}

const Login: React.FC = () => {
    const [start, setstart] = useState(offstyle);
    const state = useSelector((state: RootState) => state); /**
    * {user: {
    * }}
    */
    // console.log(state);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        userLoginAsync(values, dispatch, navigate);
    };
    const changeStyle = () => {
        setTimeout(() => {
            setstart(onstyle);
        }, 2000); // 2000毫秒后更改样式
    };
    useEffect(() => {
        changeStyle()
    }, [])

    return (
        <Spin spinning={state.user.isLoading}>
            <div style={{
                width: "100%",
                height: "100vh",
                backgroundColor: 'pink',
                backgroundImage: `url(${require('../../assets/2022-Key-Art.jpg')})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative"
            }}>
                <video autoPlay muted style={onstyle}>
                    <source src="https://n.v.netease.com/2024/0328/3e7de604b3ab4a02ec3e0a85270322cc.mp4" type="video/webm" />
                </video>
                <video id="videoLoop" muted loop autoPlay style={start} >
                    <source src="https://n.v.netease.com/2024/0328/a7cafddc32ede18f267c78deaeb6a0d8.mp4" type="video/mp4"
                    />
                </video>
                <Card title={<h3
                    style={{
                        color: '#ffffff',
                        fontSize: '30px'
                    }}>Character system</h3>}
                    bordered={false}

                    style={{
                        width: 400,
                        height: 350,
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        margin: "auto",
                        backgroundColor: 'rgba(255,255,255,0.2)',
                    }}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                {
                                    pattern: /^[A-Za-z0-9.\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/,
                                    message: 'Please enter the correct email address'
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' },

                            { min: 6, message: "The password must contain more than 6 characters" }
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox style={{ color: "#ffffff" }}>Remember me</Checkbox>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item style={{ color: "#ffffff" }}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="/#/register">register now!</a>
                        </Form.Item>
                    </Form>
                </Card >
            </div>
        </Spin>

    );
};

export default Login;