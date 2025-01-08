import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  TreeSelect,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { category } from "../../type";
import React, { useEffect, useState } from "react";
import { getGroupsApi } from "../../api/group";
import {
  createProductApi,
  getProductByIdApi,
  updateProductApi,
} from "../../api/product";
import { jwtDecode } from "jwt-decode";

const { TextArea } = Input;

const EditPage:React.FC<{ id?: number }> = ({id}) => {

    const token = localStorage.getItem("token");
    let createId: string = "";
    //通过token获取用户id
    if (token) {
      const decoded: { id: string; exp: number; iat: number } = jwtDecode(token);
      createId = decoded.id;
    }
  //受控绑定图片列表
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const onChangeUpload: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setImageList(newFileList);

  
  const productId = id;
  //获取商品分类列表,并在自动渲染
  const [categoryList, setCategoryList] = useState<category[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getGroupsApi();
      setCategoryList(
        response.data.filter(
          (category: category) =>
            category.children.length=== 0
        )
      );
    };
    fetchData();
  }, []);

  //根据id回填数据
  const [form] = Form.useForm();
  useEffect(() => {
    if (productId !== undefined) {
      const fetchData = async () => {
        const response = await getProductByIdApi(productId);
        form.setFieldsValue({
          name: response.data.name,
          groupId: response.data.groupId,
          price: response.data.price,
          count: response.data.count,
          description: response.data.description,
        });
        setImageList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: response.data.image,
            thumbUrl: response.data.image,
          },
        ]);
      };

      fetchData();
    }
  }, [productId, form]);
  //将表单数据提交到后台
  const onFinish = async (values: any) => {
    //用户id作为商品创建者id
    const product = {
      ...values,
      image: imageList[0]? imageList[0].thumbUrl : "https://via.placeholder.com/150",
      creatorId: createId,
    };
    //判断是更新还是创建
    if (productId !== undefined) {
      await updateProductApi(productId, product);
      message.success("更新成功");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      await createProductApi(product);
      message.success("创建成功");
      setTimeout(() => {
        //重新加载页面
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div style={{ textAlign: "center" ,margin: "0 auto"}}>
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
          style={{marginBottom:0}}
          name="groupId"
          rules={[{ required: true, message: "请选择商品分类" }]}
        >
          <TreeSelect
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeData={categoryList.map((item) => ({
              title: item.name,
              value: item.id,
              key: item.id,
            }))}
          />
          
        </Form.Item>
        <a href="/layout/newCategory" style={{fontSize:12 ,marginLeft:-35}}>没有合适的分类？点此创建</a>
        
        <Form.Item
          label="定价"
          style={{marginTop:5}}
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
        <Form.Item label="库存图片">
          <Upload
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList
            maxCount={1}
            onChange={onChangeUpload}
            fileList={imageList}
          >
            <div style={{ marginTop: 8 }}>
              <PlusOutlined />
            </div>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 16 }}>
          <Button type="primary" htmlType="submit">
            {productId !== undefined ? "更新" : "创建"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditPage;
