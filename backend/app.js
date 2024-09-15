// Import the express module to create a server
const express = require('express');
// Import the mysql module to connect to MySQL database
const mysql = require('mysql');
// Import the cors module to enable CORS (Cross-Origin Resource Sharing)
const cors = require('cors');

// Create an instance of express
const app = express();
// Define the port number on which the server will listen
const port = 3000;

// Set up the connection parameters to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost', // Database host
  user: 'user',      // Database user
  password: 'password', // Database password
  database: 'mydatabase'  // Database name
});

// Connect to the database and handle any errors
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack); // Log error message
    return;
  }
  console.log('Connected to database.'); // Log success message
});

// Use CORS middleware to allow cross-origin requests
app.use(cors());
// Use express.json() middleware to parse JSON bodies
app.use(express.json());

// Define a route for the root URL which sends a JSON response
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' }); // Send JSON response
});

// Define a route to fetch all users from the database
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) throw error; // Throw an error if the query fails
    res.json(results); // Send the results as JSON
  });
});

// Start the server and log the address
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`); // Log the server address
});