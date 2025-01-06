import React, { useEffect,  useState } from "react";
import {  Input, Layout, List, Menu, MenuProps, Popconfirm } from "antd";
import { DeleteOutlined,MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { deleteProductApi, getProductsByUserIdApi } from "../../api/product";
import { jwtDecode } from "jwt-decode";
import { category, product } from "../../type";
import { getGroupsApi } from "../../api/group";
import { getToken } from "../../utils";
import Sider from "antd/es/layout/Sider";
import Create from "../../compent/CreatP";
import EditP from "../../compent/editP";

const Manage: React.FC = () => {
  const [myProducts, setMyProducts] = useState<product[]>([]);
  const [categorys, setCategorys] = useState<category[]>([]);
  const decode: { id: number } = jwtDecode(getToken() || "");
  const [searchValue, setSearchValue] = useState<string>("");
  const id = decode?.id;
  
  useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await getProductsByUserIdApi(id);
        const groupResponse = await getGroupsApi();
       
        setCategorys(groupResponse.data);
        setMyProducts(response.data);
      } catch (error: any) {
        console.log(error);
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
  //查找子分类
  const findSubCategory = (id: number, categoryList: category[]) => {
    return categoryList.filter((c) => c.fatherId === id) || undefined;
  };
  //分组商品
  const grouped = async (e: any) => {
    const response = await getProductsByUserIdApi(id);
    const groupId=parseInt(e.key)
    setMyProducts(response.data.filter((p: product) => p.groupId === groupId));
  };
  
  const search = async () => {
    const response = await getProductsByUserIdApi(id);
    setMyProducts(response.data.filter((p: product) => p.name.includes(searchValue)))
    console.log(searchValue);
  }
  //左侧导航栏
  //层级分类
  const items2: MenuProps["items"] = [1].map((key) => {
    return {
      key: `sub${key}`,
      icon: <MenuOutlined />,
      label: `商品分类`,
      onTitleClick: async () => {
        const response = await getProductsByUserIdApi(id);
        setMyProducts(response.data);
      },
      children: categorys
        .filter((c) => c.fatherId === null)
        .map((category) => {
          return findSubCategory(category.id, categorys).length > 0
            ? {
                key: category.id,
                label: category.name,
                children: findSubCategory(category.id, categorys).map(
                  (category) => {
                    return findSubCategory(category.id, categorys).length > 0
                      ? {
                          key: category.id,
                          label: category.name,
                          children: findSubCategory(category.id, categorys).map(
                            (category) => {
                              return {
                                label: category.name,
                                key: category.id,
                              };
                            }
                          ),
                        }
                      : {
                          key: category.id,
                          label: category.name,
                        };
                  }
                ),
              }
            : {
                key: category.id,
                label: category.name,
              };
        }),
    };
  });
  return (
    <Layout>
      <Sider width={200}>
      <div  style={{ backgroundColor: "#ffffff"}} ><Input placeholder="搜索商品" value={searchValue} style={{width:'80%'}} onChange={e=>setSearchValue(e.target.value)}/><a style={{width:'10%',marginLeft:'10%'}} onClick={search}><SearchOutlined /></a></div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
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
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 8,
        }}
        dataSource={data}
        style={{minWidth: 800, maxWidth: 1000,marginTop: 35,marginLeft: 20}}
        renderItem={(item) => (
          <List.Item
            style={{ maxHeight: 250, overflow: "auto", padding: 10 }}
            key={item.title}
            extra={<img width={100} alt="logo" src={item.image} />}
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

