import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';

import { notification } from 'antd';


const Formulaire = () =>
{
  const signup = () =>{
    navigate('/signup')
  }
  const [serverResponse, setServerResponse] = useState(null);
  const navigate = useNavigate();
  const onFinish = (values) => {
    const jsonValues = JSON.stringify(values);
console.log(jsonValues)
      axios.post('http://localhost:5001/auth/login', jsonValues, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    })
.then(response => {
  const rep = response.data.message;
  setServerResponse(rep);
  if (response.data.success === true){
    navigate('/');
    notification.success({
      message: 'Authentification réussie',
      description: 'Vous êtes connecté à LifeBoard',
    });
  }
})
.catch(error => {
  console.error('Error:', error);
  notification.error({
    message: 'Authentification échouée',
    description: `${error}`,
  });
});
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
return (
  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="name"
      rules={[
        {
          message: 'Veuillez entrer votre nom d\'utilisateur!'
 
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Veuillez entrer votre mot de passe!',
        },
      ]}
    >
      
      <Input.Password />
      
    </Form.Item>
    

    <p style={{paddingLeft:'5em', color:'black'}}>{serverResponse}</p>
    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      
      <Checkbox>Se souvenir de moi</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      
      <Button style={{backgroundColor: '#722ed1'}}    
           type="primary" htmlType="submit">
        Envoyer
      </Button>
    </Form.Item>
    <div className='flex justify-center'>
    <p>Pas encore inscrit ? <button onClick={signup} className='font-bold' style={{color:'#722ed1'}}>S'inscrire</button></p></div>
  </Form>
  
)};
export default Formulaire;


