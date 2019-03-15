<template>
	<div>
		<div class="topdtnav">
			<div v-if="ChartConfig.topldNav" class="topdtnav2">
				<span>指标详解</span>
				<span v-for="(el,index) in ChartConfig.topldNav" :key="index" @click="chedh(index)"  :class="[index==onched?'onched':'']">{{el}}</span>
			</div>
		</div>
		<div class="zxtBox">
			<div class="newTile">数据趋势</div>
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
			onched:0,		
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
				if(window.myChart){
					window.myChart.resize();
				}				
			},false);
	
			window.myChart.setOption(this.ChartConfig.config);
		},
		setData(data){
			window.myChart.setOption(data);
			window.myChart.resize();
		},
		chedh(on){		
			console.log(on);
			this.onched = on;
			this.$parent.chedh(on);
		},


	},
}
</script>

<style>

</style>
