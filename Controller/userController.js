const bcrypt = require('bcryptjs')

const getUser = (req, res) => {
    const user =[
        {
            id : 1,
            name : 'Kanesa Hermawati Yulistin',
            username : 'Kanesa',
            password : bcrypt.hashSync('kanesaabcha', 10),
            createdAt : new Date().toISOString(),
            updatedAt : new Date().toISOString()
        }
    ];
    
    res.json(user);
};

module.exports = {getUser};