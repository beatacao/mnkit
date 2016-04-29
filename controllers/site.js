var request = require('request');
var _ = require('lodash');

// chunked 传输
exports.chunked = function(req, res, next){
	res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    var html =
        '<!DOCTYPE html>' +
        '<html lang="en">' +
            '<head>' +
                '<meta charset="utf-8">' +
                '<title>Chunked transfer encoding test</title>' +
            '</head>' +
            '<body>';

    res.write(html);

    html = '<h1>Chunked transfer encoding test</h1>'

    res.write(html);

    // Now imitate a long request which lasts 5 seconds.
    setTimeout(function(){
        html = '<h5>This is a chunked response after 5 seconds. The server should not close the stream before all chunks are sent to a client.</h5>'

        res.write(html);

        // since this is the last chunk, close the stream.
        html =
            '</body>' +
                '</html';

        res.end(html);

    }, 5000);

    // this is another chunk of data sent to a client after 2 seconds before the
    // 5-second chunk is sent.
    setTimeout(function(){
        html = '<h5>This is a chunked response after 2 seconds. Should be displayed before 5-second chunk arrives.</h5>'

        res.write(html);

    }, 2000);
}


	