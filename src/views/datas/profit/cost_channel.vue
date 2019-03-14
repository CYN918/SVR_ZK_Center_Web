
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
				title:"渠道成本",
				tipData:[
					
				],
				list:[					
					{title:'日期',type:'times',value:'start_time'},
					{title:'渠道',type:'get_channel',value:'channel'},
				],
			},
			tableConfig:{
				total:0,
				ischeck:false,
				'show-summary':true,
				list:[
					{prop:'create_time',lable:'日期'},				
					{prop:'channel',lable:'渠道'},
					{prop:'cost',lable:'渠道成本',sor:true},
				],
				btns:[
					{fnName:'xzFn',cls:'pldc ',value:'导出数据'},
				],
				cont:[],
			},
			
			
			tableData:[],
			ChartConfig:{},
			chartData:{},
		}
	},
	mounted: function () {	
		this.getData();
	}, 
	methods: {	
		lodingfalse(){
			this.$refs.Tablde.lodingfalse();	
		},
		ajaxget(data,fn){
			console.log(fn);
			fn([{value:1}])
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
			this.api.data_cost_channel({params}).then((datas)=>{									
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
						channel:da[i].channel,
						cost:+da[i].cost,
					},
				);
			};
			this.tableConfig.cont = [
				'汇总',
				'--',
				data.total_data.cost,
			
			];
			
		
			return arr;
		},

	}
}
</script>

<style>
</style>
