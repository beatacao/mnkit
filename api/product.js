exports.product1 = function(req, res, next){
	console.log(1)
	setTimeout(function(){
		res.send({"api1":"this is api1"});
	},2000)
}

exports.product2 = function(req, res, next){
	console.log(2)
	setTimeout(function(){
		res.send({"api2":"this is api2"});
	},4000)
}

exports.product3 = function(req, res, next){
	console.log(3)
	setTimeout(function(){
		res.send({"api3":"this is api3"});
	},6000)
}