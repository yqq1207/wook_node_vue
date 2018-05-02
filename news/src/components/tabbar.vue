<template>
	<div id="tabbar" class="displayFlex">
		<div v-for="item in tabbarList" class="tabbarList pb8 pt8">
			<router-link :to="item.tabPath">
				<img :src="item.icon" alt="" class="displayFlexItemCenter" />
				<span class="h20lh20 pt8 displayFlexItemCenter">{{item.name}}</span>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default{
		name:"tabbar",
		data(){
			return {
				tabbarList:[
					{
						name:"资讯",
						tabPath:"/newsList",
						msg:"资讯",
						icon:'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png'
					},{
						name:"搜索",
						tabPath:"/search",
						msg:"搜索",
						icon:'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png'
					},{
						name:"消息",
						tabPath:"/message",
						msg:"消息",
						icon:'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png'
					},{
						name:"我的",
						tabPath:"/index",
						msg:"我的",
						icon:'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png'
					}
				]
			}
		}
	}

</script>

<style>
	*{
		padding: 0;
		margin: 0;
	}
	a{
		text-decoration: none;
		color: #555;
	}
	.displayFlex{
		display: flex;
		flex-wrap:nowrap ;
		flex-flow: row;
		justify-content: space-around;
		
	}
	.h20lh20{
		height: 20px;
		line-height: 20px;
	}
	#tabbar{
		z-index: 2;
		position: fixed;
		bottom: 0;
		width: 100%;
		background: linear-gradient(#d5d5d5, #939393); /* 标准的语法 */
	}
	.tabbarList a{
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column;
		justify-content: center;
	}
	.displayFlexItemCenter{
		align-self:center;
	}
	.pt8{
		padding-top: 8px;
	}
	.pb8{
		padding-bottom: 8px;
	}
	.tabbarList img{
		width: 25px;
		height: 25px;
	}
	.router-link-exact-active{
		color: blue;
	}
</style>