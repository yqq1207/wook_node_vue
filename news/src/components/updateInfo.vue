<template>
	<div id="index" class="mt40">
		
		<div class="index-head">
			<div class="nike-box" style="position: relative;">
				<input type="file" style="z-index: 2;" id="fileField" name="fileField" enctype="multipart/form-data" multiple="multiple" @change=""/>
				
				<div class="nikeHeader">
					<img :src="nikeimg" height="50px"/>
					<p style="padding: 0;margin: 0;font-size: 12px;">点击更换</p>
				</div>
			</div>
		</div>
		<!--<mt-cell label="手机"  :value="tel"></mt-cell>
		<mt-cell label="昵称"  :value="name"></mt-cell>
		<mt-cell label="昵称code"  :value="nikecode"></mt-cell>
		<mt-cell label="地址"  :value="address"></mt-cell>
		<mt-cell label="头像" :value="nikeimg"></mt-cell>
		<mt-cell label="年龄" :value="age"></mt-cell>
		<mt-cell label="性别" :value="sex"></mt-cell>
		<mt-cell label="邮箱" :value="email"></mt-cell>
		<router-link to="/updateInfo" class="plr15 disb">
			<mt-button size="large" type="primary">变更信息</mt-button>
		</router-link>
		<router-link to="/login" class="plr15 disb mtb15">
			<mt-button size="large" type="primary">退出登录</mt-button>
		</router-link>-->
		<!--<mt-cell title="标题" label="描述信息" class="textLeft" is-link to="/messageList"></mt-cell>-->
		<mt-field label="手机" placeholder="请输入手机" v-model="tel"></mt-field>
		<mt-field label="昵称" placeholder="请输入昵称" v-model="name"></mt-field>
		<mt-field label="昵称code" placeholder="请输入昵称code" v-model="nikecode"></mt-field>
		<mt-field label="地址" placeholder="请输入地址" v-model="address"></mt-field>
		<!--<mt-field label="头像" placeholder="请输入头像" v-model="nikeimg"></mt-field>-->
		<mt-field label="年龄" placeholder="请输入年龄" type="number" v-model="age"></mt-field>
		<mt-field label="性别" placeholder="请输入性别">
			<label><input type="radio" name="sex" value="男" v-model="sex"/>男</label>
			<label><input type="radio" name="sex" value="你猜" v-model="sex"/>你猜</label>
			<label><input type="radio" name="sex" value="女" v-model="sex"/>女</label>
		</mt-field>
		<mt-field label="id" placeholder="请输入邮箱" type="Email" v-model="userid"></mt-field>
		<mt-field label="邮箱" placeholder="请输入邮箱" type="Email" v-model="email"></mt-field>
		<div class="f16 plr15">
			<mt-button size="large" type="primary" class="f16  mtb15 boxSC" @click="changeFile(this)">保存</mt-button>
		</div>
			
	</div>
</template>

<script>
	import {cell,Field,Button,Switch} from 'mint-ui'
	import Bus from '../javaScript/bus'
	import axiosHttp from '../javaScript/axiosHttp'
	import regext from '../javaScript/regexp'
	import Storage from '../javaScript/storage'
	export default{
		name:"index",
		data(){
			return {
				msg:"这是index",
				nikeName:'手机用户',
				nikeNChange:true,
				tel:'',//手机号
				name:'手机用户',//昵称
				userid:this.$route.userid,//用户id
				nikecode:'空',//用户昵称code
				address:'空', //用户地址
				nikeimg:'空',//用户头像
				age:'空',//用户年龄
				sex:'空',//用户性别
				email:'空',//用户邮箱
				
			}
		},
		methods:{
			changeNikeName(){
				this.nikeNChange = false;
			},
			toChangeNikeName(){
				this.nikeNChange = true;
			},
			changeFile(e){
		 		var file = document.querySelector('#fileField');
			    var formData = new FormData();
			    var info = {
			    	tel:this.tel,
			    	name:this.name,
			    	nikecode:this.nikecode,
			    	address:this.address,
			    	age:this.age,
			    	sex:this.sex,
			    	userid:this.userid
			    };
			    
			    formData.append('fileField', file.files[0]);
			    formData.append('userid', info.userid);
			    formData.append('tel', info.tel);
			    formData.append('name', info.name);
			    formData.append('nikecode', info.nikecode);
			    formData.append('address', info.address);
			    formData.append('age', info.age);
			    formData.append('sex', info.sex);
			    
			    var sendData = {
			    	formData:formData,
			    	info:info
			    }
				axiosHttp.axiosPost('/updateInfo',formData,data=>{
					console.log(data)
					this.nikeimg = data.data;
					if(data.err){
						regext.toast('保存失败',1500);
					}else if(!data.err && data.data.length != 0){
						regext.toast(data.data,1500);
//						this.$router.replace({
//							path: '/index',
//							replace: true,
//							query:{
//								t: +new Date()
//							}
//							
//						});
							console.log(this.$router);
//						 this.$router.go(-1);
					}
					
				})
			},
			
		},
		created(){
			var _this = this;
			var phoneNUm = Storage.getStorage(Storage.storageConfig.phone);
			var regestData = {
				tel:phoneNUm,
			}
			axiosHttp.axiosRequest('/getUserInfo',regestData,data=>{
				
				if(data.err){
					regext.toast('网络错误',1500);
				}else if(data.data.length == 0) {
					regext.toast('没有该用户',1500);
					setTimeout(function(){
						Bus.$emit('Logined','登录');
						_this.$router.push({path: '/login'});
					},1000);
					
				}else if(data.data.length !== 0){
					var obj = data.data[0];
					console.log(obj)
					this.tel = obj.tel?obj.tel:'保密';
					this.address = obj.address?obj.address:'';
					this.age = obj.age?obj.age:0;
					this.email = obj.email?obj.email:'保密';
					this.userid = obj.userid?obj.userid:'保密';
					this.name = obj.name?obj.name:'保密';
					this.nikecode = obj.nikecode?obj.nikecode:'保密';
					this.nikeimg = obj.nikeimg?obj.nikeimg:'./build/logo.png';
					this.sex = obj.sex?obj.sex:'保密';
//					var uesrInfoVal = Object.values(obj);
//					var uesrInfoKey = Object.keys(obj);
//					if(uesrInfoVal.length == uesrInfoKey.length){
//						
//						for(var i = 0;i<uesrInfoVal.length;i++){
//							if(uesrInfoVal[i] && uesrInfoVal[i] !== null && uesrInfoVal[i] !== undefined){
//								console.log(uesrInfoKey[i]);
////								_this.uesrInfoKey[i] = uesrInfoVal[i];
//								
//							}
////							
//						}
//					}
				}
				
			})
		},
	}
</script>

<style>
	.disb{
		display: block;
	}
	.f16.mint-button{
		font-size: 16px;
	}
	.m15{
		margin: 15px;
	}
	.boxSC{
		box-sizing: border-box;
	}
	.nike-box{
		height: 90px;
	}
	#fileField{
		position: absolute;
		height: 80px;
		width: 120px;
		left: calc(50% - 60px);
		top: 5px;
		opacity: 0;
	}
	.nikeHeader{
		position: absolute;
		height: 80px;
		width: 120px;
		left: calc(50% - 60px);
		top: 5px;
		z-index: 1;
	}
</style>