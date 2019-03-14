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
				title:"锁屏壁纸数据",				
				list:[					
					{title:'日期',type:'times',value:'start_time'},
					{title:'素材ID',type:'text',value:'bizi_id'},					
				],
				api:'data_ad_material_wallpaper',
				url:'/#/data/ad_material_ws?',
				pr:[{k:'bizi_id',v:'bizi_id'},{k:'times',v:'create_time'}],
				
			},
			tableConfig:[
				{prop:'bizi_id',lable:'素材ID',wzimg:{cls:'',type:'text'}},
				{prop:'description',lable:'广告位详情',temps:[{cls:'hsetext',type:'text',value:'查看详情',fnName:'seeXx2'}]}				
			]
		}
	},
}
</script>
<style>
</style>