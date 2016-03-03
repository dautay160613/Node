var client = require("http");
var https = require("https");

var parseServerCfg = require("./parse-server-config");

//create http or http request by config
if(!parseServerCfg.use_http){
	client = https;
}

module.exports = {
	// GET method
	get : function(request,response, path) {
		// An object of options to indicate where to post to
		var options = {
			host: parseServerCfg.host,// '52.90.29.196',
			port: parseServerCfg.port,//8080,
			path: path,
			method: 'GET',
			headers: {
				'X-Parse-REST-API-Key': parseServerCfg.api_key_value,// 't0GhbXpaNdFWezpu6sHd7PNxcuqrRHc9i8vFNmQx',
				'X-Parse-Application-Id': parseServerCfg.application_id_value,//'wPJuyJsloZ14Rx7rUIk1BLLlpmrVt7rHqD5w3iza',
				'Content-Type':parseServerCfg.content_type, //'application/json'
			}
		};

		// Set up the request
		var req = client.get(options, function(res) {
			var dataArr ='';
			res.on('data', function (chunk) {
					dataArr+=chunk;
			});
			res.on('end',function(){
				response.json(JSON.parse(dataArr));
			})
		});

		// end request
		req.end();
	},

	// POST method
	post : function(request, response, path, body) {
		// An object of options to indicate where to post to
		var options = {
			host: parseServerCfg.host,// '52.90.29.196',
			port: parseServerCfg.port,//8080,
			path: path,
			method: 'POST',
			headers: {
				'X-Parse-REST-API-Key': parseServerCfg.api_key_value,// 't0GhbXpaNdFWezpu6sHd7PNxcuqrRHc9i8vFNmQx',
				'X-Parse-Application-Id': parseServerCfg.application_id_value,//'wPJuyJsloZ14Rx7rUIk1BLLlpmrVt7rHqD5w3iza',
				'Content-Type':parseServerCfg.content_type, //'application/json'
				'Content-Length': Buffer.byteLength(body)
			}
		};

		var req = client.request(options, function(res) {
				var responseString = '';
				res.setEncoding('utf8');
				res.on('data', function (chunk) {
					  responseString+=chunk;
				});

				res.on('end',function(){
						response.json(JSON.parse(responseString));
				})
			});

			// post the body data
		req.write(body);
		req.on('error', function(e) {
		  console.error(e);
		});
		req.end();
	},

	// PUT method
	put : function(request, response, path, body) {
		// An object of options to indicate where to post to
		var options = {
			host: parseServerCfg.host,// '52.90.29.196',
			port: parseServerCfg.port,//8080,
			path: path,
			method: 'PUT',
			headers: {
				'X-Parse-REST-API-Key': parseServerCfg.api_key_value,// 't0GhbXpaNdFWezpu6sHd7PNxcuqrRHc9i8vFNmQx',
				'X-Parse-Application-Id': parseServerCfg.application_id_value,//'wPJuyJsloZ14Rx7rUIk1BLLlpmrVt7rHqD5w3iza',
				'Content-Type':parseServerCfg.content_type, //'application/json'
				'Content-Length': Buffer.byteLength(body)
			}
		};

		var req = client.request(options, function(res) {
			var responseString = '';
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				 responseString+=chunk;
			});

			res.on('end',function(){
				 response.json(JSON.parse(responseString));
			})
		});

		// post the body data
		req.write(body);
		req.on('error', function(e) {
			console.error(e);
		});
		req.end();
	},

  	//DELETE method
	delete : function (request, response, path) {
		// An object of options to indicate where to post to
		var options = {
			host: parseServerCfg.host,// '52.90.29.196',
			port: parseServerCfg.port,//8080,
			path: path,
			method: 'DELETE',
			headers: {
				'X-Parse-REST-API-Key': parseServerCfg.api_key_value,// 't0GhbXpaNdFWezpu6sHd7PNxcuqrRHc9i8vFNmQx',
				'X-Parse-Application-Id': parseServerCfg.application_id_value,//'wPJuyJsloZ14Rx7rUIk1BLLlpmrVt7rHqD5w3iza',
				'Content-Type':parseServerCfg.content_type //'application/json'
			}
		};

		var req = client.request(options, function(res) {
			 var responseString = '';
			 res.setEncoding('utf8');
			 res.on('data', function (chunk) {
				responseString+=chunk;
			 });

			 res.on('end',function(){
				response.json(JSON.parse(responseString));
			 })
		});

		// post the body data
		req.on('error', function(e) {
			console.error(e);
		});
		req.end();
	}
}
