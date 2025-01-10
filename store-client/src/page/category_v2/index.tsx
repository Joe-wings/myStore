import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  message,
  Modal,
  Popconfirm,
  Tree,
  Form,
  Input,
  TreeSelect,
  Checkbox,
} from "antd";
import { category, product } from "../../type";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  createGroupApi,
  deleteGroupApi,
  getGroupsApi,
  updateGroupApi,
} from "../../api/group";

const Category: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const [categoryList, setCategoryList] = useState<category[]>([]);
  const [categorys, setCategorys] = useState<category[]>([]);
  const [visible, setVisible] = useState("");
  const [primary, setPrimary] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getGroupsApi();
      const data = await response.data;
      setCategorys(data);
      setCategoryList(
        data.filter(
          (item: { id: number; name: string; products: product[] }) =>
            item.products.length == 0
        )
      );
    };
    fetchData();
  }, [categorys]);

  const [form] = Form.useForm();
  //进入编辑模式
  const edit = (id: number) => {
    form.setFieldsValue({
      name: categorys.find((item) => item.id == id)?.name,
      fatherId: categorys.find((item) => item.id == id)?.fatherId,
    });
  };
  //修改类别
  const update = async (value: any, id: number) => {
    console.log(value);
    if (value.isPrimary == true) {
      await updateGroupApi(id, {
        name: value.name,
        fatherId: null,
      });
    } else {
      await updateGroupApi(id, {
        name: value.name,
        fatherId: value.fatherId,
      });
    }
    message.success("修改成功");
    setVisible("");
    setOpen(false);
    setPrimary(false);
    form.resetFields();
  };
  //添加子类
  const add = async (value: any, id: number) => {
    const item = categorys.find((item) => item.id == id);
    if (item && item.products.length > 0) {
      message.error("添加失败,该类已作为最底层类使用,请先删除该类别下所有商品");
      return;
    }
    await createGroupApi({
      name: value.name,
      fatherId: id,
    });

    message.success("添加成功");
    setVisible("");
    setOpen(false);
    form.resetFields();
  };
  //删除类别
  const onDel = (id: number) => {
    const item = categorys.find((item) => item.id == id);
    if (item && (item.children.length > 0 || item.products.length > 0)) {
      message.error("删除失败，请先删除该类别下所有子类别或商品");
      return;
    } else if (item) {
      deleteGroupApi(item.id);
      message.success("删除成功");
      setVisible("");
      setOpen(false);
      form.resetFields();
    }
  };
  //构建树形结构的数据
  function buildTree(categories: category[]) {
    // 创建一个映射，用于存储每个类别的id和对应的节点对象
    const map = new Map();
    const roots: any[] = [];
    // 遍历所有类别，初始化映射
    categories.forEach((category) => {
      map.set(category.id, {
        key: category.id,
        title: (
          <span
            onClick={() => {
              setOpen(true);
              setId(category.id);
            }}
          >
            {category.name}
          </span>
        ),
        children: [],
      });
    });

    // 再次遍历，构建树形结构
    categories.forEach((category) => {
      const node = map.get(category.id);
      if (category.fatherId === null || category.fatherId === undefined) {
        // 如果没有parentId，说明是根节点
        roots.push(node);
      } else {
        // 否则，将其添加到父节点的children中
        const parentNode = map.get(category.fatherId);
        if (parentNode) {
          parentNode.children.push(node);
        }
      }
    });

    return roots;
  }

  const havProducts = (id: number) => {
    const item = categorys.find((item) => item.id == id);
    if (item && item.products.length > 0) {
      return true;
    }
    return false;
  };
  const hasChildren = (id: number) => {
    const item = categorys.find((item) => item.id == id);
    if (item && item.children.length > 0) {
      return true;
    }
    return false;
  };
  const treeData = buildTree(categorys);
  return (
    <>
      <Card
        title="分类管理"
        style={{ marginBottom: "20px", textAlign: "center" }}
      >
        <Tree
          showLine
          selectable={false}
          treeData={treeData}
          defaultExpandAll
          style={{ width: "100%", fontSize: "16px" }}
        />
      </Card>
      <Modal
        open={open}
        style={{ minHeight: "400px" }}
        onCancel={() => {
          setOpen(false);
          setVisible("");
          setPrimary(false);
          form.resetFields();
        }}
        footer={[
          <>
            {!visible && (
              <>
                <Button
                  key={1}
                  style={{ width: 100 }}
                  disabled={havProducts(id)}
                  onClick={() => {
                    setVisible("add");
                  }}
                >
                  <PlusOutlined />
                  添加子类
                </Button>

                <Button
                  key={2}
                  style={{ width: 100 }}
                  onClick={() => {
                    setVisible("edit");
                    edit(id);
                  }}
                >
                  <EditOutlined />
                  修改
                </Button>

                <Popconfirm
                  key={3}
                  title="确认删除该类别？"
                  onConfirm={async () => {
                    onDel(id);
                  }}
                >
                  <Button
                    disabled={havProducts(id) || hasChildren(id)}
                    danger
                    style={{ width: 100 }}
                  >
                    <DeleteOutlined />
                    删除
                  </Button>
                </Popconfirm>
              </>
            )}
          </>,
        ]}
      >
        <p style={{ fontSize: "16px" }}>
          编辑类：
          <i>{categorys.find((item) => item.id == id)?.name}</i>
        </p>

        {visible == "edit" && (
          <>
            <div style={{ fontSize: "16px", marginBottom: "10px" }}>
              修改分类
            </div>
            <Form
              layout="vertical"
              form={form}
              title="修改分类"
              onFinish={(value) => update(value, id)}
            >
              <Form.Item
                label="名称"
                name="name"
                rules={[
                  { required: true, message: "请输入新名称" },
                  { max: 8, message: "类名不能超过8个字符！" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="父类别"
                name="fatherId"
                rules={[{ required: !primary, message: "请选择父类别" }]}
              >
                <TreeSelect
                  disabled={primary}
                  treeData={categoryList
                    .filter((item) => item.id != id)
                    .map((item) => ({
                      title: item.name,
                      value: item.id,
                      key: item.id,
                    }))}
                  placeholder="父类别"
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
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ float: "right" }}
                >
                  确认修改
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
        {visible == "add" && (
          <>
            <div style={{ fontSize: "16px", marginBottom: "10px" }}>
              添加子类
            </div>
            <Form layout="vertical" onFinish={(value) => add(value, id)}>
              <Form.Item
                label="名称"
                name="name"
                rules={[
                  { required: true, message: "请输入新名称" },
                  { max: 8, message: "类名不能超过8个字符！" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ float: "right" }}
                >
                  添加
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
        {visible == "" && (
          <div
            style={{
              fontSize: "14px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <b>tips:</b>
            <br />
            <i>1.若列表下已有商品不可再为其添加子类别</i>
            <br />
            <i>2.若要删除该类别，请先删除该类别下所有子类别或商品</i>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Category;
