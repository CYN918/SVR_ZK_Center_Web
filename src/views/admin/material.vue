<template>
	<div class="centNavBox">
		<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
			<el-tab-pane label="广告图库" name="1"></el-tab-pane>
			<el-tab-pane label="广告模板库" name="2"></el-tab-pane>
			<el-tab-pane label="锁屏壁纸库" name="3"></el-tab-pane>	
		</el-tabs>
		<tables 
			:screenConfig="screenConfig" 
			:tableConfig="tableConfig" 
			:tableDatas="tableData"
			:tjData="tjData"
			@screenFn="getData"
			ref="Tabledd"
		></tables>				
		<el-button class="qhstBtn" @click="qhTable()" type="primary" size="mini" round>切换视图</el-button>
	</div>	
</template>

<script>
import tables from '../common/tables.vue';
	export default {
		components:{tables},
		data() {
			return {
				activeName2: '1',
				screenConfig:[],
				tableConfig:{
					total:0,
					ischeck:true,
					list:[
						
					],
					btns:[
						{fnName:'need_export',cls:'pldc',value:'批量导出',check:'1'},
					],
				},
				tableData:[],
				screens:{
					p:10,
					page:1,	
					total:0,
					is_finished:1,
					type:['m_picture','m_script_picture'],
					
				},
				sxtjList:'',
				onType:['m_picture','m_script_picture'],
				tjData:[],
				po:[['m_picture','m_script_picture'],['m_resource','m_h5_resource'],['m_wallpaper']],
				pb:[
					[{label:'全部',value:''},{label:'广告静态图',value:'m_picture'},{label:'广告脚本图',value:'m_script_picture'}],
					[{label:'全部',value:''},{label:'广告脚本模板',value:'m_resource'},{label:'广告H5模板',value:'m_h5_resource'}],
					[{label:'全部',value:''},{label:'锁屏壁纸脚本图',value:'m_wallpaper'}]
				],
				baconfig:[],
				tabledd: [[
				{prop:'id',lable:'素材Id'},
				{prop:'preview_url',lable:'预览图',type:'imgs'},
				{prop:'material_type',lable:'素材类型'},
				{prop:'position',lable:'广告位类型'},
				{prop:'description',lable:'投放内容描述'},
				{prop:'size',lable:'素材尺寸'},
				{prop:'link',lable:'投放链接'},
				{prop:'material_status',lable:'状态'},
				{prop:'finish_at',lable:'入库时间',sor:true},
				{prop:'attachment.url',lable:'附件下载',
					temps:[{cls:'bjysdicon iconfont',type:'text',value:'&#xe61a;',fnName:'downlod'}]							
				},
				],
				[
				{prop:'id',lable:'素材Id'},
				{prop:'preview_url',lable:'预览图',type:'imgs'},
				{prop:'material_type',lable:'素材类型'},
				{prop:'position',lable:'广告位类型'},
				{prop:'size',lable:'素材尺寸'},
				{prop:'ad_type',lable:'广告类型'},
				{prop:'channel_type',lable:'渠道类型'},			
				{prop:'material_status',lable:'状态'},
				{prop:'finish_at',lable:'入库时间',sor:true},
				{prop:'attachment.url',lable:'附件下载',
					temps:[{cls:'bjysdicon iconfont',type:'text',value:'&#xe61a;',fnName:'downlod'}]							
				},
				],
				[
				{prop:'id',lable:'素材Id'},
				{prop:'preview_url',lable:'预览图',type:'imgs'},
				{prop:'material_type',lable:'素材类型'},
				{prop:'position',lable:'风格分类'},
				{prop:'description',lable:'广告位数量'},
				{prop:'size',lable:'素材尺寸'},				
				{prop:'price',lable:'价格'},			
				{prop:'material_status',lable:'状态'},
				{prop:'finish_at',lable:'入库时间',sor:true},
				{prop:'attachment.url',lable:'附件下载',
					temps:[{cls:'bjysdicon iconfont',type:'text',value:'&#xe61a;',fnName:'downlod'}]							
				},
				]
				],
			};
		},
		mounted: function () {	
			this.setScreenConfig();		
					this.tjData='';
					this.getTj();	
			this.getData();
		}, 
		methods: {
			need_export(){
					console.log(222222222)
				let form = document.createElement('form'),
				arr = [
					{n:'status',d:this.screens.status || ''},
					{n:'type[]',d:this.screens.type || ''},
					{n:'position',d:this.screens.position || ''},
					{n:'size',d:this.screens.size || ''},
					{n:'is_finished',d:this.screens.is_finished || ''},
					{n:'start_date',d:this.screens.start_date || ''},
					{n:'end_date',d:this.screens.end_date || ''},
					{n:'search',d:this.screens.search || ''}
				];
			
				for(let i=0,n=arr.length;i<n;i++){
					let dom = document.createElement('input');
					dom.setAttribute('name',arr[i].n);
					dom.setAttribute('value',arr[i].d);	
					form.appendChild(dom);
				}
				form.setAttribute('style', 'display:none');
				form.setAttribute('target', '');
				form.setAttribute('method', 'get');	
				form.setAttribute('action', 'http://ts-i.idatachain.cn/api/material/export');		
				document.body.appendChild(form);
				form.submit();
			},
			
			handleClick(tab, event) {
				this.screenConfig = [];
				this.setScreenConfig();	
				this.$refs.Tabledd.initpage();				
				this.screens = {
					p:10,
					page:1,	
					total:0,
					type:this.po[this.activeName2-1],				
				};	
				this.tjData='';
				this.getTj();	
				this.getData();
			},
			qhTable(){				
				this.$refs.Tabledd.qhTables();				
			},
			enloding(){				
				this.$refs.Tabledd.lodingfalse();				
			},
			sxxFn(on){	
				if(this.setStatusType==1){
					return
				}
				this.setStatusType=1;			
				let params = {id:this.tableData[on].id,base_status:this.tableConfig.list[9].select.mode[on]};		
				this.api.need_check({params}).then((datas)=>{					
					this.setStatusType = 0;			
				}).catch((error)=>{
					this.setStatusType = 0;
					location.reload();
				})			
			},
			getTj(){
				let pd =['picture', 'resource', 'wallpaper'] ;
				let params = {material_type:pd[this.activeName2-1]};
				this.api.material_stat({params}).then( (response)=> {
					
					if(pd[this.activeName2-1]=='wallpaper'){
						this.tjData =[
							{name:'待审核数（个）',num:response.in_review},
							{name:'入库数（个）',num:response.in_lib},
							{name:'使用中（个）',num:response.online},
							{name:'使用过（个）',num:response.offline},
						];
					}else if(pd[this.activeName2-1]=='resource'){
						this.tjData =[
							{name:'待审核数（个）',num:response.in_review},
							{name:'入库数（个）',num:response.in_lib},
							{name:'使用中（个）',num:response.online},
							{name:'使用过（个）',num:response.offline},
						];
					}else{
						this.tjData =[
							{name:'待审核数（个）',num:response.in_review},
							{name:'入库数（个）',num:response.in_lib},
							{name:'上线数（个）',num:response.online},
							{name:'下线数（个）',num:response.offline},
						];
					}
					
					
				}).catch((error)=>{
					
				})
			},
			getData(sxtj){
				if(sxtj){
					Object.assign(this.screens, sxtj);
					
					if(sxtj.type){						
						this.screens.type = [sxtj.type];
						
					}else{
						this.screens.type = this.po[this.activeName2-1];
					}
					if(sxtj.start_date){
						this.screens.end_date = sxtj.start_date[1];
						this.screens.start_date = sxtj.start_date[0];
					}else{
						this.screens.end_date?delete this.screens.end_date:'';
					}
				}	
				let params = this.screens;	
			    params.is_finished=1;
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
							material_status:this.checkStatus(da[i].material_status),
							finish_at:this.checkTime(da[i].finish_at),
							dowurl:da[i].attachment.url,
							ad_type:da[i].extend.ad_type || "",
							channel_type:da[i].extend.channel_type || "",
							price:da[i].price || "",
						},
					);
				}			
				return arr;
			},
			setScreenConfig(){
				this.tableConfig.list = this.tabledd[this.activeName2-1]
				
				
				this.api.sysconfig_material().then((data)=>{	
					this.sxtjList = data;
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
						{title:'素材类型',type:'select',value:'type',list:this.pb[this.activeName2-1]},
						{title:'投放位置',type:'select',value:'position',list:list1},
						{title:'素材尺寸',type:'select',value:'size',list:list2},
						{title:'素材状态',type:'select',value:'status',list:[
							{label:'全部',value:''},						
							{label:'入库',value:'1001'},
							{label:'使用中',value:'1101'},
							{label:'使用过',value:'1201'},
						]},	
						{title:'入库时间',type:'times',value:'start_date'},		
						{title:'模糊搜索',type:'text',value:'search'},	
					];	
					
				}).catch((error)=>{})				
			},
			downlod(on){
				window.open(this.tableData[on].dowurl);
			},
			xzFn(data){
	
			},
			checkNr(value){		
				if(!value){return}
				let a = '';
				switch (value){
					case 'm_picture':a= '广告静态图';
						break;
					case 'm_script_picture':a= '广告脚本图';
						break;
					case 'm_resource':a= '广告脚本模板';
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
				if(!value){return}
				return value.substring(0,10);
			},
			checkStatus(value){	
				if(!value){return}
				return value =='1001'?'入库':value =='1101'?'使用中':value=='1201'?'使用过':'';	
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
