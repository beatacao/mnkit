var request = require('request');
var _ = require('lodash');
var co = require('co');

var api1 = 'http://localhost:3000/api/product1';
var api2 = 'http://localhost:3000/api/product2';
var api3 = 'http://localhost:3000/api/product3';

//product page  -- 串行加载
exports.cbhellProduct = function(req, res, next){
    var timerStart = new Date().getTime();
    request(api1, function(err, data){
        var data1 = JSON.parse(data.body);
        request(api2, function(err, data) {
            var data2 = JSON.parse(data.body);
            request(api3, function(err, data){
                var data3 = JSON.parse(data.body);
                console.log('total time:')
                console.log(new Date().getTime()-timerStart);
                return res.send(_.assign(data1, data2, data3));
            })
        })
    })
}

// fetch data  
var getProduct = function(api){
    return new Promise(function(resolve, reject){
        request(api, function(err, data){
            var data1 = JSON.parse(data.body);
            resolve(data1);
        })
    })
}

// product page -- generator+co
exports.gencoProduct = function(req, res, next){
    // resolve multiple promises in parallel
    var timerStart = new Date().getTime();
    co(function* gen(){
        var resData = yield [
            getProduct(api1),
            getProduct(api2),
            getProduct(api3)
        ]
        var totalTime = new Date().getTime() - timerStart;
        console.log('total time:')
        console.log(totalTime);
        res.send(_.assign(resData[0], resData[1], resData[2]));
    })
}

// demo -- async-await
// nodejs 服务端支持 async+await需要：
// 1、npm install babel-core, babel-polyfill, babel-preset-es2015, babel-preset-stage-3
// 2、根目录 .babelrc 配置
// 3、require('babel-core/register');
// 4、require('babel-polyfill')
exports.asyncawaitDemo = function(req, res, next){
    async function sleep(){
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                resolve(1)
            },3000);
        })
    }
    (async function(){
        res.write('<p>first async write</p>');
        await sleep();
        res.end('<p>async write after await</p>');    
    })()

    res.write('<p>this is after the async function</p>');
}

// product page - async-await
exports.asyaitProduct = function(req, res, next){
    async function asyncGet(api){
        return getProduct(api);
    }

    (async function(){
        // blocked
        // var p1 = await asyncGet(api1);
        // var p2 = await asyncGet(api2);
        // var p3 = await asyncGet(api3);

        // parallel
        var [p1, p2, p3] = await Promise.all([asyncGet(api1), asyncGet(api2), asyncGet(api3)]);

        res.send(_.assign(p1, p2, p3));
    })()
}

// product page - Promise
exports.promiseProduct = function(req, res, next){
    // parallel
    var p1 = getProduct(api1);
    var p2 = getProduct(api2);
    var p3 = getProduct(api3);

    Promise.all([p1, p2, p3]).then(function(result){
        return res.send(_.assign(result[0], result[1], result[2]));
    })

    // blocked
    // var data = {};
    // getProduct(api1)
    // .then(function(result){
    //     data = _.assign(data, result);
    //     return getProduct(api2);
    // })
    // .then(function(result){
    //     data = _.assign(data, result);
    //     return getProduct(api3);
    // })
    // .then(function(result){
    //     data = _.assign(data, result);
    //     return res.send(data);
    // })
}

// product page - eventproxy
exports.epProduct = function(req, res, next){

}

// product page - bluebird
exports.bbProduct = function(req, res, next){
    
}


