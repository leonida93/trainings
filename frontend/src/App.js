import React, { useState, useEffect } from 'react';

// Define the App component using a functional component approach
const App = () => {
  // State for storing the message from the backend
  const [message, setMessage] = useState('');
  // State for storing the list of users fetched from the backend
  const [users, setUsers] = useState([]);
  // State for storing the backend connection status
  const [backendStatus, setBackendStatus] = useState('Checking backend status...');

  // useEffect hook to handle fetching data from the backend when the component mounts
  useEffect(() => {
    // Fetching general backend status and a message
    fetch('http://localhost:3000')
      .then(response => {
        if (response.ok) {
          setBackendStatus('Backend is running!'); // Update status if backend is running
          return response.json(); // Parse JSON data from the response
        } else {
          throw new Error('Backend not responding'); // Handle response errors
        }
      })
      .then(data => setMessage(data.message)) // Set the message state with data from backend
      .catch(error => {
        console.error('Error:', error); // Log errors to the console
        setBackendStatus('Failed to connect to backend.'); // Update status on connection failure
      });

    // Fetching list of users from the backend
    fetch('http://localhost:3000/users')
      .then(response => response.json()) // Parse JSON data from the response
      .then(data => setUsers(data)) // Set the users state with data from backend
      .catch(error => console.error('Error fetching users:', error)); // Log errors to the console
  }, []); // Empty dependency array means this effect runs only once after the initial render

  // Render the component UI
  return (
    <div className="App">
      <h1>My App</h1>
      <p>{message}</p> // Display the message from the backend
      <p>{backendStatus}</p> // Display the backend status
      <h2>Users:</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li> // Map over the users array to display each user
        ))}
      </ul>
    </div>
  );
};

export default App; // Export the App component for use in other parts of the application