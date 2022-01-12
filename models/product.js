const promisePool = require('../config/db')
async function getProducts(offset, row_count, search ='', cat_id=null){
    console.log(offset, row_count, search)
    if(cat_id === null) {
        const [rows, _] = await promisePool.query
        (
            // `SELECT * FROM products
            // ORDER BY products_id DESC LIMIT ?`, [limit])

            `SELECT * FROM products
            ORDER BY products_id DESC LIMIT  ?, ?`, [offset, row_count])
            return JSON.parse(JSON.stringify(rows)) 
            
    } else {
        const [rows, _] = await promisePool.query
        (
            // `SELECT * FROM products
            // ORDER BY products_id DESC LIMIT ?`, [limit])

            `SELECT * FROM products
            WHERE category_id = ?
            ORDER BY products_id DESC LIMIT  ?, ?`, [cat_id, offset, row_count])
            return JSON.parse(JSON.stringify(rows)) 
    }

    // let replacement = `'%${search}%'`;
 
    // const [rows, _] = await promisePool.query
    // (
    //     // `SELECT * FROM products
    //     // ORDER BY products_id DESC LIMIT ?`, [limit])

    //     `SELECT * FROM products 
    //     WHERE products_title LIKE ${replacement}
    //     ORDER BY products_id DESC LIMIT  ?, ?`, [ offset, row_count])

    //return JSON.parse(JSON.stringify(rows)) 

}
async function getUsers(username, password){

    const [rows, _] = await promisePool.query
    (
        `SELECT * FROM users 
         WHERE users_email = ? AND users_password = ? ` , [username, password]
    )
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

async function createProduct(product) {
    const [rows, _] = await promisePool.query

    (` INSERT INTO products
      (products_title, products_description, products_price, products_quantity, category_id)
      VALUES(?, ?, ?, ?,?)`,
      [product.title, product.description, product.price, product.quantity, product.category_id])
    
    return JSON.parse(JSON.stringify(rows))
    
      //return rows.map((row) => { return row  }
}
async function createProductImages(image_path, products_id) {
    const [rows, _] = await promisePool.query
    (`INSERT INTO product_images
    (product_images_path, products_id)
    VALUES(?,?)`,
    [image_path, products_id]
    )
    return JSON.parse(JSON.stringify(rows))  
     //return rows.map((row) => { return row  });  
}
async function getProductsCount(cat_id= null){
    if(cat_id == null) {
        const [rows, _] = await promisePool.query
        (
                  `SELECT COUNT(*) as productCount FROM products`, [])
                  return JSON.parse(JSON.stringify(rows[0].productCount)) 
    } else {
        const [rows, _] = await promisePool.query
        (
                  `SELECT COUNT(*) as productCount FROM products WHERE category_id = ?`, [cat_id])
                  return JSON.parse(JSON.stringify(rows[0].productCount)) 
    }
   

    

}



module.exports = {
    getProducts         : getProducts,
    getProductImages    : getProductImages,
    getProductDetails   : getProductDetails,
    createProduct       : createProduct,
    createProductImages : createProductImages,
    getProductsCount    : getProductsCount,
     getUsers            : getUsers,
       
}









