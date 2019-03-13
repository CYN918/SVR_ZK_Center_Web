<template>
	<div class="topNav">
		<div @click="goindex" class="log"><img  src="/img/log.jpg"/>掌酷综合平台</div>
		<el-dropdown trigger="click" class="user-ci">
			<span class="el-dropdown-link iconfont">&#xe686;</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item ><span @click="loginout()">退出</span></el-dropdown-item>		   
			</el-dropdown-menu>
		</el-dropdown>
		<ul class="navd" v-if="config.showL!=-1">
			<router-link  to="/index"><li>首页</li></router-link>
			<router-link  to="/admin"><li>管理</li></router-link>
			<router-link  to="/data"><li>数据</li></router-link>
			<router-link  to="/user"><li>个人中心</li></router-link>
			<a><li class="iconfont">&#xe628;</li></a>
		</ul>
		<el-menu v-if="config.showL!=-1"  class="el-menu-demo appTopNav" mode="horizontal" @select="handleSelect"> 
			<el-submenu index="2">
				<template slot="title">{{topNacd}}</template>
				<el-menu-item index="0">首页</el-menu-item>
				<el-menu-item index="1">管理</el-menu-item>
				<el-menu-item index="2">数据</el-menu-item>
				<el-menu-item index="3">个人中心</el-menu-item>
				<el-menu-item @click="loginout" index="4">退出</el-menu-item>				
			</el-submenu>		  
		</el-menu>
	</div> 
</template>

<script>
export default { 
    name: 'topNav', 
	props:['config'],
    data(){
		return{
			input:'',
			topNacd:'首页',
			todata:[{name:'首页',url:'/index'},{name:'管理',url:'/admin/needList'},{name:'数据',url:'/data/pData'},{name:'个人中心',url:'/user/user_need'}],
		}
    },
	methods:{
		handleSelect(key){				
			this.topNacd = this.todata[key].name;
			this.$router.push(this.todata[key].url);
		},
		goindex(){
			window.location.href= '#/index';
		},
		loginout(){	
			let urld = 'http://ts-i.idatachain.cn';
			if(window.location.host=='c.zookingsoft.com'){
				urld = 'http://c.zookingsoft.com';
			}			
			this.$ajax({
				method: 'get',
				timeout: 10000,
				url:urld+'/api/logout',			     
			}).then((msg)=>{	
				if(msg.data.code==0){
					localStorage.setItem('token','');
					let cent = 'center';
					if(window.location.host=='ts-centerweb.idatachain.cn'){
						cent = 'center_dev';
					}else
					if(window.location.host=='localhost:8080'){
						cent = 'center_local';
					}
					window.location.href="http://account.zookingsoft.com/auth/logout?from="+cent;
				}							
			}).catch(()=>{
// 				localStorage.setItem('token','');
// 				window.location.href="http://account.zookingsoft.com/login?from=center_local";
			})
		}
	}
}    
</script>

<style>
@font-face {
	font-family: 'iconfont';
	src: url('/font/iconfont.eot');
	src: url('/font/iconfont.eot?#iefix') format('embedded-opentype'),
	url('/font/iconfont.woff') format('woff'),
	url('/font/iconfont.ttf') format('truetype'),
	url('/font/iconfont.svg#iconfont') format('svg');
}
.iconfont{
	font-family:"iconfont" !important;
	font-size:16px;font-style:normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
}
.topNav{
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9;
	width: 100%;
	height:63px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0, 0, 0, 0.08);
}
.log{
	cursor: pointer;
	float: left;
	width: 316px;
	margin-top: 22px;
	height:23px;
	border-right:1px solid rgba(0,0,0,.2);
	font-size:14px;
	line-height: 23px;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(0,0,0,1);
	opacity:0.85;
}
.log>img{vertical-align:top;display: inline-block;width: 37px;margin: 0 21px 0  48px;}
.sszj{
	float: left;
}
.ssicon{
	cursor: pointer;
	display: inline-block;
	margin: 0 17px 0 16px;
	line-height: 63px;
}
.sskzd{	
	width: 220px !important;
	border: none;
}
.sskzd>input{
	border: none;
}
.navd{float: right;height: 100%;}
.navd li{
	display: inline-block;
}
.navd a{
	display: inline-block;
	height: 100%;
	width: 80px;
	text-align: center;
	font-size:14px;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(0,0,0,85);
	line-height: 65px;
	margin: 0 20px;
}
.navd a.router-link-active{	
	display: inline-block;
	height: 100%;
	color:rgba(255,156,110,.85);
	border-top: 1px solid rgba(255,156,110,1);
}
.tableBuee .el-button{
	background:rgba(255,120,117,1);
	color:rgba(255,255,255,1);
}
.tableBuee .el-button:hover{
	background:rgba(255,120,117,1);
	color:rgba(255,255,255,1);
	opacity: .7;
}
.tableBuee .el-button:nth-child(2){
	background:rgba(105,192,255,1);
}
.tableBuee .el-button:nth-child(2):hover{
	background:rgba(105,192,255,1);
}
.user-ci{
	cursor: pointer;
	float: right;
	margin-right: 96px;
	height: 100%;
    width: 80px;
    text-align: center;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(0,0,0,85);
    line-height: 65px;
    margin: 0 20px;
}
.appTopNav{
	display: none !important;
	position: absolute !important;
    right: 0;
    top: 2px;
}
.appTopNav .el-submenu__title{
	border: none !important;
}
@media only screen  and (max-width:1040px) {
	.appTopNav{display: block !important;}
	.sszj{display: none;}
	.log{width: 230px;}
}
@media only screen  and (max-width: 1040px) {
	.appTopNav{display: block !important;}
	.navd{display: none;}
}
@media only screen  and (max-width: 720px) {
	.tcVbox{left: 0 !important;}
    .tjzsd{padding: 20px 85px;}
}
</style>