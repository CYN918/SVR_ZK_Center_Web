
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
				title:"壁纸广告分析数据",
				tipData:[
					{h1:"广告展示量",p:"所选日期内，素材上的广告展示次数PV"},
					{h1:"广告展示用户数",p:"所选日期内，素材上的广告展示用户数UV"},
					{h1:"广告点击量",p:"所选日期内，素材上的广告点击次数PV"},
					{h1:"广告点击用户数",p:"所选日期内，素材上的广告点击用户数UV"},
					{h1:"平均停留时长",p:"所选日期内，广告落地页的平均停留时长"},
				],
				list:[					
					{title:'日期',type:'times',value:'start_time'},	
					{title:'素材ID',type:'text',value:'bz_id'},
					{title:'渠道',type:'get_channel',value:'channel'},
					{title:'广告位ID',type:'get_ad_space_id',value:'ad_space_id'},
					{title:'广告ID',type:'text',value:'ad_id'},
					
				],
			},
			tableConfig:{
				total:0,
				ischeck:false,
				list:[
					{prop:'create_time',lable:'日期'},
					{prop:'bz_id',lable:'素材ID',wzimg:{cls:'',type:'text'}},
					{prop:'channel',lable:'渠道'},
					{prop:'ad_space_id',lable:'广告位ID'},
					{prop:'ad_id',lable:'广告ID',
						temps:[
							{cls:' ',type:'text',value:'查看详情',fnName:'seeXx1'},								
						]	
					},
					{prop:'ad_show_pv',lable:'广告展示量'},
					{prop:'ad_show_uv',lable:'广告展示用户量'},
					{prop:'ad_click_pv',lable:'广告点击量'},
					{prop:'ad_click_uv',lable:'广告点击用户数'},
					{prop:'bz_click_uv',lable:'平均停留时长'},					
					{prop:'description',lable:'链接详情',
						temps:[
							{cls:' ',type:'text',value:'查看详情',fnName:'seeXx2'},								
						]	
					},
				],
				btns:[
					{fnName:'xzFn',cls:'pldc ',value:'导出数据'},
				],
				cont:[],
			},
			ChartConfig:{
				onched:'日活PV',
				title:'指标详解',
				config:{
					color: ['#3398DB'],
					legend:{y:"bottom",data:['落地页停留时长分布']},
					tooltip:{trigger:'axis',axisPointer:{type:'shadow'}},
					grid:{left:'3%',right:'4%',bottom:'3%',containLabel:true},
					xAxis:[
						{
							type:'category',
							data : ['1s-3s', '4s-10s', '11s-30s', '31s-60s', '1m-3m', '4m-10m', '10m-30m','30m+'],
							axisTick:{alignWithLabel: true}
						}
					],
					yAxis:[{type:'value'}],
					series:[
						{
							name:'落地页停留时长分布',
							type:'bar',
							barWidth: '40%',
							data:[10, 52, 200, 334, 390, 330, 220,100]
						}
					]
				},
			},
			tableData:[],
			chartData:{},
		}
	},
	mounted: function () {	
		this.getData();
	}, 
	methods: {	
		setLoding(type){
			this.$refs.Tablde.setLoding(type);	
		},
		getData(sxtj){
			this.setLoding(true);
			if(sxtj){
				Object.assign(this.screens, sxtj);	
				if(sxtj.start_time){
					this.screens.end_time = sxtj.start_time[1];
					this.screens.start_time = sxtj.start_time[0];
				}																
			}
			let params = this.screens;
			if(this.$route.query.bz_id && !params.bz_id){
				params.bz_id = this.$route.query.bz_id;
			}
			if(this.$route.query.channel && !params.channel){
				params.channel = this.$route.query.channel;
			}
			if(this.$route.query.times && !params.start_time){
				params.start_time = this.$route.query.times;
				params.end_time = this.$route.query.times;
			}		
			this.api.data_gionee_lock_behavior_wallpaper_ad({params}).then((datas)=>{									
				this.tableData = this.clData(datas);		
				this.setLoding(false);
			}).catch(()=>{
				this.setLoding(false);
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
			}
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
