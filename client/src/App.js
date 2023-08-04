import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import GlobalM from 'scenes/layout';
import Dashboard from 'scenes/dashboard/index.jsx';
import Units from 'scenes/units';
import { Content } from 'antd/es/layout/layout';
import themetoken from 'theme';
import { useGetUserQuery } from 'state/api';
import Login from 'scenes/Login/Login';
import Error500 from 'scenes/Offline';
import Signup from 'scenes/Signup/Signup';
import Userprofile from 'scenes/userprofile/profile';
import { AuthContext } from 'state/AuthContext';
import CreateUnit from 'scenes/units/create/index';


function App() {
  const [count, setCount] = useState(0);
  const [authInfo, setAuthInfo] = React.useState(null);

  return (
    <div className='app'>
        <AuthContext.Provider value={{ authInfo, setAuthInfo }}>
      <BrowserRouter>
        <ConfigProvider theme={themetoken}>
          <Routes>
            <Route path='/login' element={ <Login/> }/>
            <Route path='/signup' element={ <Signup/> }/>
            <Route path='/error' element={ <Error500/> }/>
            <Route element={<GlobalM />}>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/user' element={<Userprofile/>} />
              <Route path='/dashboard' element={<Dashboard/>} />
              <Route path='/dashboard/:country' element={<Dashboard/>} />
              <Route path='/units' element={<Units/>} />
              <Route path='/units/create' element={<CreateUnit/>} />
          </Route>
          </Routes>
        </ConfigProvider>
      </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
