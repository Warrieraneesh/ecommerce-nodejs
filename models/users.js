const promisePool = require('../config/db')

async function getUsers(username, password){

    const [rows, _] = await promisePool.query
    (
        `SELECT * FROM users 
         WHERE users_email = ? AND users_password = ? ` , [username, password]
    )
    return JSON.parse(JSON.stringify(rows))
}

module.exports = {
    getUsers : getUsers
}