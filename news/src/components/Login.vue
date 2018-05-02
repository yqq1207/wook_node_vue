<template>
	<div id="Login" class="mt40">
		
		
		<div v-if="isLogin" class="plr15 mt80 textLeft">
			<!--<mt-field placeholder="请输入用户名" label="用户名"  v-model="username"></mt-field>-->
			<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
			<mt-field label="密　码" placeholder="请输入密码" :type="psd" v-model="LoginPassword" >
				<!--<p @click="showPsd"><img :src="showOrHidePsd0"/></p>-->
			</mt-field>
			<p class="f12 textR">没有账户？<span class="underLine" @click="toRegest">点击注册</span></p>
			<mt-button @click.native="handleLogin" size="large" type="primary" class="mt40">登录</mt-button>
		</div>
		<div v-if="isRegest" class="plr15 mt80 textLeft">
			<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
			<mt-field label="验证码" placeholder="请输入验证码" type="tel" v-model="inputRegestCode" @keyup.native="checkRegestCode">
				<p @click="changeRegestCode" v-html="regestCodeImg">
				</p>
			</mt-field>
			<!--验证码输入正确才显示输入密码-->
			<div v-if="showInputPsd">
				<mt-field label="登录密码" placeholder="请输入密码" :type="psd" v-model="password" @keyup.native="checkPsd">
					<p @click="showPsd" style="width: 50px;text-align: center;"><img :src="showOrHidePsd"/></p>
				</mt-field>
				<mt-field label="重复密码" placeholder="请重复密码" :state="state" :type="psd2" v-model="password2" @keyup.native="checkPsd">
					<p @click="showPsd2" style="width: 50px;text-align: center;"><img :src="showOrHidePsd2"/></p>
				</mt-field>
			</div>
			<p class="f12 textR">已有账户？<span class="underLine" @click="toLogin">点击登录</span></p>
			<mt-button @click.native="handleRegest" size="large" type="primary" class="mt40" v-show="canRegest">注册</mt-button>
		</div>
		
	</div>
</template>

<script>
	import { Field,Button,Toast } from 'mint-ui'
	import Bus from '../javaScript/bus'
	import axios from '../javaScript/axiosHttp'
	import regext from '../javaScript/regexp'
	import Storage from '../javaScript/storage'
	export default{
		name:"Login",
		data(){
			return {
				username:"",
				phone:'',
				password:"",
				psd:'password',
				showOrHide:'显示',
				showOrHidePsd:'../../build/showPsd.svg',
				isLogin:true,
				isRegest:false,
				regestCodeImg:'',//验证码图片
				regestCode:'',//验证码
				inputRegestCode:'',//用户输入的验证码
				showInputPsd:false,//是否显示输入密码的input框
				canRegest:false,//是否可注册
				state:'',//验证吗提示
				LoginPassword:'',//登录的密码
				
				
				password2:'',//注册时重复密码
				psd2:'password',
				showOrHide2:'显示',
				showOrHidePsd2:'../../build/showPsd.svg',
			}
		},
		created(){
			var phoneNUm = Storage.getStorage(Storage.storageConfig.phone);
			if(phoneNUm && phoneNUm.length == 11){
				this.phone = phoneNUm;
			}else{
				this.phone = '';
			}
		},
		methods:{
			//显示密码
			showPsd(){
				if(this.psd == 'password'){
					console.log(1)
					this.psd = 'text';
					this.showOrHide = '隐藏';
					this.showOrHidePsd = '../../build/hidePsd.svg';
				}else if(this.psd == 'text'){
					console.log(2)
					this.psd = 'password';
					this.showOrHidePsd = '../../build/showPsd.svg';
					this.showOrHide = '显示';
				}
			},
			//注册的重复输入密码时候的显示密码
			showPsd2(){
				if(this.psd2 == 'password'){
					console.log(11)
					this.psd2 = 'text';
					this.showOrHide2 = '隐藏';
					this.showOrHidePsd2 = '../../build/hidePsd.svg';
				}else if(this.psd2 == 'text'){
					console.log(22)
					this.psd2 = 'password';
					this.showOrHidePsd2 = '../../build/showPsd.svg';
					this.showOrHide2 = '显示';
				}
			},
			//登录
			handleLogin(){
				var _this = this;
				var isPhone = regext.checkMobile(this.phone);
				
				if(!isPhone){
					regext.toast('请输入正确的手机号',1500);
				}else if(this.LoginPassword == ''){
					regext.toast('请输入验证码',1500)
				}else{
					var regestData = {
						tel:this.phone,
						psd:this.LoginPassword,
					}
					axios.axiosPost('/login',regestData,(data)=>{
						if(data.err == true){
							regext.toast(data.data,1500);
						}else if(data.err == false){
							regext.toast(data.data,1500);
							Storage.setStorage(Storage.storageConfig.phone,this.phone)
							setTimeout(function(){
								Bus.$emit('Logined','资讯');
								_this.$router.push({path: '/newsList'});
							},1000)
							
						}else{
							regext.toast('网络错误',1500);
						}
					})
				}
				
			},
			//注册
			handleRegest(){
				var regestData = {
					name:this.phone,
					tel:this.phone,
					psd:this.password,
				}
				axios.axiosPost('/regest',regestData,(data)=>{
					if(data.err == true){
							regext.toast(data.data,1500);
						}else{
							regext.toast(data.data,1500);
							Storage.setStorage(Storage.storageConfig.phone,this.phone)
							setTimeout(()=>{
								Bus.$emit('toLogin','登录');
								this.isLogin = true;
								this.isRegest = false;
							},1000)
							
						}
				});
//				axios.axiosPost('/insertUserInfo',regestData,(data)=>{
//					if(data.err == true){
////							regext.toast(data.data,1500);
//							return 
//						}else{
////							regext.toast(data.data,1500);
//							console.log(data)
//							
//						}
//				});
			},
			//登录转注册，兄弟组件通信
			toRegest(){
				Bus.$emit('toRegest','注册');
				this.isLogin = false;
				this.isRegest = true;
//				注册的时候获取图片验证码
				axios.axiosPost('/regestCode','',(data)=>{
					this.regestCodeImg = data.img;
					this.regestCode = data.Text;
				})
			},
			/**
			 * 更换图片
			 */
			changeRegestCode(){
				axios.axiosPost('/regestCode','',(data)=>{
					this.regestCodeImg = data.img;
					this.regestCode = data.Text;
				})
			},
			//注册转登录，兄弟组件通信
			toLogin(){
				Bus.$emit('toLogin','登录');
				this.isLogin = true;
				this.isRegest = false;
			},
			//更换图片验证码
			checkRegestCode(){
				if(this.inputRegestCode == this.regestCode){
					this.showInputPsd = true;
				}else{
//					this.showInputPsd = false;
				}
			},
			/**
			 * 重复密码校验
			 */
        	checkPsd(){
        		if(this.password == this.password2){
        			this.canRegest = true;
        			this.state = 'success';
        		}else{
        			this.canRegest = false
        		}
        	},
			
		},
		watch: {
           
        },
       
	}
</script>

<style>
	.mt80{
		margin-top: 80px;
	}
	.textLeft{
		text-align: left;
	}
	.f12{
		font-size: 12px;
	}
	.textR{
		text-align: right;
	}
	.underLine{
		text-decoration: underline;
	}
</style>