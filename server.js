const express = require('express');
const app = express();
const port = 3000;

// Dummy database for existing users and colleges
const existingUsers = ['bhushan', 'mohan', 'sahil'];
const colleges = [
  'MIT', 'Stanford', 'Harvard', 'IIT Delhi',
  'IIT Bombay', 'NIT Trichy', 'NIT Warangal', 'IIM Bangalore'
];

// Middleware to serve static files (your client-side code)
app.use(express.static('public'));

// Middleware to parse JSON request body
app.use(express.json());

// Endpoint to check if the username exists
app.post('/usernameCheck', (req, res) => {
  const username = req.body.username.toLowerCase();
  if (existingUsers.includes(username)) {
    return res.json({ exists: true });
  } else {
    return res.json({ exists: false });
  }
});

// Endpoint to suggest college names
app.get('/suggestColleges', (req, res) => {
  const searchTerm = req.query.query.toLowerCase();
  const suggestions = colleges.filter(college => college.toLowerCase().startsWith(searchTerm));
  return res.json(suggestions);
});

// Endpoint to register a new user
app.post('/register', (req, res) => {
  const { username, password, college } = req.body;

  // Add the username to the existing users (simulating registration)
  existingUsers.push(username.toLowerCase());  // Simulating database update
  
  return res.json({ message: 'Successfully Registered!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
