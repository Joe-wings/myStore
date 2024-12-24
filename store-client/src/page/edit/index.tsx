import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    InputNumber,
    TreeSelect,
    Upload,
} from 'antd';
import { category } from '../../type';
import { useEffect, useState } from 'react';
import { getGroupsApi } from '../../api/group';

const { TextArea } = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const EditPage = () => {
    const [categoryList, setCategoryList] = useState<category[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await getGroupsApi();
            setCategoryList(response.data);
        };
        fetchData();
    }, []);
    return (
        <div style={{ textAlign: 'center' }}>
            <br />
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                
                style={{ maxWidth: 600, margin: '0 auto' }}
            >

                <Form.Item label="商品名称">
                    <Input />
                </Form.Item>
                <Form.Item label="定价">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="商品分类">
                    <TreeSelect
                        treeData={
                            categoryList.map((item) => ({
                                title: item.name,
                                value: item.id,
                                key: item.id,
                            }))}
                    />
                </Form.Item>
                <Form.Item label="商品描述">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="商品图片" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                        <button style={{ border: 0, background: 'none' }} type="button">
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                    </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditPage