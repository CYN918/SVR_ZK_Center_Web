<template>
	<div>
		<sxBox  @sxFn="sxFn" :sxDatas="screenConfig" ref="sxBox" ></sxBox>
		<div class="topdtnav">
				<!--<el-select v-if="topldNav.length>1" v-model="onched" filterable placeholder="请选择">
					<el-option
					  v-for="item in topldNav"
					  :label="item"
					  :value="item">
					</el-option>
				</el-select>-->
			<div class="topdtnav2"><span>指标详解</span><span v-for="(el,index) in topldNav" :class="[el==onched?'onched':'']">{{el}}</span></div>
		</div>
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
          
            tooltip: {trigger: 'axis'},
			legend: {
				 y:'bottom',
			    data:['A1007','D1009','A1009']
			},
		
			
			calculable : true,
             xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['2018-12-21','2018-12-21','2018-12-21','2018-12-21','2018-12-21','2018-12-21','2018-12-21']
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLabel : {
                        formatter: '{value} k'
                    }
                }
            ],
            series : [
                {
                    name:'A1007',
                    type:'line',
					
					color: 'rgba(105,192,255,1)',
 
                    data:[11, 11, 15, 13, 12, 30, 40],
                 
                },
                {
                    name:'D1009',
                    type:'line',
					color: 'rgba(230,0,18,1)',
                    data:[1, 30, 2, 5, 3, 2, 0],
                   
                    
                },
				{
				    name:'A1009',
				    type:'line',
					color: 'rgba(24,237,79,1)',
				    data:[1, 0, 2, 5, 3, 2, 0],
				   
				    
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
font-size:10px;
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