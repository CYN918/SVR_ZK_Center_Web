
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
					{h1:"展示量",p:"所选日期内，素材展示次数PV"},
					{h1:"点击量",p:"所选日期内，素材点击次数PV"},
					{h1:"点击率",p:"点击量/展示量"},
					{h1:"下载量",p:"所选日期内，素材上对应的广告的成功下载次数"},
					{h1:"安装量",p:"所选日期内，素材上对应的广告的成功安装次数"},
					{h1:"激活量",p:"所选日期内，素材上对应的广告的激活次数"},
					{h1:"流水",p:"所选日期内，素材上对应的广告的流水收入"},
					{h1:"ECPM",p:"每一千次展示可获得的广告流水收入"},
					{h1:"ECPC",p:"单次点击可获得的广告流水收入"},
				],
				list:[					
					{title:'日期',type:'times',value:'start_time'},
					{title:'素材ID',type:'text',value:'picture_id'},
					{title:'广告ID',type:'text',value:'ad_id'},					
					{title:'渠道',type:'get_channel',value:'channel'},
					{title:'广告位类型',type:'get_ad_space_type',value:'ad_space_type'},
					{title:'广告位名称',type:'get_ad_space_name',value:'ad_space_name'},
					{title:'广告位ID',type:'get_ad_space_id',value:'ad_space_id'},
				],
			},
			tableConfig:{
				total:0,
				ischeck:false,
				'show-summary':true,
				list:[
					{prop:'create_time',lable:'日期'},
					{prop:'material_id',lable:'素材ID'},
					{prop:'material_type',lable:'素材类型'},
					{prop:'channel',lable:'渠道'},
					{prop:'product',lable:'产品'},
					{prop:'ad_space_type',lable:'广告位类型'},
					{prop:'ad_space_id',lable:'广告位ID'},
					{prop:'ad_id',lable:'广告ID'},	
					{prop:'pv',lable:'展示量'},										
					{prop:'cost',lable:'设计师成本'},
	
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

		seeXx1(on){
			if(this.tableData[on].img_url){
				window.open(this.tableData[on].img_url);
			}else{
				this.$message('该素材图片错误！');
			}
		},
		lodingfalse(){
			this.$refs.Tablde.lodingfalse();	
		},
		getData(sxtj){
			if(sxtj){
				Object.assign(this.screens, sxtj);	
				if(sxtj.start_time){
					this.screens.end_time = this.screens.start_time[1];
					this.screens.start_time = this.screens.start_time[0];
				}																
			}
			let params = this.screens;
				
			this.api.data_cost_designer_detail({params}).then((datas)=>{									
				this.tableData = this.clData(datas);		
				this.lodingfalse();
			}).catch((error)=>{
				this.lodingfalse();
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
						pv:da[i].pv,
						cost:da[i].cost,
						img_url:da[i].img_url
					},
				);
			};
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