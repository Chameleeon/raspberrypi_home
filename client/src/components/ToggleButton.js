import React, { useState, useEffect } from 'react';
import config from '../config'; // Assuming you have the config file

const ToggleButton = ({ lightNumber, token, onToggle }) => {
  const [loading, setLoading] = useState(false);
  const [lightStatus, setLightStatus] = useState(false); // Track light status
  const apiUrl1 = `http://${config.server.ip}:${config.server.port}/api/l1`;
  const apiUrl2 = `http://${config.server.ip}:${config.server.port}/api/l2`;

  // Function to fetch the light status from the backend
  const fetchLightStatus = async () => {
    if (!token) {
      onToggle('Unauthorized access');
      return;
    }

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
    <button onClick={handleClick} disabled={loading}>
      {/* Conditionally render images based on the light status */}
      <img
        src={`${process.env.PUBLIC_URL}/assets/${lightStatus ? 'light_on.png' : 'light_off.png'}`}
        alt={`Light ${lightNumber}`}
        style={{ width: '20px', height: '20px', marginRight: '8px' }}
      />
      {loading ? ' Toggling...' : ` Toggle Light ${lightNumber}`}
    </button>
  );
};

export default ToggleButton;
