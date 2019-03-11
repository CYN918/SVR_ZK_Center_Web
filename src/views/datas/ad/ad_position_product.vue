


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
				title:"产品数据",
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
					{title:'渠道',type:'get_channel',value:'channel'},
					{title:'产品',type:'get_product',value:'product'},
				],
			},
			tableConfig:{
				total:0,
				ischeck:false,
				'show-summary':true,
				list:[
					{prop:'create_time',lable:'日期'},
					{prop:'product',lable:'产品'},
					{prop:'channel',lable:'渠道'},
					{prop:'pv',lable:'展示量'},					
					{prop:'click',lable:'点击量'},
					{prop:'click_ratio',lable:'点击率'},
					{prop:'download',lable:'下载量'},
					{prop:'install',lable:'安装量'},
					{prop:'activ',lable:'激活量'},
					{prop:'income',lable:'流水'},
					{prop:'ecpm',lable:'ECPM'},
					{prop:'ecpc',lable:'ECPC'},
					{prop:'description',lable:'广告位类型',
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
			ChartConfig:{},
			tableData:[],
			chartData:[],
			
		}
	},
	mounted: function () {	

		this.getData();
	}, 
	methods: {
		seeXx2(on){
			window.open('/#/data/ad_position_adType?product='+this.tableData[on].product)
		},
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
			if(this.$route.query.channel){
				params.channel = this.$route.query.channel;
			}
			params.data_type='product';
			this.api.data_ad_ad_space({params}).then((datas)=>{									
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
						product:da[i].product,						
						channel:da[i].channel,
						pv:da[i].pv,
						click:da[i].click,
						click_ratio:da[i].click_ratio,
						download:da[i].download,
						install:da[i].install,
						activ:da[i].activ,
						income:da[i].income,
						ecpm:da[i].ecpm,
						ecpc:da[i].ecpc,
					},
				);
			};
			this.tableConfig.cont = [
				'汇总',
				'--',
				'--',
				data.total_data.pv,
				data.total_data.click,
				data.total_data.click_ratio,
				data.total_data.download,
				data.total_data.install,
				data.total_data.activ,
				data.total_data.income,
				data.total_data.ecpm,
				data.total_data.ecpc,
				'--'
			];
			

			return arr;
		},

	}
}
</script>

<style>

</style>