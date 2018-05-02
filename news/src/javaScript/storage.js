var localStorage = window.localStorage;

function setStorage(name,code){
	localStorage.setItem(name,code);
};

function getStorage(name){
	
	return localStorage.getItem(name);
	
};
var storageConfig = {
	phone:'phoneNum',
};
export default{
	setStorage:setStorage,
	getStorage:getStorage,
	storageConfig:storageConfig
}
