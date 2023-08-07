import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import { notification } from 'antd';


const Signupform = () => {

    const [serverResponse, setServerResponse] = useState(null);
    const navigate = useNavigate();
    const onFinish = (values) => {
        const jsonValues = JSON.stringify(values);

        axios.post('https://express-lifeboard-0jtg.onrender.com/auth/signup', jsonValues, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })
            .then(response => {
                const rep = response.data.message;
                setServerResponse(rep);
                if (response.data.success === true) {
                    navigate('/');
                    notification.success({
                        message: 'Inscription réussie',
                        description: 'Vous êtes connecté à LifeBoard',
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                notification.error({
                    message: 'Inscription échouée',
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
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer votre nom d\'utilisateur!'

                    },
                ]}>
                    <Input/>

            </Form.Item>
            <Form.Item
                label="Nom d'utilisateur"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer votre nom d\'utilisateur!'

                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Votre ville"
                name="city"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer votre nom d\'utilisateur!'

                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Votre université"
                name="school"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer votre nom d\'utilisateur!'

                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Votre pays"
                name="country"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer votre nom d\'utilisateur!'

                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Mot de passe"
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
            <p style={{ paddingLeft: '5em', color: 'red' }}>{serverResponse}</p>
          

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >

                <Button style={{ backgroundColor: '#722ed1' }}
                    type="primary" htmlType="submit">
                    Envoyer
                </Button>
            </Form.Item>
        </Form>
    )
};
export default Signupform;


