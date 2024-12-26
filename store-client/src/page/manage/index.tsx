import React, { useEffect, useState } from "react";
import { List, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteProductApi, getProductsByUserIdApi } from "../../api/product";
import { jwtDecode } from "jwt-decode";
import { product } from "../../type";
import { getGroupsApi } from "../../api/group";
import { getToken } from "../../utils";

const Manage: React.FC = () => {
  const [myProducts, setMyProducts] = useState<product[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  
  const decode: { id: number } = jwtDecode(getToken()||"");
  const id = decode?.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductsByUserIdApi(id);
        const groupResponse = await getGroupsApi();
        setGroups(groupResponse.data);
        setMyProducts(response.data);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  console.log();
  const data = myProducts.map((product) => ({
    id: product.id,
    href: `/layout/edit?id=${product.id}`,
    title: product.name,
    description: `${groups
      .filter((group) => group.id === product.groupId)
      .map((group) => group.name)}`,
    image: product.image,
    content: product.description,
    price: product.price,
    count: product.count,
  }));

  return (
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
      style={{ minWidth: 500, maxWidth: 1000,margin:"0 auto"}}
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
                <a href={item.href}>
                  <EditOutlined />
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
          <br />
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
  );
};

export default Manage;
