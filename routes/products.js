var express = require('express');
var router = express.Router();
var productModel = require('../models/product');

/* GET products page. */

router.get('/', async function(req, res, next) {
  let products = await productModel.getProducts(12);   
  
  let finalProducts = products.map(async p =>{
    
    p.images = await productModel.getProductImages(p.products_id)
    return p
    
  }) 
  finalProducts = await Promise.all(finalProducts);
  console.log(finalProducts[0].images)
 
  res.render('products/index.html', { products: finalProducts });
});

/* GET product Details page. */

router.get('/:id', async function (req, res) {
  console.log(req.params.id)
  
    let products = await productModel.getProductDetails(req.params.id);

let finalProductDetails = products.map(async p => {
  p.images = await productModel.getProductImages(p.products_id)
  return p
})
finalProductDetails = await Promise.all(finalProductDetails);

console.log(finalProductDetails)

  res.render('products/detail.html', { productDetails: finalProductDetails[0]});

 });
module.exports = router;



