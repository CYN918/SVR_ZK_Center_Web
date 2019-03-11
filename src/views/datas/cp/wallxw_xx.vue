
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
					{prop:'email',lable:'日期'},
					{prop:'description',lable:'素材ID',
						temps:[
							{cls:' ',type:'text',value:'查看',fnName:'seeXx'},
								
						]	
					},
					{prop:'email',lable:'渠道'},
					{prop:'company',lable:'展示量'},
					
					{prop:'created_at',lable:'展示用户数'},
					{prop:'login',lable:'有效停留量'},
					{prop:'login',lable:'有效停留用户数'},
					{prop:'login',lable:'广告展示量'},
					{prop:'login',lable:'广告展示用户数'},
					{prop:'login',lable:'壁纸点击量'},
					{prop:'login',lable:'壁纸点击用户数'},
					{prop:'login',lable:'广告点击量'},
					{prop:'login',lable:'广告点击用户数'},
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
						picture_id:da[i].picture_id,
						pv:da[i].pv,
						click:da[i].click,
						click_ratio:da[i].click_ratio,
						download:da[i].download,
						install:da[i].install,
						activ:da[i].activ,
						income:da[i].income,
						ecpm:da[i].ecpm,
						ecpc:da[i].ecpc,
						ad_id:da[i].ad_id,
						ad_name:da[i].ad_name,
						channel:da[i].channel,
						ad_space_id:da[i].ad_space_id,
						ad_space_type:da[i].ad_space_type,
						ad_space_name:da[i].ad_space_name,
						img_url:da[i].img_url
					},
				);
			};
			this.tableConfig.cont = [
				'汇总',
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
			return arr;
		},

	}
}
</script>

<style>
</style>
