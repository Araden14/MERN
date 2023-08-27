import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Auth from 'state/auth';
import { AuthContext } from 'state/AuthContext';
import { Card, Button, Popover } from 'antd';
import Meta from 'antd/es/card/Meta';
import CreateUnit from './create';
import { Checkbox } from '@mui/material';
import { DeleteOutlined } from '@ant-design/icons';

const Units = () => {
  Auth();
  const { authInfo } = React.useContext(AuthContext);
  const [units, setUnits] = useState(null);
  const [showButton, setShowButton] = useState(false); // Initialize data state for the button
  const [UnitsData, setUnitsData] = useState(false); // Initialize data state for the button

 

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    axios
      .get('http://localhost:5001/units/get', { withCredentials: true })
      .then(function (response) {
        const data = response.data;
        setUnitsData(data);
        let units = [];
        for (let i = 0; i < data.length; i++) {
          units.push(

            <Card
              style={{ borderWidth: '0.2em', borderColor: 'blue' }}
              key={i}
              bordered={true}
              actions={[
                <DeleteOutlined onClick={() => deleteUnit(i)} />
              ]}
            >
              <Meta title={data[i].name} description={data[i].description} />
<h1>{data[i].key}</h1>
              <br />
              <p>Volume horaire : {data[i].hours}</p>
              Jour : {data[i].day}
            </Card>
          );
        }
        setUnits(units);
       
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function deleteUnit(i) {
    if (UnitsData[i]) {
      axios.delete('http://localhost:5001/units/delete/', {
        data: {
          name: UnitsData[i].name,
          _id: UnitsData[i]._id,
          user: UnitsData[i].user
        },
        withCredentials: true
      })
      .then((response) => {
        fetchUnits();
        console.log(response.data.message)
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      console.log('Element not found in UnitsData array');
    }
    console.log(UnitsData[i]);
    console.log(units)
  }

console.log(UnitsData)
  function resetState() {
    fetchUnits();
  }

  const handleButtonClick = () => {
    setShowButton(!showButton); // Toggle the state of the button
  };

  return (
    <div>
      <div style={{ display: 'inline-flex', gap: '1rem', alignItems: 'center' }}>
        <h1 className='font-bold text-xl'>Vos cours 📚</h1>
        <Popover
          overlayStyle={{ width: '30vw' }}
          placement='bottomRight'
          title={<h1>Crée un nouveau cours</h1>}
          content={<CreateUnit resetState={resetState} />}
          trigger='click'
        >
          <Button style={{ backgroundColor: '#1F8A70' }} type='primary'>
            Ajouter
          </Button>
        </Popover>
        <Button style={{ backgroundColor: '#801' }} type='primary'>
          {showButton ? 'Cacher' : 'Afficher'} le bouton
        </Button> {/* Toggle the button */}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
          marginRight: '1rem',
        }}
        className='cours'
      >
        {units}
      </div>
    </div>
  );
};

export default Units;
