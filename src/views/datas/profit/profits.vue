
<template>
	<scTable ref="Tablde" @screenFn="getData" :searchConfig="searchConfig" :tableConfig="tableConfig" :ChartConfig="ChartConfig" :chartData="chartData" :tableData="tableData"></scTable>
</template>
<script>
import scTable from '../common/tables';
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
				title:"收益详表",
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
				list:[					
					{title:'日期',type:'times',value:'start_time'},
					{title:'素材ID',type:'text',value:'picture_id'},
					{title:'广告ID',type:'text',value:'ad_id'},
					{title:'渠道',type:'get_channel',value:'channel'},
					{title:'广告位名称',type:'get_ad_space_name',value:'ad_space_name'},
					{title:'广告位ID',type:'get_ad_space_id',value:'ad_space_id'},
					{title:'广告ID',type:'text',value:'ad_id'},
				],
			},
			tableConfig:{
				total:0,
				ischeck:false,
				'show-summary':true,				
				list:[
					{prop:'create_time',lable:'日期'},
					{prop:'channel',lable:'渠道'},
					{prop:'product',lable:'产品'},
					{prop:'ad_space_type',lable:'广告位类型'},
					{prop:'ad_space_id',lable:'广告位ID'},
					{prop:'admaster',lable:'广告主'},
					{prop:'ad_id',lable:'广告ID'},
					{prop:'ad_name',lable:'广告名称'},
	
					{prop:'pv',lable:'展示量'},					
					{prop:'click',lable:'点击量'},
					{prop:'click_ratio',lable:'点击率'},
					{prop:'download',lable:'下载量'},
					{prop:'install',lable:'安装量'},
					{prop:'activ',lable:'激活量'},
					{prop:'income',lable:'广告流水'},
					{prop:'ecpm',lable:'ECPM'},
					{prop:'ecpc',lable:'ECPC'},
					
					{prop:'picture_cost',lable:'广告图成本'},
					{prop:'template_cost',lable:'模板成本'},
					{prop:'channel_cost',lable:'渠道成本'},
					{prop:'income',lable:'收益'},
					{prop:'gross_profit',lable:'毛利率'},
	
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
		seeXx2(on){
			this.$router.push({
			  
			   query:{
				lib_id:this.tableData[on].ad_id
			 }
			});
		},
		lodingfalse(){
			this.$refs.Tablde.lodingfalse();	
		},
		ajaxget(data,fn){
			console.log(fn);
			fn([{value:1}])
		},
		getData(sxtj){
			if(sxtj){
				Object.assign(this.screens, sxtj);	
				if(sxtj.start_time){
					this.screens.end_time = this.screens.start_time[1];
					this.screens.start_time = this.screens.start_time[0];
				}																
			}
			let params = this.screens;
				
			this.api.data_income_detail({params}).then((datas)=>{									
				this.tableData = this.clData(datas);		
				this.lodingfalse();
			}).catch((error)=>{
				this.lodingfalse();
			})			
		},			
		clData(data){
			let arr  = [];
			this.tableConfig.total=data.total_count;
			let da = data.data;		
							console.log(22222222);
			for(let i in da){
				arr.push(
					{
						create_time:da[i].create_time,
						material_id:da[i].material_id,
						ad_id:da[i].ad_id,
						ad_name:da[i].ad_name,
						channel:da[i].channel,
						ad_space_id:da[i].ad_space_id,
						ad_space_type:da[i].ad_space_type,
						ad_space_name:da[i].ad_space_name,
						pv:da[i].pv,
						click:da[i].click,
						click_ratio:da[i].click_ratio,
						download:da[i].download,
						install:da[i].install,	
						activ:	da[i].activ,			
						income:da[i].income,
						ecpm:da[i].ecpm,
						ecpc:da[i].ecpc,
						img_url:da[i].img_url
					},
				);
				
			}
		
			console.log(arr);
			console.log(22222222);
			this.tableConfig.cont = [
				'汇总',
				'--',
				'--',
				'--',
				'--',
				'--',
				'--',
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
			console.log(22222222);
			return arr;
		},

	}
}
</script>

<style>

</style>