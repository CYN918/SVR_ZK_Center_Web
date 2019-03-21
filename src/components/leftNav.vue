<template>
	<div :class="['leftNavBox',apptyped]" >
		<div class="navbtn iconfont" @click="checkNav">&#xe8d1;</div>
		<div class="leftNavBg"></div>
		<div class="leftNav" >		
			<div class="let_title">{{navData.title}}</div>
			<el-menu :default-active="$route.fullPath.split('?')[0]" class="el-menu-vertical-demo" :router="true">
				<el-menu-item class="first_o" v-for="(el,index) in navData.list" :index="el.url" :key="index">
					{{el.title}}
				</el-menu-item>			
				<el-submenu v-for="(el,index) in navData.children" :index="el.url" :key="index">
					<template slot="title">
						<span>{{el.title}}</span>
					</template>
					<el-menu-item-group v-if="el.list">
						<el-menu-item v-for="(elx,indexx) in el.list" :index="elx.url" :key="indexx">{{elx.title}}</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group v-else-if="el.children">  
						<el-submenu v-for="(el2,index) in el.children" :index="el2.url" :key="index">
							<template slot="title">         
								<span>{{el2.title}}</span>
							</template>				
							<el-menu-item-group v-if="el2.list">   				   
								<el-menu-item v-for="(elx,indexx) in el2.list" :index="elx.url" :key="indexx">{{elx.title}}</el-menu-item>
							</el-menu-item-group> 
							<el-menu-item-group v-else-if="el2.children">  
								<el-submenu v-for="(el3,index) in el2.children" :index="el3.url" :key="index">
									<template slot="title">         
										<span>{{el3.title}}</span>
									</template>				
									<el-menu-item-group v-if="el3.list">   				   
										<el-menu-item v-for="(elx,indexx) in el3.list" :index="elx.url" :key="indexx">{{elx.title}}</el-menu-item>
									</el-menu-item-group> 
								</el-submenu>	
							</el-menu-item-group> 	
							
						</el-submenu>							
					</el-menu-item-group> 
					<el-menu-item v-else :index="el.url">
						<span >{{el.title}}</span>
					</el-menu-item>	
				</el-submenu>
			</el-menu>
		</div>
	</div>
</template>
<script>
export default { 
    name: 'app', 
	props:['navData'],
    data(){
		return{
			apptyped:'',	
		}
    },
    methods:{
		checkNav(){
			this.apptyped = this.apptyped==''?'oncheac':'';
		},
		
    }, 
}  			
</script>

<style>
.navbtn{
	display: none;
    position: fixed;
    top: -41px;
    left: 100%;
}
.leftNavBox{
	position: fixed;
	top: 66px;
	left: 0;
	bottom: 0;
	z-index: 9;
	width: 316px;
	transition: transform .5s;
}
.leftNavBg{
	width: 100%;
	height: 100%;
	box-shadow:0px 2px 8px 0px rgba(0, 0, 0, 0.08);
}
.leftNav{
	position: absolute;
	overflow-y: auto;
	top: 0;
	left: 0;
	width: 316px;
	height: 100%;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0, 0, 0, 0.08);
}
.let_title{
	margin-left: 47px;
	width:222px;
	height:54px;
	line-height: 54px;
	font-size:18px;
	margin-bottom: 28px;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(0,0,0,1);
	border-bottom:1px solid rgba(0,0,0,.2);

}
.leftNav .el-submenu__title{
	padding: 0 !important;
	height: 30px;
	margin-bottom: 19px;
	line-height: 30px;
}
.leftNav .el-submenu__title>span{
	margin-left: 47px;
}
.leftNav .el-submenu__title:hover{
	background:rgba(255,242,232,1) !important;
}

.leftNav  .el-submenu .el-menu-item{
	padding: 0 !important;
	height: 30px;
	margin-bottom: 19px;
	line-height: 30px;
	text-indent: 96px;
}

.leftNav .el-menu-item:focus, .el-menu-item:hover{
	background:rgba(255,242,232,1) !important;
	color: #FA541C !important;
}
.leftNav .el-menu-item.is-active{
	background:rgba(255,242,232,1) !important;
	border-right: 1px solid;
	margin-right: -1px;
	color: #FA541C !important;
}
@media only screen  and (max-width: 720px) {
	.leftNavBox{transform: translateX(-100%);background: rgba(0,0,0,.5);    width: 100%;}
	.navbtn{display: block;transform: translateX(100%);}
	.oncheac{
		transform: translateX(0);
	}
	.oncheac .navbtn{display: block;transform: translateX(0);left: 20px;}
}
.leftNav .el-menu-item>span{
	margin-left: 27px;
}
.leftNav .el-submenu .el-submenu .el-submenu__title>span {
    margin-left: 91px;
}
.leftNav .el-submenu .el-submenu .el-menu-item{
    text-indent: 140px;
}
.leftNav .el-submenu .el-submenu .el-submenu .el-submenu__title>span {
    margin-left: 140px;
}    
.leftNav .el-submenu .el-submenu .el-submenu .el-menu-item{
    text-indent: 154px;
}
.first_o{
	text-indent: 22px !important;
}
</style>