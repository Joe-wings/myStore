import React, { useEffect,  useState } from "react";
import {  Input, Layout, List, Menu, MenuProps, Popconfirm } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { deleteProductApi, getProductsByUserIdApi } from "../../api/product";
import { jwtDecode } from "jwt-decode";
import { category, product } from "../../type";
import { getGroupsApi } from "../../api/group";
import { getToken } from "../../utils";
import Sider from "antd/es/layout/Sider";
import Create from "../../compent/CreatProduct";
import EditP from "../../compent/editProduct";

const Manage: React.FC = () => {
  const [myProducts, setMyProducts] = useState<product[]>([]);
  const [AllProducts, setAllProducts] = useState<product[]>([]);
  const [categorys, setCategorys] = useState<category[]>([]);
  const decode: { id: number } = jwtDecode(getToken() || "");
  const [searchValue, setSearchValue] = useState<string>("");
  const id = decode?.id;
  
  useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await getProductsByUserIdApi(id);
        const groupResponse = await getGroupsApi();
        setAllProducts(response.data);
        setCategorys(groupResponse.data);
        setMyProducts(response.data);
      } catch (error: any) {
        console.log(error);
        if(error.response.status === 401){
          window.location.href="/"
        }
      }
    };
    fetchData();
  }, []);
  const data = myProducts.filter((p) => p.name.includes("")).map((product) => ({
    id: product.id,
    href: `/layout/edit?id=${product.id}`,
    title: product.name,
    description: `${categorys
      .filter((category) => category.id === product.groupId)
      .map((category) => category.name)}`,
    image: product.image,
    content: product.description,
    price: product.price,
    count: product.count,
  }));
  //分组商品
  const grouped = async (e: any) => {
    const groupId=parseInt(e.key)
    setMyProducts(AllProducts.filter((p: product) => p.groupId === groupId));
  };
  
  const search = async () => {
    setMyProducts(AllProducts.filter((p: product) => p.name.includes(searchValue)))
  }
  //左侧导航栏
  //层级分类
  function buildTree(categories: category[]) {
      // 创建一个映射，用于存储每个类别的id和对应的节点对象
      const map = new Map();
      const roots: any[] = [];
      // 遍历所有类别，初始化映射
      categories.forEach(category => {
          map.set(category.id, {
              key: category.id,
              label: category.name,
              children: []
          });
      });
  
      // 再次遍历，构建树形结构
      categories.forEach(category => {
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
      // 删除所有map中没有children的节点
      map.forEach(node => {
          if (node.children.length === 0) {
              delete node.children;
          }
      });
      const items=[{key: "0", label:<span style={{width:'100%'}} onClick={()=>setMyProducts(AllProducts)}>{<span style={{color:'#1890ff'}}>全部商品</span>}</span>, children: roots}]
      return items;
  }
  const items2: MenuProps["items"] = buildTree(categorys)

  return (
    <Layout style={{width: '100%'}}>
      <Sider width={200}>
      <div  style={{ padding:5,backgroundColor: "#ffffff"}} ><Input placeholder="搜索商品" value={searchValue} style={{width:'80%'}} onChange={e=>setSearchValue(e.target.value)}/><a style={{width:'10%',marginLeft:'10%'}} onClick={search}><SearchOutlined /></a></div>
        <Menu
          mode="inline"
          defaultOpenKeys={['0']}
          style={{ height: "100%", borderRight: 0 }}
          items={items2}
          onClick={grouped}
        />
      </Sider>
      <Create />
      
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 8,
        }}
        dataSource={data}
        style={{minWidth: 800,width: '100%',marginTop: 35,marginLeft: 20}}
        renderItem={(item) => (
          <List.Item
            style={{ maxHeight: 250, overflow: "auto", padding: 10 }}
            key={item.title}
            extra={<img width={150} alt="logo" src={item.image} />}
          >
            <List.Item.Meta
              title={
                <>
                  {item.title}&emsp;
                  <a >
                    <EditP id={item.id} />
                  </a>
                </>
              }
              description={
                <table>
                  <tr>
                    <td style={{ width: 100 }}>类别:{item.description}</td>
                    <td style={{ width: 100 }}>价格:{item.price}</td>
                    <td style={{ width: 100 }}>库存:{item.count}</td>
                  </tr>
                </table>
              }
            />
            {item.content}
            <br/>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <Popconfirm
              description="确认要下架当前商品吗？"
              onConfirm={async () => {
                await deleteProductApi(item.id);
                setMyProducts(
                  myProducts.filter((product) => product.id !== item.id)
                );
              }}
              cancelText="no"
              okText="yes"
              title={undefined}
            >
              <DeleteOutlined />
            </Popconfirm>
          </List.Item>
        )}
      />
    </Layout>
  );
};

export default Manage;

