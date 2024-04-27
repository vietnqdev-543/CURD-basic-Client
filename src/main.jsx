import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { store , persistor} from './redux/store.js'
import { Provider } from 'react-redux'
import { Button, ConfigProvider, Space } from 'antd';
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ConfigProvider
  theme={{
    token: {
      // Seed Token
      colorPrimary: 'darkred',
      borderRadius: 5,

      // Alias Token
      // colorBgContainer: '#f6ffed',
    },
  }}
  >
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
  </Provider>

  </ConfigProvider>
  // </React.StrictMode>,
)
