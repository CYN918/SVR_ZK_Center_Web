<template>
	<div class="topNav">
		<div @click="goindex" class="log" v-if="this.role_type==0"><img  src="../../public/img/logo.png"/></div>
		<div @click="goindex" class="log1" v-if="this.role_type==1"><img  src="../../public/img/logo2.png"/></div>
		<!--<el-dropdown trigger="click" class="user-ci">-->
			<!--<span class="el-dropdown-link iconfont">&#xe686;</span>-->
			<!--<el-dropdown-menu slot="dropdown">-->
				<!--<el-dropdown-item ><span @click="gouser()">个人信息</span></el-dropdown-item>-->
				<!--<el-dropdown-item ><span @click="loginout()">退出</span></el-dropdown-item>-->
			<!--</el-dropdown-menu>-->
		<!--</el-dropdown>-->
		<ul class="navd" v-if="config.showL!=-1&&this.type!=1">
			<router-link  v-for="(el,index) in navList" :key="index" :to="el.to">
				<li>
					<span>{{el.name}}</span>
				</li>
			</router-link>
			<router-link  to="/login" class="right1"><li @click="loginout()"><span>退出登录</span></li></router-link>
			<router-link  to="/userinfo" class="right0"><li><img :src="img" class="imgs_user"/>{{name}}</li></router-link>

			<!--<router-link  to="/data"  v-if="top3"><li><span>数据中心</span></li></router-link>-->
			<!--<router-link  to="/income"  v-if="top4"><li><span>收益中心</span></li></router-link>-->
			<!--<router-link  to="/admin"  v-if="top1"><li> <span>素材中心</span></li></router-link>-->
			<!--<router-link  to="/ThemeCenter"  v-if="top5"><li><span>主题中心</span></li></router-link>-->

		</ul>
		<ul class="navd" v-if="config.showL!=-1&&this.type==1">
			<router-link  to="/workbench"><li><span>工作台</span></li></router-link>
			<router-link  to="/admin"><li> <span>素材中心</span></li></router-link>
			<router-link class="right2" to="/userinfo"><li ><img :src="img" class="imgs_user"/>{{name}}</li></router-link>
			<router-link class="right2" to="/login"><li  @click="loginout()"><span>退出登录</span></li></router-link>
		</ul>
		<el-menu v-if="config.showL!=-1&&this.type==0"  class="el-menu-demo appTopNav" mode="horizontal" @select="handleSelect">
			<el-submenu index="2">
				<template slot="title">{{topNacd}}</template>
				<el-menu-item index="0">工作台</el-menu-item>
				<el-menu-item index="1">数据中心</el-menu-item>
				<el-menu-item index="2">收益中心</el-menu-item>
				<el-menu-item index="3">素材中心</el-menu-item>
				<el-menu-item index="4">主题中心</el-menu-item>
				<!--<el-menu-item index="4">产品中心</el-menu-item>-->
				<el-menu-item @click="loginout" index="5">退出</el-menu-item>
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
			navList:[],
		    type:'',
			role_type:localStorage.getItem('role'),
		    name:'',
            email:"",
			input:'',
            top1:false,
            top2:false,
            top3:false,
            top4:false,
            top5:false,
			topNacd:'首页',
			img:"./img/user.png",
			todata:[{name:'首页',url:'/index'},{name:'工作台',url:'/workbench/workbenchPadding'},{name:'数据',url:'/data/Material_data'},{name:'收益中心',url:'/income/earnings'},{name:'素材中心',url:'/admin/advertising'},{name:'主题中心',url:'/ThemeCenter'},{name:'用户',url:'/userinfo/user_info'}],
		}
    },

	mounted(){
		this.name=localStorage.getItem('userName');
		this.getLefNav();
        this.authority();
        this.type=localStorage.getItem('role');
        if(localStorage.getItem('icon')!=''){
            this.img=localStorage.getItem('icon')
		}
	},
	methods:{
		handleSelect(key){				
			this.topNacd = this.todata[key].name;
			this.$router.push(this.todata[key].url);
		},
        authority(){
		    this.api.perm_role_uri({}).then((res)=>{
		        localStorage.setItem('control',JSON.stringify(res));
			})
		},
        getLefNav(){
            this.api.perm_leftnav().then((res)=>{
                let navs = [];
                for(var i=0;i<res.length;i++){
                    if(res[i].title=='素材中心'&&res[i].children!=0){
                        navs.push({
                            to:'/admin',
                            name:'素材中心'
                        });
                        this.top1=true
					}
                    if(res[i].title=='工作台'&&res[i].children!=0){
                        navs.push({
                            to:'/workbench',
							name:'工作台'
                        });
                        this.top2=true
                    }
                    if(res[i].title=='数据中心'&&res[i].children!=0){
                        navs.push({
                            to:'/data',
                            name:'数据中心'
                        });
                        this.top3=true
                    }
                    if(res[i].title=='收益中心'&&res[i].children!=0){
                        navs.push({
                            to:'/income',
                            name:'收益中心'
                        });
                        this.top4=true
                    }
                    if(res[i].title=='主题中心'&&res[i].children!=0){
                        navs.push({
                            to:'/ThemeCenter',
                            name:'主题中心'
                        });
                        this.top5=true
                    }
				}
				this.navList = navs;
                localStorage.setItem('letNav',JSON.stringify(res));

            })
        },
		goindex(){
			window.location.href= '#/index';
		},
        // gouser(){
        //     window.location.href= '#/userinfo/user_info';
        // },
		loginout(){
			let urld = 'http://ts-i.idatachain.cn';
			if(window.location.host=='c.zookingsoft.com'){
				urld = 'http://c.zookingsoft.com';
			}
            if(window.location.host=='c2.zookingsoft.com'){
                urld = 'http://c2.zookingsoft.com';
            }
			this.$ajax({
				method: 'get',
				timeout: 10000,
				url:urld+'/api/logout',			     
			}).then((msg)=>{
				if(msg.data.code==0){
					localStorage.setItem('token','');
                    localStorage.removeItem('letNav');
					let cent = 'center';
					if(window.location.host=='ts-centerweb.idatachain.cn'){
						cent = 'center_dev';
					}else
					if(window.location.host=='localhost:8080'){
						cent = 'center_local';
					}else if(window.location.host=='c2.zookingsoft.com'){
                        cent = 'center_dev2';
					}
					window.location.href="http://account.zookingsoft.com/auth/logout?from="+cent;
				}							
			}).catch(()=>{
				localStorage.setItem('token','');
                let cent = 'center';
                if(window.location.host=='ts-centerweb.idatachain.cn'){
                    cent = 'center_dev';
                }else
                if(window.location.host=='localhost:8080'){
                    cent = 'center_local';
                }else if(window.location.host=='c2.zookingsoft.com'){
                    cent = 'center_dev2';
                }
                // window.location.href="http://account.zookingsoft.com/auth/logout?from="+cent;
			})
		},

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
.right2{
	position: relative;
	left:57%;
}
.topNav{
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9;
	width: 100%;
	height:63px;
	background:rgba(255,255,255,1);
	box-shadow:0px 6px 12px 0px rgba(230,233,240,0.3);
}
.log,.log1{
	cursor: pointer;
	float: left;
	width:256px;
	height:64px;
	background:linear-gradient(270deg,#0052ff 0%,#0584ff 100%);
	/*margin-top: 22px;*/
	/*border-right:1px solid rgba(0,0,0,.2);*/
	font-size:14px;
	line-height: 23px;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(0,0,0,1);
	opacity:0.85;
	text-align: center;
}
.log1{
	background:#fff!important;
}
.log>img,.log1>img{
	vertical-align:top;
	display: inline-block;
	max-width: 256px;
	max-height: 64px;
	position: relative;
	top:50%;
	transform: translateY(-50%);
}

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
.navd{height: 100%;}
.navd li{
	display: inline-block;
	width: 100%;
	height: 100%;
}
.navd a{
	display: inline-block;
	height: 100%;
	width:143px;
	text-align: center;
	font-size:16px;
	font-family:PingFang-SC-Bold;
	font-weight:bold;
	color:rgba(143,155,179,1);
	line-height: 65px;
}
.right1{
	float: right;
	margin-right: 50px;
}
.right0{
	float: right;
}
.navd a.router-link-active{	
	display: inline-block;
	height: 100%;
	font-size:16px;
	font-family:PingFang-SC-Bold;
	font-weight:bold;
	color:rgba(51,119,255,1);
	/*border-bottom: 2px solid rgba(51,119,255,1);*/
}
.imgs_size{
	width: 20px;
	height: 18px;
	vertical-align: middle;
	margin-right: 10px;
}
.imgs_user{
	width: 32px;
	height: 32px;
	border-radius: 50%;
	vertical-align: middle;
	margin-right: 10px;
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
.navd a.router-link-active span{
	display: inline-block;
	line-height: 60px;
	border-bottom: 4px solid rgba(51,119,255,1);
	vertical-align: top;
}
</style>