const promisePool = require('../config/db')
async function getCategories(limit=5){
    // simple query
    const [rows, _] = await promisePool.query
    (
        `SELECT * FROM categories        
        ORDER BY category_id DESC LIMIT ?`, [limit])   
    //return rows;
    return JSON.parse(JSON.stringify(rows))
    //return rows.map((row) => { return row  });  
    
}
async function getCategoryImages(category_images_id){
    // simple query
    const [rows, _] = await promisePool.query
    (
        `SELECT * FROM category_images 
        WHERE category_id = ?
        ORDER BY category_images_id ASC`, [category_images_id])  

    return JSON.parse(JSON.stringify(rows))  
    //return rows.map((row) => { return row  });  
    
}

module.exports = {
    getCategories: getCategories,
    getCategoryImages: getCategoryImages,

}
