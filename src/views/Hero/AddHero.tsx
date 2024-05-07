import React from 'react';
import { FormProps, Popconfirm, message } from 'antd';
import { Button, Form, Input, InputNumber, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { PopconfirmProps } from 'antd/lib';
import { addCharacter } from '../../api/test';
import { characterProps } from '../../types/alltype';
type propsType = {

}
type FieldType = {
    "name": string,
    "subtitle": string,
    "description"?: string,
    "image_url"?: string,
    "strength": number,
    "speed": number,
    "skill": number,
    "fear_factor": number,
    "power": number,
    "intelligence": number,
    "wealth": number
};



const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};



const AddHero: React.FC<propsType> = (props) => {
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
    };
    const confirm: PopconfirmProps['onConfirm'] = (e) => {

    };
    const cancel: PopconfirmProps['onCancel'] = (e) => {
    };
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        // 对values的值进行处理后 再去往后端传入
        // 首先 name 首字母要大写
        //首先 获得id
        let cid = values.name;
        cid = cid.replace(' ', '').toLowerCase()

        // 处理name
        let str = '';
        const arr = values.name.split(" ");
        console.log(arr);

        if (arr[0] === "") {
            arr.shift()
        }
        if (arr[arr.length - 1] === "") {
            arr.pop()
        }
        arr.forEach((item) => {
            str += item[0].toUpperCase() + item.slice(1) + " ";
        })
        str = str.slice(0, str.length - 1)
        console.log(str + '处理后的name');
        values.name = str;
        const finaldata: characterProps = { ...values, id: cid, active: true }
        try {
            addCharacter(finaldata).then(res => {
                console.log(res + "add character success");
                message.success("adding character success")
            })
        } catch (err) {
            console.log(err + " add character fail");
            message.error("add character fail")
        }
        console.log('Success:', values);
    };

    return (
        <Form
            name="basic"
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 800, paddingTop: '20px' }}
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="name"
                name="name"
                rules={[{ required: true, message: 'Please input your character name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<FieldType>
                label="subtitle"
                name="subtitle"
                rules={[{ required: true, message: 'Please input subtitle' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<FieldType>
                label="description"
                name="description"
            >
                <TextArea rows={4}></TextArea>
            </Form.Item>
            <Form.Item<FieldType>
                label="image_url"
                name="image_url"
            >
                <TextArea rows={2}></TextArea>
            </Form.Item>
            <h4>Attributes</h4>
            <Form.Item<FieldType>
                label="strength"
                name="strength"
                rules={[{ required: true }]}
            >
                <InputNumber></InputNumber>
            </Form.Item>
            <Form.Item<FieldType>
                label="speed"
                name="speed"
                rules={[{ required: true }]}
            >
                <InputNumber></InputNumber>
            </Form.Item>
            <Form.Item<FieldType>
                label="skill"
                name="skill"
                rules={[{ required: true }]}
            >
                <InputNumber></InputNumber>
            </Form.Item>
            <Form.Item<FieldType>
                label="fear_factor"
                name="fear_factor"
                rules={[{ required: true }]}
            >
                <InputNumber></InputNumber>
            </Form.Item>
            <Form.Item<FieldType>
                label="power"
                name="power"
                rules={[{ required: true }]}
            >
                <InputNumber></InputNumber>
            </Form.Item>
            <Form.Item<FieldType>
                label="intelligence"
                name="intelligence"
                rules={[{ required: true }]}
            >
                <InputNumber></InputNumber>
            </Form.Item>
            <Form.Item<FieldType>
                label="wealth"
                name="wealth"
                rules={[{ required: true }]}
            >
                <InputNumber></InputNumber>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                    <Popconfirm
                        title="Cancel add hero"
                        description="Are you sure to unadd the hero? "
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Cancel</Button>
                    </Popconfirm>
                </Space>
            </Form.Item>
        </Form>
    )
};

export default AddHero;