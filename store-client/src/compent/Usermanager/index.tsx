import React, { useEffect } from 'react';
import { DownOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../../utils';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: '4',
    danger: true,
    label: '退出登录',
    onClick: () => {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  },
];

const Usermanager: React.FC = () => {
    const decodedToken:{id:number} = jwtDecode(getToken()!);
    const id=decodedToken.id;
    useEffect(() => {
      console.log(id);
    }, [id]);
    return (

        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
            <UserOutlined />
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      );
}

export default Usermanager;