import React from 'react';
import './style/index.less';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './app/routes';
// import Routes from './app/routes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
