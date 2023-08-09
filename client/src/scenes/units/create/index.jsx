import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import axios from 'axios';
import Auth from 'state/auth';
import { AuthContext } from 'state/AuthContext';
import Units from './index.jsx'; // import the component you want to refresh

const CreateUnit = ({resetState}) => {
  Auth();
  const { authInfo } = React.useContext(AuthContext);
  const [serverResponse, setServerResponse] = useState('');



  const onFinish = (values) => {
    const userid = authInfo.user._id;
    values.user = userid;
    const jsonValues = JSON.stringify(values);
    axios.post('http://localhost:5001/units/create', jsonValues, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        const rep = response.data.message;
        console.log(rep);
        if (response.data.success === true) {
          console.log('Unit created');
          resetState();
        }
        if (response.data.message === 'Cours crée avec succès') {
          setServerResponse('');
        }
        else{setServerResponse(response.data.message)
        }
    })
      .catch((error) => {
        console.error('Error:', error);
        setServerResponse("Une erreur s'est produite");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setServerResponse("Une erreur s'est produite");
  };

  const layout = {
    labelCol: { span: 100 },
    wrapperCol: { span: 100 },
  };

  const [values, setValues] = useState('Jour');

  const handleSelectChange = (value) => {
    setValues(value);
  };

  

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <Form.Item rules={[{ required: true }]} label="Nom du cours" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Volume horaire" name="hours">
            <Input />
          </Form.Item>
        </div>
        <div style={{ flex: 2 }}>
          <Form.Item
            name={['day']}
            label="Jour"
            defaultValue="Lundi"
          >
            <Select>
              <Select.Option value="Lundi">Lundi</Select.Option>
              <Select.Option value="Mardi">Mardi</Select.Option>
              <Select.Option value="Mercredi">Mercredi</Select.Option>
              <Select.Option value="Jeudi">Jeudi</Select.Option>
              <Select.Option value="Vendredi">Vendredi</Select.Option>
              <Select.Option value="Samedi">Samedi</Select.Option>
              <Select.Option value="Dimanche">Dimanche</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item rules={[{ required: true }]} label="Description" name="description">
            <Input.TextArea style={{ height: '10rem' }} rows={4} maxRows={6} />
          </Form.Item>
         <p style={{color:'red'}}>{serverResponse}</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            style={{ backgroundColor: 'rgb(114, 46, 209)' }}
            htmlType="submit"
            type="primary"
          >
            Confirmer
          </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default CreateUnit;
