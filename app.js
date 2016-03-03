var express = require('express');
var app = module.exports = express();
var fs = require("fs");
var client = require("./parse-server-api-call");
var caller = require('./superagent-api-call');

var req = require('superagent');

var https = require('https');

var needle = require('needle');

app.get('/',function(request,response){

    //var endpoint = "https://cms.ddev1.worldnow.com/v1.0/categories/search";
    var endpoint = "cms.ddev1.worldnow.com/v1.0/categories/search";
    var dt = {affiliateid:6,
        namesearchmask:"News",
        statuses:[ 1,2 ]
    };

    var headers = {
        'authorizationtoken': 'bJ+g9KtTXfo5ujFbMNJthA==',
        'Accept': 'application/json',
        'Content-Type':'application/json'
    }

    var options = {
        host: 'cms.ddev1.worldnow.com/v1.0',
        path: '/categories/search',
        method: 'POST',
        headers: headers,
        rejectUnauthorized: false,
        requestCert: true,
        agent: false,
        strictSSL: false,
    }

    needle.post(endpoint, dt, options, function(err, resp) {

        console.log("ERROR");
        console.log(err);

        console.log("RESPONSE");
        console.log(resp);
        response.end("AAAA");

      // you can pass params as a string or as an object.
    });
    /*process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    var body={affiliateid:6,
             namesearchmask:"News",
             statuses:[ 1,2 ]
             } ;


    // An object of options to indicate where to post to
    var options = {
        host: 'https://cms.ddev1.worldnow.com/v1.0',
        //port: 443,
        path: '/categories/search',
        method: 'POST',
        headers: {
            'authorizationtoken': 'bJ+g9KtTXfo5ujFbMNJthA==',
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(body) )
        }
    };

    var req = https.request(options, function(res) {
        var responseString = '';
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
             responseString += chunk;
        });

        res.on('end',function(){
            response.json(JSON.parse(responseString));
            // Checking response status
        })
    });
    // post the body data
    req.write(JSON.stringify(body));
    req.on('error', function(e) {
        console.error(e);
    });
    req.end();*/



    /*console.log("RUN");

    var promise = new Promise((resolve, reject) => {
        req.post(endpoint)
            .set('authorizationtoken', 'bJ+g9KtTXfo5ujFbMNJthA==')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
         .send(dt)
         .end((error, data) => {
            console.log("data");
            console.log(data);
            console.log("error");
            console.log(error);
             error ? reject(error) : resolve(data.text);
         });
    });
    promise.then(function(data){
             console.log(data);

      response.end(data);
    }).catch(function(error){
     response.end(error);
    });*/

     /*var promise = caller.post(endpoint,data);
         promise.then(function(data){
            console.log(data);

             response.end(data);
         }).catch(function(error){
            response.end(error);
         });*/




    /*var path = "/classes/AppConfig";
    var promise = caller.get(path);
    promise.then(function(data){
        response.end(data);
    }).catch(function(error){
       response.end(error);
    });*/
});

app.get('/getall',function(request,response){

    var ENDPOINT = 'http://52.90.29.196:8080';
    var path = "/classes/AppConfig";
    var fullPath = ENDPOINT + path;
    console.log(ENDPOINT);
    console.log(path);
    console.log(fullPath);
    console.log(parseServerCfg.api_key_value);
    console.log(parseServerCfg.application_id_value);

    		var promise =  new Promise((resolve, reject) => {
                req.get(ENDPOINT + path)
            			.set('X-Parse-REST-API-Key', parseServerCfg.api_key_value)
            			.set('X-Parse-Application-Id', parseServerCfg.application_id_value)
            			.set('Content-Type', parseServerCfg.content_type)
            		.end((error, data) => {
            		        console.log('end request');
                            console.log(data.text);
                            error ? reject(error) : resolve( JSON.parse(data.text));
                     });
                  });

            promise.then(function(data){



                    response.end(JSON.stringify(data));
                }).catch(function(error){
                    response.end(error);


            });

        //response.end(JSON.stringify(result));
});


var port = 3002;

app.listen(port, function(){
  console.log("Express server listening on port " + port);
});
