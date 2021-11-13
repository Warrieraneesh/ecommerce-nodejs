const promisePool = require('../config/db')
async function getProducts(limit){
    const [rows, _] = await promisePool.query
    (
        `SELECT * FROM products
        ORDER BY products_id DESC LIMIT ?`, [limit])

    return JSON.parse(JSON.stringify(rows)) 

    }
async function getProductImages(product_images_id){

const [rows, _] = await promisePool.query
    (
        `SELECT * FROM product_images
        WHERE products_products_id = ?
        ORDER BY product_images_id ASC`, [product_images_id])
    return JSON.parse(JSON.stringify(rows))

}
module.exports = {
    getProducts: getProducts,
    getProductImages: getProductImages,
    
}