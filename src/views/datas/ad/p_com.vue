<template>
	<scTable ref="Tablde" @screenFn="getData" :searchConfig="searchConfig" :tableConfig="tableConfig" :ChartConfig="ChartConfig" :chartData="chartData" :tableData="tableData"></scTable>
</template>
<script>
import scTable from '../common/tables';
export default {
	components:{scTable},
	props:['searc','tabled'],
    data() {
		return{
			screens:{p:10,page:1,},
			searchConfig:{
				title:"",
				tipData:[
					{h1:"展示量",p:"所选日期内，素材展示次数PV"},
					{h1:"点击量",p:"所选日期内，素材点击次数PV"},
					{h1:"点击率",p:"点击量/展示量"},
					{h1:"下载量",p:"所选日期内，素材上对应的广告的成功下载次数"},
					{h1:"安装量",p:"所选日期内，素材上对应的广告的成功安装次数"},
					{h1:"激活量",p:"所选日期内，素材上对应的广告的激活次数"},
					{h1:"流水",p:"所选日期内，素材上对应的广告的流水收入"},
					{h1:"ECPM",p:"每一千次展示可获得的广告流水收入"},
					{h1:"ECPC",p:"单次点击可获得的广告流水收入"},
				],
				list:[],
			},			
			tableConfig:{
				total:0,
				ischeck:false,
				'show-summary':true,
				list:[],
				btns:[
					{fnName:'xzFn',cls:'pldc ',value:'导出数据'},
				],
				cont:[],
			},
			ChartConfig:{},
			tableData:[],
			chartData:[],			
		}
	},
	mounted: function () {	
		this.init();
		this.getData();
	}, 
	methods: {
		init(){
			this.searchConfig.title = this.searc.title;
			this.searchConfig.list = this.searc.list;
			this.tableConfig.list = this.tabled;	
		},		
		seeXx2(on){
			let urld = this.searc.url,
			x=this.searc.pr;
			
			for(let i=0,n=x.length;i<n;i++){
				urld+='&'+x[i].k+'='+this.tableData[on][x[i].v];
			}
			window.open(urld)
		},
		setLoding(type){
			this.$refs.Tablde.setLoding(type);	
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
			if(this.searc.data_type){
				params.data_type=this.searc.data_type;
			}
			if(this.$route.query[this.searc.getUc] && !params[this.searc.getUc]){
				params[this.searc.getUc] = this.$route.query[this.searc.getUc];
			}
			if(this.$route.query.times && !params.start_time){
				params.start_time = this.$route.query.times;
				params.end_time = this.$route.query.times;
			}	
			this.api[this.searc.api]({params}).then((datas)=>{									
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
				arr.push(this.$parent.backData(da[i]));
			}
			this.tableConfig.cont = this.$parent.backTj(data);
			return arr;
		},

	}
}
</script>

<style>

</style>