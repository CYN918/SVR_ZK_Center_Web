<template>
	<comd :tableConfig="tableConfig" :getType="getType" :activeOn="activeOn" :screensd="screensd" :tjType="tjType" :tjset="tjset"></comd>
</template>
<script>
import comd from './m_com.vue';
export default {
	components:{comd},
	data(){
		return{
			activeOn:"1",
			tjType:'picture',
			tjset:[
				{name:'待审核数（个）',num:0},
				{name:'入库数（个）',num:0},
				{name:'使用中（个）',num:0},
				{name:'使用过（个）',num:0},
			],
			getType:['m_picture','m_script_picture'],
			screensd:[{label:'全部',value:''},{label:'广告静态图',value:'m_picture'},{label:'广告脚本图',value:'m_script_picture'}],
			tableConfig:{
				total:0,
				ischeck:true,
				list:[
					{prop:'id',lable:'素材Id'},
					{prop:'preview_url',lable:'预览图',type:'imgs'},
					{prop:'material_type',lable:'素材类型'},
					{prop:'position',lable:'广告位类型'},
					{prop:'description',lable:'投放内容描述'},
					{prop:'size',lable:'素材尺寸'},
					{prop:'link',lable:'投放链接'},
					{prop:'material_status',lable:'状态'},
					{prop:'finish_at',lable:'入库时间',sor:true},
					{prop:'attachment.url',lable:'附件下载',
						temps:[{cls:'bjysdicon iconfont',type:'text',value:'&#xe61a;',fnName:'downlod'}]							
					},
				],
				btns:[
					{fnName:'nedd_work',cls:'pldc',value:'批量导出',check:'1'},
				],
			},

		}
	},
}
</script>

<style>
</style>
