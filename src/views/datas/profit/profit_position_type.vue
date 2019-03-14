
<template>
	<scTable ref="Tablde" @screenFn="getData" :searchConfig="searchConfig"  :tableConfig="tableConfig" :ChartConfig="ChartConfig" :chartData="chartData" :tableData="tableData"></scTable>
</template>
<script>
import scTable from '../common/tables1';
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
				title:"广告位类型收益",
				tipData:[
					{h1:"广告流水",p:"所选日期内，汇总的广告流水收入"},
					{h1:"设计师成本",p:"所选日期内，汇总的设计师成本（广告图成本+广告模板成本+锁屏壁纸成本）"},
					{h1:"渠道成本",p:"所选日期内，汇总的渠道成本"},
					{h1:"收益",p:"收益=广告流水-设计师成本-渠道成本"},
					{h1:"毛利率",p:"毛利率=收益/广告流水*100%"},
					
				],
				list:[					
					{title:'日期',type:'times',value:'start_time'},		
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
					{prop:'create_time',lable:'日期',sor:true},
					{prop:'ad_space_type',lable:'广告位类型'},
					{prop:'ad_income',lable:'广告流水',sor:true},
					{prop:'ds_cost',lable:'设计师成本',sor:true,
						poclick:{cls:' ',type:'text',value:'查看',fnName:'seeXx1'},				
					},
					{prop:'channel_cost',lable:'渠道成本',sor:true},
					{prop:'total_income',lable:'收益',sor:true},					
					{prop:'gross_profit',lable:'毛利率'},
					{prop:'ad_space_id',lable:'广告位',
						temps:[{cls:'',type:'text',value:'查看详情',fnName:'seeXx2'}]
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
					title: {text:'每日数据趋势图',textStyle: {fontSize:14}},
					tooltip: {trigger: 'axis'},
					legend: {y:'bottom',data:['广告流水','收益','设计师成本','渠道成本']},
					calculable : true,
					xAxis:[{type:'category',boundaryGap : false,data:[]}],
					yAxis:[{type:'value',axisLabel : {formatter: '{value}'}}],
					series:[],
						
				},
				
				config2:{
					title: {text: '广告位类型收益占比',textStyle: {fontSize:14}},
					tooltip: {title:"广告位类型收益占比",trigger: 'item',formatter: "{a} <br/>{b}: {c} ({d}%)"}, 
					series: [
						{
							name:'收益占比',
							type:'pie',
							radius: ['50%', '70%'],
							avoidLabelOverlap: false,
							label: {
								normal: {show: false,position: 'center'},
								emphasis: {show: true,textStyle: {fontSize: '30',fontWeight: 'bold'}}
							},
							labelLine: {normal: {show: false}},
							data:[
								
							]
						}
					]
				}
			},
			tableData:[],
			chartData:{
			},
			
		}
	},
	mounted: function () {	
		this.getData();
	}, 
	methods: {	
		setLoding(type){
			this.$refs.Tablde.setLoding(type);	
		},
		seeXx1(on){
			window.open('/#/data/cost_designer?times='+this.tableData[on].create_time)					
		},		
		seeXx2(on){
			window.open('/#/data/profit_position?times='+this.tableData[on].create_time)	
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
			params.type = 3;
			this.api.data_income_related({params}).then((datas)=>{	
				this.tableData = this.clDatax(datas);		
				this.setLoding(false);
			}).catch(()=>{
				this.setLoding(false);
			})	
			this.api.data_income_overall({params}).then((datas)=>{
				this.ChartConfig.numbcont = [
					{name:'广告流水',num:datas.data.ad,fp:datas.rate.ad},
				{name:'设计师成本',num:datas.data.ds_cost,fp:datas.rate.ds_cost},
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
			],arr3=[],da = data.data;
			this.tableConfig.total=data.total_count;
			for(let el in da){
				arr.push({
					create_time:da[el].create_time,
					ad_space_type:da[el].ad_income,
					ad_income:+da[el].ad_income,
					ds_cost:+da[el].ds_cost,
					channel_cost:+da[el].channel_cost,
					total_income:+da[el].total_income,
					channel:da[el].channel,
					admaster:da[el].admaster,
					gross_profit:da[el].gross_profit,
					ad_space_id:da[el].ad_space_id,
				});
			}	
			let pn=0;
			for(let el in data.daily_data){
				if(pn>30){
					break
				}				
				arr1.push(el);
				arr2[0].data.push(data.daily_data[el].ad_income);
				arr2[1].data.push(data.daily_data[el].income);
				arr2[2].data.push(data.daily_data[el].designer_cost);
				arr2[3].data.push(data.daily_data[el].channel_cost);
				pn++;
			}
			
			this.tableConfig.cont=[
				'汇总',
				data.total_data.ad_income,
				data.total_data.ds_cost,
				data.total_data.channel_cost,
				data.total_data.total_income,					
				'--',
				'--'
			];
			for(let el in data.ad_space_type_income){
				arr3.push({value:data.ad_space_type_income[el], name:el});
			}
			this.ChartConfig.config.xAxis = [{
				type : 'category',
				boundaryGap : false,
				data:arr1
			}];
			this.ChartConfig.config.series =arr2;
			this.ChartConfig.config2.series[0].data = arr3;	
			let bztno = false;
			if(this.screens.channel || this.screens.product || this.screens.ad_space_type || this.screens.admaster){
				bztno = true;
			}
	
			this.setData({one:this.ChartConfig.config,two:this.ChartConfig.config2,bztno:bztno});
			return arr;
		},
		
		

	}
}
</script>

<style>
</style>
