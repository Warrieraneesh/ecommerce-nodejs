var express = require('express');
var router = express.Router();
var productModel = require('../../models/product');
var categoryModel = require('../../models/category');
const validator = require('../../validations/validator');
const object = require('nunjucks/src/object');

router.get('/', async function(req, res, next) {
    const products = await productModel.getProducts(0, 100)
    // Get an array of flash message by passing the key to req.consumeFlash()
    const success = await req.consumeFlash('success');
    
    res.render("admin/products/index.html", {products: products, success: success})
});

router.get('/create', async function (req, res, next){

    const categories = await categoryModel.getCategories()

    res.render("admin/products/create.html", {categories: categories});

});

router.post("/create", async function (req, res, next){
    

    let {title, description, price, quantity, category_id} = req.body
    title = title.trim()
    description = description.trim()
    price = price.trim()
    quantity = quantity.trim()

    let errorBag = {
        title:[],
        description:[],
        price:[],
        quantity:[]
    }

    const titleRequired = validator.required(title,"Title")
    const titleMinlength = validator.required(title, 5, "Title")
    
    if(typeof titleRequired === 'object' && titleRequired.constructor === object){
        errorBag.title.push(titleRequired)
    }

    if(typeof titleMinlength ==='object' && titleMinlength.constructor === object){
        errorBag.title.push(titleMinlength)
    }

    const descriptionRequired = validator.required(description,"Description")
    const descriptionMinLength = validator.required(description, 12, "description")

    if(typeof descriptionRequired === 'object' && descriptionRequired.constructor === object){
        errorBag.description.push(descriptionRequired)
    }

    if(typeof descriptionMinLength === 'object' && descriptionMinLength.constructor === object){
        errorBag.description.push(descriptionMinLength)
    }

    const priceRequired = validator.required(price, "Price")
    const pricePositivenumber = validator.isPositiveNumber(price, "Price")

    if(typeof priceRequired === 'object'){
        errorBag.price.push(priceRequired)
    }

    if(typeof pricePositivenumber === 'object' && pricePositivenumber.constructor === object){
        errorBag.price.push(pricePositivenumber)
    }

    const quantityRequired = validator.required(quantity, "Quantity")
    const quantityPositiveNumber = validator.isPositiveInteger(quantity, "Quantity")

    if(typeof quantityRequired === 'object' && quantityRequired.constructor === object){
        errorBag.quantity.push(quantityRequired)
    }

    if(quantityPositiveNumber === 'object' && quantityPositiveNumber.constructor === object){
        errorBag.quantity.push(quantityPositiveNumber)
    }

    const product = {
        title: title,
        description: description,
        price: price,
        quantity: quantity,
        category_id: category_id,
    }

    if(errorBag.title.length > 0 || errorBag.description.length > 0|| errorBag.price.length > 0 || errorBag.quantity.length > 0){
        console.log(errorBag)
        console.log("inside error block")
        const categories = await categoryModel.getCategories()
        res.render("admin/create.html", {
            form: product, 
            categories: categories,
            errorBag: errorBag
        })
        return;
    }
   
       
    let productCreated = await productModel.createProduct(product);   
    console.log(productCreated.affectedRows)
    console.log(productCreated)
    if(productCreated.affectedRows == 1){
        // product created, now upload the images
        req.files.map(async e=> {
            //remove `public` from e.path
            await productModel.createProductImages(e.path.substring(6), productCreated.insertId);  
        })
    }
    await req.flash('success', 'Product created successfully');
    //res.render("admin/create.html")
    res.redirect('/admin/product');
});


module.exports = router;