<template>
	<div id="ssTOP">
		<tables
			:screenConfig="screenConfig"
			:tableConfig="tableConfig"
			:tableDatas="tableData"
			:tjData="tjData"
			@screenFn="getData"
			ref="Tabledd"
		></tables>
		<taglod :cslist="sxtjList"  ref="taglod"></taglod>
	</div>	
</template>
<script>
import taglod from '../../components/taglod';
import tables from '../common/tables';
export default {
	components:{tables,taglod},
    data() {
		return {
			updataType:0,
			screens:{
				p:10,
				page:1,	
				total:0,
			},
			sxtjList:'',
			tableData:[],			
			screenConfig:[],
			tjData:[],
			tableConfig:{
				total:0,
				ischeck:true,

				list:[
					{prop:'id',lable:'需求ID'},
					{prop:'title',lable:'需求标题'},
					{prop:'extend_type',lable:'素材类型'},
					{prop:'position',lable:'广告位类型'},
					{prop:'description',lable:'投放内容描述'},
					{prop:'size',lable:'素材尺寸'},
					{prop:'num',lable:'当前需求数量'},
					{prop:'mnum',lable:'历史需求数量'},
					{prop:'end_at',lable:'投稿截止时间',sor:true},
					{prop:'created_at',lable:'创建时间',sor:true},
					{prop:'status',lable:'状态',fnName:'sxxFn',select:{value:'',mode:[],list:[{'label':'上线',value:2},{'label':'下线',value:3}]}},						
					{prop:'attachment.url',lable:'操作',
						temps:[{cls:'bjysdicon iconfont',type:'text',value:'&#xe623;',fnName:'getXqxq'}]							
					},
				],
				btns:[
					{fnName:'addXq',cls:'hsan',value:'新增需求',class:'aaa'},
					{fnName:'need_export',cls:'pldc ',value:'批量导出',check:'1',class:'bbb'},
				],
			},
		}
    },
	mounted: function () {	
		this.setScreenConfig();
		this.need_stat();
		this.getData();
	}, 
	methods: {
		need_export(){
			let form = document.createElement('form'),
			arr = [
				{n:'need_type',d:this.screens.needs_picture || ''},
				{n:'status',d:this.screens.status || ''},
				{n:'position',d:this.screens.position || ''},
				{n:'size',d:this.screens.size || ''},
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
			form.setAttribute('action', 'http://ts-i.idatachain.cn/api/need/export');		
			document.body.appendChild(form);
			form.submit();
		},
		need_stat(){
			this.api.need_stat().then((data)=>{
				this.tjData = [
					{name:'有效需求数（个）',num:data.needs || 0},
					{name:'待收素材数（个）',num:data.wait  || 0},
					{name:'审核通过素材数（个）',num:data.success  || 0},
					{name:'审核未通过素材数（个）',num:data.failed  || 0}
				];
			});
		},
		sxxFn(on){	
			if(this.setStatusType==1){
				return
			}
			this.setStatusType=1;	
			let params = {id:this.tableData[on].id,base_status:this.tableConfig.list[10].select.mode[on]};		
			this.api.need_check({params}).then(()=>{					
				this.setStatusType = 0;			
			}).catch(()=>{
				this.setStatusType = 0;
				location.reload();
			})			
		},
		setLoding(type){
			this.$refs.Tabledd.setLoding(type);	
		},	
		getData(sxtj){
			this.setLoding(true);
			if(sxtj){
				Object.assign(this.screens, sxtj);				
			}	
			let params = this.screens;												
			this.api.need_list({params}).then((response)=>{						
				this.tableData = this.clData(response);		
				this.setLoding(false);
			}).catch(()=>{
				this.setLoding(false);
			});
		},
		clocs(){
			this.$refs.taglod.clocs();
		},
		addXq(){

			this.$refs.taglod.open();
		},	
		clData(data){
			let arr  = [];
			this.tableConfig.total=data.total;
			let da = data.data;			
			for(let i=0,n=da.length;i<n;i++){
				arr.push(
					{
						id:da[i].id,
						title:da[i].title,
						extend_type:this.checkNr(da[i].extend_type),
						position:da[i].position,
						description:da[i].extend.description,
						size:da[i].size,
						num:da[i].num,
						mnum:this.numcheck(da[i].mnum,da[i].num,da[i].status),
						end_at:da[i].end_at,
						created_at:da[i].created_at,
						status:this.checkStatus(da[i].status),							
					},
				);
			}
			return arr;
		},
		setScreenConfig(){
			this.api.sysconfig_material().then((datas)=>{	
				this.sxtjList = datas;					
				let p = datas.platform_position,
				sz = datas.material_size;
				let list1 = [{label:'全部',value:''},];
				for(let i=0,n=p.length;i<n;i++){
					list1.push({label:p[i],value:p[i]})
				}
				let list2 = [{label:'全部',value:''},];
				for(let i=0,n=sz.length;i<n;i++){
					list2.push({label:sz[i],value:sz[i]})
				}				
				this.screenConfig = [
					{title:'素材类型',type:'select',value:'need_type',list:[
						{label:'全部',value:''},
						{label:'广告静态图',value:'needs_picture'},
						{label:'广告脚本图',value:'needs_script_picture'},
						{label:'广告脚本模板',value:'needs_resource'},
						{label:'广告H5模板',value:'needs_h5_resource'},
						{label:'锁屏壁纸脚本图',value:'needs_wallpaper'},
					]},
					{title:'投放位置',type:'select',value:'position',list:list1},
					{title:'素材尺寸',type:'select',value:'size',list:list2},
					{title:'需求状态',type:'select',value:'status',list:[
						{label:'全部',value:''},
						{label:'待审核',value:'0'},
						{label:'未通过',value:'1'},
						{label:'上线',value:'2'},
						{label:'下线',value:'3'},						
					]},
					{title:'模糊搜索',type:'text',value:'search'},					
				];
			})	
		},
		getXqxq(on){	
			if(this.tableData[on].status=='上线中'){
				this.$message('上线中不可修改！');
				return;
			}
			if(this.updataType==1){
				return
			}			
			this.updataType=1;
			let params = {
				id:this.tableData[on].id
			};
			this.api.need_get({params}).then((data)=>{	
				this.updataType=0;			
				let p = data;
				this.$refs.taglod.setData({
					title: p.title,
					extend_type:p.extend_type,
					size:p.size,
					position:p.position,
					position_desc:p.position_desc,
					end_at:p.end_at,
					num:p.num,
					description:p.extend.description,
					note:p.extend.note,
					link:p.extend.link,
					status:p.status,
					id:p.id,
				});					
			}).catch(()=>{
				this.updataType = 0;	
			})	
		},
		checkNr(value){		
			if(!value){return}
			let a = '';
			switch (value){
				case 'needs_picture':a= '广告静态图';
					break;
				case 'needs_script_picture':a= '广告脚本图';
					break;
				case 'needs_resource':a= '广告脚本模板';
					break;
				case 'needs_h5_resource':a= '广告H5模板';
					break;
				case 'needs_wallpaper':a= '锁屏壁纸脚本图';
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
		numcheck(nm,nm2,type){
			if(type ==2){
				return nm+nm2;
			}
			return nm;
		},
		checkStatus(value){			
			return value ==2?'上线':value ==3?'下线':value==1?'未通过':value==0?'待审核':'';				
		},
		
    },
	
}	
</script>
<style>

</style>