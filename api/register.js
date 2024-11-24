const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { username, password, email } = req.body;
        const usersFile = path.join(__dirname, '../data/users.json');

        let users = [];
        if (fs.existsSync(usersFile)) {
            users = JSON.parse(fs.readFileSync(usersFile));
        }

        // Check for existing user
        if (users.find(user => user.username === username || user.email === email)) {
            return res.status(400).json({ message: 'Username or email already taken.' });
        }

        // Add new user
        users.push({ username, password, email });
        fs.writeFileSync(usersFile, JSON.stringify(users));

        res.status(200).json({ message: 'Registration successful!' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};
