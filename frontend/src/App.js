import React, { useState, useEffect } from 'react';

const App = () => {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [backendStatus, setBackendStatus] = useState('Checking backend status...');

  useEffect(() => {
    fetch('http://localhost:3000')
      .then(response => {
        if (response.ok) {
          setBackendStatus('Backend is running!');
          return response.json();
        } else {
          throw new Error('Backend not responding');
        }
      })
      .then(data => setMessage(data.message))
      .catch(error => {
        console.error('Error:', error);
        setBackendStatus('Failed to connect to backend.');
      });

    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="App">
      <h1>My App</h1>
      <p>{message}</p>
      <p>{backendStatus}</p>
      <h2>Users:</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;