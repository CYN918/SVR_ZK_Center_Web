<template>
	<div>
		<sxbox :searchConfig="searchConfig" @sxFn="sxFn"></sxbox>
		<div class="nTableBox">
			<div class="newTile2 mag1">数据总览</div>
			<div class="dataszl">
				<span v-for="el in ChartConfig.numbcont"><div>{{el.num}}<span>{{el.fp}}</span></div><div>{{el.name}}</div></span>		
			</div>
			<div class="newTile2 mag1">数据趋势</div>
			
			<div id="myChar4"></div>
			<div class="myChar5_6">
				<div id="myChart5"></div>
				<div id="myChart6"></div>
			</div>
				
			
			<div class="newTile2 mag3">数据详情</div>
		</div>
		
		<scTable :tableConfig="tableConfig" :tableDatas="tableData"  ref="Table"></scTable>				
	</div>		
</template>
<script>
import sxbox from './sxBox';
import myChart from './chare';
import scTable from '../../../components/scTable';
export default {
	props:['searchConfig','tableConfig','ChartConfig','chartData','tableData'],
	components:{sxbox,scTable,myChart},
	data(){
		return{
			bind:{},
			hfn:'',
			hfn2:'',
			onSxData:{
				p:10,
				page:1,	
			},
		}
	},
	mounted: function () {	
		this.init();
	}, 
	methods: {
		init(){
			this.onched = this.ChartConfig.onched;
			window.myChart_profit_d1 = this.$echarts.init(document.getElementById('myChar4'))			
			window.myChart_profit_d1.setOption(this.ChartConfig.config);
			
			window.myChart_profit_d2 = this.$echarts.init(document.getElementById('myChart5'))
			window.myChart_profit_d2.setOption(this.ChartConfig.config2);
			
			window.myChart_profit_d3 = this.$echarts.init(document.getElementById('myChart6'))
			window.myChart_profit_d3.setOption(this.ChartConfig.config3);
			
			window.addEventListener('resize',function(){
				if(window.myChart_profit_d1){
					window.myChart_profit_d1.resize();
				}	
				if(window.myChart_profit_d2){
					window.myChart_profit_d2.resize();
				}	
				if(window.myChart_profit_d3){
					window.myChart_profit_d3.resize();
				}			
			},false);
		},
		setData(data){
			
			window.myChart_profit_d1.setOption(data.config);
			window.myChart_profit_d2.setOption(data.config2);
			window.myChart_profit_d3.setOption(data.config3);
		},
		qhTables(){				
			this.$refs.Table.checkSt();				
		},
		lodingfalse(){
			this.$refs.Table.lodingfalse();	
		},
		initpage(){
			this.$refs.Table.initPage();
		},
		sxFn(d){	
			this.$refs.Table.initPage();
			d.p = 10;
			d.page =1;
			this.$emit("screenFn",d); 
		},				
		setCurrentPage(num){
			this.onSxData.p = num;	
			this.$emit("screenFn",{p:num}); 
		},
		setPage(num){
			this.onSxData.page = num;
			console.log(22222222);
			this.$emit("screenFn",{page:num}); 
		},
		xzFn(data){
			this.$parent.xzFn(data); 
		},
		clickfn(name,cs){
			this.$parent[name](cs); 
		},
		ajaxget(data, fn){
			this.$parent.ajaxget(data, fn); 		
		},
		
		
	}

  }	
	
</script>
<style>
#myChar4{
	width: 100%;
	height: 400px;

}
.myChar5_6{
	
}
.myChar5_6>div{
	width: 50%;
	display: inline-block;
	height: 400px;
}
#myChar4,.myChar5_6>div{
		padding: 18px 20px;
	box-sizing: border-box;
	background: #fff;
	box-shadow:0px 1px 8px 0px rgba(0, 0, 0, 0.08);
}
</style>