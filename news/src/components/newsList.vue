<template>
	<div id="newList" class="mt40">
		<!--轮播图-->
		<!--<mt-swipe :auto="4000">
		  <mt-swipe-item v-for="item in swiperList">
		  	<router-link to="/message">
		  		<div class="swiper-list-box">
			  		<img :src="item.swiperImg" alt="" />
			  		<p>{{item.title}}</p>
			  	</div>
		  	</router-link>
		  </mt-swipe-item>
		</mt-swipe>-->
		<!--上拉刷新-->
		<!--<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore" @top-status-change="handleTopChange">-->
		<!--<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
			<ul class="plr15 mt20 newsListContent">
				<li v-for="item in newsList">
					<router-link :to="{path:'/newsContent',query:{index:item.index}}">
						<p class="f16">{{item.title}}</p>
					</router-link>
					<div class="displayFlexAround">
						<p class="f14 w68">
							{{item.content}}
						</p>
						<p class="f14 w30 textR">
							{{item.timer}}
						</p>
					</div>
				</li>
			</ul>-->
			<!--<div slot="top" class="mint-loadmore-top">
		      <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
		      <span v-show="topStatus === 'loading'">Loading...</span>
		    </div>-->
		    <!--{{topStatus}}-->
		<!--</mt-loadmore>-->
		<ul class="plr15 mt20 newsListContent">
			<li v-for="(item,index) in newsListBaidu">
				<a :href="item.NewsUrl" class="f16"><font class="f16">{{index}}:</font>{{item.title}}</a>
			</li>
		</ul>
	</div>
</template>

<script>
	import { Swipe, SwipeItem ,Loadmore,Toast} from 'mint-ui';
	import axiosHttp from '../javaScript/axiosHttp.js'
	import axios from '../javaScript/axiosHttp'
	import regext from '../javaScript/regexp'
	export default{
		name:"newList",
		data(){
			return {
				newsListBaidu:[{
				title:"第四条新闻",
						content:"这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容"}],
				newsList:[
					{
						index:'1',
						title:"第一条新闻",
						content:"这是新闻内容",
						timer:'4-1420:18'
					},{
						index:'2',
						title:"第二条新闻",
						content:"这是新闻内容",
						timer:'4-1420:18'
					},{
						index:'3',
						title:"第三条新闻",
						content:"这是新闻内容",
						timer:'4-1420:18'
					},{
						index:'4',
						title:"第四条新闻",
						content:"这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容",
						timer:'4-1420:18'
					}
				
				],
				swiperList:[
					{
						title:'第一个swiper',
						swiperImg:'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png'
					},{
						title:'第二个swiper',
						swiperImg:'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png'
					},{
						title:'第三个swiper',
						swiperImg:'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png'
					}
				],
				topStatus: '',
				allLoaded:false,
			}
		},
		created(){
			axiosHttp.axiosRequest('/ex','',a=>{

				if(a.err){
					regext.toast('网络错误',1500);
				}else{
					this.newsListBaidu = a.data;
					console.log(this.newsListBaidu)
				}
				
			})
		},
		 mounted:function(){
			
			const _windowHeight = window.innerHeight,
				  _windowWidth = window.innerWidth;
			
			var windowContentHeight =  _windowHeight - 40 - 69;
			var newList = document.getElementsByClassName('newsListContent')[0];
			newList.style.minHeight = windowContentHeight + 'px';
			
		},
		
		methods:{
			handleTopChange(status) {
				this.topStatus = status;
		    },
		    loadTop() {
			  // 加载更多数据
				var a = [
					{
						index:'4',
						title:"第四条新闻",
						content:"这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容",
						timer:'4-14 20:18'
					}
				];
			 	//this.$refs.loadmore.onTopLoaded() 为加载更多的消失方法
			 	setTimeout(()=>{
			 		this.newsList = this.newsList.concat(a);
			 		this.$refs.loadmore.onTopLoaded();
			 	},2500)
			 	
			},
//			/**
//			 * 上拉刷新的方法
//			 */
//			loadBottom() {
//				var a = [
//					{
//						index:'5',
//						title:"第五条新闻",
//						content:"这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容",
//						timer:'4-17 20:18'
//					}
//				];
//			  // 加载更多数据
//				this.allLoaded = true;// 若数据已全部获取完毕
//				this.$refs.loadmore.onBottomLoaded();
//			}
		},
		
	}
	
	
</script>

<style>
	#newList ul li{
		text-align: left;
		margin-bottom: 10px;
	}
	.f16{
		font-size: 16px;
	}
	.f14{
		font-size: 14px;
	}
	.f12{
		font-size: 12px;
	}
	.displayFlexAround{
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
	}
	.w68{
		width: 68%;
	}
	.w30{
		width: 30%;
	}
	.textR{
		text-align: right;
	}
	.mint-swipe{
		width: 100%;
		height: 200px;
	}
	.swiper-list-box{
		height: 200px;
		position: relative;
	}
	.swiper-list-box img{
		height: 200px;
		width: 100%;
	}
	.swiper-list-box p{
		background: rgba(0,0,0,0.5);
		position: absolute;
		bottom: 0px;
		width: 100%;
		height: 50px;
		line-height: 50px;
		color: white;
	}
	.mt20{
		margin-top: 20px;
	}
</style>