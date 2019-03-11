<template>
	<div>
		<tables 
			:screenConfig="screenConfig" 
			:tableConfig="tableConfig" 
			:tableDatas="tableData"
			@screenFn="getData"
			ref="Tabledd"
		></tables>
	</div>	
</template>
<script>
import tables from '../common/tables';
export default {
	components:{tables},
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
			tjData:[
				{name:'有效需求数（个）',num:38},
			  	{name:'待收素材数（个）',num:8},
			  	{name:'审核通过素材数（个）',num:108},
			  	{name:'审核未通过素材数（个）',num:32},
			],

			tableConfig:{
				total:0,
				ischeck:false,
				list:[
					{prop:'work_id',lable:'素材ID'},
					{prop:'preview_url',lable:'预览图',type:'imgs'},
					{prop:'material_type',lable:'素材类型'},
					{prop:'position',lable:'广告位类型'},
					{prop:'size',lable:'素材尺寸'},
					{prop:'description',lable:'作品ID'},
					{prop:'description',lable:'作品格式'},					
					{prop:'status',lable:'状态'},
					{prop:'created_at',lable:'完成时间',sor:true},
					{prop:'attachment_url',lable:'操作',
						temps:[{cls:'bjysdicon iconfont',type:'text',value:'&#xe61a;',fnName:'downlod'}]							
					},
				],
				
				
			},
		}
    },
	mounted: function () {	
		this.setScreenConfig();
		this.getData();
	}, 
	methods: {
		enloding(){
			this.$refs.Tabledd.lodingfalse();		
		},
		getData(sxtj){
			if(sxtj){
				this.screens = sxtj;
				for(let el in sxtj){
					if(sxtj[el]=='all'){
						delete  this.screens[el];
					}
				}
			}
			let params = this.screens;												
			this.api.material_flows({params}).then((response)=>{		
				this.tableData = this.clData(response);		
				this.enloding();
			});
		},
		downlod(on){
			if(this.tableData[on].attachment_url){
				window.open(this.tableData[on].attachment_url);
			}else{
				this.$message('没有附件提供下载');
			}
			
		},
		clData(data){
			let arr  = [];
			this.tableConfig.total=data.total;
			let da = data.data;			
			for(let i=0,n=da.length;i<n;i++){
				arr.push(
					{
						work_id:da[i].work_id,
						preview_url:da[i].preview_url,
						material_type:this.checkNr(da[i].material_type),
						position:da[i].position,
						description:da[i].description,
						size:da[i].size,
						created_at:this.checkTime(da[i].created_at),
						status:da[i].status,	
						attachment_url:da[i].attachment_url
					},
				);
			};
			return arr;
		},
		setScreenConfig(){
			this.api.sysconfig_material().then((data)=>{	
				this.sxtjList = data;
				let p = data.platform_position,
				sz = data.material_size;
				let list1 = [{label:'全部',value:'all'},];
				for(let i=0,n=p.length;i<n;i++){
					list1.push({label:p[i],value:p[i]})
				}
				let list2 = [{label:'全部',value:'all'},];
				for(let i=0,n=sz.length;i<n;i++){
					list2.push({label:sz[i],value:sz[i]})
				}				
				
				this.screenConfig = [
					{title:'素材类型',type:'select',value:'type',list:[{label:'全部',value:'all'},{label:'静态图片',value:'m_picture'},{label:'动态图片',value:'m_script_picture'},
				{label:'全部',value:'all'},{label:'模板',value:'m_resource'},{label:'H5模板',value:'m_h5_resource'},
				{label:'全部',value:'all'},{label:'锁屏壁纸',value:'m_wallpaper'}]},
					{title:'投放位置',type:'select',value:'position',list:list1},
					{title:'素材尺寸',type:'select',value:'size',list:list2},
					{title:'需求状态',type:'select',value:'status',list:[
						{label:'全部',value:'all'},
						{label:'审核中',value:'审核中'},
						{label:'脚本待制作(已通过)',value:'脚本待制作(已通过)'},
						{label:'脚本待测试(已通过)',value:'脚本待测试(已通过)'},
						{label:'脚本测试通过(已通过)',value:'脚本测试通过(已通过)'},
						
						{label:'图片待处理(已通过)',value:'图片待处理(已通过)'},
						{label:'PSD待处理(已通过)',value:'PSD待处理(已通过)'},
						{label:'已通过',value:'已通过'},
					]},	
					{title:'入库时间',type:'times',value:'start_date'},		
					{title:'模糊搜索',type:'text',value:'search'},	
				];	
				
			}).catch((error)=>{})				
		},
		checkNr(value){		
			if(!value){return}
			let a = '';
			switch (value){
				case 'm_picture':a= '静态图片';
					break;
				case 'm_script_picture':a= '动态图片';
					break;
				case 'm_resource':a= '脚本模板';
					break;
				case 'm_h5_resource':a= 'H5模板';
					break;
				case 'm_wallpaper':a= '锁屏壁纸';
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
			return value ==2?'上线中':value ==3?'已下线':value==1?'不通过':'';				
		},
		
    },
	
}	
</script>
<style>
</style>