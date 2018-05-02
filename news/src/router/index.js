import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import HelloWorld from '@/components/HelloWorld'
import tabbar from '@/components/tabbar'
import newsList from '@/components/newsList'
import search from '@/components/search'
import index from '@/components/index'
import message from '@/components/message'
import newsContent from '@/components/newsContent'
import messageContent from '@/components/messageContent'
import updateInfo from '@/components/updateInfo'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/login"
    },{
    	path:"/newsList",
    	name:"newsList",
    	component:newsList,
    	meta:{
    	       title:"资讯",
             headIsShow:true,
             keepAlive: true, // 需要被缓存
             tabbarIsShow:true,
    	}
    },{
    	path:"/search",
    	name:"search",
    	component:search,
    	meta:{
    		title:"搜索",
        headIsShow:true,
        keepAlive: true, // 需要被缓存
        tabbarIsShow:true,
    	}
    },{
    	path:"/message",
    	name:"message",
    	component:message,
    	meta:{
    		title:"消息",
        headIsShow:true,
        keepAlive: true, // 需要被缓存
        tabbarIsShow:true,
    	}
    },{
    	path:"/index",
    	name:"index",
    	component:index,
    	meta:{
    		title:"我的",
        headIsShow:true,
        keepAlive: false, // 需要被缓存
        tabbarIsShow:true,
    	}
    },{
        path:"/newsContent",
        name:"newsContent",
        component:newsContent,
        meta:{
            name:"newsContent",
            headIsShow:false,
            tabbarIsShow:false,
        }
    },{
        path:"/login",
        name:"login",
        component:Login,
        meta:{
        		title:'登录',
            name:"Login",
            headIsShow:true,
            tabbarIsShow:false,
        }
    },
    {
        path:"/messageContent",
        name:"messageContent",
        component:messageContent,
        meta:{
        		title:'消息页面',
            name:"Login",
            headIsShow:true,
            tabbarIsShow:true,
        }
    },
    {
        path:"/updateInfo",
        name:"updateInfo",
        component:updateInfo,
        meta:{
        		title:'修改信息',
            name:"updateInfo",
            headIsShow:true,
            tabbarIsShow:false,
        }
    }
  ]
})
