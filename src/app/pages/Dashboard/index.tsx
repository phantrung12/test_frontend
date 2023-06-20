import { Tabs, Typography } from 'antd';
import React from 'react';
import { path } from '../../routes/path';
import { Outlet, useNavigate } from 'react-router';
import './dashboard.less';

const Dashboard = () => {
  const navigate = useNavigate();

  const tabItems = [
    {
      label: 'Subscription',
      key: path.dashboardSubtab.subscription,
      // children: <Subscription />,
    },
    {
      label: 'Revenue',
      key: path.dashboardSubtab.revenue,
      // children: <Revenue />,
    },
  ];

  const handleChangeTabs = (activeKeys: string) => {
    navigate(activeKeys);
  };

  return (
    <div>
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Tabs
        items={tabItems}
        type="card"
        onChange={handleChangeTabs}
        className="tabs-custom"
      />
      <div className="dashboard-content" style={{ background: '#fff' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
