import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Input, Layout, Menu, theme } from 'antd';
import ProductList from '../../compent/Product/ProdcuList';
import { getProductsApi, searchProductApi } from '../../api/product';
import { product } from '../../type';

const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
  onClick: () => console.log(`clicked ${key}`),
}));

const items2: MenuProps['items'] = [UserOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `商品分类`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          label: `option${subKey}`
        
        };
      }),
    };
  },
);

const Layouter: React.FC = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState<product[]>([]);
  const [value, setValue] = useState('');
  //获取所有商品数据
   useEffect(() => {
     const fetchData = async () => {
      try {
         const response = await getProductsApi() 
         setProductList(response.data);
     }
     catch (error:any) {
       if(error.status === 401){
         navigate('/');
       }
     }
    }
     fetchData();
     
   },[]);
   //搜索商品
  const search = async() => {
    const response = await searchProductApi(value)
    setProductList(response.data)
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', float: 'right', height: '64px' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Input
          placeholder="Search" type="text"
          style={{ width: 200, margin: '0 16px' }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="primary" style={{ marginLeft: 4 }} onClick={search} >搜索</Button>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb
            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
            style={{ margin: '16px 0' }}
          />
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
    </Layout>
  );
};

export default Layouter;