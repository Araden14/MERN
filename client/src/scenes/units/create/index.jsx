import React, { useState, forceUpdate } from 'react';
import { Form, Input, Button, Select } from 'antd';
import axios from 'axios';
import Auth from 'state/auth';
import { AuthContext } from 'state/AuthContext';
import Units from './index.jsx'; // import the component you want to refresh

const CreateUnit = () => {
  Auth();
  const { authInfo } = React.useContext(AuthContext);
  const [serverResponse, setServerResponse] = useState('');



  const onFinish = (values) => {
    const userid = authInfo.user._id;
    values.user = userid;
    const jsonValues = JSON.stringify(values);
    axios
      .post('http://localhost:5001/units/create', jsonValues, {
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
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
          <Form.Item label="Nom du cours" name="name">
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
            rules={[{ required: true }]}
            defaultValue="Lundi"
          >
            <Select>
              <Select.Option value="monday">Lundi</Select.Option>
              <Select.Option value="tuesday">Mardi</Select.Option>
              <Select.Option value="wednesday">Mercredi</Select.Option>
              <Select.Option value="thursday">Jeudi</Select.Option>
              <Select.Option value="friday">Vendredi</Select.Option>
              <Select.Option value="saturday">Samedi</Select.Option>
              <Select.Option value="sunday">Dimanche</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea style={{ height: '10rem' }} rows={4} maxRows={6} />
          </Form.Item>
          <Button
            style={{ backgroundColor: 'rgb(114, 46, 209)' }}
            htmlType="submit"
            type="primary"
          >
            Confirmer
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default CreateUnit;
