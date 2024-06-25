import React, { useEffect, useState } from 'react';
import config from '../config';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setMessage('Unauthorized access');
      return;
    }

    fetchLightStatus();
  }, [token]);

  const fetchLightStatus = async () => {
    try {
      const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/l1`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.text();
        setMessage(data);
      } else {
        throw new Error('Unauthorized');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleToggleButtonClick = async () => {
    if (!token) {
      setMessage('Unauthorized access');
      return;
    }

    try {
      const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/l1/toggle`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.text();
        setMessage(data);
      } else {
        throw new Error('Unauthorized');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>{message}</p>
      <button onClick={handleToggleButtonClick}>Toggle Light 1</button>
    </div>
  );
};

export default Dashboard;
