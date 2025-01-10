import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Tree,
  TreeSelect,
} from "antd";
import { category, product } from "../../type";
import { DeleteOutlined } from "@ant-design/icons";
import { createGroupApi, deleteGroupApi, getGroupsApi } from "../../api/group";

const CreateCategory: React.FC = () => {
  const [primary, setPrimary] = useState(false);
  const [categoryList, setCategoryList] = useState<category[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getGroupsApi();
      const data = await response.data;
      setCategoryList(
        data.filter(
          (item: { id: number; name: string; products: product[] }) =>
            item.products.length == 0
        )
      );
    };
    fetchData();
  }, []);

  const onFinish = async (e: { name: any; fatherId: any }) => {
    await createGroupApi({
      name: e.name,
      fatherId: e.fatherId || null,
    });
    message.success("创建成功");
    window.location.reload();
  };
  const onDel=(item:category)=>{
    if(item.children.length>0 || item.products.length>0){
      message.error("删除失败，请先删除该类别下所有子类别或商品")
    }else{
      deleteGroupApi(item.id)
      message.success("删除成功")
      setInterval(() => window.location.reload(), 1000)
    }
  }
  return (
    <>
      <Card title="创建类别">
        <Form
          title="创建类别"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 400, margin: "10% auto" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<category>
            label="名称"
            name="name"
            rules={[{ required: true, message: "请输入要新建的类名!" },{max:8,message:"类名不能超过8个字符！"}]}
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

          <Form.Item name="isPrimary" valuePropName="checked" label={null}>
            <Checkbox
              defaultChecked={false}
              checked={primary}
              onChange={() => setPrimary(!primary)}
            >
              是否为最顶层类
            </Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              创建
            </Button>
            <br />
            <a onClick={() => setOpen(true)}>
              <i>查看类别结构</i>
            </a>
            <Modal
              height={700}
              title="现有类别结构"
              open={open}
              cancelText="Cancel"
              footer={null}
              onCancel={() => setOpen(false)}
              destroyOnClose
            >
              <Tree
                defaultExpandAll
                showLine
                treeData={categoryList
                  .filter((item) => item.fatherId == null)
                  .map((item) => ({
                    title:(
                      <span>
                        {item.name} &nbsp;{" "}
                        <Popconfirm
                          title="确认删除该类别？"
                          onConfirm={async () => {
                            onDel(item)
                          }}
                        >
                          <DeleteOutlined />
                        </Popconfirm>
                      </span>
                    ),
                    value: item.id,
                    key: item.id,
                    children: item.children.map((child) => ({
                      title: (
                        <span>
                          {child.name} &nbsp;{" "}
                          <Popconfirm
                            title="确认删除该类别？"
                            onConfirm={async () => {
                              onDel(child)
                            }}
                          >
                            <DeleteOutlined />
                          </Popconfirm>
                        </span>
                      ),
                      value: child.id,
                      key: child.id,
                      children: child.children.map((grandson) => ({
                        title: (
                          <span>
                            {grandson.name} &nbsp;{" "}
                            <Popconfirm
                              title="确认删除该类别？"
                              onConfirm={async () => {
                                onDel(grandson)
                              }}
                            >
                              <DeleteOutlined />
                            </Popconfirm>
                          </span>
                        ),
                        value: grandson.id,
                        key: grandson.id,
                      })),
                    })),
                  }))}
              />
            </Modal>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default CreateCategory;
