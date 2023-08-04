import React, { useEffect } from 'react';
import { useGetUsersQuery } from "state/api";
import { useGetUserbyCountryQuery } from 'state/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import { useVerifyUserMutation } from 'state/api';
import axios from 'axios'
import Auth from 'state/auth';
import { AuthContext } from 'state/AuthContext';
import { motion } from 'framer-motion';
import MyResponsiveLine from './chart';

const Dashboard = () => {
Auth()
const { authInfo } = React.useContext(AuthContext);




  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x:-20  }}
        animate={{ opacity: 1 , x:0}}
        transition={{ duration: 2.5 }}
      >
        <h1 className="text-xl font-bold">Bonjour {authInfo ? authInfo.user.name : '...'} 😄</h1>
      </motion.div>

    </div>
  );
};

export default Dashboard;