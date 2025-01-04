import React, { useEffect, useState } from 'react';
import config from '../config';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const apiUrl1 = `http://${config.server.ip}:${config.server.port}/api/l1`;
  const apiUrl2 = `http://${config.server.ip}:${config.server.port}/api/l2`;

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
      const response = await fetch(apiUrl1, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.text();
        setMessage(data);
      } else {
        setMessage('Failed to fetch light status');
      }
    } catch (error) {
      setMessage('An error occurred while fetching the light status');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleButtonClick = async (lightNumber) => {
    if (!token) {
      setMessage('Unauthorized access');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(lightNumber === 1 ? apiUrl1 + '/toggle' : apiUrl2 + '/toggle', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.text();
        setMessage(data);
      } else {
        setMessage('Failed to toggle light');
      }
    } catch (error) {
      setMessage('An error occurred while toggling the light');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>{message}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button onClick={() => handleToggleButtonClick(1)}>
            <i className="fas fa-lightbulb"></i> Toggle Light 1
          </button>
          <button onClick={() => handleToggleButtonClick(2)}>
            <i className="fas fa-lightbulb"></i> Toggle Light 2
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

