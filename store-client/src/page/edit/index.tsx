import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, TreeSelect, Upload } from "antd";
import { category } from "../../type";
import { useEffect, useState } from "react";
import { getGroupsApi } from "../../api/group";
import { createProductApi, getProductByIdApi, updateProductApi } from "../../api/product";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useSearchParams } from "react-router-dom";

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const EditPage = () => {
    const navigate = useNavigate();
  //获取路由参数，判断是编辑还是创建模式
  const [searchParams] = useSearchParams();
  const productId = parseInt(searchParams.get("id") || "0");

  const token = localStorage.getItem("token");
  let id: string = "";
  //通过token获取用户id
  if (token) {
    const decoded: { id: string; exp: number; iat: number } = jwtDecode(token);
    id = decoded.id;
  }
  //获取商品分类列表,并在自动渲染
  const [categoryList, setCategoryList] = useState<category[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getGroupsApi();
      setCategoryList(response.data.filter((category: { products: string | any[]; }) => category.products.length > 0));
        
    };
    fetchData();
  }, []);

  //根据id回填数据
  const [form] = Form.useForm();
  useEffect(() => {
    if (productId!==0) {
      const fetchData = async () => {
        const response = await getProductByIdApi(productId);
        console.log(response.data);
        form.setFieldsValue(response.data);
      };
      fetchData();
    }
  }, [productId, form]);
  //将表单数据提交到后台
  const onFinish = async (values: any) => {
    console.log(values);
    //用户id作为商品创建者id
    const product = {
      ...values,
      image:values.image[0].thumbUrl,
      creatorId: id,
    };
    //判断是更新还是创建
    if (productId!==0) {
        await updateProductApi(productId,product);
        message.success("更新成功");
        setTimeout(() => {
          navigate("/layout/manage");
        }, 1000);
    }else{
    await createProductApi(product);
    message.success("创建成功");
    setTimeout(() => {
      navigate("/layout/manage");
    }, 1000);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
        style={{ maxWidth: 600, margin: "0 auto" }}
        form={form}
      >
        <Form.Item
          label="商品名称"
          name="name"
          rules={[{ required: true, message: "请输入商品名称" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="商品分类"
          name="groupId"
          rules={[{ required: true, message: "请选择商品分类" }]}
        >
          <TreeSelect
            treeData={categoryList.map((item) => ({
              title: item.name,
              value: item.id,
              key: item.id,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="定价"
          name="price"
          rules={[{ required: true, message: "请输入商品价格" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="库存"
          name="count"
          rules={[{ required: true, message: "请输入商品价格" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="商品描述"
          name="description"
          rules={[{ required: true, message: "请输入商品描述" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="商品图片"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card" maxCount={1}>
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 16 }}>
          <Button type="primary" htmlType="submit">
            {productId !==0 ? "更新" : "创建"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditPage;
