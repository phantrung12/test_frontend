import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import getStore from './store/configureStore';
import './locales/i18n';
import { ConfigProvider } from 'antd';

ConfigProvider.config({
  theme: {
    primaryColor: '#62B6B7',
    errorColor: '#FF4A4A',
    infoColor: '#79E0EE',
    successColor: '#52C41A',
    warningColor: '#FF9551',
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
const store = getStore();

root.render(
  <React.StrictMode>
    <ConfigProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
);
