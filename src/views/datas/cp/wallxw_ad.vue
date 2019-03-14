
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
							{cls:' ',type:'text',value:'查看详情',fnName:'seeXx'},
								
						]	
					},
					{prop:'email',lable:'渠道'},
					{prop:'email',lable:'广告位ID'},
					{prop:'description',lable:'广告ID',
						temps:[
							{cls:' ',type:'text',value:'查看详情',fnName:'seeXx'},
								
						]	
					},
					
					{prop:'created_at',lable:'广告展示量'},
					{prop:'login',lable:'广告展示用户量'},
					{prop:'login',lable:'广告点击量'},
					{prop:'login',lable:'广告点击用户数'},
					{prop:'login',lable:'平均停留时长'},
			
					{prop:'description',lable:'链接详情',
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
			ChartConfig:{
				onched:'日活PV',
				title:'指标详解',
		       config:{
				   
				   color: ['#3398DB'],
				   legend: {
					   y:"bottom",
				       data:['直接访问']
				   },
					tooltip : {
						trigger: 'axis',
						axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis : [
						{
							type : 'category',
							data : ['1s-3s', '4s-10s', '11s-30s', '31s-60s', '1m-3m', '4m-10m', '10m-30m','30m+'],

							axisTick: {
								alignWithLabel: true
							}
						}
					],
					yAxis : [
						{
							type : 'value'
						}
					],
					series : [
						{
							name:'直接访问',
							type:'bar',
							barWidth: '40%',
							data:[10, 52, 200, 334, 390, 330, 220,100]
						}
					]

				},
		    },
			tableData:[],
			chartData:{
				series : [
				    {
				        name:'A1007',
				        type:'line',
						
						color: 'rgba(105,192,255,1)',
						 
				        data:[11, 11, 15, 13, 12, 30, 40],
				     
				    },
				    {
				        name:'D1009',
				        type:'line',
						color: 'rgba(230,0,18,1)',
				        data:[1, 30, 2, 5, 3, 2, 0],
				       
				        
				    },
					{
					    name:'A1009',
					    type:'line',
						color: 'rgba(24,237,79,1)',
					    data:[1, 0, 2, 5, 3, 2, 0],
					   
					    
					}
				]
			},
		}
	},
	mounted: function () {	
		this.getData();
	}, 
	methods: {	
		lodingfalse(){
			this.$refs.Tablde.lodingfalse();	
		},

		getData(sxtj){
			if(sxtj){
				Object.assign(this.screens, sxtj);	
																		
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
