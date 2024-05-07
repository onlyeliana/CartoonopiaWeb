import React, { useState } from 'react';
import { Button, Form, Input, Spin, message } from 'antd';
import { Card } from 'antd';
import { userInfoProps } from '../../types/alltype';
import { addUser } from '../../api/user';
import { useNavigate } from 'react-router-dom';
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


const Signup: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const [isLoading, setIsloading] = useState(false);
    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        setIsloading(true);
        const data: userInfoProps = {
            ...values,
            username: values.firstname + values.lastname,
            isAdmin: false
        }
        try {
            const res = await addUser(data)
            console.log(res, " register success");
            message.success("register success. Go to login page")
            setTimeout(() => {
                navigate('/login')
            }, 2000);

        } catch (err) {
            setIsloading(false);
            console.log(err, "register failed");
            message.error("Email already exists. Sign up failed.")
        }

    };
    return (
        <Spin spinning={isLoading}>
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
                <Card title={<h3
                    style={{
                        color: '#ffffff',
                        fontSize: '30px'
                    }}>Sign up</h3>}
                    bordered={false}
                    style={{
                        width: 450,
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        height: '500px',
                        margin: "auto",
                        left: '10vw',
                        backgroundColor: 'rgba(255,255,255,0.5)',
                    }}>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
                        style={{ maxWidth: 600 }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                { min: 6, message: "The password must contain more than 6 characters" }
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="firstname"
                            label="firstname"
                            tooltip="What do you want others to call you?"
                            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="lastname"
                            label="lastname"
                            tooltip="What do you want others to call you?"
                            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                            <p>
                                Or <a href="/#/login">Already have an account</a>
                            </p>
                        </Form.Item>
                    </Form>
                </Card >
            </div>
        </Spin >

    );
};

export default Signup;