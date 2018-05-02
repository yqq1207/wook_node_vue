var query = require('../common/mysqlCreate.js');

/**
 * 查询
 */
function selectAll(data,cb){
	var sqlStr = 'SELECT * FROM user';
	var inParams = [];
	query.query(sqlStr,inParams,function(err,data){
		if(err){
			cb(err)
		}else {
			cb(null,data)
		}
	})
};
/**
 * 新建用户
 */
function insertRegest(data,cb){
	
	var inParams = [data.tel];
	var inParamsRegest = [data.tel,data.psd];
//	先查询有没有注册过
	var sqlStr = 'select * from user where tel = ?';
	
	query.query(sqlStr,inParams,function(err,data){
		
		if(data && data.length !== 0){
			cb(true,'该手机号已注册')
		}else {
			console.log('注册');
			var sqlStr = `INSERT INTO user(tel,psd) VALUES ( ?,?)`;
			query.query(sqlStr,inParamsRegest,function(err,data){
				console.log(err,data,'44')
				if(err){
					cb(err,'注册失败，请重试',)
				}else {
					cb(null,data);
				}
			})
		}
	})
	
};
/**
 * 用户登录
 * @param {Object} data
 * @param {Object} cb
 */
function userLogin(data,cb){
	console.log(data)
	var inParams = [data.tel];
//	var inParamsRegest = [data.phone,data.psd];
//	先查询有没有注册过
	var sqlStr = 'select * from user where tel = ?';
	
	query.query(sqlStr,inParams,function(err,data){
		console.log(err,data)
		if(data && data.length !== 0){
			var sqlStr = `select psd from user where tel = ?`;
			query.query(sqlStr,inParams,function(err,data){
				if(err){
					cb(err,'登录失败，请重试',)
				}else {
					cb(null,data)
				}
			})
		}else {
			cb(true,'没有该用户');
		}
	})
	
};
/**
 * 查询用户id
 */
function selectIdUser(data,cb){
	var inParams = [data.tel];
//	var inParamsRegest = [data.phone,data.psd];
//	先查询有没有注册过
	var sqlStr = 'select * from user where tel = ?';
	query.query(sqlStr,inParams,function(err,data){
		console.log(err,data,666)
		if(data && data.length !== 0){
			console.log(err,data,888)
			cb(false,data);
			
			
		}else {
			cb(true,'没有该用户');
		}
	})
	
};
/**
 * 更新用户信息
 */
function updataInfo(data,cb){
	var inParams = [data.address,data.age,data.email,data.name,data.nikecode,data.fileField,data.sex,data.tel,data.userid];
	var sqlStr = '';
	if(data.fileField){
		sqlStr = 'update userinfo set address=?,age=?,email=?,name=?,nikecode=?,nikeimg=?,sex=?,tel=? where userid=?';
	}else{
		inParams = [data.address,data.age,data.email,data.name,data.nikecode,data.sex,data.tel,data.userid];
		sqlStr = 'update userinfo set address=?,age=?,email=?,name=?,nikecode=?,sex=?,tel=? where userid=?';
	}
	
	
	query.query(sqlStr,inParams,function(err,data){
		console.log(err,data)
		if(err){
			cb(true,err)
		}else{
			cb(null,data)
		}
	})
};
/**
 * 添加用户详细信息
 */
function insertUserInfo(data,cb){
	console.log(data,'tianjia')
	var inParams = [data.tel,data.userid];
	console.log(inParams)
	var sqlStr = 'insert into userInfo (tel,userid) values (?,?)';
	console.log(inParams,sqlStr);
	query.query(sqlStr,inParams,function(err,data){
		console.log(err,data,'你猜')
		if(err){
			console.log('失败')
			cb(true,err)
		}else{
			cb(null,data)
		}
	})
}
/**
 * 删除数据库信息
 * 
 */
function deleteUser(data,cb){
	var inParams = [data.tel];
	var sqlStr = 'delete from user where tel = ?';
	console.log('删除数据库信息')
	query.query(sqlStr,inParams,function(err,data){
		if(err){
			cb(true,err)
		}else{
			cb(null,data)
		}
	})
}
/**
 * 查询用户信息
 */
function getUserInfo(data,cb){
	
	var sqlStr = 'select * from userInfo where tel = ?';
	var inParams = [data.tel];
//	var sqlStr = 'insert into userInfo (tel) values(11)';
	query.query(sqlStr,inParams,function(err,data){
		if(err){
			cb(true,err)
		}else{
			cb(null,data)
		}
	})
};
/**
 * 修改用户信息
 */
//function updataInfo(data,cb){
//	var sqlStr = 'updata '
//}


module.exports = {
	selectAll:selectAll,
	insertRegest:insertRegest,
	userLogin:userLogin,
	getUserInfo:getUserInfo,
	insertUserInfo:insertUserInfo,
	updataInfo:updataInfo,
	deleteUser:deleteUser,
	selectIdUser:selectIdUser,
}

