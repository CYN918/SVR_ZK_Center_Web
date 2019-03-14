<template>
	<scTable ref="Tablde" :searc="searchConfig" :tabled="tableConfig"></scTable>
</template>
<script>
import scTable from './p_com';
export default {
	components:{scTable},
    data() {
		return{
			searchConfig:{
				title:"产品数据",				
				list:[					
					{title:'日期',type:'times',value:'start_time'},
					{title:'渠道',type:'get_channel',value:'channel'},
					{title:'产品',type:'get_product',value:'product'},		
				],
				api:'data_ad_ad_space',
				url:'/#/data/ad_position_adType?',
				pr:[{k:'product',v:'product'},{k:'times',v:'create_time'}],
				data_type:'product',
				getUc:'channel',				
			},
			tableConfig:[
				{prop:'create_time',lable:'日期',sor:true},
				{prop:'product',lable:'产品'},
				{prop:'channel',lable:'渠道'},
				{prop:'pv',lable:'展示量',sor:true},					
				{prop:'click',lable:'点击量',sor:true},
				{prop:'click_ratio',lable:'点击率'},
				{prop:'download',lable:'下载量',sor:true},
				{prop:'install',lable:'安装量',sor:true},
				{prop:'activ',lable:'激活量',sor:true},
				{prop:'income',lable:'流水',sor:true},
				{prop:'ecpm',lable:'ECPM',sor:true},
				{prop:'ecpc',lable:'ECPC',sor:true},
				{prop:'description',lable:'广告位类型',
					temps:[
						{cls:'hsetext',type:'text',value:'查看详情',fnName:'seeXx2'},								
					]	
				},
			],
			
		}
	},
	methods: {
		backData(da){
			return {
				create_time:da.create_time,
				product:da.product,						
				channel:da.channel,
				pv:+da.pv,
				click:+da.click,
				click_ratio:da.click_ratio,
				download:+da.download,
				install:+da.install,
				activ:+da.activ,
				income:+da.income,
				ecpm:+da.ecpm,
				ecpc:+da.ecpc,
			};
		},
		backTj(data){
			return [
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
		}
	}
}
</script>

<style>

</style>