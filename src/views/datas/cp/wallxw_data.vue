
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
			channelArray:[],
			timesAarray:[],
			channelData:[],
			adData:[],
			searchConfig:{
				title:"壁纸行为数据",
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
				],
			},
			tableConfig:{
				total:0,
				ischeck:false,
				list:[
					{prop:'create_time',lable:'日期'},
					{prop:'bz_id',lable:'素材ID',wzimg:{cls:'',type:'text'}},
					{prop:'in_pv',lable:'展示量'},
					{prop:'in_uv',lable:'展示用户数'},					
					{prop:'out_pv',lable:'有效停留量'},
					{prop:'out_uv',lable:'有效停留用户数'},
					{prop:'ad_show_pv',lable:'广告展示量'},
					{prop:'ad_show_uv',lable:'广告展示用户数'},
					{prop:'login',lable:'壁纸点击量'},
					{prop:'login',lable:'壁纸点击用户数'},
					{prop:'ad_click_pv',lable:'广告点击量'},
					{prop:'ad_click_uv',lable:'广告点击用户数'},
					{prop:'login',lable:'渠道详情',
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
				onched:0,
				title:'指标详解',
				topldNav:['展示量','展示用户数','有效停留量','有效停留用户数','广告展示量','广告展示用户数','壁纸点击量','壁纸点击用户数','广告点击量','广告点击用户数'],
				config:{
					tooltip:{trigger:'axis'},
					legend:{y:'bottom',data:[]},
					calculable : true,
					xAxis : [{type:'category',boundaryGap:false,nameTextStyle:{width:'70px'},data:[]}],
					yAxis:[{type:'value',axisLabel:{formatter:'{value}'}}],
					series:[]					
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
		seeXx(on){
			window.open('/#/data/wallxw_xx?times='+this.tableData[on].create_time+'&bz_id='+this.tableData[on].bz_id);
		},
		setLoding(type){
			this.$refs.Tablde.setLoding(type);	
		},
		setData(data){
			this.$refs.Tablde.setData(data);	
		},
		setchad(on){
			this.onched=on;
			this.ChartConfig.config.legend.data = this.channelArray;
			this.ChartConfig.config.xAxis[0].data = this.timesAarray;
			for(let i=0,n=this.channelArray.length;i<n;i++){
				this.channelData[i].data=[];
				this.channelData[i].data = this.adData[this.channelArray[i]][on];
			}
			this.ChartConfig.config.series = this.channelData;
			this.setData(this.ChartConfig.config);
		},
		getData(sxtj){
			this.setLoding(true);
			if(sxtj){
				Object.assign(this.screens, sxtj);	
				if(sxtj.start_time){
					this.screens.end_time = this.screens.start_time[1];
					this.screens.start_time = this.screens.start_time[0];
				}																
			}
			let params = this.screens;
				
			this.api.data_gionee_lock_behavior_wallpaper({params}).then((datas)=>{									
				this.tableData = this.clData(datas);
				this.$previewRefresh();
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
						bz_id:da[i].bz_id,
						in_pv:da[i].in_pv,
						in_uv:da[i].in_uv,
						out_pv:da[i].out_pv,
						out_uv:da[i].out_uv,
						ad_show_pv:da[i].ad_show_pv,
						ad_show_uv:da[i].ad_show_uv,
						ad_click_pv:da[i].ad_click_pv,
						ad_click_uv:da[i].ad_click_uv,
						login:0,			
						img_url:da[i].img_url,
					},
				);
			}
			this.tableConfig.cont = [
				'汇总',
				'--',				
				data.total_data.in_pv,
				data.total_data.in_uv,
				data.total_data.out_pv,
				data.total_data.out_pu,
				data.total_data.ad_show_pv,
				data.total_data.ad_show_uv,
				0,
				0,
				data.total_data.ad_click_pv,
				data.total_data.ad_click_uv,
				'--'
			];
			for(let el in data.trend_data){
				this.channelArray.push(el);
				this.channelData.push({name:el,type:'line',data:[]});
				let arr1=[],arr2=[],arr3=[],arr4=[],arr5=[],arr6=[],arr7=[],arr8=[],
				arr9=[],arr10=[];
				for(let el2 in data.trend_data[el]){
					this.timesAarray.push(el2);	
					let d = data.trend_data[el][el2];
					arr1.push(d.in_pv);			
					arr2.push(d.in_uv);
					arr3.push(d.out_pv);
					arr4.push(d.out_uv);
					arr5.push(d.ad_show_pv);
					arr6.push(d.ad_show_uv);
					arr7.push(0);
					arr8.push(0);
					arr9.push(d.ad_click_pv);
					arr10.push(d.ad_click_uv);				
				}
				this.adData[el] = [];
				this.adData[el].push(arr1);
				this.adData[el].push(arr2);
				this.adData[el].push(arr3);
				this.adData[el].push(arr4);
				this.adData[el].push(arr5);
				this.adData[el].push(arr6);
				this.adData[el].push(arr7);
				this.adData[el].push(arr8);
				this.adData[el].push(arr9);
				this.adData[el].push(arr10);
			}
			
			this.setchad(this.onched);
			return arr;
		},
	}
}
</script>

<style>
</style>
