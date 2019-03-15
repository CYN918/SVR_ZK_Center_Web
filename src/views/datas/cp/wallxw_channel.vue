
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
			channelArray:[],
			timesAarray:[],
			channelData:[],
			adData:[],
			wdData:[],
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
			onched:0,
			ChartConfig:{
				onched:0,
				title:'指标详解',
				topldNav:['日活PV','日活UV','PV/UV','新增用户','累积用户','周活跃用户','月活跃用户','新增用户次日留存','平均单次使用时长','平均日使用时长'],
				config:{
					tooltip: {trigger: 'axis'},
					legend: {
						y:'bottom',
						data:[]
					},					
					grid:{left: '8%',right: '8%',bottom: '10%'},
					calculable : true,
					xAxis:[{type:'category',boundaryGap:false,data:[]}],
					yAxis:[{type:'value',axisLabel : {formatter: '{value}'}}],
					series:[]
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
		setchad(on){
			this.onched=on;
			this.ChartConfig.config.legend.data = this.channelArray;
			this.ChartConfig.config.xAxis[0].data = this.timesAarray;
			for(let i=0,n=this.channelArray.length;i<n;i++){
				this.channelData[i].data=[];
				this.channelData[i].data = this.adData[this.channelArray[i]][on];
			}
			this.ChartConfig.config.series = this.channelData;
			this.setData(this.ChartConfig.config);
		},
		setLoding(type){
			this.$refs.Tablde.setLoding(type);	
		},
		setData(data){
			this.$refs.Tablde.setData(data);	
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
			this.api.data_polling_product_channel({params}).then((datas)=>{									
				this.tableData = this.clData(datas);		
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
						channel:da[i].channel,
						pv:+da[i].pv,
						uv:+da[i].uv,
						pv_uv:+da[i].pv_uv,
						new:+da[i].new,
						acc:+da[i].acc,
						week:+da[i].week,
						month:+da[i].month,
						login:"暂无"
					},
				);
			}
			for(let el in data.trend_data){
				this.channelArray.push(el);
				this.channelData.push({name:el,type:'line',data:[]});
				let arr1=[],arr2=[],arr3=[],arr4=[],arr5=[],arr6=[],arr7=[],arr8=[],
				arr9=[],arr10=[];
				for(let el2 in data.trend_data[el]){
					this.timesAarray.push(el2);	
					let d = data.trend_data[el][el2];
					arr1.push(d.pv);			
					arr2.push(d.uv);
					arr3.push(d.pv_uv);
					arr4.push(d.new);
					arr5.push(d.acc);
					arr6.push(d.week);
					arr7.push(d.month);
					arr8.push(0);
					arr9.push(0);
					arr10.push(0);				
				}
				this.adData[el] = [];
				this.adData[el].push(arr1);
				this.adData[el].push(arr2);
				this.adData[el].push(arr3);
				this.adData[el].push(arr4);
				this.adData[el].push(arr5);
				this.adData[el].push(arr6);
				this.adData[el].push(arr7);
				this.adData[el].push(arr8);
				this.adData[el].push(arr9);
				this.adData[el].push(arr10);
			}
			
			this.setchad(this.onched);
			return arr;
		},
		
		

	}
}
</script>

<style>
</style>
