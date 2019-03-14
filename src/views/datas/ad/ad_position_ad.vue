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
				title:"广告数据",				
				list:[					
					{title:'日期',type:'times',value:'start_time'},
					{title:'广告ID',type:'text',value:'ad_id'},
					{title:'广告名称',type:'text',value:'ad_name'},
					{title:'广告主',type:'get_ad_master',value:'admaster'},
					{title:'合作类型',type:'get_work_type',value:'work_type'},	
				],
				api:'data_ad',
				url:'/#/data/ad_position_ads?',
				pr:[{k:'ad_id',v:'ad_id'},{k:'times',v:'create_time'}],
				data_type:'',
			},
			tableConfig:[
				{prop:'create_time',lable:'日期'},
				{prop:'ad_id',lable:'广告ID'},
				{prop:'ad_name',lable:'广告名称'},
				{prop:'work_type_name',lable:'合作类型'},
				{prop:'admaster',lable:'广告主'},
				{prop:'pv',lable:'展示量'},					
				{prop:'click',lable:'点击量'},
				{prop:'click_ratio',lable:'点击率'},
				{prop:'download',lable:'下载量'},
				{prop:'install',lable:'安装量'},
				{prop:'activ',lable:'激活量'},
				{prop:'income',lable:'流水'},
				{prop:'ecpm',lable:'ECPM'},
				{prop:'ecpc',lable:'ECPC'},
				{prop:'description',lable:'广告详情',
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
				ad_id:da.ad_id,
				ad_name:da.ad_name,
				work_type_name:da.work_type_name,
				admaster:da.admaster,						
				pv:da.pv,
				click:da.click,
				click_ratio:da.click_ratio,
				download:da.download,
				install:da.install,
				activ:da.activ,
				income:da.income,
				ecpm:da.ecpm,
				ecpc:da.ecpc,
			};
		},
		backTj(data){
			return [
				'汇总',
				'--',
				'--',
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