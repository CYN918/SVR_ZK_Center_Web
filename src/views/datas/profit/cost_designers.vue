
<template>
	<scTable ref="Tablde" @screenFn="getData" :searchConfig="searchConfig" :tableConfig="tableConfig" :ChartConfig="ChartConfig" :chartData="chartData" :tableData="tableData"></scTable>
</template>
<script>
import scTable from '../common/tables';
export default {
	components:{scTable},
    data() {
		return{
			screens:{
				p:10,
				page:1,	
				total:0,
			},
			searchConfig:{
				title:"设计师成本详细数据",
				tipData:[
					{h1:"展示量",p:"素材展示次数PV"},
					{h1:"广告图/广告模板设计师成本",p:"广告图/广告模板设计师成本=素材对应汇总的展示量/1000*CPM"},
					{h1:"壁纸设计师成本",p:"壁纸设计师成本=对应素材的单价"},
					{h1:"入库日期",p:"素材入库日期"},
				],
				list:[					
					{title:'日期',type:'times',value:'start_time'},
					{title:'素材类型',type:'select',value:'material_type',list:[
						{label:'全部',value:''},
						{label:'广告静态图',value:'picture'},
						{label:'广告脚本图',value:'script_picture'},
						{label:'广告脚本模板',value:'resource'},
						{label:'广告H5模板',value:'h5_resource'},
						{label:'锁屏壁纸脚本图',value:'wallpaper'},
					]},
					
					{title:'素材ID',type:'text',value:'picture_id'},							
					{title:'渠道',type:'get_channel',value:'channel'},
					{title:'产品',type:'get_product',value:'product'},
					{title:'广告位类型',type:'get_ad_space_type',value:'ad_space_type'},
					{title:'广告位ID',type:'get_ad_space_id',value:'ad_space_id'},
					{title:'广告ID',type:'text',value:'ad_id'},	
					
				],
			},
			tableConfig:{
				total:0,
				ischeck:false,
				'show-summary':true,
				list:[
					{prop:'create_time',lable:'日期',sor:true},
					{prop:'material_id',lable:'素材ID',wzimg:{cls:'',type:'text'}},
					{prop:'material_type',lable:'素材类型'},
					{prop:'channel',lable:'渠道'},
					{prop:'product',lable:'产品'},
					{prop:'ad_space_type',lable:'广告位类型'},
					{prop:'ad_space_id',lable:'广告位ID'},
					{prop:'ad_id',lable:'广告ID'},	
					{prop:'pv',lable:'展示量',sor:true},										
					{prop:'cost',lable:'设计师成本',sor:true},
	
				],
				btns:[
					{fnName:'xzFn',cls:'pldc ',value:'导出数据'},
				],
				cont:[],
			},
			ChartConfig:{},
			tableData:[],
			chartData:[],
			
		}
	},
	mounted: function () {	
	
		this.getData();
	}, 
	methods: {
		setLoding(type){
			this.$refs.Tablde.setLoding(type);	
		},
		getData(sxtj){
			this.setLoding(true);
			if(sxtj){
				Object.assign(this.screens, sxtj);	
				if(sxtj.start_time){
					this.screens.end_time = this.screens.start_time[1];
					this.screens.start_time = this.screens.start_time[0];
				}																
			}
			let params = this.screens;
			if(this.$route.query.channel && !params.start_time){
				params.channel = this.$route.query.channel;
				if(sxtj){
					sxtj.channel = this.$route.query.channel;
				}
				
			}	
			if(this.$route.query.time && !params.start_time){
				this.screens.end_time = this.$route.query.time;
				this.screens.start_time = this.$route.query.time;
				if(sxtj){
					sxtj.start_time = [this.$route.query.time,this.$route.query.time];
				}				
			}	
			this.api.data_cost_designer_detail({params}).then((datas)=>{									
				this.tableData = this.clData(datas);
				this.$previewRefresh();
				this.setLoding(false);
			}).catch(()=>{
				this.setLoding(false);
			})			
		},			
		clData(data){
			let arr  = [];
			this.tableConfig.total=data.total_count;
			let da = data.data;						
			for(let i=0,n=da.length;i<n;i++){
				arr.push(
					{
						create_time:da[i].create_time,
						material_id:da[i].material_id,
						material_type:da[i].material_type,
						channel:da[i].channel,
						product:da[i].product,
						ad_space_type:da[i].ad_space_type,
						ad_space_id:da[i].ad_space_id,
						ad_id:da[i].ad_id,						
						pv:+da[i].pv,
						cost:+da[i].cost,
						img_url:da[i].img_url
					},
				);
			}
			this.tableConfig.cont = [
				'汇总',
				'--',
				'--',
				'--',
				'--',
				'--',
				'--',
				'--',
				data.total_data.pv,
				data.total_data.cost,
			];
			return arr;
		},

	}
}
</script>

<style>

</style>