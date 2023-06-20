import { Navigate, Route, Routes, useRoutes } from 'react-router-dom';
import { path } from './path';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import PostManagement from '../pages/PostManagement';
import Setting from '../pages/Setting';
import Revenue from '../pages/Dashboard/container/Revenue';
import Subscription from '../pages/Dashboard/container/Subcription';

export default function AppRoutes() {
  return useRoutes([
    {
      path: path.home,
      element: <Home />,
      children: [
        {
          path: path.dashboard,
          element: <Dashboard />,
          children: [
            {
              path: path.dashboardSubtab.subscription,
              element: <Subscription />,
            },
            { path: path.dashboardSubtab.revenue, element: <Revenue /> },
            {
              path: path.all,
              element: (
                <Navigate to={path.dashboardSubtab.subscription} replace />
              ),
            },
          ],
        },
        { path: path.postManagement, element: <PostManagement /> },
        { path: path.settings, element: <Setting /> },
      ],
    },
    { path: path.all, element: <Navigate to={path.dashboard} replace /> },
  ]);
}
