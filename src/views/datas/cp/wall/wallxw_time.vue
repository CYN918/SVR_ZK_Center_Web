<template>
	<div>
		<sxBox  @sxFn="sxFn" :sxDatas="screenConfig" ref="sxBox" ></sxBox>
<!-- 		<tjBox v-if="tjData && tjData.length>0"  :tjData="tjData"></tjBox>-->
		<div class="zxtBox">
			
			
			<div class="newTile">数据趋势</div>
			<div id="myChart"></div>
			<div class="newTile">数据详情</div>
			<scTable :tableConfig="tableConfig" :tableDatas="tableDatas"  ref="Table"></scTable>				
		</div>
 
	</div>		
</template>
<script>
import sxBox from '../../common/sxBox';

// import tjBox from '../../components/tjcom';
import scTable from '../../../../components/scTable';
export default {
	components:{sxBox,scTable},
    data() {
		return {
			onSxData:{
				p:10,
				page:1,	
			},
			onched:'日活PV',
			topldNav:['日活PV','月活UV','PV/UV','新增用户','累积用户','周活跃用户','月活跃用户','新增用户次日留存','平均单次使用时长','平均日使用时长'],
			screenConfig : [
				{title:'日期',type:'times',value:'start_date'},
				{title:'渠道',type:'select',value:'need_type',list:[
					{label:'全部',value:'all'},
					{label:'静态图片',value:'needs_picture'},
					{label:'动态图片',value:'needs_script_picture'},
					{label:'模板',value:'needs_resource'},
					{label:'H5模板',value:'needs_h5_resource'},
					{label:'锁屏壁纸',value:'needs_wallpaper'},
				]},	
			],
			tableDatas:[],
			tableConfig:{
				total:0,
				ischeck:false,
				list:[
					{prop:'id',lable:'日期'},
					{prop:'title',lable:'渠道'},
					{prop:'extend_type',lable:'日活PV'},
					{prop:'position',lable:'PV/UV'},
					{prop:'description',lable:'新增用户'},
					{prop:'size',lable:'累计用户'},
					{prop:'num',lable:'周活跃用户'},
					{prop:'total',lable:'月活跃用户'},
					{prop:'end_at',lable:'新增用户次日留存'},					
					{prop:'created_at',lable:'平均单次使用时长'},
					{prop:'end_at',lable:'平均日使用时长'},
					
				],
				btns:[
				
					{fnName:'xzFn',cls:'pldc ',value:'导出数据'},
				],
			},
		}
    },
	mounted: function () {	
		
	this.drawLine();
	}, 
	methods: {	
		cheond(on){
			
		},
		drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
		window.addEventListener('resize',function(){
			if(myChart){
				myChart.resize();
			}
			
		},false);
		
        // 绘制图表
        myChart.setOption({
            color: ['#3398DB'],
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
    legend: {
        data:['直接访问']
    },
    xAxis : [
        {
            type : 'category',
            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
            barWidth: '60%',
            data:[10, 52, 200, 334, 390, 330, 220]
        }
    ]
        });


	
		
		
    },

		qhTables(){				
			this.$refs.Table.checkSt();				
		},
		lodingfalse(){
			this.$refs.Table.lodingfalse();	
		},
		sxFn(d){		
			if(d){
				for(let el in d){			
					if(d[el]){		
						if(d[el]=='all'){
							delete d[el];
							delete this.onSxData[el];
						}else{
							this.onSxData[el] = d[el];
						}
						
					}
				}
			}		
			if(this.onSxData.start_date){
				this.onSxData.end_date = this.onSxData.start_date[1];
				this.onSxData.start_date = this.onSxData.start_date[0];
				
			} 
			
			this.onSxData.page = 1;
			this.$emit("screenFn",this.onSxData); 
		},				
		setCurrentPage(num){
			this.onSxData.p = num;
			this.$emit("screenFn",this.onSxData); 
		},
		setPage(num){
			this.onSxData.page = num;
			this.$emit("screenFn",this.onSxData); 
		},
		xzFn(data){
			this.$parent.xzFn(data); 
		},
		clickfn(name,cs){
			this.$parent[name](cs); 
		},
    },
  }	
	
</script>
<style>

</style>