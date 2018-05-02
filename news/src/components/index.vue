<template>
	<div id="index" class="mt40">
		
		<div class="index-head">
			<div class="nike-box">
				<img class="nikeHeader" :src="nikeimg"/>
				<div class="nikename-box">
					<p class="f12 displayFlex justifyCC aliItemC">
						<div v-if="nikeNChange">
							<span class="plr15">
								{{name}}
								{{tel}}
							</span>
							<span>
								<img src="../../build/edit.svg" width="20px" alt="" @click="changeNikeName"/>
							</span>
						</div>
						
						<input v-else="nikeNChange" type="text" v-model="nikeName" class="borderN mr15 w100p textC" @keydown.enter="toChangeNikeName"/>
					</p>
				</div>
			</div>
		</div>
		<mt-cell label="手机"  :value="tel"></mt-cell>
		<mt-cell label="昵称"  :value="name"></mt-cell>
		<mt-cell label="昵称code"  :value="nikecode"></mt-cell>
		<mt-cell label="地址"  :value="address"></mt-cell>
		<mt-cell label="头像" :value="nikeimg"></mt-cell>
		<mt-cell label="年龄" :value="age"></mt-cell>
		<mt-cell label="性别" :value="sex"></mt-cell>
		<mt-cell label="邮箱" :value="email"></mt-cell>
		<!--<router-link to="/updateInfo" class="plr15 disb">-->
			<mt-button size="large" type="primary" @click="updateInfo">变更信息</mt-button>
		<!--</router-link>-->
		<router-link to="/login" class="plr15 disb mtb15">
			<mt-button size="large" type="primary">退出登录</mt-button>
		</router-link>
		<!--<mt-cell title="标题" label="描述信息" class="textLeft" is-link to="/messageList"></mt-cell>
		<mt-field label="手机" placeholder="请输入手机" v-model="tel"></mt-field>
		<mt-field label="昵称" placeholder="请输入昵称" v-model="name"></mt-field>
		<mt-field label="昵称code" placeholder="请输入昵称code" v-model="nikecode"></mt-field>
		<mt-field label="地址" placeholder="请输入地址" v-model="address"></mt-field>
		<mt-field label="头像" placeholder="请输入头像" v-model="nikeimg"></mt-field>
		<mt-field label="年龄" placeholder="请输入年龄" v-model="age"></mt-field>
		<mt-field label="性别" placeholder="请输入性别" v-model="sex"></mt-field>
		<mt-field label="邮箱" placeholder="请输入邮箱" v-model="email"></mt-field>-->
	</div>
</template>

<script>
	import {cell,Field,Button} from 'mint-ui'
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
				userid:'空',//用户id
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
			updateInfo(){
				this.$router.push({
					path:'/updateInfo',
					query:{
						userid:this.userid
					}
				})
			}
			
		},
		
		created(){
			var _this = this;
			var phoneNUm = Storage.getStorage(Storage.storageConfig.phone);
			var regestData = {
				tel:phoneNUm,
			}
			axiosHttp.axiosRequest('/getUserInfo',regestData,data=>{
				console.log(data)
				if(data.err){
					regext.toast('网络错误',1500);
				}else if(data.data.length == 0) {
					regext.toast('没有该用户',1500);
					setTimeout(function(){
						Bus.$emit('Logined','登录');
						_this.$router.push({path: '/login'});
					},1000)
					
				}else if(data.data.length !== 0){
					var obj = data.data[0];
					console.log(obj)
					this.tel = obj.tel?obj.tel:'保密';
					this.address = obj.address?obj.address:'保密保密保密保密保密保密保密保密';
					this.age = obj.age?obj.age:'保密';
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
	.textLeft{
		text-align: left;
	}
	.index-head{
		width: 100%;
		height: 200px;
		background: url('http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png') no-repeat;
		background-size: 100%;
		position: relative;
	}
	.nike-box{
		width: 100%;
		position: absolute;
		top: 40px;
		left: 0;
		display: flex;
		flex-wrap: nowrap;
		flex-flow: column;
		justify-content: center;
	}
	.nikeHeader{
		width: 50px;
		height:50px;
		border-radius: 50%;
		margin: 0 auto;
		
	}
	.justifyCC{
		justify-content: center;
	}
	 .aliItemC{
	 	align-items: center;
	 }
	 .borderN{
	 	border-bottom:#666 1px solid;
	   border-left-width:0px;
	   border-right-width:0px;
	   border-top-width:0px;
	   background-color:transparent;
	 }
	  .w100p{
	  	width: 100px;
	  } 
	  .mr15{
	  	margin-right: 15px;
	  }
	  .textC{
	  	text-align: center;
	  }
	  .mint-cell-wrapper span{
	  	width: auto;
	  	text-align: left;
	  	font-size: 14px;
	  	color: #111;
	  	margin-top: 0;
	  }
	  .disb{
	  	display: block;
	  }
	  .mtb15{
	  	margin-top: 15px;
	  	margin-bottom: 15px;
	  }
</style>