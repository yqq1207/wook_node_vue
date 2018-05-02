<template>
	<div id="newsContent">
		
		<p @click="getData">
		{{msg}}
		</p>
		<p @click="getData1">
		{{msg}}
		</p>
		<p>
			{{axiosData}}
		</p>
		
		
	</div>
</template>

<script>

	import axiosHttp from '../javaScript/axiosHttp.js'
	export default{
		name:"search",
		data(){
			return {
				msg:this.$route.query.index,
				axiosData:"",
			}
		},
		methods:{
			getData:function(){
				var _this = this;
				var data = {
				name:'getData'
				};
				axiosHttp.axiosRequest('/ex','',function(a){
//					_this.axiosData = a;
					console.log(a.data)
					
				})
			},
			getData1:function(){
				var _this = this;
				var data = {
					name:'getData1'
					}
				axiosHttp.axiosPost('/postChange',data,(a)=>{
					this.axiosData = a;
				})
			},
			
		},

	}
</script>

<style>
</style>