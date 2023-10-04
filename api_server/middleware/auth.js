const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');


const usersFilePath = path.join(api_server, 'users.json');

function createUser(username, password, role) {
  const users = readUsers();
  
  // Check for duplicate usernames
  if (users.some(user => user.username === username)) {
    return null; // Duplicate username
  }

  const userId = uuid(); // Generate a unique ID for the user
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    id: userId,
    username: username,
    password: hashedPassword,
    role: role
  };

  users.push(newUser);
  writeUsers(users);
  return newUser;
}

function readUsers() {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

const jwt = require('jsonwebtoken');
const apiSecretKey = 'your-api-secret-key'; // Replace with your secret key

function generateToken(userId, username, role) {
  return jwt.sign({ userId, username, role }, apiSecretKey, { expiresIn: '1h' });
}

function authenticateUser(req, res, next) {
  // Implement API key authentication here if needed

  const { username, password } = req.body;

  // Verify user credentials (e.g., by checking the 'users.json' file)
  const user = verifyUserCredentials(username, password);

  if (!user) {
    return res.status(401).json({ error: 'Authentication failed' });
  }

  // Generate a JWT token and attach it to the request
  const token = generateToken(user.id, user.username, user.role);
  req.token = token;
  req.user = user;

  next();
}

// api_server/auth.js

function authorizeRole(roles) {
    return (req, res, next) => {
      const userRole = req.user.role;
      if (!roles.includes(userRole)) {
        return res.status(403).json({ error: 'Permission denied' });
      }
      next();
    };
  }
  
  module.exports = {
    authorizeRole
  };

module.exports = {
  authenticateUser
};

module.exports = {
  createUser
};