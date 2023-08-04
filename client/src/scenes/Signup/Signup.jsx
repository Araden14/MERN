import React from "react";
import { useEffect, useRef } from "react";
import logo from "../Login/logo.svg"
import background from "../Login/background.jpg"
import { motion } from "framer-motion"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import Signupform from "./SignupForm";




const Signup = () => {

  const navigate = useNavigate()
  axios.post("http://localhost:5001/auth", {}, { withCredentials: true })
  .then(response => {

    const isAuth = response.data.status;
    isAuth ? (() => {notification.success({message: 'Authentification rétablie', description: 'Votre session a été rétablie'}); navigate('/')})() : console.log("Not logged in")
  })
  .catch(error => {
    navigate('/error')

  });

  return (
    <div className="h-screen w-screen justify-center items-center flex" style={{
      backgroundImage: `url(${background})`,
    }}>
      <motion.div
        initial={{ rotate: 30, scale: 0.3, y: -100, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 1 }} >
        <div className="loginform flex flex-col items-center justify-center space-y-7"
          style={{
            maxHeight: '70%',
            backgroundColor: 'white',
            padding: '3rem',
            borderRadius: '25px'
          }}>
          <motion.div
            whileHover={{ scale: 1.2 }} >
            <img src={logo} /></motion.div>
          <h1 className="text-gray-700 font-bold text-xl">S'inscrire</h1>
          <Signupform />
        </div></motion.div>
    </div>
  );
}

export default Signup;