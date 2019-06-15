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
/*素材库*/
import erro from './views/erro.vue'
mode['erro'] = erro
import AdminIndex from './views/admin/index.vue'
mode['admin'] = AdminIndex
import AdminNeed from './views/admin/advertising.vue'
mode['needList'] = AdminNeed
import MaterialResource from './views/admin/material_resource.vue'
mode['MaterialResource']=MaterialResource
import AD_templates from './views/admin/AD_templates.vue'
import dynamic from './views/admin/dynamic.vue'
import material_wallpaper from './views/admin/material_wallpaper.vue'
mode['AD_templates'] = AD_templates
mode['dynamic'] = dynamic
mode['material_wallpaper'] = material_wallpaper
import settags from './views/admin/set_tags'
mode['settags'] =settags
import library from './views/admin/library'
mode['library'] = library
import tags_details from './views/admin/tags_details'
mode['tags_details'] = tags_details
import mangement from './views/admin/management'
mode['mangement'] =mangement


import wallpaper from './views/admin/wallpaper.vue'
mode['wallpaper'] = wallpaper
import WLtemplate from './views/admin/wlTemplate.vue'
mode['WLtemplate'] = WLtemplate
import AdminMaterialLibs from './views/admin/materials.vue'
mode['library_pictures'] = AdminMaterialLibs
import AdminAD from './views/admin/AD_templates.vue'
mode['library_resources'] = AdminAD
import lockScreen from './views/admin/lockScreen.vue'
mode['lockScreen'] = lockScreen
import AdminRole from './views/admin/level/role.vue'
mode['roles'] = AdminRole
import AdminInside from './views/admin/level/inside.vue'
mode['inside'] = AdminInside
import AdminExternal from './views/admin/level/external.vue'
mode['external'] = AdminExternal
import MD5 from './views/admin/MD5.vue'
mode['MD5'] = MD5
import standard from './views/admin/standard'
mode['standard']=standard
import add_library from './views/admin/add_library'
mode['add_library'] = add_library
import details_library from './views/admin/details_library'
mode['details_library'] = details_library

//收益中心
import income from './views/income/index.vue'
mode['income'] = income
import earnings from './views/income/earnings_all'
mode['earnings'] = earnings
import settlement from './views/income/settlement'
mode['settlement'] = settlement
import money_details from './views/income/money_details'
mode['money_details'] = money_details
import cost_management from './views/income/cost_management'
mode['cost_management'] = cost_management
import divided_details from './views/income/divided_details'
mode['divided_details'] = divided_details
import data_details from './views/income/data_details'
mode['data_details'] = data_details
import divided_management from './views/income/divided_management'
mode['divided_management']=divided_management


//工作台
import workbench from './views/workbench/index'
mode['workbench'] = workbench
import workbenchPadding from './views/workbench/workbench_padding'
mode['workbenchPadding'] = workbenchPadding
import ALL from './views/workbench/all'
mode['ALL']=ALL
import Billing_details from './views/workbench/Billing_details'
mode['Billing_details'] = Billing_details
import withdraw from './views/workbench/tx_details'
mode['withdraw'] =withdraw

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
import passWord from './views/userinfo/password'
mode['passWord'] = passWord
import MyPerm from './views/userinfo/MyPermission'
mode['MyPerm'] = MyPerm
import account from  './views/userinfo/account'
mode['account'] = account
import roleManagement from './views/userinfo/role_management'
mode['roleManagement'] = roleManagement
import AddRole from './views/userinfo/AddRole'
mode['AddRole'] = AddRole
import AccounAudit from  './views/userinfo/AccounAudit'
mode['AccounAudit'] = AccounAudit
import feedback from  './views/userinfo/feedback'
mode['feedback'] = feedback
import Details from './views/userinfo/details'
mode['Details'] = Details
import quantuty from './views/userinfo/quantity'
mode['quantuty'] = quantuty
import Process from './views/userinfo/process'
mode['Process'] = Process


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
	{path:'/admin',name:'素材中心',component:mode['admin'],
		children:[			
			{path:'/admin/advertising',name:'广告图',component: mode['needList']},
			{path:'/admin/AD_templates',name:'广告图模板',component: mode['AD_templates']},
			{path:'/admin/wallpaper',name:'壁纸',component: mode['wallpaper']},
			{path:'/admin/dynamic',name:'动效',component: mode['dynamic']},
            {path:'/admin/MaterialResource',name:'广告图',component: mode['MaterialResource']},
            {path:'/admin/MD5',name:'锁屏壁纸MD5库',component: mode['MD5']},
			{path:'/admin/standard',name:'设计规范库',component: mode['standard']},
			{path:'/admin/settags',name:'标签管理',component: mode['settags']},
			{path:'/admin/library',name:'投放库',component: mode['library']},
			{path:'/admin/WLtemplate',name:'广告模版',component: mode['WLtemplate']},
			{path:'/admin/lockScreen',name:'场景锁屏',component: mode['lockScreen']},
			{path:'/admin/add_library',name:'添加投放库',component: mode['add_library']},
			{path:'/admin/details_library',name:'详情库',component: mode['details_library']},
			{path:'/admin/tags_details',name:'标签管理',component: mode['tags_details']},
			{path:'/admin/mangement',name:'投放库管理',component:mode['mangement']},
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


	{path:'/workbench',name:'工作台',component:mode['workbench'],children:[
		{path:'/workbench/workbenchPadding',name:'待审核',component:mode['workbenchPadding']},
		{path:'/workbench/ALL',name:'全部',component:mode['ALL']},
        {path:'/workbench/Billing_details',name:'全部',component:mode['Billing_details']},
		{path:'/workbench/withdraw',name:'提现',component:mode['withdraw']},

	]},
    {path:'/income',name:'收益中心',component:mode['income'],children:[
            {path:'/income/earnings',name:'收益总览',component:mode['earnings']},
            {path:'/income/settlement',name:'设计师结算管理',component:mode['settlement']},
            {path:'/income/money_details',name:'收益详情',component:mode['money_details']},
            {path:'/income/cost_management',name:'设计师成本管理',component:mode['cost_management']},
            {path:'/income/divided_details',name:'分成详情',component:mode['divided_details']},
            {path:'/income/data_details',name:'分成详细数据',component:mode['data_details']},
            {path:'/income/divided_management',name:'分成gunali ',component:mode['divided_management']},

        ]},
    {path:'/userinfo',name:'个人中心',component:mode['info'],
		children:[
            {path:'/userinfo/user_info',name:'基本信息',component:mode['userinfo']},
            {path:'/userinfo/passWord',name:'修改密码',component:mode['passWord']},
            {path:'/userinfo/user_info',name:'退出',component:mode['userinfo']},
            {path:'/userinfo/MyPerm',name:'修改密码',component:mode['MyPerm']},
            {path:'/userinfo/account',name:'账号管理',component:mode['account']},
            {path:'/userinfo/roleManagement',name:'角色管理',component:mode['roleManagement']},
            {path:'/userinfo/AddRole',name:'添加角色',component:mode['AddRole']},
            {path:'/userinfo/AccounAudit',name:'账户审核',component:mode['AccounAudit']},
            {path:'/userinfo/feedback',name:'意见反馈',component:mode['feedback']},
            {path:'/userinfo/Details',name:'反馈详情',component:mode['Details']},
            {path:'/userinfo/quantuty',name:'账号数量',component:mode['quantuty']},
            {path:'/userinfo/Process',name:'流程管理',component:mode['Process']},
        ]
	},

];
router.addRoutes(nb);
/*动态生成左边菜单*/
let leftNav =localStorage.getItem('letNav');
// 	[
// 	{title:'素材中心',default:'/admin',defaultopen:['1'],
// 	children:[
// 		{title:'素材库',url:'1', img:'&#xe615;',list:[
// 			{title:'广告图',url:'/admin/advertising'},
// 				{title:'广告模板',url:'/admin/AD_templates'}],
// 			children:[
// 			{title:'场景锁屏',url:'1-3',list:[
//                  {title:'动效',url:'/admin/dynamic'},
//                  {title:'壁纸',url:'/admin/wallpaper'},
//                     ]},
// 			]},
//
// 		{title:'物料库',url:'3',img:'&#xe617;',list:[
// 			{title:'广告图',url:'/admin/MaterialResource'},
// 			{title:'广告模版',url:'/admin/WLtemplate'},
// 			{title:'场景锁屏',url:'/admin/lockScreen'},
// 		]},
// 		{title:'配制管理',url:'4',img:'&#xe60e;',list:[
// 			{title:'设计规范库',url:'/admin/standard'},
// 			{title:'标签管理',url:'/admin/settags'},
// 			// {title:'外部帐号管理',url:'/admin/external'},
// 		]},
// 		{title:'投放库',url:'5',img:'&#xe60e;',list:[
// 				{title:'投放库',url:'/admin/library'}
// 			]}
// 	]},
// 	{title:'工作台',default:'/workbench',defaultopen:['1'],
//         children:[
//             {title:'任务中心',url:'1',img:'&#xe610;',list:[
//                     {title:'待处理',url:'/workbench/workbenchPadding'},
//                     {title:'全部',url:'/workbench/ALL'},
// 					],},
//
//         ]
// 	},
// 	{title:'数据',default:'/data',defaultopen:['1'],
// 	// children:[
// 	// 	{title:'广告分析数据',url:'1',children:[
// 	// 		{title:'素材数据',url:'1-1',children:[
// 	// 			{title:'广告图数据',url:'1-1-1',list:[
// 	// 				{title:'广告图数据',url:'/data/ad_material_p'},
// 	// 				{title:'广告图详细数据',url:'/data/ad_material_ps'},
// 	// 			]},
// 	// 			{title:'广告模板数据',url:'1-1-2',list:[
// 	// 				{title:'广告模板数据',url:'/data/ad_material_m'},
// 	// 				{title:'广告模板详细数据',url:'/data/ad_material_ms'},
// 	// 			]},
// 	// 			{title:'锁屏壁纸数据',url:'1-1-3',list:[
// 	// 				{title:'锁屏壁纸数据',url:'/data/ad_material_w'},
// 	// 				{title:'锁屏壁纸详细数据',url:'/data/ad_material_ws'},
// 	// 			]},
// 	// 		]},
// 	// 		{title:'广告位相关数据',url:'1-2',list:[
// 	// 			{title:'渠道数据',url:'/data/ad_position_channel'},
// 	// 			{title:'产品数据',url:'/data/ad_position_product'},
// 	// 			{title:'广告位类型数据',url:'/data/ad_position_adType'},
// 	// 			{title:'广告位数据',url:'/data/ad_position_adData'},
// 	// 		]},
// 	// 		{title:'广告相关数据',url:'1-3',list:[
// 	// 			{title:'广告主数据',url:'/data/ad_position_user'},
// 	// 			{title:'广告主详细数据',url:'/data/ad_position_users'},
// 	// 			{title:'广告数据',url:'/data/ad_position_ad'},
// 	// 			{title:'广告详细数据',url:'/data/ad_position_ads'},
// 	// 		]},
//     //
// 	// 	]},
// 	// 	{title:'产品分析数据',url:'2',children:[
// 	// 		{title:'锁屏壁纸数据',url:'2-1',children:[
// 	// 			{title:'壁纸行为分析',url:'2-1-1',list:[
// 	// 				{title:'壁纸渠道数据',url:'/data/wallxw_channel'},
// 	// 				{title:'壁纸使用时长分布',url:'/data/wallxw_time'},
// 	// 				{title:'壁纸行为数据',url:'/data/wallxw_data'},
// 	// 				{title:'壁纸渠道详细数据',url:'/data/wallxw_xx'},
// 	// 				{title:'壁纸广告分析数据',url:'/data/wallxw_ad'},
// 	// 			]},
// 	// 		]},
// 	// 	]},
// 	// 	{title:'收益报表',url:'3',list:[
// 	// 		{title:'收益日报',url:'/data/profit_d'},
// 	// 		{title:'收益周报',url:'/data/profit_w'},
// 	// 		{title:'收益月报',url:'/data/profit_m'},
// 	// 		{title:'渠道收益',url:'/data/profit_channel'},
// 	// 		{title:'产品收益',url:'/data/profit_product'},
// 	// 		{title:'广告位类型收益',url:'/data/profit_position_type'},
// 	// 		{title:'广告位收益',url:'/data/profit_position'},
// 	// 		{title:'广告主收益',url:'/data/profit_user'},
// 	// 		{title:'广告收益',url:'/data/profit_ad'},
// 	// 		{title:'渠道成本',url:'/data/cost_channel'},
// 	// 		{title:'设计师成本',url:'/data/cost_designer'},
// 	// 		{title:'设计师成本详细数据',url:'/data/cost_designers'},
// 	// 		{title:'收益详表',url:'/data/profits'},
// 	// 	]}
// 	// ]
// },
//     {title:'个人中心',default:'/userinfo/user_info',defaultopen:['1'],
//         children:[
//             {title:'个人中心',url:'1',img:'&#xe60b;',list:[
//             {title:'基本信息', url:'/userinfo/user_info'},
//             {title:'修改密码', url:'/userinfo/passWord'},
//             {title:'消息通知', url:'/userinfo/'},
//                 ]},
// 			{title:'账号权限',url:'1-2',img:'&#xe619;',list:[
// 			{title:'我的权限',url:'/userinfo/MyPerm'},
//             {title:'账号管理',url:'/userinfo/account'},
//             {title:'角色管理',url:'/userinfo/roleManagement'},
//             {title:'账号审核',url:'/userinfo/AccounAudit'},
// 			{title:'流程管理',url:'/userinfo/Process'},
//                 ]},
// 			{title:'意见反馈',url:"1-3",img:'&#xe618;',list:[
// 			{title:'意见反馈',url:'/userinfo/feedback'}
// 				]}
//         ]
// 	},
//     {title:'收益中心',default:'/income/user_info',defaultopen:['1'],
//         children:[
//             {title:'收益数据',url:'1',img:'&#xe612;',children:[
//                     {title:'收益总览', url:'1-1',list:[
//                             {title:'收益总览',url:'/income/earnings'}
//                         ]},
//             ]},
//             {title:'设计师成本管理',url:'2',list:[
//                     {title:'设计师成本管理',url:'/income/cost_management'}
//                 ]},
//             {title:'结算管理',url:'3',img:'&#xe60d;',list:[
//                    {title:'设计师结算管理',url:'/income/settlement'}
//                 ]},
//         ]
//         },
// ];
// localStorage.setItem('letNav',JSON.stringify(leftNav));
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
            // this.api.perm_leftnav().then((res)=>{
            //     console.log(res);
            //     localStorage.setItem('letNav',res);
            // })
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
			if(JSON.parse(localStorage.getItem('letNav'))[0].children.length>0){
                next({ path: '/admin/advertising'});
			}
		}
		if(to.fullPath=='/user'){
			if(JSON.parse(localStorage.getItem('letNav'))[1].children.length>0){
                next({ path: '/user/user_need'});
			}
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
        if(to.fullPath=='/workbench'){
            next({ path: '/workbench/workbenchPadding'});
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
    if(window.location.host=='c2.zookingsoft.com'){
        cent = 'center_dev2';
        urld ='http://c2.zookingsoft.com/api/login';
      
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
            // localStorage.setItem('leftNav',msg.data.data.user.leftNav);    //存储动态菜单
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
    if(to.query.ticket){}
})
export default router
