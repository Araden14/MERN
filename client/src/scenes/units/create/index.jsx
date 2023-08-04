import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Error500 from 'scenes/Offline';
import { Popover, Form, Input, Select } from 'antd';
import Auth from 'state/auth';
import { AuthContext } from 'state/AuthContext';

const CreateUnit = () => {
  Auth()
  const { authInfo } = React.useContext(AuthContext);
  
    const onFinish = (values) => {
      console.log('Success:', values);
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
      <div>
      <Form {...layout} onFinish={onFinish} layout="vertical">
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div style={{ flex: 1 }}>
            <Form.Item
              label="Nom du cours"
              name="name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Volume horaire"
              name="hours"
            >
              <Input />
            </Form.Item>
            
          </div>
          <div style={{ flex: 1}}>
            <Form.Item
            label="Jour"
            >
          <Select
              defaultValue="Lundi"
              style={{ width: '100%' }}
              onChange={handleSelectChange}
              options={[
                { value: 'monday', label: 'Lundi' },
                { value: 'tuesday', label: 'Mardi' },
                { value: 'wednesday', label: 'Mercredi' },
                { value: 'thursday', label: 'Jeudi' },
                { value: 'friday', label: 'Vendredi' },
                { value: 'saturday', label: 'Samedi' },
                { value: 'sunday', label: 'Dimanche' },
              ]}
            /></Form.Item>
            <Form.Item
              label="Description"
              name="description"
            >
              <Input />
            </Form.Item>
          </div>
        </div>
      </Form>

      </div>
    )
  
}

export default CreateUnit;

