var request = require("request");
var cheerio = require("cheerio");
var async = require('async');

//request('https://www.baidu.com/',function(err,result){
//  if(err){
//      console.log("错误："+err);
//      return;
//  }
//  console.log(result.body);
//});





// 通过 load 方法把 HTML 代码转换成一个 jQuery 对象
//var $ = cheerio.load('<h2 class="title">Hello world</h2>');
//
//// 可以使用与 jQuery 一样的语法来操作
//$('h2.title').text('Hello there!');
//$('h2').addClass('welcome');
//
//console.log($.html());
// 将输出 <h2 class="title welcome">Hello there!</h2>

async function cheerioData(url,callback){
//	请求数据
	request({
	  url:    url,   // 请求的URL
		//url:https://6cccpp.com/intr/b7f33b5e242acb77

	  method: 'GET',                   // 请求方法
//	  headers: {                       // 指定请求头
//	    'Accept-Language': 'zh-CN,zh;q=0.8',         // 指定 Accept-Language
//	    'Cookie': '__utma=4454.11221.455353.21.143;' // 指定 Cookie
//	  }
	}, function (error, response, body) {
		
	  if (!error && response.statusCode == 200) {
	   
	   
	    var $ = cheerio.load(response.body.toString()); //利用cheerio对页面进行解析
		
//		console.log(JSON.parse($))
		
        
        
//      $('.video li a').each(function(){
//          var $title = $(this).parent().parent().parent().text().trim();
//          var title = $title.split('\n');
//          var text = $(this).text().trim();
//          text = text.split('\n');
//          //console.log(text);
//          var time = text[1].match(/\((\d+\:\d+)\)/); 
//          var item={
//              title : title[0],
//              url : 'http://www.imooc.com'+$(this).attr('href'),
//              name : text[0],
//              duration : time[1]
//          };
//          var s = item.url.match(/video\/(\d+)/);
//          //console.log(s);
//          if(Array.isArray(s)){
//              item.id = s[1];
//              videoList.push(item);
//          }
//      });
//		$('.menu-list ul li a').each(function(){
//			var Item = $(this).text();
//			
//			videoList.push(Item)
//		});
//		获取即时新闻
//		var hotList = [];
//		$('#instant-news .ulist li a').each(function(){
//			var $hotTitle = $(this).text();
//			var $hotNewsUrl = $(this).attr('href');
//			hotList.push({
//				title:$hotTitle,
//				hotNewsUrl:$hotNewsUrl
//			})
//		})
//		console.log(hotList);
//		//获取焦点新闻
//		var focusList = [];
//		$('#instant-news .mix-ulist li a').each(function(){
//			var $hotTitle = $(this).text();
//			var $hotNewsUrl = $(this).attr('href');
//			focusList.push({
//				title:$hotTitle,
//				hotNewsUrl:$hotNewsUrl
//			})
//		})
//		console.log(focusList);
//		var options = $('#instant-news');

//		var options = $('#col_focus');
//		var videoList = getData(options);
//		var aaa = getData(options);
//		
		var newsArr = [
			'internal-aside-video',
			'col_focus',
			'instant-news',
			'col_latest'
		];
		var aaa = [];
		for(var i = 0;i<newsArr.length;i++){
			var options = $('#'+newsArr[i]);
			var bbb = getData(options);
			aaa = aaa.concat(bbb);
		}
		
       return callback(null,aaa);
	  function getData(boxId){
			var focusList = [];
			boxId.find('.ulist li a').each(function(){
				var Title = $(this).text();
				var Url = $(this).attr('href');
				focusList.push({
					title: Title,
					NewsUrl:Url
				});
	
			});
			return focusList;
			
		}
	   
	  }else{
	  	return callback(error);
	  };
	});
};
//获取标题以及链接

	

module.exports = {
	cheerioData:cheerioData,
}
