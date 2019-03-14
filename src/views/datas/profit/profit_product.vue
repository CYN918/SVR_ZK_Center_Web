
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
				title:"产品收益",
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
					{prop:'create_time',lable:'日期'},
					{prop:'product',lable:'产品'},
					{prop:'ad_income',lable:'广告流水'},
					{prop:'designer_cost',lable:'设计师成本',
						poclick:{cls:' ',type:'text',value:'查看',fnName:'seeXx1'},				
					},
					{prop:'channel_cost',lable:'渠道成本'},
					{prop:'income',lable:'收益'},					
					{prop:'gross_profit',lable:'毛利率'},
					{prop:'ad_space_type',lable:'广告位类型',
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
					legend:{y:'bottom',data:['广告流水','收益','设计师成本','渠道成本']},
					calculable:true,
					xAxis:[{type:'category',boundaryGap:false,data:[]}],
					yAxis:[{type:'value',axisLabel:{formatter:'{value}'}}],
					series:[],						
				},				
				config2:{
					title: {text: '产品收益占比',textStyle: {fontSize:14}},
					tooltip: {title:"产品收益占比",trigger: 'item',formatter: "{a} <br/>{b}: {c} ({d}%)"}, 
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
			params.type = 2;
			this.api.data_income_related({params}).then((datas)=>{	
				this.tableData = this.clDatax(datas);		
				this.setLoding(false);
			}).catch(()=>{
				this.setLoding(false);
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
			],arr3=[],da = data.data;
			this.tableConfig.total=data.total_count;
			for(let el in da){
				console.log(el);
				arr.push({
					create_time:el,
					ad_income:+da[el].ad_income,
					designer_cost:+da[el].designer_cost,
					channel_cost:+da[el].channel_cost,
					income:+da[el].income,
					channel:da[el].channel,
					admaster:da[el].admaster,
					gross_profit:da[el].gross_profit,
					product:da[el].product,
				});
				arr1.push(el.substring(5,10));
				arr2[0].data.push(da[el].ad_income);
				arr2[1].data.push(da[el].income);
				arr2[2].data.push(da[el].designer_cost);
				arr2[3].data.push(da[el].channel_cost);
			}	
			this.tableConfig.cont=[
				'汇总',
				'--',
				data.total_data.ad_income,
				data.total_data.designer_cost,
				data.total_data.channel_cost,
				data.total_data.income,					
				data.total_data.gross_profit,	
				'--'
			];
			for(let el in data.channelIncome){
				arr3.push({value:data.channelIncome[el], name:el});
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
