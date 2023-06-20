import { Alert, Button, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import Header from '../../components/Header';
import { path } from '../../routes/path';
import { useTranslation } from 'react-i18next';
import { translations } from '../../../locales/translations';

type MenuItemType = ItemType & {
  isActive?: boolean;
};

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const { Sider, Content } = Layout;

  const sidebarItems: MenuItemType[] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      onClick: () => navigate(path.dashboard),
    },
    {
      key: path.postManagement,
      label: 'Post management',
      onClick: () => navigate(path.postManagement),
    },
    {
      key: path.settings,
      label: 'Settings',
      onClick: () => navigate(path.settings),
    },
  ];

  const returnOpenKeys = (itemsMenu: any[]) => {
    const openKeys: any[] = [];
    itemsMenu.map(item => {
      if (item?.children) {
        if (item?.children.find((itm: any) => itm.key === location.pathname)) {
          openKeys.push(item?.key);
        } else {
          returnOpenKeys(item?.children);
        }
      }
    });
    return openKeys;
  };

  return (
    <Layout className="layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sidebar"
      >
        <div className="logo">Logo</div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[location.pathname.split('/')[1]]}
          selectedKeys={[location.pathname.split('/')[1]]}
          items={sidebarItems}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          onClickOpenSidebar={() => setCollapsed(!collapsed)}
          collapse={collapsed}
        />
        <Content
          className={`site-layout-background content ${
            collapsed ? 'close-content' : 'open-content'
          }`}
        >
          <div>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
