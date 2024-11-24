const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { username, password } = req.body;
        const usersFile = path.join(__dirname, '../data/users.json');

        if (fs.existsSync(usersFile)) {
            const users = JSON.parse(fs.readFileSync(usersFile));

            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                res.status(200).json({ message: 'Login successful!' });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(400).json({ message: 'No users found' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};
