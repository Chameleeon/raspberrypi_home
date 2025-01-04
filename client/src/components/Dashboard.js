import React, { useEffect, useState } from 'react';
import ToggleButton from './ToggleButton';
import config from '../config';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setMessage('Unauthorized access');
      return;
    }
    fetchLightStatus();
  }, [token]);

  const fetchLightStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/l1`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.text();
      } else {
        setMessage('Failed to fetch light status');
      }
    } catch (error) {
      setMessage('An error occurred while fetching the light status');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (newMessage) => {
    //setMessage(newMessage);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>{message}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
          <ToggleButton lightNumber={1} token={token} onToggle={handleToggle} />
          <ToggleButton lightNumber={2} token={token} onToggle={handleToggle} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
