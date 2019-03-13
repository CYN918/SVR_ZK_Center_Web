<template>
	<div>
		<div class="topdtnav">
				<!--<el-select v-if="topldNav.length>1" v-model="onched" filterable placeholder="请选择">
					<el-option
					  v-for="item in topldNav"
					  :label="item"
					  :value="item">
					</el-option>
				</el-select>-->
			<div v-if="ChartConfig.topldNav" class="topdtnav2">
				<span>指标详解</span>
				<span v-for="(el,index) in ChartConfig.topldNav" @click="chedh(el)" :class="[el==onched?'onched':'']">{{el}}</span>
			</div>
		</div>
		<div class="zxtBox">
			<div class="newTile" @click="tiodp">数据趋势</div>
			<div id="myChart"></div>
			<div class="newTile"  >数据详情</div>						
		</div>
	</div>
</template>

<script>
export default {
	props:['ChartConfig','chartData'],
	data(){
		return{
			onched:'',
		
			hfn:"",
		}
	},
	mounted: function () {
		this.init();
	}, 
	methods: {	
		init(){
			this.onched = this.ChartConfig.onched;
			window.myChart = this.$echarts.init(document.getElementById('myChart'))
			window.addEventListener('resize',function(){
				if(myChart){
					myChart.resize();
				}				
			},false);
	
			myChart.setOption(this.ChartConfig.config);
		},
		tiodp(){
			
		},
		chedh(data){
			this.onched = data;
			
			this.setData({series : [
					    {
					        name:'A1007',
					        type:'line',
							
							color: 'rgba(105,192,255,1)',
							 
					        data:[112, 11, 15, 13, 12, 30, 40],
					     
					    },
					    {
					        name:'D1009',
					        type:'line',
							color: 'rgba(230,0,18,1)',
					        data:[221, 30, 2, 5, 3, 2, 0],
					       
					        
					    },
						{
						    name:'A1009',
						    type:'line',
							color: 'rgba(24,237,79,1)',
						    data:[331, 0, 2, 5, 3, 2, 0],
						   
						    
						}
					]});
		},
		setData(data){
			this.onData = data;
			window.myChart.setOption(data);
			
		},

	},
}
</script>

<style>

</style>
