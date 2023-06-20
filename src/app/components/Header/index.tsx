import { Avatar, Layout, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';

interface Props {
  onClickOpenSidebar?: () => void;
  collapse?: boolean;
}

const Header = ({ onClickOpenSidebar, collapse }: Props) => {
  const { Header } = Layout;

  return (
    <Header
      className={`site-layout-background header ${
        collapse ? 'close-header' : 'open-header'
      }`}
    >
      <Space className="justify-between w-100">
        <MenuUnfoldOutlined className="icon" onClick={onClickOpenSidebar} />
        <Space>
          <Avatar
            size="large"
            icon={<UserOutlined />}
            style={{ cursor: 'pointer' }}
          />
          <Typography.Text>Username</Typography.Text>
        </Space>
      </Space>
    </Header>
  );
};

export default Header;
