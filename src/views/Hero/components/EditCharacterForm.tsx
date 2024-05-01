import React, { useEffect, useState } from 'react';
import { FormProps, message } from 'antd';
import { Button, Form, Input, InputNumber, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { addCharacter } from '../../../api/test';
import { characterProps } from '../../../types/alltype';
type propsType = {
    cid: string,
    characterdata: characterProps
}
// 编辑角色 相当于发起请求
// 这里是不能编辑img的
type FieldType = {
    "name": string,
    "subtitle": string,
    "description"?: string,
    "strength": number,
    "speed": number,
    "skill": number,
    "fear_factor": number,
    "power": number,
    "intelligence": number,
    "wealth": number,
    "image_url"?: string,
};



const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};



const EditCharacterForm: React.FC<propsType> = ({ cid, characterdata }) => {
    const [form] = Form.useForm();
    const [initialValues, setinitialvalue] = useState<characterProps | undefined>(undefined)
    const onReset = () => {
        form.resetFields();
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
        values.name = str;
        const finaldata: characterProps = { ...values, id: cid, active: true }
        try {
            // addCharacter(finaldata).then(res => {
            //     console.log(res + "add character success");
            //     message.success("adding character success")
            // })
        } catch (err) {
            console.log(err + " add character fail");
            message.error("add character fail")
        }
        console.log('Success:', values);
    };

    useEffect(() => {
        setinitialvalue(characterdata);
        form.setFieldsValue(characterdata)

    }, [characterdata])
    return (
        <Form
            name="basic"
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 800, paddingTop: '20px' }}
            initialValues={initialValues}
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
                </Space>
            </Form.Item>
        </Form>
    )
};

export default EditCharacterForm;