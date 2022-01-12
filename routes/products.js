var express = require('express');
const { off } = require('../config/db');
var router = express.Router();
var productModel = require('../models/product');

/* GET products page. */

router.get('/', async function(req, res, next) {
  let category_id = null
  if(req.query.cat_id) {
    category_id = req.query.cat_id
  }
  let productCount = await productModel.getProductsCount(category_id)
  const rowCount = 6;
  let numPage = Math.ceil(productCount / rowCount)
  let currentPage= req.query.page || 1;
  const offset = (rowCount-1) * currentPage
  console.log('offset', offset)
  let search= req.query.search || '';
 


  let products = await productModel.getProducts(offset, rowCount, '', category_id); 


  
  let finalProducts = products.map(async p =>{
    
    p.images = await productModel.getProductImages(p.products_id)
    return p
    
  }) 
  finalProducts = await Promise.all(finalProducts);
  console.log("======================================", productCount)

 
  res.render('products/index.html', { title: "Products",products: finalProducts, numPage: numPage, currentPage: currentPage });
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




