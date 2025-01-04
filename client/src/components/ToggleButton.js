import React, { useState, useEffect } from 'react';
import config from '../config';

const ToggleButton = ({ lightNumber, token, onToggle }) => {
  const [loading, setLoading] = useState(false);
  const [lightStatus, setLightStatus] = useState(false);
  const apiUrl1 = `http://${config.server.ip}:${config.server.port}/api/l1`;
  const apiUrl2 = `http://${config.server.ip}:${config.server.port}/api/l2`;


  const fetchLightStatus = async () => {
    if (!token) {
      onToggle('Unauthorized access');
      return;
    }
    console.log(`${process.env.PUBLIC_URL}/assets/${lightStatus ? 'light_on.jpg' : 'light_off.jpg'}`);

    try {
      const response = await fetch(lightNumber === 1 ? apiUrl1 : apiUrl2, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.text();
        setLightStatus(data.includes("ON"));
      } else {
        onToggle('Failed to fetch light status');
      }
    } catch (error) {
      onToggle('An error occurred while fetching the light status');
    }
  };

  useEffect(() => {
    fetchLightStatus();
  }, [token]);

  const handleClick = async () => {
    if (!token) {
      onToggle('Unauthorized access');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(lightNumber === 1 ? apiUrl1 + '/toggle' : apiUrl2 + '/toggle', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.text();
        onToggle(data);
        setLightStatus(prevStatus => !prevStatus);
      } else {
        onToggle('Failed to toggle light');
      }
    } catch (error) {
      onToggle('An error occurred while toggling the light');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={{
        backgroundColor: '#300b70',
        border: '6px solid #10072b',
        color: '#fff',
        fontSize: '32px',
	fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: loading ? 'not-allowed' : 'pointer',
        textAlign: 'center',
        width: '400px',
        transition: 'background-color 0.3s',
        margin: '8px',
      }}
    >
      {/* Conditionally render images based on the light status */}
      <img
        src={`${process.env.PUBLIC_URL}/assets/${lightStatus ? 'light_on.png' : 'light_off.png'}`}
        alt={`Light ${lightNumber}`}
        style={{ width: '100', height: '100', marginRight: '8px' }}
      />
      {loading
        ? ' Toggling...'
        : lightNumber === 1
          ? ' Lights'
          : ' LED Strip'}
    </button>
  );
};

export default ToggleButton;
