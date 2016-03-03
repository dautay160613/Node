var request = require('superagent');
var cfg = require("./parse-server-config");
var API_KEY = cfg.api_key;
var APPLICATION_ID = cfg.application_id;
var CONTENT_TYPE = cfg.content_type;
var ENDPOINT = cfg.host + ":" + cfg.port;

var convertJSONResponse = function(res) {
  if (res.type !== CONTENT_TYPE)
    return JSON.parse(res.xhr.response);
  return res.xhr.response;
}
module.exports = {
	get: function(path){
		return new Promise((resolve, reject) => {
			request.get(ENDPOINT + path)
					.set('X-Parse-REST-API-Key', API_KEY)
					.set('X-Parse-Application-Id', APPLICATION_ID)
					.set('Content-Type', CONTENT_TYPE)
				.end((error, data) => {
						console.log(data.statusCode);
						console.log(data.statusMessage);
						error ? reject(error) : resolve(data.body);
				 });
			});
	},
	post: function(path,body){
		return new Promise((resolve, reject) => {
            request.post(ENDPOINT + path)
                    .set('X-Parse-REST-API-Key', API_KEY)
          		    .set('X-Parse-Application-Id', APPLICATION_ID)
          		    .set('Content-Type', CONTENT_TYPE)
                 .send(body)
                 .end((error, data) => {

                     error ? reject(error) : resolve(data.text);
                 });
            });
	},
	put: function(path,body){
		return new Promise((resolve, reject) => {
			request.put(ENDPOINT + path)
					.set('X-Parse-REST-API-Key', API_KEY)
					.set('X-Parse-Application-Id', APPLICATION_ID)
					.set('Content-Type', CONTENT_TYPE)
				 .send(body)
				 .end((error, data) => {
					 error ? reject(error) : resolve(data.text);
				 });
			});
	},
	copy:function(path){
		return new Promise((resolve, reject) => {
            request.copy(ENDPOINT + path)
                    .set('X-Parse-REST-API-Key',API_KEY)
          		    .set('X-Parse-Application-Id',APPLICATION_ID)
          		    .set('Content-Type',CONTENT_TYPE)
                 .end((error, data) => {
                     error ? reject(error) : resolve(data.text);
                 });
            });
	},
	delete: function(path){
		return new Promise((resolve, reject) => {
            request.del(ENDPOINT + path)
                    .set('X-Parse-REST-API-Key', API_KEY)
          		    .set('X-Parse-Application-Id', APPLICATION_ID)
          		    .set('Content-Type', CONTENT_TYPE)
			.end((error, data) => {
			 	error ? reject(error) : resolve(data.text);
			});
        });
	}
}
