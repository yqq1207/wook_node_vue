<template>
	<!--<div id="topHead">
		<p>{{this.$route.meta.title}}</p>
	</div>-->
	<div id="topHeader" style="z-index: 66;">
		<mt-header fixed :title="title">{{title}}</mt-header>
	</div>
</template>

<script>
	import { Header } from 'mint-ui';
	import Bus from '../javaScript/bus'
	export default{
		name:"topHead",
		data(){
			return {
				title:this.$route.meta.title
			}
			
		},
		mounted(){
			var _this = this;
			//登录转注册，兄弟组件通信
			Bus.$on('toRegest',function(data){
				_this.title = data;
			});
			//注册转登录，兄弟组件通信
			Bus.$on('toLogin',function(data){
				_this.title = data;
			});
			Bus.$on('Logined',function(data){
				_this.title = data;
			});
			
		},
		
	}
</script>

<style>
	#topHead{
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align:center;
		background: linear-gradient(#d5d5d5, #939393); /* 标准的语法 */
	}
</style>