<template>
	<comd :tableConfig="tableConfig" :getType="getType" :activeOn="activeOn" :screensd="screensd" :tjType="tjType" :tjset="tjset"></comd>
</template>
<script>
import comd from './m_com.vue';
export default {
	components:{comd},
	data(){
		return{
			activeOn:"2",
			tjType:'resource',
			tjset:[
				{name:'待审核数（个）',num:0},
				{name:'入库数（个）',num:0},
				{name:'使用中（个）',num:0},
				{name:'使用过（个）',num:0},
			],
			getType:['m_resource','m_h5_resource'],
			screensd:[{label:'全部',value:''},{label:'广告脚本模板',value:'m_resource'},{label:'广告H5模板',value:'m_h5_resource'}],
			tableConfig:{
				total:0,
				ischeck:true,
				list:[
					{prop:'id',lable:'素材Id'},
					{prop:'preview_url',lable:'预览图',type:'imgs'},
					{prop:'material_type',lable:'素材类型'},
					{prop:'position',lable:'广告位类型'},
					{prop:'size',lable:'素材尺寸'},
					{prop:'ad_type',lable:'广告类型'},
					{prop:'channel_type',lable:'渠道类型'},			
					{prop:'material_status',lable:'状态'},
					{prop:'finish_at',lable:'入库时间',sor:true},
					{prop:'attachment.url',lable:'附件下载',
						temps:[{cls:'bjysdicon iconfont',type:'text',value:'&#xe61a;',fnName:'downlod'}]							
					},
				],
				btns:[
					{fnName:'need_work',cls:'pldc',value:'批量导出',check:'1'},
				],
			},
			
		}
	},
}
</script>

<style>
</style>
