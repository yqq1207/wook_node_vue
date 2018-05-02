var fs = require('fs');
var mineType = require('mime-types');  
function toBase64(data,filePath){
	data = new Buffer(data).toString('base64');  
	let base64 = 'data:' + mineType.lookup(filePath) + ';base64,' + data;
	return base64;
}

module.exports = {
	toBase64:toBase64,
}
