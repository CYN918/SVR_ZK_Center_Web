<template>
	<scTable ref="Tablde" :searc="searchConfig" :tabled="tableConfig"></scTable>
</template>
<script>
import scTable from './m_com';
export default {
	components:{scTable},
    data() {
		return{
			searchConfig:{
				title:"广告模板数据",				
				list:[					
					{title:'日期',type:'times',value:'start_time'},
					{title:'素材ID',type:'text',value:'template_id'},					
				],
				api:'data_ad_material_template',
				url:'/#/data/ad_material_ms?',
				pr:[{k:'template_id',v:'template_id'},{k:'times',v:'create_time'}],
				
			},
			tableConfig:[
				{prop:'template_id',lable:'素材ID',wzimg:{cls:'',type:'text'}},
				{prop:'description',lable:'广告位详情',temps:[{cls:'hsetext',type:'text',value:'查看详情',fnName:'seeXx2'}]}				
			]
		}
	},
}
</script>

<style>

</style>