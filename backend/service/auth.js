

const jwt = require("jsonwebtoken");

// Map to store session information
const sessionIdToUserMap = new Map();

// Function to set a user session and return a token
function setUser(id, user) {
    const payload = {
        id,
        ...user,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' }); // Token valid for 1 hour
    sessionIdToUserMap.set(id, user); // Store session in the map
    return token;
}

// Function to get a user by session ID
function getUser(id) {
    if (!sessionIdToUserMap.has(id)) {
        throw new Error('Session not found');
    }
    return sessionIdToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser,
};
