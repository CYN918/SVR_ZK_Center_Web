import Vue from 'vue'
import Router from 'vue-router'
const mode = [];
/*外部帐号*/
import indexs from './views/public/index.vue'
mode['indexs'] = indexs
import indexs_list from './views/public/list.vue'
mode['indexs_list'] = indexs_list
import indexs_message from './views/public/userMessage.vue'
mode['indexs_message'] = indexs_message
import Home from './views/home.vue'
mode['Home'] = Home
import Index from './views/index.vue'
mode['Index'] = Index
/*管理*/
import erro from './views/erro.vue'
mode['erro'] = erro
import AdminIndex from './views/admin/index.vue'
mode['admin'] = AdminIndex
import AdminNeed from './views/admin/needList.vue'
mode['needList'] = AdminNeed
// import AdminMaterial from './views/admin/material.vue'
import material_picture from './views/admin/material_picture.vue'
import material_resource from './views/admin/material_resource.vue'
import material_wallpaper from './views/admin/material_wallpaper.vue'
mode['material_picture'] = material_picture
mode['material_resource'] = material_resource
mode['material_wallpaper'] = material_wallpaper


import AdminFlows from './views/admin/flows.vue'
mode['material_flows'] = AdminFlows
import AdminMaterialLib from './views/admin/materialLib.vue'
mode['library_picture'] = AdminMaterialLib
mode['library_resource'] = AdminMaterialLib
import AdminMaterialLibs from './views/admin/materials.vue'
mode['library_pictures'] = AdminMaterialLibs
import AdminAD from './views/admin/AD_templates.vue'
mode['library_resources'] = AdminAD
import AdminWallpaper from './views/admin/maWallpaper.vue'
mode['library_wallpaper'] = AdminWallpaper
import AdminRole from './views/admin/level/role.vue'
mode['roles'] = AdminRole
import AdminInside from './views/admin/level/inside.vue'
mode['inside'] = AdminInside
import AdminExternal from './views/admin/level/external.vue'
mode['external'] = AdminExternal
import MD5 from './views/admin/MD5.vue'
mode['MD5'] = MD5
import allocation from  './views/admin/allocation'
mode['allocation'] =allocation

//审核台
import userIndex from './views/user/index.vue'
mode['user'] = userIndex
import userNeed from './views/user/user_need.vue'
mode['user_need'] = userNeed
import userChecked from './views/user/user_checked.vue'
mode['user_checked'] = userChecked
import user_picture from './views/user/user_picture.vue'
mode['user_picture'] = user_picture
import user_resource from './views/user/user_resource.vue'
mode['user_resource'] = user_resource
import user_wallpaper from './views/user/user_wallpaper.vue'
mode['user_wallpaper'] = user_wallpaper
import userMessage from './views/user/userMessage.vue'
mode['user_message'] = userMessage
import wallpaperProcessed from './views/user/wallpaper_ processed.vue'
mode['wallpaper_processed'] = wallpaperProcessed
import wallpaperUntreated from './views/user/wallpaper_untreated.vue'
mode['wallpaper_untreated'] = wallpaperUntreated


import axios from 'axios'
import api from './api/index'

/*数据*/
import dataIndex from './views/datas/index.vue'
mode['data'] = dataIndex
import ad_material_p from './views/datas/ad/ad_material_p.vue'
mode['ad_material_p'] = ad_material_p
import ad_material_ps from './views/datas/ad/ad_material_ps.vue'
mode['ad_material_ps'] = ad_material_ps
import ad_material_m from './views/datas/ad/ad_material_m.vue'
mode['ad_material_m'] = ad_material_m
import ad_material_ms from './views/datas/ad/ad_material_ms.vue'
mode['ad_material_ms'] = ad_material_ms
import ad_material_w from './views/datas/ad/ad_material_w.vue'
mode['ad_material_w'] = ad_material_w
import ad_material_ws from './views/datas/ad/ad_material_ws.vue'
mode['ad_material_ws'] = ad_material_ws
import ad_position_channel from './views/datas/ad/ad_position_channel.vue'
mode['ad_position_channel'] = ad_position_channel
import ad_position_product from './views/datas/ad/ad_position_product.vue'
mode['ad_position_product'] = ad_position_product
import ad_position_adType from './views/datas/ad/ad_position_adType.vue'
mode['ad_position_adType'] = ad_position_adType
import ad_position_adData from './views/datas/ad/ad_position_adData.vue'
mode['ad_position_adData'] = ad_position_adData
import ad_position_user from './views/datas/ad/ad_position_user'
mode['ad_position_user'] = ad_position_user
import ad_position_users from './views/datas/ad/ad_position_users.vue'
mode['ad_position_users'] = ad_position_users
import ad_position_ad from './views/datas/ad/ad_position_ad.vue'
mode['ad_position_ad'] = ad_position_ad
import ad_position_ads from './views/datas/ad/ad_position_ads.vue'
mode['ad_position_ads'] = ad_position_ads
import wallxw_channel from './views/datas/cp/wallxw_channel.vue'
mode['wallxw_channel'] = wallxw_channel
import wallxw_time from './views/datas/cp/wallxw_time.vue'
mode['wallxw_time'] = wallxw_time
import wallxw_data from './views/datas/cp/wallxw_data.vue'
mode['wallxw_data'] = wallxw_data
import wallxw_xx from './views/datas/cp/wallxw_xx.vue'
mode['wallxw_xx'] = wallxw_xx
import wallxw_ad from './views/datas/cp/wallxw_ad.vue'
mode['wallxw_ad'] = wallxw_ad
import profit_d from './views/datas/profit/profit_d.vue'
mode['profit_d'] = profit_d
import profit_w from './views/datas/profit/profit_w'
mode['profit_w'] = profit_w
import profit_m from './views/datas/profit/profit_m'
mode['profit_m'] = profit_m
import profit_channel from './views/datas/profit/profit_channel'
mode['profit_channel'] = profit_channel
import profit_product from './views/datas/profit/profit_product'
mode['profit_product'] = profit_product
import profit_position_type from './views/datas/profit/profit_position_type'
mode['profit_position_type'] = profit_position_type
import profit_position from './views/datas/profit/profit_position'
mode['profit_position'] = profit_position
import profit_user from './views/datas/profit/profit_user'
mode['profit_user'] = profit_user
import profit_ad from './views/datas/profit/profit_ad'
mode['profit_ad'] = profit_ad
import cost_channel from './views/datas/profit/cost_channel'
mode['cost_channel'] = cost_channel
import cost_designer from './views/datas/profit/cost_designer'
mode['cost_designer'] = cost_designer
import cost_designers from './views/datas/profit/cost_designers'
mode['cost_designers'] = cost_designers
import profits from './views/datas/profit/profits'
mode['profits'] = profits

// 个人中心
import infoIndex from './views/userinfo/index.vue'
mode['info'] = infoIndex
import userinfo from './views/userinfo/user_info.vue'
mode['userinfo'] = userinfo


Vue.use(Router)
const router = new Router({routes: []})		
let tonek = localStorage.getItem('token');
let wb = [
	{
		path:'/indexs',name:'indexs',component:mode['indexs'],
		children:[
			{path:'/indexs/list',name:'indexs_list',component:mode['indexs_list']},
			{path:'/indexs/message',name:'indexs_message',component:mode['indexs_message']},
		],
	}		
];	
router.addRoutes(wb);
let nb = [
	{path:'/',name:'首页',component:Index},
	{path:'/erro',name:'cuwi',component:erro},
	{path:'/index',name:'首页',component:Index},
	{path:'/admin',name:'管理',component:mode['admin'],
		children:[			
			{path:'/admin/needList',name:'需求列表',component: mode['needList']},				
			{path:'/admin/material_picture',name:'广告图成品管理',component: mode['material_picture']},
			{path:'/admin/material_resource',name:'模板成品管理',component: mode['material_resource']},
			{path:'/admin/material_wallpaper',name:'锁屏壁纸成品管理',component: mode['material_wallpaper']},
            {path:'/admin/MD5',name:'锁屏壁纸MD5库',component: mode['MD5']},
            {path:'/admin/allocation',name:'聚合内容配置',component: mode['allocation']},
			{path:'/admin/material_flows',name:'素材中间件管理',component: mode['material_flows']},				
			{path:'/admin/library_picture',name:'广告图库投放管理',component: mode['library_picture']},
			{path:'/admin/library_pictures',name:'library_pictures',component: mode['library_pictures']},
			{path:'/admin/library_resource',name:'广告模版库投放管理',component: mode['library_resource']},
			{path:'/admin/library_resources',name:'library_resources',component: mode['library_resources']},
			{path:'/admin/library_wallpaper',name:'锁屏壁纸库投放管理',component: mode['library_wallpaper']},				
			{path:'/admin/roles',name:'角色管理',component: mode['roles']},
			{path:'/admin/inside',name:'内部帐号管理',component: mode['inside']},
			{path:'/admin/external',name:'外部帐号管理',component:mode['external']},		
		]
	},
	{path:'/data',name:'数据中心',component:mode['data'],children:[	
		{path:'/data/ad_material_p',name:'ad_material_p',component:mode['ad_material_p']},
		{path:'/data/ad_material_ps',name:'ad_material_ps',component:mode['ad_material_ps']},
		{path:'/data/ad_material_m',name:'ad_material_m',component:mode['ad_material_m']},
		{path:'/data/ad_material_ms',name:'ad_material_ms',component:mode['ad_material_ms']},
		{path:'/data/ad_material_w',name:'ad_material_w',component:mode['ad_material_w']},
		{path:'/data/ad_material_ws',name:'ad_material_ws',component:mode['ad_material_ws']},					
		{path:'/data/ad_position_channel',name:'ad_position_channel',component:mode['ad_position_channel']},
		{path:'/data/ad_position_product',name:'ad_position_product',component:mode['ad_position_product']},
		{path:'/data/ad_position_adType',name:'ad_position_adType',component:mode['ad_position_adType']},
		{path:'/data/ad_position_adData',name:'ad_position_adData',component:mode['ad_position_adData']},
		{path:'/data/ad_position_user',name:'ad_position_user',component:mode['ad_position_user']},
		{path:'/data/ad_position_users',name:'ad_position_users',component:mode['ad_position_users']},
		{path:'/data/ad_position_ad',name:'ad_position_ad',component:mode['ad_position_ad']},
		{path:'/data/ad_position_ads',name:'ad_position_ads',component:mode['ad_position_ads']},
		{path:'/data/wallxw_channel',name:'wallxw_channel',component:mode['wallxw_channel']},
		{path:'/data/wallxw_time',name:'wallxw_time',component:mode['wallxw_time']},
		{path:'/data/wallxw_data',name:'wallxw_data',component:mode['wallxw_data']},
		{path:'/data/wallxw_xx',name:'wallxw_xx',component:mode['wallxw_xx']},
		{path:'/data/wallxw_ad',name:'wallxw_ad',component:mode['wallxw_ad']},			
		{path:'/data/profit_d',name:'wallxw_ad',component:mode['profit_d']},				
		{path:'/data/profit_w',name:'profit_w',component:mode['profit_w']},	
		{path:'/data/profit_m',name:'profit_m',component:mode['profit_m']},	
		{path:'/data/profit_channel',name:'profit_channel',component:mode['profit_channel']},	
		{path:'/data/profit_product',name:'profit_product',component:mode['profit_product']},	
		{path:'/data/profit_position_type',name:'profit_position_type',component:mode['profit_position_type']},	
		{path:'/data/profit_position',name:'profit_position',component:mode['profit_position']},	
		{path:'/data/profit_user',name:'profit_user',component:mode['profit_user']},	
		{path:'/data/profit_ad',name:'profit_ad',component:mode['profit_ad']},	
		{path:'/data/cost_channel',name:'cost_channel',component:mode['cost_channel']},	
		{path:'/data/cost_designer',name:'cost_designer',component:mode['cost_designer']},
		{path:'/data/cost_designers',name:'cost_designers',component:mode['cost_designers']},	
		{path:'/data/profits',name:'profits',component:mode['profits']},				
	]},
	{path:'/user',name:'审核台',component:mode['user'],children:[
		{path:'/user/user_need',name:'待审核',component:mode['user_need']},
            {path:'/user/user_checked',name:'已审核',component:mode['user_checked']},
		{path:'/user/user_picture',name:'图片审核',component:mode['user_picture']},
		{path:'/user/user_resource',name:'模版审核',component:mode['user_resource']},
		{path:'/user/user_wallpaper',name:'壁纸审核',component:mode['user_wallpaper']},
		{path:'/user/user_message',name:'个人信息',component:mode['user_message']},
        {path:'/user/wallpaper_processed',name:'壁纸已处理',component:mode['wallpaper_processed']},
		{path:'/user/wallpaper_untreated',name:'壁纸待处理',component:mode['wallpaper_untreated']},
	]},
    {path:'/userinfo',name:'个人中心',component:mode['info'],
		children:[
            {path:'/userinfo/user_info',name:'个人信息',component:mode['userinfo']},
            {path:'/userinfo/user_info',name:'退出',component:mode['userinfo']},
        ]
	},

];
router.addRoutes(nb);
/*动态生成左边菜单*/
let leftNav =
	[
	{title:'管理',
	children:[
		{title:'需求管理',url:'1',list:[{title:'需求列表',url:'/admin/needList'}]},
		{title:'素材库',url:'2',list:[
			{title:'已入库',url:'/admin/material_picture'},
			{title:'待入库',url:'/admin/material_flows'},
            {title:'锁屏壁纸MD5库',url:'/admin/MD5'},
			{title:'聚合内容配置',url:'/admin/allocation'}
		]},
		{title:'投放管理',url:'3',list:[
			{title:'广告图库投放管理',url:'/admin/library_picture'},
			// {title:'广告图素材管理',url:'/admin/library_pictures'},
			{title:'广告模版库投放管理',url:'/admin/library_resource'},
			// {title:'广告模版库素材管理',url:'/admin/library_resources'},
			{title:'锁屏壁纸库投放管理',url:'/admin/library_wallpaper'},
		]},
		{title:'权限管理',url:'4',list:[
			{title:'角色管理',url:'/admin/roles'},
			{title:'内部帐号管理',url:'/admin/inside'},
			{title:'外部帐号管理',url:'/admin/external'},
		]},
	]},
	{title:'审核台',default:'/user',defaultopen:['1'],
        children:[
            {title:'需求审核',url:'1',list:[
                    {title:'待处理',url:'/user/user_need'},
                    {title:'已处理',url:'/user/user_checked'},
                    // {title:'广告图待处理',url:'/user/user_picture'},
                    // {title:'广告模版待处理',url:'/user/user_resource'},
                    // {title:'锁屏壁纸待处理',url:'/user/user_wallpaper'},
				],},
            {title:'素材审核',url:'2',list:[
                    {title:'待处理',url:'/user/user_picture'},
                    {title:'已处理',url:'/user/user_resource'},
                    // {title:'锁屏壁纸待处理',url:'/user/user_wallpaper'},
					],},
            {title:'壁纸推送',url:'3',list:[
                    {title:'待处理',url:'/user/wallpaper_processed'},
                    {title:'已处理',url:'/user/wallpaper_untreated'},
                ],},
        ]
	},
	{title:'数据',default:'/data',defaultopen:['1'],
	children:[
		{title:'广告分析数据',url:'1',children:[
			{title:'素材数据',url:'1-1',children:[
				{title:'广告图数据',url:'1-1-1',list:[
					{title:'广告图数据',url:'/data/ad_material_p'},
					{title:'广告图详细数据',url:'/data/ad_material_ps'},
				]},
				{title:'广告模板数据',url:'1-1-2',list:[
					{title:'广告模板数据',url:'/data/ad_material_m'},
					{title:'广告模板详细数据',url:'/data/ad_material_ms'},
				]},
				{title:'锁屏壁纸数据',url:'1-1-3',list:[
					{title:'锁屏壁纸数据',url:'/data/ad_material_w'},
					{title:'锁屏壁纸详细数据',url:'/data/ad_material_ws'},
				]},
			]},
			{title:'广告位相关数据',url:'1-2',list:[
				{title:'渠道数据',url:'/data/ad_position_channel'},
				{title:'产品数据',url:'/data/ad_position_product'},
				{title:'广告位类型数据',url:'/data/ad_position_adType'},
				{title:'广告位数据',url:'/data/ad_position_adData'},
			]},
			{title:'广告相关数据',url:'1-3',list:[
				{title:'广告主数据',url:'/data/ad_position_user'},
				{title:'广告主详细数据',url:'/data/ad_position_users'},
				{title:'广告数据',url:'/data/ad_position_ad'},
				{title:'广告详细数据',url:'/data/ad_position_ads'},
			]},

		]},
		{title:'产品分析数据',url:'2',children:[
			{title:'锁屏壁纸数据',url:'2-1',children:[
				{title:'壁纸行为分析',url:'2-1-1',list:[
					{title:'壁纸渠道数据',url:'/data/wallxw_channel'},
					{title:'壁纸使用时长分布',url:'/data/wallxw_time'},
					{title:'壁纸行为数据',url:'/data/wallxw_data'},
					{title:'壁纸渠道详细数据',url:'/data/wallxw_xx'},
					{title:'壁纸广告分析数据',url:'/data/wallxw_ad'},
				]},
			]},
		]},
		{title:'收益报表',url:'3',list:[
			{title:'收益日报',url:'/data/profit_d'},
			{title:'收益周报',url:'/data/profit_w'},
			{title:'收益月报',url:'/data/profit_m'},
			{title:'渠道收益',url:'/data/profit_channel'},
			{title:'产品收益',url:'/data/profit_product'},
			{title:'广告位类型收益',url:'/data/profit_position_type'},
			{title:'广告位收益',url:'/data/profit_position'},
			{title:'广告主收益',url:'/data/profit_user'},
			{title:'广告收益',url:'/data/profit_ad'},
			{title:'渠道成本',url:'/data/cost_channel'},
			{title:'设计师成本',url:'/data/cost_designer'},
			{title:'设计师成本详细数据',url:'/data/cost_designers'},
			{title:'收益详表',url:'/data/profits'},
		]}
	]},
    {title:'个人中心',default:'/userinfo/user_info',defaultopen:['1'],
        list:[
            {title:'个人信息', url:'/userinfo/user_info'},
            {title:'退出',url:'/api/logout'},
        ]
	},
];



localStorage.setItem('letNav',JSON.stringify(leftNav));
router.beforeEach((to, from, next) => {
	/*登录过期*/
	if(+localStorage.getItem('logintime')+(24*60*60*1000)<=Date.parse(new Date())){
		localStorage.setItem("token","");
		tonek=false;
	}	
	if(tonek ) {// 判断是否登录	
		if(localStorage.getItem('status')==0){
			if(to.fullPath!='/erro'){
				next({ path: '/erro'});				
				return
			}
			next();	
			return
		}
		
		if(localStorage.getItem('userType')==1){
			if(to.fullPath.substring(0,7)!='/indexs'){
				next({ path: '/indexs/list'});
				return;
			}
			next();
			return;
		}
		if(to.fullPath=='/'){
			let params ={'url':'/index'} ;
			api.create_menu(params);
			next({ path: '/index'});
			return
		}	
						
		if(to.fullPath=='/admin'){
			next({ path: '/admin/needList'});
		}	
		if(to.fullPath=='/user'){
			next({ path: '/user/user_need'});
		}
        if(to.fullPath=='/userinfo'){
            next({ path: '/userinfo/user_info'});
        }
        if (to.fullPath=='/api/logout'){
            next({ path: '/erro'});
		}
        if(to.fullPath=='/indexs'){
			next({ path: '/indexs/list'});
		}				
						
		let params ={'url':to.fullPath.split('&')[0]} ;
		if(to.fullPath!='index'){
			api.create_menu(params);
		}			
		next();
		return
    }
	
	let cent = 'center',
	urld = 'http://c.zookingsoft.com/api/login';
	if(window.location.host=='ts-centerweb.idatachain.cn'){
		cent = 'center_dev';
		urld ='http://ts-i.idatachain.cn/api/login';

	}
	if(window.location.host=='localhost:8080'){
		cent = 'center_local';
		urld ='http://ts-i.idatachain.cn/api/login';
	}
	if(to.query.ticket){	
		axios({
			method: 'post',
			timeout: 10000,
			url: urld,
			data:{ticket:to.query.ticket}
		}).then((msg)=>{
			console.log(msg);
			localStorage.setItem('token',msg.data.data.token);
			localStorage.setItem('logintime',Date.parse(new Date()));
			localStorage.setItem('userAd',msg.data.data.user.email);			
			localStorage.setItem('userType',msg.data.data.user.type);		
			localStorage.setItem('status',msg.data.data.user.status);
            localStorage.setItem('leftNav',msg.data.data.user.leftNav);    //存储动态菜单
            localStorage.setItem('wb',msg.data.data.user.wb);
			if(msg.data.data.user.type==1){
				next({ path: '/indexs/list'});
				return;
			}
			if(msg.data.data.user.status==0){
				next({ path: '/erro'});
				return
			}
			next({ path: '/index'});
		}).catch(()=>{
			alert("服务器故障请稍后再试");
		});
			
	}else{
		window.location.href="http://account.zookingsoft.com/login?from="+cent;
	}
})
export default router
