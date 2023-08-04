import React from 'react';
import FlexBetween from 'components/FlexBetween';
import {PoweroffOutlined} from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { notification, Tooltip } from 'antd';
import { motion } from 'framer-motion';

const TopNav = () => {
    const navigate = useNavigate()
    const Logout = () => {
    
    Cookies.remove('token')
    Cookies.remove('user')
    navigate('/Login')
notification.info({
    message: 'Déconnecté de LifeBoard'})
    }
  return (
    <motion.div
    initial={{ y:-20 }}
        animate={{ y:0}}
        transition={{ duration: 1 }}>
    <div className='flex items-center' style={{backgroundColor: '#722ed1', justifyContent: 'flex-end', paddingLeft:'100px', paddingRight:'2rem', height: '3rem'}}>
    
   <Tooltip placement="bottom" title="Déconnexion"><PoweroffOutlined onClick={Logout} style={{color:'white', fontSize: '1.5rem'}}/></Tooltip> 
    </div>
    </motion.div>
  );
};



export default TopNav;
