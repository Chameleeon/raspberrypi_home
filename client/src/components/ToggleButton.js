import React, { useState } from 'react';

const ToggleButton = ({ lightNumber, token, onToggle }) => {
  const [loading, setLoading] = useState(false);
  const apiUrl1 = `http://${config.server.ip}:${config.server.port}/api/l1`;
  const apiUrl2 = `http://${config.server.ip}:${config.server.port}/api/l2`;

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
      <i className="fas fa-lightbulb"></i>
      {loading ? ' Toggling...' : ` Toggle Light ${lightNumber}`}
    </button>
  );
};

export default ToggleButton;
