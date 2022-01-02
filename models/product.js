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

    async function createProduct(product){
    const [rows, _] = await promisePool.query

    (` INSERT INTO products
      (products_title, products_description, products_price, products_quantity, category_id)
      VALUES(?, ?, ?, ?,?)`,
      [product.title, product.description, product.price, product.quantity, product.category_id])
      return JSON.parse(JSON.stringify(rows))  
      //return rows.map((row) => { return row  }
}
    async function createProductImages(image_path, products_id){
    const [rows, _] = await promisePool.query
    (`INSERT INTO product_images
    (product_images_path, products_id)
    VALUES(?,?)`,
    [image_path, products_id]
    )
    return JSON.parse(JSON.stringify(rows))  
     //return rows.map((row) => { return row  });  
    }
module.exports = {
    getProducts: getProducts,
    getProductImages: getProductImages,
    getProductDetails: getProductDetails,
    createProduct: createProduct,
    createProductImages: createProductImages,
       
}









