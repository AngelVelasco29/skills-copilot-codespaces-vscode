// Create web server
// 1. Load http module
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

// 2. Create web server object
// http.createServer([requestListener]): Returns a new instance of http.Server.
// The requestListener is a function which is automatically added to the 'request' event.
var app = http.createServer(function(request,response){
    // 3. Get request url and parse it
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url,true).pathname;
    var title = queryData.id;
    var filteredId = path.parse(title).base;
    var description = queryData.description;
    var body = '';

    // 4. Get data from request
    // 'data' event: Emitted when a chunk of data is received.
    request.on('data', function(data){
        body += data;
    });

    // 'end' event: Emitted when the entire body has been received, and it is given as a single Buffer.
    request.on('end', function(){
        var post = qs.parse(body);

        // 5. Create file and write data into file
        if(pathname === '/create_process'){
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                // 6. Redirect to home page
                response.writeHead(302, {Location: `/?id=${title}`});
                response.end();
            });
        } else if(pathname === '/update_process'){
            var id = post.id;
            var title = post.title;
            var description = post.description;
            fs.rename(`data/${id}`, `data/${title}`, function(err){
                fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                    // 6. Redirect to home page
                    response.writeHead(302, {Location: `/?id=${title}`});
                    response.end();
                });
            });
        } else if(pathname === '/delete_process'){
            var id = post.id;
            fs.unlink(`data/${id}`, function(err){
                // 6. Redirect to home page