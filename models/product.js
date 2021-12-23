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
        WHERE products_id = ?
        ORDER BY product_images_id ASC`, [product_images_id])
    return JSON.parse(JSON.stringify(rows))

}
async function getProductDetails(products_id){

    const [rows, _] = await promisePool.query
    // (
        // `SELECT * FROM products
        // WHERE products_id = ?`, [products_id])
        // return JSON.parse(JSON.stringify(rows))

        (`SELECT * FROM products 
        INNER JOIN categories ON 
        products.category_id = 
        categories.category_id
        WHERE products_id =
        ?`,[products_id])
        return JSON.parse(JSON.stringify(rows))
}
       
module.exports = {
    getProducts: getProducts,
    getProductImages: getProductImages,
    getProductDetails: getProductDetails,
       
}