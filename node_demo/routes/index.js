var express = require('express');
var router = express.Router();
var Response = require('../common/Response.js');
var svgCaptcha = require('../common/svgCaptcha.js');
var db = require('../mysql/index.js');
var cheerioData = require('../mysql/cheerioData.js');
var upload = require('multer')({ dest: 'uploads/userNikeImg/' });
var fs = require('fs');
var mineType = require('mime-types');  
var common = require('../common/common.js');
//var 
//接口
router.get('/',function(req,res,next){
//	res.render('index',{title:'ExpressGet'});
// Response.resp('this is a postChangeEx',res,'');
	res.send(req.query);
});
router.post('/postChange',function(req,res,next){
//	 Response.resp(req.query,res,'');
	res.send(req.body);
});
router.get('/ex',function(req,res,next){
	var requestData= {
		err:'',
		data:'',
	};
	cheerioData.cheerioData('https://news.baidu.com/guonei',function(err,dataList){
		if(err){
			var requestData= {
				err:true,
				data:err,
			};
			res.send(requestData);
			return next()
		}else{
			var requestData= {
				err:false,
				data:dataList,
			};
			res.send(requestData);
		}
	})
	
	
//Response.resp('this is a postChangeEx',res,'');
});
/**
 *登录
 */
router.post('/login',function(req,res,next){
	var regestData = req.body;
	var requestData= {
		err:'',
		data:'',
	};
	db.userLogin(regestData,function(err,data){
		console.log(regestData,'dengl')
		if(err){
			requestData= {
				err:true,
				data:data,
			};
			res.send(requestData)
		}else{
			if(data[0].psd == regestData.psd){
				requestData= {
					err:false,
					data:'登陆成功',
				};
			}else {
				requestData= {
					err:true,
					data:'密码错误',
				};
			}
			res.send(requestData)
		}
	});
});
/**
 *注册 
 */
router.post('/regest',function(req,res,next){
	console.log(req.body)
	var regestData = req.body;
	var requestData= {
		err:'',
		data:'',
	};
	
	db.insertRegest(regestData,function(err,data){
		console.log(data,err);
		if(err){
			requestData['err'] = true;
			requestData['data'] = data;
			res.send(requestData);
		}else{
			//如果注册成功，则向用户信息详情表注册
			//先查表的id 和 tel  的信息
			
			var selectIdUserData = {
				tel:regestData.tel
			};
			db.selectIdUser(selectIdUserData,function(err,data){
				console.log(data,typeof(data))
				if(err){
					requestData['err'] = true;
					requestData['data'] = '注册失败';
					res.send(requestData);
				}else{
					var regestData = {
						tel:data[0].tel,
						userid:data[0].userid
					};
					
					console.log('id',regestData)
					db.insertUserInfo(regestData,function(err,data){
						if(err){
							//注册失败之后还需要删除数据库里的信息
							db.deleteUser(regestData,function(err,data){
								requestData['err'] = true;
								requestData['data'] = '注册失败';
								res.send(requestData);
							})
						}else{
							requestData['err'] = false;
							requestData['data'] = '注册成功';
							
							res.send(requestData);
						}
					});
					
				};
			})
			
		}
	})
	
});

/**
 *获取验证码 
 */
router.post('/regestCode',function(req,res,next){
	
	svgCaptcha.getCode(req,function(data){
		res.send(data);
	});
});
/**
 *更新个人信息 
 */
router.post('/updateInfo',upload.single('fileField'),function(req,res){
	
	let sendFile = req.file;
	var trueOrFalse = true;
	var postData = req.body;
	var resdata = '';
	var requestData= {
		err:'',
		data:'',
	};
	if(sendFile){
		var FileType = sendFile.mimetype;
		console.log(sendFile)
		//判断文件类型
		if(FileType == 'image/png' || FileType == 'image/jpg' || FileType == 'image/jpeg' || FileType == 'image/png' ){
			console.log('是图片');
			let filePath = req.file.path;
			let data = fs.readFileSync(filePath);  
			console.log(data)
//			data = new Buffer(data).toString('base64');  
//			  
//			let base64 = 'data:' + mineType.lookup(filePath) + ';base64,' + data; 
			let base64 = common.toBase64(data,filePath);
			postData.fileField = filePath;
		}else{
			console.log('不是图片');
			requestData['err'] = true;
			requestData['data'] = '图片格式有误';
			res.send(requestData);
			return;
		}
		
	}else{
		postData.fileField = '';
		console.log('没有上传图片');
	}
	db.updataInfo(postData,function(err,data){
		console.log(postData)
		if(err){
			requestData['err'] = true;
			requestData['data'] = '修改失败';
			res.send(requestData);
		}else{
			requestData['err'] = false;
			requestData['data'] = '修改成功';
			res.send(requestData);
		}
	})
	
});
/**
 * 新建个人信息表insertUserInfo
 */
router.post('/updataInfo',function(req,res){
	var regestData = req.body;
	var requestData= {
		err:'',
		data:'',
	};
	db.updataInfo(regestData,function(err,data){
		console.log(data,err);
		if(err){
			requestData['err'] = true;
			requestData['data'] = data;
			res.send(requestData);
		}else{
			requestData['err'] = false;
			requestData['data'] = data;
			res.send(requestData);
		}
	});
});
/**
 *查询个人信息 
 */
router.get('/getUserInfo',function(req,res){
	var regestData = req.query;
	var requestData= {
		err:'',
		data:'',
	};
	
	db.getUserInfo(regestData,function(err,data){
		if(err){
			requestData['err'] = true;
			requestData['data'] = data;
			res.send(requestData)
		}else{
			let request = data;
			let filePath = request[0].nikeimg;
//			fs.readFileSync(filePath,function(err,data){
			fs.readFile(filePath,function(err,data){
				if(err){
					console.log('err');
					requestData['err'] = false;
					requestData['data'] = request;
					res.send(requestData)
				}else{
					let filePathData = data;
					let base64 = common.toBase64(filePathData,filePath);
					request[0].nikeimg = base64;
					requestData['err'] = false;
					requestData['data'] = request;
					res.send(requestData)
				};
			});
		}
	});
});




module.exports = router;

