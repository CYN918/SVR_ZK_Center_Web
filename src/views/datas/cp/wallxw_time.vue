
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
				title:"壁纸使用时长分布",
				tipData:[
					{h1:"壁纸使用时长分布",p:"有效停留用户数的壁纸使用时长分布"},
					{h1:"上线日期",p:"素材上线日期"},
				],
				list:[					
					{title:'日期',type:'timed',value:'date'},	
					{title:'素材ID',type:'text',value:'bz_id'},
					{title:'渠道',type:'get_channel',value:'channel'},
				],
			},
			tableConfig:{
				total:0,
				ischeck:false,
				'show-summary':true,
				list:[
					{prop:'bz_id',lable:'素材ID',wzimg:{cls:'',type:'text'}},
					{prop:'channel',lable:'渠道'},
					{prop:'time1',lable:'1s-3s',sor:true},
					{prop:'time2',lable:'4s-10s',sor:true},
					
					{prop:'time3',lable:'11s-30s',sor:true},
					{prop:'time4',lable:'31s-60s',sor:true},
					{prop:'time5',lable:'1m-3m',sor:true},
					{prop:'time6',lable:'4m-10m',sor:true},
					{prop:'time7',lable:'10m-30m',sor:true},
					{prop:'time8',lable:'30m+',sor:true},
					{prop:'time9',lable:'合计',sor:true},
				],
				btns:[
					{fnName:'xzFn',cls:'pldc ',value:'导出数据'},
				],
				cont:[],
			},
			ChartConfig:{
				onched:'日活PV',
				title:'指标详解',
				config:{
					title: {
						x:'center',
						text: '壁纸使用时长分布',
						textStyle:{fontSize:14}
					},
					color: ['#3398DB'],
					legend: {
						y:"bottom",
						data:['汇总']
					},
					tooltip : {
						trigger: 'axis',
						axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					grid: {left: '3%', right: '4%',bottom: '8%',containLabel: true},
					xAxis : [
						{
							type : 'category',
							data : ['1s-3s', '4s-10s', '11s-30s', '31s-60s', '1m-3m', '4m-10m', '10m-30m','30m+'],

							axisTick: {
								alignWithLabel: true
							}
						}
					],
					yAxis : [
						{
							type : 'value'
						}
					],
					series : [
						{
							name:'直接访问',
							type:'bar',
							barWidth: '40%',
							data:[0, 0,0 ,0, 0, 0, 0,0]
						}
					],
				},
			},
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
		setData(data){
			this.$refs.Tablde.setData(data);	
		},
		seeXx1(on){
			if(this.tableData[on].img_url){
				window.open(this.tableData[on].img_url);
			}else{
				this.$message('该素材图片错误！');
			}
		},
		getData(sxtj){
			this.setLoding(true);
			if(sxtj){
				Object.assign(this.screens, sxtj);																		
			}	
			let params = this.screens;	
			
			
			this.api.data_gionee_lock_behavior_channel_time({params}).then((datas)=>{									
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
						bz_id:da[i].bz_id,
						channel:da[i].channel,
						time1:+da[i].data[0].value,
						time2:+da[i].data[1].value,
						time3:+da[i].data[2].value,
						time4:+da[i].data[3].value,
						time5:+da[i].data[4].value,
						time6:+da[i].data[5].value,
						time7:+da[i].data[6].value,
						time8:+da[i].data[7].value,
						time9:+da[i].data[8].value,
						img_url:da[i].img_url
					},
				);
			}
			if(data.total_data.length>0){
				this.tableConfig.cont = [
					'汇总',
					'--',
					data.total_data[0].value,
					data.total_data[1].value,
					data.total_data[2].value,
					data.total_data[3].value,
					data.total_data[4].value,
					data.total_data[5].value,
					data.total_data[6].value,
					data.total_data[7].value,
					data.total_data[8].value,
				];
				this.ChartConfig.config.series ={
							name:'汇总',
							type:'bar',
							barWidth: '40%',
							data:[
					data.total_data[0].value,
					data.total_data[1].value,
					data.total_data[2].value,
					data.total_data[3].value,
					data.total_data[4].value,
					data.total_data[5].value,
					data.total_data[6].value,
					data.total_data[7].value,
					]
						};
			}
			
		
			
			this.setData(this.ChartConfig.config)	
			return arr;
		},
		
	}
}
</script>

<style>
</style>
