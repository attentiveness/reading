'use strict'

let HOST = 'http://apis.baidu.com/';

function RequestService() { // Singleton pattern
	if (typeof RequestService.instance === 'object') {
		return RequestService.instance;
	}
	RequestService.instance = this;
}

RequestService.prototype.request = function(url, method, body) {
	var isOk;
	return new Promise((resolve, reject) => {
		fetch(HOST + url, {
				method: method,
				headers: {
					'apikey': '19ffb04654b0f50d003e0a58abf2c50b'
				},
				body: body,
			})
			.then((response) => {
				if (response.ok) {
					isOk = true;
				} else {
					isOk = false;
				}
				return response.json();
			})
			.then((responseData) => {
				if (isOk) {
					resolve(responseData);
				} else {
					reject(responseData);
				}
			})
			.catch((error) => {
				reject(error);
			});
	})
};

module.exports = RequestService;