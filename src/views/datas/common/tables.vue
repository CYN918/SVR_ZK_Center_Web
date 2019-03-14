<template>
	<div>
		<sxbox :searchConfig="searchConfig" @sxFn="sxFn"></sxbox>
		<myChart v-if="ChartConfig.title" :ChartConfig="ChartConfig" :chartData="chartData" ref="myChart"></myChart>
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
			onSxData:{
				p:10,
				page:1,	
			},
			bind:{}
		}
	},
	mounted: function () {	
	
	}, 
	methods: {
		chedh(on){		
			this.$parent.setchad(on);
		},
		setLoding(type){
			this.$refs.Table.setLoding(type);	
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
		setData(data){		
			this.$refs.myChart.setData(data);
		},
		sxFn(d){	
			d.page =1;
			this.$emit("screenFn",d); 
		},				
		setCurrentPage(num){
			this.onSxData.p = num;	
			this.$emit("screenFn",{p:num}); 
		},
		setPage(num){
			this.onSxData.page = num;
			this.$emit("screenFn",{page:num}); 
		},
		xzFn(data){
			this.$parent.xzFn(data); 
		},
		clickfn(name,cs){			
			this.$parent[name](cs); 
		},
	}

  }	
	
</script>
<style>
.zxtBox{
	width: 100%;
	background: #fff;
	padding-top: 35px;
}
#myChart{
	width: 100%;
	height: 400px;
	margin-bottom: 35px;
}
.newTile{
	margin-left: 38px;
	border-left: 2px solid rgba(0,0,0,1);
	text-indent: 1px;
	font-size:12px;
font-family:PingFang-SC-Regular;
font-weight:400;
color:rgba(0,0,0,1);

}
.topdtnav2{
	width: 100%;
	height:30px;
background:rgba(254,250,248,1);
font-size:12px;
font-family:PingFang-SC-Light;
font-weight:300;
color:rgba(0,0,0,1);
opacity:0.85;
border-bottom: 1px solid rgba(191,191,191,1);
box-shadow:0px 1px 8px 0px rgba(0, 0, 0, 0.08);

}
.topdtnav2>span{
	display: inline-block;
	height: 100%;
	line-height: 30px;
	padding: 0 20px;
	border-left:1px solid rgba(191,191,191,1);
	cursor: pointer;

}
.topdtnav2>span:nth-child(1){
	border: none;
}
.onched{
	background:rgba(255,152,90,1);
	color: #fff;
	border-left:1px solid rgba(255,152,90,1) !important;

}
.onched+span{
	border-left:1px solid rgba(255,152,90,1) !important;
}
</style>