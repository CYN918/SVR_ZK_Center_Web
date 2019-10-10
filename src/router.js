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
import journal_of_push from './views/admin/Journal_of_push'
mode['journal_of_push'] = journal_of_push
import journal_Administrator from './views/admin/Jounrnal_Administrator'
mode['journal_Administrator']= journal_Administrator
import wb_Journal from  './views/admin/wb_Journal'
mode['wb_Journal']=wb_Journal

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
import returns_detailed from './views/income/Returns_detailed'
mode['returns_detailed'] = returns_detailed
import advertiser from './views/income/advertiser'
mode['advertiser'] = advertiser


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
import user_details from './views/workbench/user_details'
mode['user_details'] =user_details
import MD5 from './views/workbench/MD5.vue'
mode['MD5'] = MD5;
import allocation from  './views/workbench/allocation'
mode['allocation'] =allocation
import resource from './views/workbench/resource'
mode['resource'] = resource
import has_replaced from './views/workbench/Has_replaced'
mode['has_replaced'] = has_replaced
import replace from './views/workbench/replace'
mode['replace'] =replace;
import theme from './views/workbench/theme'
mode['theme'] = theme
import theme_details from './views/workbench/theme_details'
mode['theme_details'] = theme_details
import theme_screen from './views/workbench/theme_screen'
mode['theme_screen'] =theme_screen
import processed from './views/workbench/processed'
mode['processed'] = processed
import ad_source from './views/workbench/ad_Source'
mode['ad_source']=ad_source
import ad_details from  './views/workbench/ad_details'
mode['ad_details']=ad_details
import ad_particulars from './views/workbench/ad_particulars'
mode['ad_particulars']=ad_particulars
import ad_select from './views/workbench/ad_select'
mode['ad_select']=ad_select
import ad_external_user from './views/workbench/ad_external_user'
mode['ad_external_user']=ad_external_user



import axios from 'axios'
import api from './api/index'

/*数据*/
import data from './views/datas/index'
mode['data'] = data
import Material_data from './views/datas/Material_data'
mode['Material_data'] = Material_data
import Material_related from './views/datas/Material_related'
mode['Material_related'] = Material_related

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

//主题中心
import ThemeCenter from './views/ThemeCenter/index'
mode['ThemeCenter'] = ThemeCenter
import themeCook from './views/ThemeCenter/themeCook'
mode['themeCook']=themeCook
import themeUp from './views/ThemeCenter/theme_up'
mode['themeUp']=themeUp
import themeDetails from './views/ThemeCenter/themeDetails'
mode['themeDetails']=themeDetails
import themeLock from './views/ThemeCenter/theme_lock'
mode['themeLock']=themeLock
import themelock_up from './views/ThemeCenter/themelock_up'
mode['themelock_up']=themelock_up
import theme_icon from './views/ThemeCenter/theme_icon'
mode['theme_icon']=theme_icon
import theme_two from './views/ThemeCenter/theme_two'
mode['theme_two']=theme_two
import themeSc_details from './views/ThemeCenter/themenSC_details'
mode['themeSc_details']=themeSc_details
import sheleRecord from './views/ThemeCenter/Shele_record'
mode['sheleRecord']=sheleRecord
import packList from './views/ThemeCenter/pack/pack_list'
mode['packList']=packList
import upPack from './views/ThemeCenter/pack/up_pack'
mode['upPack']=upPack
import pack_icon from './views/ThemeCenter/pack/pack_icon'
mode['pack_icon']=pack_icon
import pack_two from './views/ThemeCenter/pack/pack_two'
mode['pack_two']=pack_two
import pack_details from './views/ThemeCenter/pack/pack_details'
mode['pack_details']=pack_details
import propaganda_img from './views/ThemeCenter/propaganda_img'
mode['propaganda_img']=propaganda_img
import propaganda_details from './views/ThemeCenter/propaganda_details'
mode['propaganda_details']=propaganda_details
import Scheduling_management from './views/ThemeCenter/scheduling/Scheduling_management'
mode['Scheduling_management']=Scheduling_management
import themeDetailsQd from './views/ThemeCenter/themeDetailsQd'
mode['themeDetailsQd']=themeDetailsQd
import details from './views/ThemeCenter/scheduling/details'
mode['details']=details
import xqDetails from './views/ThemeCenter/scheduling/xqDetails'
mode['xqDetails']=xqDetails;
import select_theme from './views/ThemeCenter/scheduling/select_theme'
mode['select_theme']=select_theme;
import select_theme_two from './views/ThemeCenter/scheduling/select_thenme_two'
mode['select_theme_two']=select_theme_two


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
    {path:'*',redirect: '/index',},
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
            // {path:'/admin/MD5',name:'锁屏壁纸MD5库',component: mode['MD5']},

			{path:'/admin/standard',name:'设计规范库',component: mode['standard']},
			{path:'/admin/settags',name:'标签管理',component: mode['settags']},
			{path:'/admin/library',name:'投放库',component: mode['library'],},
            {path:'/admin/journal_of_push',name:'杂志锁屏推送管理',component: mode['journal_of_push'],},
            {path:'/admin/journal_Administrator',name:'杂志锁屏推送管理删除',component: mode['journal_Administrator'],},
            {path:'/admin/wb_Journal',name:'外部杂志锁屏推送管理删除',component: mode['wb_Journal'],},
			{path:'/admin/WLtemplate',name:'广告模版',component: mode['WLtemplate']},
			{path:'/admin/lockScreen',name:'场景锁屏',component: mode['lockScreen']},
			{path:'/admin/add_library',name:'添加投放库',component: mode['add_library']},
			{path:'/admin/details_library',name:'详情库',component: mode['details_library']},
			{path:'/admin/tags_details',name:'标签管理',component: mode['tags_details']},
			{path:'/admin/mangement',name:'投放库管理',component:mode['mangement']},


		]
	},
	{path:'/data',name:'数据中心',component:mode['data'],children:[	
		{path:'/data/Material_data',name:'物料数据',component:mode['Material_data']},
		{path:'/data/Material_related',name:'物料相关素材详情',component:mode['Material_related']},


	]},


	{path:'/workbench',name:'工作台',component:mode['workbench'],children:[
		{path:'/workbench/workbenchPadding',name:'待审核',component:mode['workbenchPadding']},
        {path:'/workbench/processed',name:'我的已处理',component:mode['processed']},
		{path:'/workbench/ALL',name:'全部',component:mode['ALL']},
        {path:'/workbench/Billing_details',name:'全部',component:mode['Billing_details']},
		{path:'/workbench/withdraw',name:'提现',component:mode['withdraw']},
        {path:'/workbench/user_details',name:'提现详情',component:mode['user_details']},
            {path:'/workbench/allocation',name:'聚合内容配置',component: mode['allocation']},
            {path:'/workbench/replace',name:'资源待替换',component: mode['replace']},
            {path:'/workbench/resource',name:'资源待替换',component: mode['resource']},
            {path:'/workbench/has_replaced',name:'资源已替换',component: mode['has_replaced']},
            {path:'/workbench/MD5',name:'锁屏壁纸MD5库',component: mode['MD5']},
            {path:'/workbench/theme',name:'官方物料投放库',component: mode['theme']},
            {path:'/workbench/theme_details',name:'官方物料投放库详情',component: mode['theme_details']},
            {path:'/workbench/theme_screen',name:'主题壁纸-标签定投',component: mode['theme_screen']},
            {path:'/workbench/ad_source',name:'广告源列表',component: mode['ad_source']},
            {path:'/workbench/ad_details',name:'广告源详情',component: mode['ad_details']},
            {path:'/workbench/ad_particulars',name:'广告源详情',component: mode['ad_particulars']},
            {path:'/workbench/ad_select',name:'广告源详情',component: mode['ad_select']},
            {path:'/workbench/ad_external_user',name:'账号管理',component: mode['ad_external_user']},
	]},
    {path:'/income',name:'收益中心',component:mode['income'],children:[
            {path:'/income/earnings',name:'收益总览',component:mode['earnings']},
            {path:'/income/settlement',name:'设计师结算管理',component:mode['settlement']},
            {path:'/income/money_details',name:'收益详情',component:mode['money_details']},
            {path:'/income/cost_management',name:'设计师成本管理',component:mode['cost_management']},
            {path:'/income/divided_details',name:'分成详情',component:mode['divided_details']},
            {path:'/income/data_details',name:'分成详细数据',component:mode['data_details']},
            {path:'/income/divided_management',name:'分成管理 ',component:mode['divided_management']},
            {path:'/income/returns_detailed',name:'分成成本管理 ',component:mode['returns_detailed']},
            {path:'/income/advertiser',name:'广告主收益明细 ',component:mode['advertiser']},


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
    {path:'/ThemeCenter',name:'主题中心',component:mode['ThemeCenter'],children:[
            {path:'/ThemeCenter/themeCook',name:'主题库',component:mode['themeCook']},
            {path:'/ThemeCenter/themeUp',name:'上传主题',component:mode['themeUp']},
            {path:'/ThemeCenter/themeDetails',name:'主题详情',component:mode['themeDetails']},
			{path:'/ThemeCenter/themeLock',name:'锁屏',component:mode['themeLock']},
            {path:'/ThemeCenter/themelock_up',name:'锁屏上传',component:mode['themelock_up']},
            {path:'/ThemeCenter/theme_icon',name:'图标',component:mode['theme_icon']},
            {path:'/ThemeCenter/theme_two',name:'二级页面',component:mode['theme_two']},
            {path:'/ThemeCenter/themeSc_details',name:'主题素材详情',component:mode['themeSc_details']},
            {path:'/ThemeCenter/sheleRecord',name:'添加上架记录',component:mode['sheleRecord']},
            {path:'/ThemeCenter/pack/packList',name:'打包件',component:mode['packList']},
            {path:'/ThemeCenter/pack/upPack',name:'上传打包件',component:mode['upPack']},
            {path:'/ThemeCenter/pack/pack_icon',name:'图标打包件',component:mode['pack_icon']},
            {path:'/ThemeCenter/pack/pack_two',name:'二级界面打包件',component:mode['pack_two']},
            {path:'/ThemeCenter/pack/pack_details',name:'打包件详情',component:mode['pack_details']},
            {path:'/ThemeCenter/propaganda_img',name:'宣传图',component:mode['propaganda_img']},
            {path:'/ThemeCenter/propaganda_details',name:'宣传图详情',component:mode['propaganda_details']},
            {path:'/ThemeCenter/scheduling/Scheduling_management',name:'排期',component:mode['Scheduling_management']},
            {path:'/ThemeCenter/themeDetailsQd',name:'主题渠道详情',component:mode['themeDetailsQd']},
            {path:'/ThemeCenter/scheduling/details',name:'详情',component:mode['details']},
            {path:'/ThemeCenter/scheduling/xqDetails',name:'详情',component:mode['xqDetails']},
            {path:'/ThemeCenter/scheduling/select_theme',name:'选择主题',component:mode['select_theme']},
            {path:'/ThemeCenter/scheduling/select_theme_two',name:'选择主题2',component:mode['select_theme_two']},
        ]},

];
router.addRoutes(nb);
/*动态生成左边菜单*/

let leftNav =
	localStorage.getItem('letNav');
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
// 				{title:'投放库',url:'/admin/library'},
//                 {title:'杂志锁屏推送管理',url:'/admin/journal_of_push'},
//                 // {title:'杂志锁屏推送管理',url:'/admin/wb_Journal'}
//
// 			]}
// 	]},
// 	{title:'工作台',default:'/workbench',defaultopen:['1'],
//         children:[
//             {title:'任务中心',url:'1',img:'&#xe610;',list:[
//                     {title:'待处理',url:'/workbench/workbenchPadding'},
//                     {title:'我的已处理',url:'/workbench/processed'},
//                     {title:'全部',url:'/workbench/ALL'},
// 					],},
//             {title:'运营工具',url:'2',img:'&#xe610;',list:[
//                     {title:'锁屏壁纸MD5库',url:'/workbench/MD5'},
//                     {title:'聚合内容配置',url:'/workbench/allocation'},
//                     {title:'资源待替换',url:'/workbench/replace'},
// 					{title:'官方物料投放库',url:'/workbench/theme'},
//                     {title:'主题壁纸-标签定投',url:'/workbench/theme_screen'},
//                     {title:'物料预审管理',url:'/workbench/ad_source'},
//                 ],},
//
//         ]
// 	},
// 	{title:'数据中心',default:'/data',defaultopen:['1'],
// 	children:[
//         {title:'素材数据',url:'1',img:'&#xe60b;',list:[
//                 {title:'物料数据', url:'/data/Material_data'},
// 			]}
//         ]
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
//     {title:'收益中心',default:'/income',defaultopen:['1'],
//         children:[
//             {title:'收益数据',url:'1',img:'&#xe612;',list:[
//                 {title:'收益总览',url:'/income/earnings'},
// 				{title:'渠道收益',url:'/income/returns_detailed'},
// 				{title:'广告主收益',url:'/income/advertiser'}
//             ]},
//             {title:'收益管理',url:'2',list:[
//                     {title:'设计师成本管理',url:'/income/cost_management'}
//                 ]},
//             {title:'结算管理',url:'3',img:'&#xe60d;',list:[
//                    {title:'设计师结算管理',url:'/income/settlement'}
//                 ]},
//         ]
//         },
//         {title:'主题中心',default:'/ThemeCenter',defaultopen:['1'],
//             children:[
//                 {title:'数据中心',url:'1',img:'&#xe612;',list:[
//                     ]},
//                 {title:'主题库',url:'2',img:'&#xe612;',list:[
//                         {title:'主题库',url:'/ThemeCenter/themeCook'},
//                     ]},
//
//                 {title:'主题素材库',url:'3',img:'&#xe612;',list:[
//                         {title:'锁屏',url:'/ThemeCenter/themeLock'},
//                         {title:'图标',url:'/ThemeCenter/theme_icon'},
//                         {title:'二级页面',url:'/ThemeCenter/theme_two'},
//                         {title:'宣传图',url:'/ThemeCenter/propaganda_img'},
//                     ]},
//                 {title:'打包件库',url:'4',img:'&#xe612;',list:[
//                         {title:'锁屏',url:'/ThemeCenter/pack/packList'},
//                         {title:'图标',url:'/ThemeCenter/pack/pack_icon'},
//                         {title:'二级页面',url:'/ThemeCenter/pack/pack_two'},
//                     ]},
//                 {title:'运营',url:'5',img:'&#xe612;',list:[
//                         {title:'排期管理',url:'/ThemeCenter/scheduling/Scheduling_management'},
//                     ]},
//             ]
//         },
// ];
//
// localStorage.setItem('letNav',JSON.stringify(leftNav));

router.beforeEach((to, from, next) => {
	/*登录过期*/
	// console.log(window.location.href.split('#').slice(1));
	// const Nav = localStorage.getItem('letNav')
	// if(Nav){
	// 	for(var i=0;i<Nav.length;i++){
	// 		if(Nav[i].children.length!=0){
	// 			for(var j=0;j<Nav[i].children.length;j++){
	// 				if(Nav[i].children[i]==window.location.href.split('#').slice(1)){
    //
	// 				}
	// 			}
	// 		}
	// 	}
	// }
	if(+localStorage.getItem('logintime')+(24*60*60*1000)<=Date.parse(new Date())){
		localStorage.setItem("token","");
		tonek=false;
	}	
	if(tonek) {// 判断是否登录
		if(localStorage.getItem('status')==0){
			if(to.fullPath!='/erro'){
				next({ path: '/erro'});				
				return
			}
			next();	
			return
		}
		if(localStorage.getItem('role')==1){
			if(localStorage.getItem('letNav')){
                // if(to.fullPath.substring(0,7)!='/admin/'){
                //     next({ path: '/admin/wb_Journal'});
                //     return;
                // }
                // if(to.fullPath.substring(0,11)!='/workbench/'){
                //     next({ path: '/workbench/ad_source'});
                //     return;
                // }
			}
			next();
			return;
		}
		if(to.fullPath=='/'){
			next({ path: '/index'});
			return
		}
        if(to.fullPath=='/index'){
            document.title = '掌屿平台(Zoosalos)-聚合，连接，生态';
		}
        if(to.fullPath=='/data'){
            document.title = '数据中心-掌屿平台(Zoosalos)';
		}
        if(to.fullPath=='/income'){
            document.title = '收益中心-掌屿平台(Zoosalos)';
        }
		if(to.fullPath=='/admin'){
			if(JSON.parse(localStorage.getItem('letNav'))[0].children.length>0){
                next({ path: '/admin/advertising'});
                document.title = '素材中心-掌屿平台(Zoosalos)';
			}
		}
		if(to.fullPath=='/user'){
			if(JSON.parse(localStorage.getItem('letNav'))[1].children.length>0){
                next({ path: '/user/user_need'});
                document.title = '个人中心-掌屿平台(Zoosalos)';
			}
		}
        if(to.fullPath=='/userinfo'){
            // next({ path: '/userinfo/user_info'});
            document.title = '个人中心-掌屿平台(Zoosalos)';
        }
        if (to.fullPath=='/api/logout'){
            next({ path: '/erro'});
		}
        if(to.fullPath=='/indexs'){
			next({ path: '/indexs/list'});
		}
        if(to.fullPath=='/workbench'){
            // next({ path: '/workbench/workbenchPadding'});
            document.title = '工作台-掌屿平台(Zoosalos)';
        }
        if(to.fullPath=='/ThemeCenter'){
            document.title = '主题中心-掌屿平台(Zoosalos)';
        }
						
		// let params ={'url':to.fullPath.split('&')[0]} ;
		// if(to.fullPath!='index'){
		// 	 api.create_menu(params);
		// }
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
            localStorage.setItem('userName',msg.data.data.user.name);
			localStorage.setItem('status',msg.data.data.user.status);
            localStorage.setItem('role',msg.data.data.role[0].type);
            localStorage.setItem('icon',msg.data.data.role[0].icon);
			if(msg.data.data.user.type==1){
				next({ path: '/admin/wb_Journal'});
				return;
			}
			if(msg.data.data.user.status==0){
				next({ path: '/erro'});
				return
			}
			next({ path: '/index'});
		}).catch(()=>{
			alert("登录成功，请联系管理员添加角色，或启用账号");
		});
			
	}else{
		window.location.href="http://account.zookingsoft.com/login?from="+cent;
	}
})
export default router
