


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
				title:"广告收益",
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
					{title:'广告ID',type:'text',value:'ad_id'},
					{title:'广告名称',type:'text',value:'ad_name'},
				],
			},
			tableConfig:{
				total:0,
				ischeck:false,
				'show-summary':true,
				list:[
					{prop:'create_time',lable:'日期',sor:true},
					{prop:'ad_id',lable:'广告ID'},
					{prop:'ad_name',lable:'广告名称'},
					{prop:'admaster',lable:'广告主'},
					{prop:'ad_income',lable:'广告流水',sor:true},
					{prop:'ds_cost',lable:'设计师成本',sor:true},
					{prop:'channel_cost',lable:'渠道成本',sor:true},
					{prop:'total_income',lable:'收益',sor:true},					
					{prop:'gross_profit',lable:'毛利率'},
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
			params.type = 6;
			this.api.data_income_related({params}).then((datas)=>{	
				this.tableData = this.clDatax(datas);		
				this.setLoding(false);
			}).catch(()=>{
				this.setLoding(false);
			})				
		},	

		clDatax(data){		
			let arr=[],da = data.data;
			this.tableConfig.total=data.total_count;
			for(let el in da){
				arr.push({
					create_time:el,
					ad_id:da[el].ad_id,
					ad_name:da[el].ad_name,
					admaster:da[el].admaster,
					ad_income:+da[el].ad_income,
					ds_cost:+da[el].ds_cost,
					channel_cost:+da[el].channel_cost,
					total_income:+da[el].total_income,
					gross_profit:da[el].gross_profit,
				});
				
			}	
			
			this.tableConfig.cont=[
				'汇总',
				'--',
				'--',
				'--',
				data.total_data.ad_income,
				data.total_data.ds_cost,
				data.total_data.channel_cost,
				data.total_data.total_income,
				data.total_data.gross_profit,				
				'--',
			];
			
			return arr;
		},
		

	}
}
</script>

<style>

</style>