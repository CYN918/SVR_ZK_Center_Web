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
				title:"广告详细数据",				
				list:[					
					{title:'日期',type:'times',value:'start_time'},
					{title:'渠道',type:'get_channel',value:'channel'},
					{title:'产品',type:'get_product',value:'product'},
					{title:'广告位类型',type:'get_ad_space_type',value:'ad_space_type'},
					{title:'广告位ID',type:'get_ad_space_id',value:'ad_space_id'},
					{title:'广告ID',type:'text',value:'ad_id'},
					{title:'广告名称',type:'text',value:'ad_name'},					
					{title:'合作类型',type:'get_work_type',value:'work_type'},
					{title:'广告主',type:'get_ad_master',value:'admaster'},	
				],
				api:'data_ad_detail',
				url:'',
				pr:[{k:'times',v:'create_time'}],
				getUc:'ad_id',				
			},
			tableConfig:[
				{prop:'create_time',lable:'日期',sor:true},						
				{prop:'ad_id',lable:'广告ID'},	
				{prop:'ad_name',lable:'广告名称'},
				{prop:'channel',lable:'渠道'},
				{prop:'product',lable:'产品'},
				{prop:'ad_space_type',lable:'广告位类型'},
				{prop:'ad_space_id',lable:'广告位ID'},
				{prop:'work_type_name',lable:'合作类型'},
				{prop:'admaster',lable:'广告主'},
				{prop:'pv',lable:'展示量',sor:true},					
				{prop:'click',lable:'点击量',sor:true},
				{prop:'click_ratio',lable:'点击率'},
				{prop:'download',lable:'下载量',sor:true},
				{prop:'install',lable:'安装量',sor:true},
				{prop:'activ',lable:'激活量',sor:true},
				{prop:'income',lable:'流水',sor:true},
				{prop:'ecpm',lable:'ECPM',sor:true},
				{prop:'ecpc',lable:'ECPC',sor:true},					
			],
			
		}
	},
	methods: {
		backData(da){
			return {
				create_time:da.create_time,
				ad_id:da.ad_id,
				ad_name:da.ad_name,
				channel:da.channel,
				product:da.product,
				ad_space_type:da.ad_space_type,
				ad_space_id:da.ad_space_id,						
				work_type_name:da.work_type_name,
				admaster:da.admaster,
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
				'--',
				'--',
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