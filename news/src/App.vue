<template>
  <div id="app">
  	<tabbar v-if="this.$route.meta.tabbarIsShow"></tabbar>
  	<top-head v-if="this.$route.meta.headIsShow"></top-head>
    <!--<img src="./assets/logo.png">-->
    <div class="mb69">
    		<keep-alive>
          <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件！ -->
          </router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是不被缓存的视图组件！ -->
        </router-view>
    	
    	<!--<router-view/>-->
    </div>
    
  </div>
</template>

<script>
	import tabbar from '@/components/tabbar'
	import topHead from '@/components/topHead'
export default {
  name: 'App',
  components:{
  	tabbar,topHead
  },
  methods:{
  	function(){
  		console.log(tabbar)
  	}
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
.plr15{
	padding-left: 15px;
	padding-right: 15px;
}
ul li{
	list-style: none;
}
.mb69{
	margin-bottom: 69px;
}
.mt40{
	margin-top: 40px;
}
</style>
