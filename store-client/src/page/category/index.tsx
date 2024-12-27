import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, message, TreeSelect } from "antd";
import { category, product } from "../../type";
import { createGroupApi, getGroupsApi } from "../../api/group";


const CreateCategory: React.FC = () => {
    const [primary, setPrimary] = useState(false);
    const [categoryList, setCategoryList] = useState<category[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await getGroupsApi();
            const data = await response.data;
            setCategoryList(data.filter((item:{id:number,name:string,products:product[]}) => item.products.length == 0));
        };
        fetchData();
    }, []);

    const onFinish=async (e: { name: any; fatherId: any; })=>{
        console.log(e)
        await createGroupApi({
            name: e.name,
            fatherId: e.fatherId||null,
        })
        message.success("创建成功")
        window.location.reload();
    }
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ width: 400, margin: "20% auto" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item<category>
                label="名称"
                name="name"
                rules={[{ required: true, message: "请输入要新建的类名!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<category>
                label="父类"
                name="fatherId"
                rules={[{ required: !primary, message: "请选择一个父类!" }]}
            >
                <TreeSelect
                    disabled={primary}
                    treeData={categoryList.map((item) => ({
                        title: item.name,
                        value: item.id,
                        key: item.id,
                    }))}
                />
            </Form.Item>

            <Form.Item
                name="isPrimary"
                valuePropName="checked"
                label={null}
            >
                <Checkbox defaultChecked={false} checked={primary} onChange={() => setPrimary(!primary)}>是否为最顶层类</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    创建
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateCategory;
