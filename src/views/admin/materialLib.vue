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
			tableData:[],	
			tableConfig:{
				total:0,
				ischeck:false,
				list:[],
			},			
			tabledd: [
				[{prop:'id',lable:'广告图库ID'},
					{prop:'material_type',lable:'素材类型'},
					{prop:'position',lable:'广告位类型'},
					{prop:'size',lable:'素材尺寸'},
					{prop:'desc',lable:'投放内容描述'},
					{prop:'link',lable:'投放链接'},
					{prop:'materials_valid_count',lable:'广告图数量'},					
					{prop:'status',lable:'状态'},
					{prop:'attachment.url',lable:'操作',
						temps:[{type:'primary',size:'mini',value:'管理广告图',fnName:'openmate',round:'round'},]							
					},],
				[{prop:'id',lable:'模板库ID'},
					{prop:'material_type',lable:'素材类型'},
					{prop:'position',lable:'广告位类型'},
					{prop:'size',lable:'素材尺寸'},
					{prop:'ad_type',lable:'广告类型'},
					{prop:'channel_type',lable:'渠道类型'},
					{prop:'materials_valid_count',lable:'模板数量'},
					{prop:'status',lable:'状态'},
					{prop:'attachment.url',lable:'操作',
						temps:[{type:'primary',size:'mini',value:'管理广告图',fnName:'openmate',round:'round'},]							
					},],
			],
			screenConfig:[],	
			sxLn:{
				library_picture:[
					{label:'全部',value:'m_picture,m_script_picture'},
					{label:'广告静态图',value:'m_picture'},
					{label:'广告脚本图',value:'m_script_picture'},
				],
				library_resource:[
					{label:'全部',value:'m_resource,m_h5_resource'},
					{label:'广告脚本模板',value:'m_resource'},
					{label:'广告H5模板',value:'m_h5_resource'},
				],
			},
			sxcs:{
				p:10,
				page:1,		
			},
			screens:{
				p:10,
				page:1,	
			}

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
		setScreenConfig(){
			this.screenConfig={};
			this.$refs.Tabledd.initpage();		
			if(this.$route.fullPath=='/admin/library_picture'){				
				this.tableConfig.list =  this.tabledd[0];
				this.screens.types = 'm_picture,m_script_picture';
			}
			if(this.$route.fullPath=='/admin/library_resource'){
				this.tableConfig.list =  this.tabledd[1];
				this.screens.types = 'm_resource,m_h5_resource';
			}
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
					{title:'素材类型',type:'select',value:'types',list:this.sxLn[this.$route.fullPath.split('/')[2]]},
					{title:'广告位类型',type:'select',value:'position',list:list1},
					{title:'素材尺寸',type:'select',value:'size',list:list2},
					{title:'状态',type:'select',value:'status',list:[
						{label:'全部',value:''},
						{label:'已使用',value:'已使用'},
						{label:'未使用',value:'未使用'},
					]},
					{title:'模糊搜索',type:'text',value:'search'},	
					
				];
				
			})	
		},
		openmate(cs){		
			this.$router.push({
				name:this.$route.fullPath.split('/')[2]+'s',
				query:{lib_id:this.tableData[cs].id}
			});			
		},
		getData(sxtj){	
			if(sxtj){	
				if(!sxtj.types){
					if(this.$route.fullPath=='/admin/library_picture'){
						sxtj.types = 'm_picture,m_script_picture';						
					}
					if(this.$route.fullPath=='/admin/library_resource'){
					
						sxtj.types = 'm_resource,m_h5_resource';
					}
				}
				Object.assign(this.screens, sxtj);				
			}	
			let params = this.screens;
			this.api.materialLib_lists({params}).then((data)=>{	
				this.tableData =this.clData(data);	
				this.enloding();
			})

		},
		clData(data){
			let arr  = [];
			this.tableConfig.total=data.total;
			let da = data.data;
			for(let i=0,n=da.length;i<n;i++){
				arr.push(
					{
						id:da[i].id,
						material_type:this.checkNr(da[i].material_type),						
						position:da[i].position,
						desc:da[i].desc,
						size:da[i].size,
						materials_valid_count:da[i].materials_valid_count,
						link:da[i].link,
						status:da[i].status,
						ad_type:da[i].ad_type || '',
						channel_type:da[i].channel_type || ''
					},					
				);
			}
			return arr;

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
				}
			return a;
		},	
		
	},
	watch: {   
		$route: {
			handler: function () {
				this.setScreenConfig();
				this.getData();
			},
			deep: true
		}
	},
}	
	
</script>

<style>

</style>