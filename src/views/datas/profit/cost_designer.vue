
<template>
	<scTable ref="Tablde" @screenFn="getData" :searchConfig="searchConfig" :tableConfig="tableConfig" :ChartConfig="ChartConfig" :chartData="chartData" :tableData="tableData"></scTable>
</template>
<script>
import scTable from '../common/tables1';
export default {
	components:{scTable},
    data() {
		return{
			screens:{
				p:10,
				page:1,	
				total:0,
			},
			searchConfig:{
				title:"设计师成本",
				tipData:[
					{h1:"广告图/广告模板设计师成本",p:"广告图/广告模板设计师成本=素材对应汇总的展示量/1000*CPM"},
					{h1:"壁纸设计师成本",p:"壁纸设计师成本=对应素材的单价"},
					{h1:"入库日期",p:"素材入库日期"},					
				],
				list:[					
					{title:'日期',type:'times',value:'start_time'},
					{title:'素材类型',type:'select',value:'material_type',list:[
						{label:'全部',value:''},
						{label:'广告静态图',value:'picture'},
						{label:'广告脚本图',value:'script_picture'},
						{label:'广告脚本模板',value:'resource'},
						{label:'广告H5模板',value:'h5_resource'},
						{label:'锁屏壁纸脚本图',value:'wallpaper'},
						{label:'模板',value:'template'},
					]},
					
					{title:'素材ID',type:'text',value:'material_id'},
				],
			},
			tableConfig:{
				total:0,
				ischeck:false,
				'show-summary':true,
				list:[
					{prop:'create_time',lable:'日期'},
					{prop:'material_id',lable:'素材ID',wzimg:{cls:'',type:'text'}},
					{prop:'material_type',lable:'素材类型'},					
					{prop:'cost',lable:'设计师成本',sor:true},
					{prop:'create_time',lable:'入库日期'},
				],
				btns:[
					{fnName:'xzFn',cls:'pldc ',value:'导出数据'},
				],
				cont:[],
			},
			ChartConfig:{
				onched:'日活PV',
				topldNav:['日活PV','月活UV','PV/UV','新增用户','累积用户','周活跃用户','月活跃用户','新增用户次日留存','平均单次使用时长','平均日使用时长'],
				config:{
					title: {text: '每日数据趋势图',textStyle:{fontSize:14}},
					tooltip: {trigger: 'axis'},
					legend: {y:'bottom',data:['A1007','D1009','A1009']},
								
					
					calculable : true,
					xAxis:[{type:'category',boundaryGap:false,data:[]}],
					yAxis:[{type : 'value',axisLabel : {formatter: '{value} k'}}],
					series : [
						
					]
					
				},
				config2:{
					title: {
						text: '素材类型成本占比',
						textStyle:{fontSize:14}
					},
					tooltip: {
						title:"素材类型成本占比",
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
  
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
				}  
			},
			tableData:[],
			chartData:{},
		}
	},
	mounted: function () {	
		this.getData();
	}, 
	methods: {
		seeXx1(on){
			if(this.tableData[on].img_url){
				window.open(this.tableData[on].img_url);
			}else{
				this.$message('该素材图片错误！');
			}
		},
		setLoding(type){
			this.$refs.Tablde.setLoding(type);	
		},
		setData(data){
			this.$refs.Tablde.setData(data);	
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
			this.api.data_cost_designer({params}).then((datas)=>{									
				this.tableData = this.clData(datas);
				this.$previewRefresh();
				this.setLoding(false);
			}).catch(()=>{
				this.setLoding(false);
			})			
		},			
		clData(data){
			let arr  = [],arr1=[],arr2=arr2=[
				{name:'总成本',type:'line',color:'rgb(91,155,213)',data:[]},
				{name:'广告图成本',type:'line',color:'rgb(255,192,0)',data:[]},
				{name:'广告模版成本',type:'line',color:'rgb(165,165,165)',data:[]},
				{name:'锁屏壁纸成本',type:'line',color:'rgb(237,128,54)',data:[]}
			],arr3=[];
			this.tableConfig.total=data.total_count;
			let da = data.data;						
			for(let i=0,n=da.length;i<n;i++){
				arr.push(
					{
						create_time:da[i].create_time,
						material_id:da[i].material_id,
						material_type:this.checkNr(da[i].material_type),
						cost:+da[i].cost,
			
						img_url:da[i].img_url,
					},
				);
			}
			let pn=0;
			console.log("xx")
			for(let el in data.daily_data){
				if(pn>30){
					break
				}				
				arr1.push(el);
				arr2[0].data.push(data.daily_data[el].total);
				arr2[1].data.push(data.daily_data[el].picture);
				arr2[2].data.push(data.daily_data[el].template);
				arr2[3].data.push(data.daily_data[el].wallpaper);
				pn++;
			}
			console.log("pp")
			this.tableConfig.cont = [
				'汇总',
				'--',
				'--',
				data.total_data.cost,
				'--'
			];
			
			for(let el in data.material_type_data){
				arr3.push({value:data.material_type_data[el], name:el});
			}
			this.ChartConfig.config.xAxis = [{
				type : 'category',
				boundaryGap : false,
				data:arr1
			}];
			this.ChartConfig.config.series =arr2;
			
			this.ChartConfig.config2.series[0].data = arr3;	
			let bztno = false;
			if(this.screens.channel || this.screens.product || this.screens.ad_space_type || this.screens.admaster){
				bztno = true;
			}
			this.setData({one:this.ChartConfig.config,two:this.ChartConfig.config2,bztno:bztno});
			return arr;
		},
		checkNr(value){		
			if(!value){return}
			let a = '';
			switch (value){
				case 'picture':a= '广告静态图';
					break;
				case 'script_picture':a= '广告脚本图';
					break;
				case 'resource':a= '广告脚本模板';
					break;
				case 'h5_resource':a= '广告H5模板';
					break;
				case 'wallpaper':a= '锁屏壁纸脚本图';
					break;
                case 'template':a= '模板';
                    break;
				default:
					break;
			}
			return a;
		},
		

	}
}
</script>

<style>
</style>
