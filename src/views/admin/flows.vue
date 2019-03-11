<template>
	<tables 
		:screenConfig="screenConfig" 
		:tableConfig="tableConfig" 
		:tableDatas="tableData"			
		@screenFn="getData"
		ref="Tabledd"
	></tables>					
</template>

<script>
import tables from '../common/tables.vue';
	export default {
		components:{tables},
		data() {
			return {				
				screenConfig:[],
				tableConfig:{},
				tableData:[],
				screens:{
					p:10,
					page:1,
				},
			};
		},
		mounted: function () {	
			this.init();
		}, 
		methods: {
			init(){
				this.setScreenConfig();
				this.settableConfig();
				this.getData();
			},
			setScreenConfig(){
				this.api.sysconfig_material().then((data)=>{	
					let p = data.platform_position,
					sz = data.material_size;
					let list1 = [{label:'全部',value:''},];
					for(let i=0,n=p.length;i<n;i++){
						list1.push({label:p[i],value:p[i]})
					}
					let list2 = [{label:'全部',value:''},];
					for(let i=0,n=sz.length;i<n;i++){
						list2.push({label:sz[i],value:sz[i]})
					}				
					this.screenConfig = [
						{title:'素材类型',type:'select',value:'type',list:[
					{label:'全部',value:''},{label:'广告静态图',value:'m_picture'},{label:'广告脚本图',value:'m_script_picture'},
					{label:'广告脚本模板',value:'m_resource'},{label:'广告H5模板',value:'m_h5_resource'},{label:'锁屏壁纸脚本图',value:'m_wallpaper'}
				]},
						{title:'投放位置',type:'select',value:'position',list:list1},
						{title:'素材尺寸',type:'select',value:'size',list:list2},
						{title:'素材状态',type:'select',value:'status',list:[
							{label:'全部',value:''},
							{label:'待审核',value:'待审核'},
							{label:'入库',value:'入库'},
							{label:'使用中',value:'1101'},
							{label:'使用过',value:'1201'},
						
						]},	
						{title:'入库时间',type:'times',value:'start_date'},		
						{title:'模糊搜索',type:'text',value:'search'},	
					];	
					
				}).catch((error)=>{})				
			},
			settableConfig(){
				this.tableConfig = {
					total:0,
					ischeck:true,
					list:[
						{prop:'id',lable:'素材Id'},
						{prop:'preview_url',lable:'预览图',type:'imgs'},
						{prop:'material_type',lable:'素材类型'},
						{prop:'position',lable:'广告位类型'},
						{prop:'description',lable:'投放内容描述'},
						{prop:'size',lable:'素材尺寸'},
						{prop:'finish_at',lable:'入库时间',sor:true},
						{prop:'material_status',lable:'状态'},	
						
					],
					expand:[
						{prop:'work_id',lable:'作品ID'},
						{prop:'ext',lable:'作品格式'},
						{prop:'created_at',lable:'更新时间'},
						{prop:'status',lable:'状态信息'},
						{prop:'attachment_url',lable:'附件下载',
							temps:[{cls:'bjysdicon iconfont',type:'text',value:'&#xe61a;',fnName:'downlod'}]							
						},
					],
					btns:[
						{fnName:'xzFn',cls:'pldc',value:'批量导出',check:'1'},
					],
				};
			},
			enloding(){				
				this.$refs.Tabledd.lodingfalse();				
			},
			getData(sxtj){
				if(sxtj){
					
					
					Object.assign(this.screens, sxtj);
					if(sxtj.type){
						this.screens.type = [sxtj.type];
					}
					if(sxtj.start_date){
						this.screens.end_date = sxtj.start_date[1];
						this.screens.start_date = sxtj.start_date[0];
					}else{
						this.screens.end_date?delete this.screens.end_date:'';
					}
					if(sxtj.status==='入库'){
						this.screens.status = '1001';
						this.screens.is_finished = 1;
					} else
					if(sxtj.status==='待审核'){
						this.screens.status = '1001';
						this.screens.is_finished = 0;
					} else{
						delete this.screens.is_finished;
					}
					
			
					
				}	
				let params=this.screens;	
				this.api.material_lists({params}).then( (response)=> {
					this.tableData = this.clData(response);
					this.enloding();
				}).catch((error)=>{
					
				})				
			},	
			clData(data){
				let arr  = [];
				let da = data.data;		
				this.tableConfig.total=data.total;
				for(let i=0,n=da.length;i<n;i++){
					arr.push(
						{
							id:da[i].id,
							preview_url:da[i].preview_url=='null'?'/img/log.jpg':da[i].preview_url ,
							material_type:this.checkNr(da[i].material_type),
							position:da[i].position,
							description:da[i].need.extend.description,
							size:da[i].size,
							link:da[i].need.extend.link,
							material_status:this.checkStatus(da[i].material_status,da[i].is_finished),
							finish_at:this.checkTime(da[i].finish_at),
							dowurl:da[i].attachment.url,
							ad_type:da[i].extend.ad_type || "",
							channel_type:da[i].extend.channel_type || "",
							price:da[i].price || "",
							works:da[i].works,
			
						},
					);
				}			
				return arr;
			},
			
			downlod(on){
				window.open(this.tableData[on].dowurl);
			},
			downlods(on){
				window.open(this.tableData[on.on].works[on.ons].attachment_url);
			},
			xzFn(data){
	
			},
			checkNr(value){		
				if(!value){return}
				let a = '';
				switch (value){
					case 'm_picture':a= '广告静态图';
						break;
					case 'm_script_picture':a= '广告脚本模板';
						break;
					case 'm_resource':a= '脚本模板';
						break;
					case 'm_h5_resource':a= '广告H5模板';
						break;
					case 'm_wallpaper':a= '锁屏壁纸脚本图';
						break;
					default:
						break;
				}
				return a;
			},
			checkTime(value){
				if(value==null || !value){return '--'}
				return value.substring(0,10);
			},
			checkStatus(value,on){	
				if(!value){return}
				console.log(on);
				if(on==1){
					return value =='1001'?'入库':value =='1101'?'使用中':value=='1201'?'使用过':'';
				}
				return value =='1001'?'待审核':value =='1101'?'使用中':value=='1201'?'使用过':'';
								
			},
		}
	};
</script>

<style>
.centNavBox{
	position: relative;
}
.centNavBox .el-tabs__header{
	background:rgba(255,255,255,1);
	box-shadow:0px 1px 3px 0px rgba(0, 0, 0, 0.06);
	margin-bottom: 0 !important;

}
.centNavBox .el-tabs__item{
	background:rgba(250,247,246,1);
	height: 60px;
	font-size:14px;
	line-height:60px ;
	padding: 0 33px;
	color:rgba(0,0,0,.65) !important;
}
.centNavBox .is-active{
	background:rgba(255,255,255,1);
	color:rgba(0,0,0,1) !important;
}
.qhstBtn{
	position: absolute;
	top: 19px;
	right: 40px;
	background:rgba(255,216,191,1) !important;
	border-color: rgba(0, 0, 0, 0.06) !important;
	color:rgba(255,255,255,1);
}
.centNavBox .el-tabs--card>.el-tabs__header .el-tabs__nav{
	border: none !important;
	padding-bottom:2px;
}
.el-tabs--card>.el-tabs__header{
	border: none;
	    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
}
.el-tabs--card>.el-tabs__header .el-tabs__item{
	border: none;
	    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
}
/* background:rgba(250,247,246,1);
box-shadow:0px 1px 3px 0px rgba(0, 0, 0, 0.06); */
</style>
