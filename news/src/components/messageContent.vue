<template>
	<div id="messageContent"  class="mt40">
		
		{{msg}}
		<div @click="clickButton">
			222
		</div>
	</div>
</template>

<script>
	import VueSocketio from 'vue-socket.io';
	import socketio from 'socket.io-client';
	import Vue from 'Vue';
//	Vue.use(VueSocketio, 'http://127.0.0.0:9051');//与服务端链接
//	this.$socket.emit('start');//触发start
//	sockets:function(){//不能改
//    connect:function() {//与socket.io连接后回调
//      console.log('socket connected');
//    },
//    login:function(value) {
//      console.log(value);//监听login(后端向前端emit  login的回调)
//    }
//  }
	export default{
		name:"message",
		data(){
			return {
				msg:"这是messageContent",
				id:'1'
			}
		},
//		sockets:{
//		    connect: function(){  //这里是监听connect事件
//		      this.id=this.$socket.id
//		    },
//		    customEmit: function(val){ //这里是监听customEmit事件
//		      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
//		    }
//		},
//		mounted(){
//		      this.$socket.emit('connect', val); //在这里触发connect事件
//		 },
//		  methods: {
//		    clickButton: function(val){
//		        // $socket is socket.io-client instance
//		        this.$socket.emit('emit_method', val);
//		    }
//		  }
	}
</script>

<style>
</style>