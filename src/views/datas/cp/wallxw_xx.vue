
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
				title:"壁纸渠道详细数据",
				tipData:[
					{h1:"展示量",p:"所选日期内，以素材为维度汇总的素材展示次数PV"},
					{h1:"展示用户数",p:"所选日期内，以素材为维度汇总的素材展示用户数UV"},
					{h1:"有效停留",p:"用户每次使用壁纸时停留时长在0s-1h以内属于有效停留"},
					{h1:"有效停留量",p:"所选日期内，以素材为维度汇总的素材有效停留次数PV"},
					{h1:"有效停留用户数",p:"所选日期内，以素材为维度汇总的素材有效停留用户数UV"},
					{h1:"广告展示量",p:"所选日期内，以素材为维度汇总的素材上的广告展示次数PV"},
					{h1:"壁纸点击量",p:"所选日期内，以素材为维度汇总的素材上的全局点击次数PV"},
					{h1:"壁纸点击用户数",p:"所选日期内，以素材为维度汇总的素材上的全局点击用户数UV"},
					{h1:"广告点击量",p:"所选日期内，以素材为维度汇总的素材上的广告点击次数PV"},
					{h1:"广告点击用户数",p:"所选日期内，以素材为维度汇总的素材上的广告点击用户数UV"},
				],
				list:[					
					{title:'日期',type:'times',value:'start_time'},
					{title:'素材ID',type:'text',value:'search'},
					{title:'渠道',type:'get_channel',value:'channel'},
				],
			},
			tableConfig:{
				total:0,
				ischeck:false,
				list:[
					{prop:'create_time',lable:'日期'},
					{prop:'bz_id',lable:'素材ID',wzimg:{cls:'',type:'text'}},
					{prop:'channel',lable:'渠道'},
					{prop:'in_pv',lable:'展示量'},					
					{prop:'in_uv',lable:'展示用户数'},
					{prop:'bz_load_pv',lable:'有效停留量'},
					{prop:'bz_load_uv',lable:'有效停留用户数'},
					{prop:'ad_show_pv',lable:'广告展示量'},
					{prop:'ad_show_uv',lable:'广告展示用户数'},
					{prop:'bz_click_pv',lable:'壁纸点击量'},
					{prop:'bz_click_uv',lable:'壁纸点击用户数'},
					{prop:'ad_click_pv',lable:'广告点击量'},
					{prop:'ad_click_uv',lable:'广告点击用户数'},
					{prop:'description',lable:'广告详情',
						temps:[
							{cls:' ',type:'text',value:'查看详情',fnName:'seeXx'},
								
						]	
					},
				],
				btns:[
					{fnName:'xzFn',cls:'pldc ',value:'导出数据'},
				],
				cont:[],
			},
			
			
			tableData:[],
			ChartConfig:{},
			chartData:{},
		}
	},
	mounted: function () {	
		this.lodingfalse();
	}, 
	methods: {	
		seeXx(on){
			window.open('/#/data/wallxw_ad?times='+this.tableData[on].create_time+'&bz_id='+this.tableData[on].bz_id+'&channel='+this.tableData[on].channel)					
		},
		lodingfalse(){
			this.$refs.Tablde.lodingfalse();	
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
				
			this.api.data_gionee_lock_behavior_wallpaper_channel({params}).then((datas)=>{									
				this.tableData = this.clData(datas);		
				this.lodingfalse();
			}).catch(()=>{
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
						bz_id:da[i].bz_id,
						channel:da[i].channel,
						in_pv:da[i].in_pv,
						in_uv:da[i].in_uv,
						bz_load_pv:da[i].bz_load_pv,
						bz_load_uv:da[i].bz_load_uv,
						ad_show_pv:da[i].ad_show_pv,
						ad_show_uv:da[i].ad_show_uv,
						bz_click_pv:0,
						bz_click_uv:0,
						ad_click_pv:da[i].ad_click_pv,
						ad_click_uv:da[i].ad_click_uv,
						img_url:da[i].img_url
					}					
				);
			}
			this.tableConfig.cont = [
				'汇总',
				'--',
				'--',
				data.total_data.in_pv,
				data.total_data.in_uv,
				data.total_data.bz_load_pv,
				data.total_data.bz_load_uv,
				data.total_data.ad_show_pv,
				data.total_data.ad_show_uv,
				0,
				0,
				data.total_data.ad_click_pv,
				data.total_data.ad_click_uv,
			];
			return arr;
		},

	}
}
</script>

<style>
</style>
