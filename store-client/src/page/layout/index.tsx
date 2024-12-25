import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Layout, Menu, theme } from "antd";
import ProductList from "../../compent/Product/ProdcuList";
import { getProductsApi, searchProductApi } from "../../api/product";
import { product, category } from "../../type";
import { getProductsByGroupApi, getGroupsApi } from "../../api/group";
import Usermanager from "../../compent/Usermanager";

const { Header, Content, Sider } = Layout;

const items1: MenuProps["items"] = [
  { key: "/layout", label: "所有商品列表" },
  { key: "/layout/edit", label: "创建商品" },
  { key: "/layout/manage", label: "管理我的商品" },
].map((key) => ({
  key: key.key,
  label: `${key.label}`,
}));

const Layouter: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [productList, setProductList] = useState<product[]>([]);
  const [value, setValue] = useState("");
  const [categoryList, setCategoryList] = useState<category[]>([]);
  const [visible, setVisible] = useState(true);

  //获取所有商品和分类数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductsApi();
        setProductList(response.data);
        const response1 = await getGroupsApi();
        setCategoryList(response1.data);
      } catch (error: any) {
        if (error.status === 401) {
          navigate("/");
        }
      }
    };
    if (location.pathname === "/layout") {
      setVisible(true);
    } else {
      setVisible(false);
    }
    fetchData();
  }, []);

  //搜索商品
  const search = async () => {
    const response = await searchProductApi(value);
    setProductList(response.data);
  };

  //分组商品
  const grouped = async (e: any) => {
    let id = parseInt(e.key);
    const response = await getProductsByGroupApi(id);
    setProductList(response.data);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  //层级分类
  const items2: MenuProps["items"] = [UserOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `商品分类`,
      onTitleClick: async () => {
        const response = await getProductsApi();
        setProductList(response.data);
      },
      children: categoryList
        .filter((c) => c.fatherId === null)
        .map((category) => {
          return {
            key: category.id,
            label: category.name,
            children: categoryList
              .filter((c) => c.fatherId === category.id)
              .map((category) => {
                return {
                  label: category.name,
                  key: category.id,
                };
              }),
          };
        }),
    };
  });
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          float: "right",
          height: "64px",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
          onClick={(e) => {
            if (e.key !== "/layout") {
              setVisible(false);
            } else {
              setVisible(true);
            }
            navigate(e.key);
          }}
        />
        <Usermanager/>

        {visible && (
          <>
            <Input
              placeholder="Search"
              type="text"
              style={{ width: 200, margin: "0 10px 0 150px" }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button type="primary" style={{ marginLeft: 4 }} onClick={search}>
              搜索
            </Button>
          </>
        )}
        
      </Header>
      <Outlet />
      {visible && (
        <Layout>
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              items={items2}
              onClick={grouped}
            />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <ProductList productlist={productList} />
            </Content>
          </Layout>
        </Layout>
      )}
    </Layout>
  );
};

export default Layouter;
