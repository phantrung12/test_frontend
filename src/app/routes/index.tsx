import { Navigate, Route, Routes, useRoutes } from 'react-router-dom';
import { path } from './path';
import Home from '../pages/Home';
import Login from '../pages/Auth';
import PrivateRoute from '../components/HOC/PrivateRoute';
import AlertDemo from '../pages/Alert';
import ButtonDemo from '../pages/Button';
import UIKit from '../pages/UIKit';
import NotificationDemo from '../pages/Notification';
import Form from '../pages/Form';
import CreateForm from '../pages/Form/containers/Create';
import UpdateForm from '../pages/Form/containers/Update';
import DetailForm from '../pages/Form/containers/Detail';
import ModalDemo from '../pages/Modal';
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
    { path: path.all, element: <Navigate to={path.home} /> },
  ]);
}
