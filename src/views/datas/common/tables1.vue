<template>
	<div>
		<sxbox :searchConfig="searchConfig" @sxFn="sxFn"></sxbox>
		<div class="nTableBox">
			<div v-if="ChartConfig.numbcont" class="newTile2 mag1">数据总览</div>
			<div v-if="ChartConfig.numbcont" class="dataszl">
				<span v-for="el in ChartConfig.numbcont" :key="el.name"><div>{{el.num}}<span>{{el.fp}}</span></div><div>{{el.name}}</div></span>		
			</div>
			<div class="newTile2 mag1">数据趋势</div>
			<div class="mychfbox">
				<div id="myChar2"></div>
				<div v-show="bzt" id="myChart3"></div>
			</div>
			
			<div class="newTile2 mag3">数据详情</div>
		</div>
		
		<scTable :tableConfig="tableConfig" :tableDatas="tableData"  ref="Table"></scTable>				
	</div>		
</template>
<script>
import sxbox from './sxBox';
import scTable from '../../../components/scTable';
export default {
	props:['searchConfig','tableConfig','ChartConfig','chartData','tableData'],
	components:{sxbox,scTable},
	data(){
		return{
			bind:{},
			bzt:true,
			myChart_profit_d1:'',
			myChart_profit_d2:'',
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
			window.myChart_profit_d1 = this.$echarts.init(document.getElementById('myChar2'))
			window.myChart_profit_d1.setOption(this.ChartConfig.config);
			window.myChart_profit_d2 = this.$echarts.init(document.getElementById('myChart3'))
			window.myChart_profit_d2.setOption(this.ChartConfig.config2);
			window.addEventListener('resize',function(){
				if(window.myChart_profit_d1){
					window.myChart_profit_d1.resize();
				}	
				if(window.myChart_profit_d2){
					window.myChart_profit_d2.resize();
				}				
			},false);
		},
		setLoding(type){
			this.$refs.Table.setLoding(type);	
		},
		setData(data){
			if(!data.bztno){				
				window.myChart_profit_d2.setOption(data.two);
			}else{
				this.bzt=false;
			}
			window.myChart_profit_d1.setOption(data.one);
			window.myChart_profit_d1.resize();
			
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
.mychfbox{
	display: flex;
}
#myChar2{
	display: inline-block;
	flex: 1;
	height: 400px;

	margin-bottom: 35px;
}
#myChart3{
	display: inline-block;
	margin-left: 1%;
	width: 29%;
	height: 400px;

	margin-bottom: 35px;	
}
#myChar2,#myChart3{
	padding: 18px 20px;
	box-sizing: border-box;
	background: #fff;
	box-shadow:0px 1px 8px 0px rgba(0, 0, 0, 0.08);
}
.nTableBox{
	padding: 20px 40px;
	background: #fff;
}
.dataszl{
	display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-pack:justify;
    -webkit-justify-content:space-between;
    -ms-flex-pack:justify;
    justify-content:space-between;
	margin-bottom: 50px;
	
}

.dataszl>span{

    display: inline-block;

}
.newTile2{
    border-left: 2px solid rgba(0,0,0,1);
    text-indent: 1px;
    font-size: 12px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(0,0,0,1);
}
.mag1{margin-bottom: 17px;}
.dataszl>span>div:nth-child(1){
	font-size:32px;
	font-family:PingFang-SC-Regular;
	font-weight:400;
	color:rgba(0,0,0,1);
}
.dataszl>span>div:nth-child(1)>span{
	margin-left: 16px;
	text-align: center;
	vertical-align: middle;
	font-size:12px;
	font-family:PingFang-SC-Light;
	font-weight:300;
	color:rgba(0,0,0,1);
}
.dataszl>span>div:nth-child(2){
	text-align: left;
    text-indent: 3px;
    vertical-align: top;
	font-size:12px;
	font-family:PingFang-SC-Light;
	font-weight:300;
	color:rgba(0,0,0,1);
}
</style>