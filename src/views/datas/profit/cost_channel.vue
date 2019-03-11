
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
					{h1:"展示量",p:"所选日期内，以素材为维度汇总的素材展示次数PV"},
					{h1:"展示用户数",p:"所选日期内，以素材为维度汇总的素材展示用户数UV"},
					{h1:"有效停留",p:"用户每次使用壁纸时停留时长在0s-1h以内属于有效停留"},
					{h1:"有效停留量",p:"所选日期内，以素材为维度汇总的素材有效停留次数PV"},
					{h1:"有效停留用户数",p:"所选日期内，以素材为维度汇总的素材有效停留用户数UV"},
					{h1:"广告展示量",p:"所选日期内，以素材为维度汇总的素材上的广告展示次数PV"},
					{h1:"壁纸点击量",p:"所选日期内，以素材为维度汇总的素材上的全局点击次数PV"},
					{h1:"壁纸点击用户数",p:"所选日期内，以素材为维度汇总的素材上的全局点击用户数UV"},
					{h1:"广告点击量",p:"所选日期内，以素材为维度汇总的素材上的广告点击次数PV"},
					{h1:"广告点击用户数",p:"所选日期内，以素材为维度汇总的素材上的广告点击用户数UV"},
				],
				list:[					
					{title:'日期',type:'times',value:'start_time'},
					{title:'渠道',type:'get_channel',value:'channel'},
				],
			},
			tableConfig:{
				total:0,
				ischeck:false,
				list:[
					{prop:'create_time',lable:'日期'},				
					{prop:'channel',lable:'渠道'},
					{prop:'cost',lable:'渠道成本'},
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
						cost:da[i].cost,
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
