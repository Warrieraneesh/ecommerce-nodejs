var express = require('express');
var router = express.Router();
var categoryModel = require('../models/category');

/* GET home page. */

router.get('/', async function(req, res, next) {
  let categories = await categoryModel.getCategories(4);   
  
  let finalCategories = categories.map(async c =>{
    
    c.images = await categoryModel.getCategoryImages(c.category_id)
    return c
    
  }) 
  finalCategories = await Promise.all(finalCategories);
  //console.log(finalCategories[0].images)
 
  res.render('index.html', { categories: finalCategories });
});

module.exports = router;


