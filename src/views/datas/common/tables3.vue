<template>
	<div>
		<sxbox :searchConfig="searchConfig" @sxFn="sxFn"></sxbox>
		<div class="nTableBox">
			<div class="newTile2 mag1">数据总览</div>
			<div class="dataszl">
				<span><div>6853.5<span>-1.5%</span></div><div>广告流水</div></span>
				<span><div>6853.5<span>-1.5%</span></div><div>广告流水</div></span>
				<span><div>6853.5<span>-1.5%</span></div><div>广告流水</div></span>
				<span><div>6853.5<span>-1.5%</span></div><div>广告流水</div></span>
			</div>
			<div class="newTile2 mag1">数据趋势</div>
			<div id="myChar7"></div>

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
		}
	},
	mounted: function () {	
		this.init();
	}, 
	methods: {	
		lodingfalse(){
			this.$refs.Table.lodingfalse();	
		},
		sxFn(d){
	
		},
		setLoding(type){
			this.$refs.Table.setLoding(type);	
		},
		clickfn(name,cs){
			this.$parent[name](cs); 
		},
		init(){
			this.onched = this.ChartConfig.onched;
			let myChar7 = this.$echarts.init(document.getElementById('myChar7'))			
			this.hfn = myChar7;
			window.addEventListener('resize',function(){
				if(myChar7){
					myChar7.resize();
				}	
				
			},false);
		},
		
	}

  }	
	
</script>
<style>
#myChar7{
	display: inline-block;
	width: 100%;
	height: 400px;
	padding: 18px 20px;
	box-sizing: border-box;
	background: #fff;
	box-shadow:0px 1px 8px 0px rgba(0, 0, 0, 0.08);
	margin-bottom: 35px;
}


</style>