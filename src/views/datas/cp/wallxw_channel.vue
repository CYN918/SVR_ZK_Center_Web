
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
				title:"壁纸渠道数据",
				tipData:[
					{h1:"日活PV",p:"所选日期内，渠道活跃用户PV"},
					{h1:"日活UV",p:"所选日期内，渠道活跃用户UV"},
					{h1:"新增用户",p:"所选日期内，首次使用的新增设备（IMEI号）用户数"},
					{h1:"累计用户",p:"截止所选日期当天的累计用户"},
					{h1:"周活跃用户",p:"所选日期当天往前一周的去重累计活跃数据"},
					{h1:"月活跃用户",p:"所选日期当天往前一月的去重累计活跃数据"},
					{h1:"新增用户次日留存",p:"所选日期新增用户在之后第2日仍活跃的用户数据。"},
					{h1:"平均单次使用时长",p:"所选日期内，平均每个活跃用户每次在单张壁纸中的停留时长"},
					{h1:"平均日使用时长",p:"所选日期内，平均每个活跃用户每天在壁纸中总停留时长"},
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
					{prop:'create_time',lable:'日期',sor:true},
					{prop:'channel',lable:'渠道'},
					{prop:'pv',lable:'日活PV',sor:true},					
					{prop:'uv',lable:'日活UV',sor:true},
					{prop:'pv_uv',lable:'PV/UV',sor:true},
					{prop:'new',lable:'新增用户',sor:true},
					{prop:'acc',lable:'累计用户',sor:true},
					{prop:'week',lable:'周活跃用户',sor:true},
					{prop:'month',lable:'月活跃用户',sor:true},
					{prop:'login',lable:'新增用户次日留存'},
					{prop:'login',lable:'平均单次使用时长'},
					{prop:'login',lable:'平均日使用时长'},				
				],
				btns:[
					{fnName:'xzFn',cls:'pldc ',value:'导出数据'},
				],
			},
			ChartConfig:{
				onched:'日活PV',
				title:'指标详解',
				topldNav:['日活PV','月活UV','PV/UV','新增用户','累积用户','周活跃用户','月活跃用户','新增用户次日留存','平均单次使用时长','平均日使用时长'],
				config:{
					tooltip: {trigger: 'axis'},
					legend: {
						y:'bottom',
						data:['A1007','D1009','A1009']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '10%'
					},
					calculable : true,
					xAxis : [
						{
							type : 'category',
							boundaryGap : false,
							data : ['2018-12-21','2018-12-21','2018-12-21','2018-12-21','2018-12-21','2018-12-21','2018-12-21']
						}
					],
					yAxis : [
						{type : 'value',axisLabel : {formatter: '{value} k'}}
					],
					series : [
						{name:'A1007',type:'line',color: 'rgba(105,192,255,1)',data:[11, 11, 15, 13, 12, 30, 40]},
						{name:'D1009',type:'line',color: 'rgba(230,0,18,1)',data:[1, 30, 2, 5, 3, 2, 0]},
						{name:'A1009',type:'line',color: 'rgba(24,237,79,1)',data:[1, 0, 2, 5, 3, 2, 0]}
					]
					
				},
			},
			tableData:[],
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
		getData(sxtj){
			if(sxtj){
				Object.assign(this.screens, sxtj);	
				if(sxtj.start_time){
					this.screens.end_time = this.screens.start_time[1];
					this.screens.start_time = this.screens.start_time[0];
				}																
			}	
			let params = this.screens;	
			this.api.data_polling_product_channel({params}).then((datas)=>{									
				this.tableData = this.clData(datas);		
				this.lodingfalse();
			}).catch(()=>{
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
						pv:+da[i].pv,
						uv:+da[i].uv,
						pv_uv:+da[i].pv_uv,
						new:+da[i].new,
						acc:+da[i].acc,
						week:+da[i].week,
						month:+da[i].month,
					},
				);
			}
			return arr;
		},
		
		

	}
}
</script>

<style>
</style>
