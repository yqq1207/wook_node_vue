 import axios from 'axios'




export default {
	
	axiosRequest:function(url,data,cb){
		url = 'http://127.0.0.1:9051'+ url;
		axios.get(url, {
		    params:data
		  })
		  .then(function (response) {
		   cb(response.data);
		  })
		  .catch(function (error) {
		   cb(error);
		  });
	},
	axiosPost:function(url,data,cb){
		url = 'http://127.0.0.1:9051'+ url;
		console.log(url)
		axios.post(url,data)
		  .then(function (response) {
		    cb(response.data);
		  })
		  .catch(function (error) {
		    cb(error);
		  });
	},
}