import React, { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Auth from 'state/auth';
import { AuthContext } from 'state/AuthContext';
import { Card, Button, Popover } from 'antd';
import Meta from 'antd/es/card/Meta';
import CreateUnit from './create';
import { motion } from 'framer-motion';

const Units = () => {
  Auth()
  const { authInfo } = React.useContext(AuthContext); // Get the user info from the context
  const [units, setUnits] = useState(null); // Initialize data state as null
 



useEffect(() => {
  axios.get('http://localhost:5001/units/get', { withCredentials: true }) // Make a GET request to the server
    .then(function (response) {
      const data = response.data;
      let units = [];
      for (let i = 0; i < data.length; i++) { 
units.push( 
  <motion.div
  key={i}
  initial={{ rotate: 5, y:50 , x: 100, opacity: 0, scale: 0.5 }}
  animate={{ rotate: 0,  y: 0 , x:0, opacity: 1, scale: 1 }}
  transition={{ duration: 0.5, delay: i * 0.1 }}
>
  <Card style={{}} key={i} bordered={true}> 
    <Meta
      title={data[i].name}
      description={data[i].description}
    />
    <br/>
    <p>Volume horaire : {data[i].hours}</p>
    Jour : {data[i].day} 
    
  </Card></motion.div>
)    

      }

      setUnits(units);
    
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }, []); 
  return (
  <div><div style={{display:'inline-flex', gap:'1rem', alignItems:'center' }}><h1 className='font-bold text-xl'>Vos cours 📚</h1>
  <Popover overlayStyle={{width:'25vw'}} placement="bottomRight" title={<h1>kebab</h1>} content={<CreateUnit/>} trigger="click">
  <Button style={{backgroundColor:'#1F8A70'}} type="primary">Ajouter</Button>  </Popover>
</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))',
         gap: '1rem',
        marginTop: '1rem',
        marginRight: '1rem',
     
      }} className='cours'>{units} </div></div>
  )
}

export default Units
