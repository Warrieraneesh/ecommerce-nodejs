var express = require('express');
var router = express.Router();
var productModel = require('../models/product');

/* GET home page. */

router.get('/', async function(req, res, next) {
  let products = await productModel.getProducts(7);   
  
  let finalProducts = products.map(async p =>{
    
    p.images = await productModel.getProductImages(p.products_id)
    return p
    
  }) 
  finalProducts = await Promise.all(finalProducts);
  //console.log(finalProducts[0].images)
 
  res.render('products/index.html', { title: 'Latest Products', products: finalProducts });
});

module.exports = router;



