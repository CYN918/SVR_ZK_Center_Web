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
				title:"广告图数据",				
				list:[					
					{title:'日期',type:'times',value:'start_time'},
					{title:'素材ID',type:'text',value:'picture_id'},					
				],
				api:'data_ad_material_picture',
				url:'/#/data/ad_material_ps?picture_id='
			},
			tableConfig:{prop:'description',lable:'广告详情',
				temps:[
					{cls:'hsetext',type:'text',value:'查看详情',fnName:'seeXx2'},								
				]	
			},	
			
		}
	},
}
</script>

<style>

</style>