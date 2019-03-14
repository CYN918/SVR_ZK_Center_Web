<template>
	<scTable ref="Tablde" @screenFn="getData" :searchConfig="searchConfig" :tableConfig="tableConfig" :ChartConfig="ChartConfig" :chartData="chartData" :tableData="tableData"></scTable>
</template>
<script>
import scTable from '../common/tables';
export default {
	props:['searc','tabled'],
	components:{scTable},
    data() {
		return{
			screens:{
				p:10,
				page:1,	
			},
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
				list:[
					{prop:'create_time',lable:'日期',sor:true},
					{prop:'pv',lable:'展示量',sor:true},					
					{prop:'click',lable:'点击量',sor:true},
					{prop:'click_ratio',lable:'点击率'},
					{prop:'download',lable:'下载量',sor:true},
					{prop:'install',lable:'安装量',sor:true},
					{prop:'activ',lable:'激活量',sor:true},
					{prop:'income',lable:'流水',sor:true},
					{prop:'ecpm',lable:'ECPM',sor:true},
					{prop:'ecpc',lable:'ECPC',sor:true},				
				],
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
			this.tableConfig.list.splice(9,1,this.tableConfig.list[9],this.tabled[1]);
			this.tableConfig.list.splice(0,1,this.tableConfig.list[0],this.tabled[0]);		
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
			this.api[this.searc.api]({params}).then((datas)=>{									
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
				let obj = {
					create_time:da[i].create_time,
					pv:+da[i].pv,
					click:+da[i].click,
					click_ratio:da[i].click_ratio,
					download:+da[i].download,
					install:+da[i].install,
					activ:+da[i].activ,
					income:+da[i].income,
					ecpm:+da[i].ecpm,
					ecpc:+da[i].ecpc,
					ad_id:da[i].ad_id,
					img_url:da[i].img_url	
				};
				obj[this.tabled[0].prop]=da[i][this.tabled[0].prop];
				arr.push(obj);
			}
			this.tableConfig.cont = [
				'汇总',
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