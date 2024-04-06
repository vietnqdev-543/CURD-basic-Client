import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import { Button, ConfigProvider, Space } from 'antd';
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ConfigProvider
  theme={{
    token: {
      // Seed Token
      // colorPrimary: 'black',
      borderRadius: 5,

      // Alias Token
      // colorBgContainer: '#f6ffed',
    },
  }}
  >
    <Provider store={store}>
    <App />
  </Provider>

  </ConfigProvider>
  // </React.StrictMode>,
)
