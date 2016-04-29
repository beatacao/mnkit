var express = require('express');
var router = express.Router();
var productApiController = require('../api/product');

var siteController = require('../controllers/site');
var productController = require('../controllers/product');
var emailController = require('../controllers/mail');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// form
router.post('/form', function(req, res, next){
	res.json(req.body);
})

// chunked 传输
router.get('/chunked', siteController.chunked);

// 发送邮件
router.post('/sendmail', emailController.sendmail);

//fetch multi data
router.get('/cbhell-product', productController.cbhellProduct);
router.get('/genco-product', productController.gencoProduct);
router.get('/asyncawait-demo', productController.asyncawaitDemo);
router.get('/asyait-product', productController.asyaitProduct);
router.get('/promise-product', productController.promiseProduct);

// apis
router.get('/api/product1', productApiController.product1);
router.get('/api/product2', productApiController.product2);
router.get('/api/product3', productApiController.product3);

module.exports = router;
