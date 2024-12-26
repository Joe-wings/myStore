import React, { useEffect, useState } from "react";
import {
  DownOutlined,
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { jwtDecode } from "jwt-decode";
import { getbyuseridApi } from "../../api/user";
import { user } from "../../type";
import { getToken, removeToken } from "../../utils";
import { useNavigate } from "react-router-dom";

const Usermanager: React.FC = () => {
  const navigate=useNavigate();
  const Token = getToken();
  if (!Token) {
    navigate("/");
    return null;
  }
  const decodedToken: { id: number } = jwtDecode(Token!);
  const id = decodedToken.id;

  const [user, setUser] = useState<user>();
  useEffect(() => {
    const getUser = async () => {
      const response = await getbyuseridApi(id);
      setUser(response.data);
    };
    getUser();
  }, [id]);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
        >
          {user?.email}
        </a>
      ),
      disabled: true,
      icon: <MailOutlined />,
    },
    {
      key: "2",
      label: (
        <a rel="noopener noreferrer" href="#">
          账号管理
        </a>
      ),
      icon: <SolutionOutlined />,
    },
    {
      key: "3",
      label: (
        <a rel="noopener noreferrer" href="#">
          设置
        </a>
      ),
      icon: <SettingOutlined />,
    },
    {
      key: "4",
      danger: true,
      label: "退出登录",
      onClick: () => {
        removeToken();
        window.location.href = "/";
      },
      icon: <LogoutOutlined />,
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <UserOutlined />
          {user?.username}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default Usermanager;
