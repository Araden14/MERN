import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Auth from 'state/auth';
import { AuthContext } from 'state/AuthContext';
import { Card, Button, Popover } from 'antd';
import Meta from 'antd/es/card/Meta';
import CreateUnit from './create';

const Units = () => {
  Auth();
  const { authInfo } = React.useContext(AuthContext);
  const [units, setUnits] = useState(null);
  const [showButton, setShowButton] = useState(false); // Initialize data state for the button

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    axios
      .get('http://localhost:5001/units/get', { withCredentials: true })
      .then(function (response) {
        const data = response.data;
        let units = [];
        for (let i = 0; i < data.length; i++) {
          units.push(
            <Card style={{ }} key={i} bordered={true}>
              <Meta title={data[i].name} description={data[i].description} />
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
