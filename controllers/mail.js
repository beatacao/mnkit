var nodemailer = require('nodemailer');

exports.sendmail = function(){
	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport('smtp://caoshengmin%40yimei180.com:password@smtp.exmail.qq.com');

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: 'caoshengmin@yimei180.com', // sender address
	    to: 'beatacao@gmail.com', // list of receivers
	    subject: 'test ✔', // Subject line
	    text: 'Hello world 🐴', // plaintext body
	    html: '<b>Hello world 🐴</b>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	});
}