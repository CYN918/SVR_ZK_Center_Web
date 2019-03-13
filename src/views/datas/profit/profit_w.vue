
<template>
	<scTable ref="Tablde" @screenFn="getData" :searchConfig="searchConfig" :tableConfig="tableConfig" :ChartConfig="ChartConfig" :chartData="chartData" :tableData="tableData"></scTable>
</template>
<script>
import scTable from '../common/tables2';
export default {
	components:{scTable},
    data() {
		return{
			tableData:[],
			chartData:{},
			screens:{
				p:10,
				page:1,	
				total:0,
			},
			searchConfig:{
				title:"收益周报",
				tipData:[
					{h1:"广告流水",p:"所选日期内，汇总的广告流水收入"},
					{h1:"设计师成本",p:"所选日期内，汇总的设计师成本（广告图成本+广告模板成本+锁屏壁纸成本）"},
					{h1:"渠道成本",p:"所选日期内，汇总的渠道成本"},
					{h1:"收益",p:"收益=广告流水-设计师成本-渠道成本"},
					{h1:"毛利率",p:"毛利率=收益/广告流水*100%"},
					
				],
				list:[					
					{title:'周期',type:'times',value:'start_time'},		
					{title:'渠道',type:'get_channel',value:'channel'},
					{title:'产品',type:'get_product',value:'product'},
					{title:'广告位类型',type:'get_ad_space_type',value:'ad_space_type'},
					{title:'广告主',type:'get_ad_master',value:'admaster'},
				],
			},
			tableConfig:{
				total:0,
				ischeck:false,
				'show-summary':true,
				list:[
					{prop:'create_time',lable:'周期',sor:true},
					{prop:'ad_income',lable:'广告流水',sor:true},
					{prop:'designer_cost',lable:'设计师成本',sor:true,
						poclick:{cls:' ',type:'text',value:'查看',fnName:'seeXx3'},		
					},					
					{prop:'channel_cost',lable:'渠道成本',sor:true,
						poclick:{cls:' ',type:'text',value:'查看',fnName:'seeXx4'},		
					},
					{prop:'income',lable:'收益',sor:true},
					{prop:'gross_profit',lable:'毛利率'},
					{prop:'channel',lable:'渠道',
						temps:[
							{cls:'hsetext',type:'text',value:'查看详情',fnName:'seeXx1'},								
						]	
					},
					{prop:'admaster',lable:'广告主',
						temps:[
							{cls:'hsetext',type:'text',value:'查看详情',fnName:'seeXx2'},								
						]	
					},				
				],
				btns:[
					{fnName:'xzFn',cls:'pldc ',value:'导出数据'},
				],
				cont:[],
			},
			ChartConfig:{
				numbcont:[
					{name:'广告流水',num:'0',fp:'0%'},
					{name:'设计师成本',num:'0',fp:'0%'},
					{name:'渠道成本',num:'0',fp:'0%'},
					{name:'收益',num:'0',fp:'0%'},
				],
				config:{
					title: {text: '渠道维度'},
					tooltip : {trigger: 'axis',axisPointer : {type :'shadow' }},
					legend: { y:'bottom',data:['收益','渠道成本','设计师成本']},
					grid: {left: '3%',right: '4%',bottom: '8%',containLabel: true},
					xAxis : [ {type : 'category',data : []}],
					yAxis : [{type : 'value'}],
					series : [
						{name:'收益',type:'bar',color: 'rgba(255,206,85,1)',stack: '广告', data:[]},
						{name:'渠道成本',type:'bar',color: 'rgba(105,192,255,1)',stack: '广告',data:[]},
						{name:'设计师成本',type:'bar',color: 'rgba(230,0,18,1)',stack: '广告',data:[]},
					]					
				},
				
				config2:{ 
					title: {text: '产品维度'},
					tooltip : {trigger: 'axis',axisPointer:{type : 'shadow'}},
					legend: {y:'bottom',data:['收益','渠道成本','设计师成本']},
					grid: {left: '3%',right: '4%',bottom: '8%',containLabel: true},
					xAxis : [{type : 'category',data : []}],
					yAxis : [{type : 'value'}],
					series : [
						{name:'收益',type:'bar',color: 'rgba(255,206,85,1)',stack: '广告', data:[]},
						{name:'渠道成本',type:'bar',color: 'rgba(105,192,255,1)',stack: '广告',data:[]},
						{name:'设计师成本',type:'bar',color: 'rgba(230,0,18,1)',stack: '广告',data:[]},
					]	
				},
				
			
				config3:{
					title: {
						text: '广告位维度'
					},
					tooltip:{trigger:'axis',axisPointer :{type:'shadow'}},
					legend: {y:'bottom',data:['收益','渠道成本','设计师成本']},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '8%',
						containLabel: true
					},
					xAxis : [{type : 'category',data : []}],
					yAxis : [
						{type : 'value'}
					],
					series : [
						{name:'收益',type:'bar',color: 'rgba(255,206,85,1)',stack: '广告', data:[]},
						{name:'渠道成本',type:'bar',color: 'rgba(105,192,255,1)',stack: '广告',data:[]},
						{name:'设计师成本',type:'bar',color: 'rgba(230,0,18,1)',stack: '广告',data:[]},
					]},	
					
				},
		}
	},
	mounted: function () {	
		this.getData();
	}, 
	methods: {	
		seeXx1(on){
			window.open('/#/data/profit_channel?time='+this.tableData[on].create_time)
		},
		seeXx2(on){
			window.open('/#/data/profit_user?time='+this.tableData[on].create_time)
		},
		seeXx3(on){
			window.open('/#/data/cost_channel?time='+this.tableData[on].create_time)
		},
		seeXx4(on){
			window.open('/#/data/cost_designer?time='+this.tableData[on].create_time)
		},
		lodingfalse(){
			this.$refs.Tablde.lodingfalse();	
		},
		setData(data){
			this.$refs.Tablde.setData(data);	
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
			params.date_type = 'week';
			this.api.data_income_report({params}).then((datas)=>{	
				this.tableData = this.clDatax(datas);		
				this.lodingfalse();
			}).catch(()=>{
				this.lodingfalse();
			})	
			this.api.data_income_overall({params}).then((datas)=>{
				this.ChartConfig.numbcont = [
					{name:'广告流水',num:datas.data.ad,fp:datas.rate.ad},
					{name:'设计师成本',num:datas.data.designer_cost,fp:datas.rate.designer_cost},
					{name:'渠道成本',num:datas.data.channel_cost,fp:datas.rate.channel_cost},
					{name:'收益',num:datas.data.gross_profit,fp:datas.rate.gross_profit},
				];
			}).catch(()=>{})			
		},	
		
		clDatax(data){		
			let arr  = [],
			arr1=[],arr2=[
				{name:'广告流水',type:'line',color: 'rgba(230,0,18,1)',data:[]},
				{name:'收益',type:'line',color: 'rgba(105,192,255,1)', data:[]},
				{name:'设计师成本',type:'line',color: 'rgba(24,237,79,1)',data:[]},
				{ name:'渠道成本',type:'line',color: 'rgba(255,206,85,1)',data:[]}
			],da = data.data;
			this.tableConfig.total=data.total_count;
			for(let el in da){
				arr.push({
					create_time:el,
					ad_income:+da[el].ad_income,
					designer_cost:+da[el].designer_cost,
					channel_cost:+da[el].channel_cost,
					income:+da[el].income,
					gross_profit:da[el].gross_profit,
					channel:da[el].channel,
					admaster:da[el].admaster,
				});
				arr1.push(el.substring(5,10));
				arr2[0].data.push(da[el].ad_income);
				arr2[1].data.push(da[el].income);
				arr2[2].data.push(da[el].designer_cost);
				arr2[3].data.push(da[el].channel_cost);
			}	
			
			
			if(data.total_data.length>0){
				this.tableConfig.cont=[
					'汇总',
					data.total_data.ad_income,
					data.total_data.designer_cost,
					data.total_data.channel_cost,
					data.total_data.income,	
					data.total_data.gross_profit,					
					'--',
					'--'
				];
			}
			let setChar = (data,on)=>{
				let [arr_1,arr_2,arr_3,arr_4] = [[],[],[],[]];
				
				if(data){
					for(let el in data){
						arr_1.push(el);
						arr_2.push(this.chb(data[el].income));
						arr_3.push(this.chb(data[el].channel_cost));
						arr_4.push(this.chb(data[el].designer_cost));
					}
					this.ChartConfig[on].xAxis[0].data = arr_1;
					this.ChartConfig[on].series[0].data = arr_2;
					this.ChartConfig[on].series[1].data = arr_3;
					this.ChartConfig[on].series[2].data = arr_4;
				}
			};
	
			setChar(data.channel_data,'config');
//			setChar(data.product_data,'config2');
			setChar(data.ad_space_data,'config3');
			this.setData(this.ChartConfig);
			return arr;
		},
		chb(num){
			let x = String(num).indexOf('.') + 1,
			y = String(num).length - x;
			if(x>0 && y>2){
				num.toFixed(2);
			}
			return num;

		},

	}
}
</script>

<style>
</style>
