const promisePool = require('../config/db')
async function getCategories(){
    const [rows, _] = await promisePool.query
    (
        `SELECT * FROM categories 
        ORDER BY id DESC`, [])
        
    return JSON.parse(JSON.stringify(rows))
    
}
module.exports = {
    getCatogeries: getCategories
}