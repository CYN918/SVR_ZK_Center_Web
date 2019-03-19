<template>
	<div class="newBt">
		<div class="newBt_1">{{searchConfig.title}}<span class="iconfont fontwh" @click="showd">&#xe630;</span></div>
		<div class="newBt_2">
			<div v-for="(el,index) in searchConfig.list">
				<span>{{el.title}}</span>
				<el-select v-if="el.type=='select'" v-model="bind[el.value]" filterable placeholder="请选择">
					<el-option
					  v-for="item in el.list"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				</el-select>
				
				<el-select v-if="el.type=='get_work_type'" v-model="bind[el.value]" filterable placeholder="请选择">
					<el-option
					  v-for="item in [{label:'全部',value:''},{label:'直客',value:'0'},{label:'DSP/API',value:'1'}]"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				</el-select>
				<el-date-picker v-if="el.type=='times'"
				  v-model="bind[el.value]"
				  type="daterange"
				  format="yyyy-MM-dd"
				  value-format="yyyy-MM-dd"
				  range-separator="至"
				  start-placeholder="开始日期"
				  :picker-options="pickerOptions1"
				  end-placeholder="结束日期">
				</el-date-picker>
				<el-date-picker v-if="el.type=='timed'"
				  v-model="bind[el.value]"
				  type="date"
				  format="yyyy-MM-dd"
				  value-format="yyyy-MM-dd"
				  >
				</el-date-picker>
				<el-date-picker v-if="el.type=='month'"
								v-model="bind[el.value]"
								type="month"
								format="yyyy-MM"
								value-format="yyyy-MM"
				>
				</el-date-picker>
				<el-input class="sxtext" v-if="el.type=='text'"  v-model="bind[el.value]" placeholder="请输入内容"></el-input>
				<el-autocomplete v-if="el.type=='get_product'" v-model="bind[el.value]" :fetch-suggestions="get_product" placeholder="请输入内容" ></el-autocomplete>
				<el-autocomplete v-if="el.type=='get_ad_master'" v-model="bind[el.value]" :fetch-suggestions="get_ad_master" placeholder="请输入内容" ></el-autocomplete>
				<el-autocomplete v-if="el.type=='get_ad_space_id'" v-model="bind[el.value]" :fetch-suggestions="get_ad_space_id" placeholder="请输入内容" ></el-autocomplete>
				<el-autocomplete v-if="el.type=='get_ad_space_name'" v-model="bind[el.value]" :fetch-suggestions="get_ad_space_name" placeholder="请输入内容" ></el-autocomplete>
				<el-autocomplete v-if="el.type=='get_ad_space_type'" v-model="bind[el.value]" :fetch-suggestions="get_ad_space_type" placeholder="请输入内容" ></el-autocomplete>
				<el-autocomplete v-if="el.type=='get_channel'" v-model="bind[el.value]" :fetch-suggestions="get_channel" placeholder="请输入内容" ></el-autocomplete>
				
			</div>
			<el-button round @click="sx()" class="xsffbtn">查询</el-button>
		</div>
		<div v-show="isshowd" class="tipNew">
			<div class="tipNew_1" @click="hind"></div>
			<div class="tipNew_2">
				<div class="tipNew_2_1">
					指标说明<span class="gbclos" @click="hind">x</span>
				</div>
				<div class="tipNew_2_2">
					<div v-for="(el,index) in searchConfig.tipData">
						<h1>{{el.h1}}</h1>
						<p>{{el.p}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props:['searchConfig'],
	data(){
		return {
			bind:{},
			isshowd:false,
			pickerOptions1: {
          shortcuts: [{
            text: '７日数据',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '上周数据',
            onClick(picker) {
			  const times = window.MrYangUtil().getPreviousWeek();
              picker.$emit('pick', [times[0], times[1]]);
            }
          }, {
            text: '本月数据',
            onClick(picker) {
             const times = window.MrYangUtil().getCurrentMonth();
             picker.$emit('pick', [times[0], times[1]]);
            }
          },
		  {
		    text: '上月数据',
		    onClick(picker) {
		      
		      const times = window.MrYangUtil().getPreviousMonth();
		      picker.$emit('pick', [times[0], times[1]]);
		    }
		  }]
        },
        product:[],
        master:[],
        space_id:[],
        space_name:[],
        space_type:[],
        channel:[],
        
		}
	},
	mounted: function () {	

	},
	methods: {
		sx(){		
			this.$parent.sxFn(this.bind);
		},
		showd(){		
			this.isshowd = true;
		},
		hind(){
			this.isshowd = false;
		},
		get_product(data,fn){
			if(this.product.length>0){
				fn(this.backArr(this.product,data))
				return
			}
			this.api.data_filter_product().then((ban)=>{
				this.product = ban;			
				fn(this.backArr(ban,data));
			});			
		},
		get_ad_master(data,fn){
			if(this.master.length>0){
				fn(this.backArr(this.master,data))
				return
			}
			this.api.data_filter_ad_master().then((ban)=>{
				this.master = ban;			
				fn(this.backArr(ban,data));
			});		
		},
		get_ad_space_id(data,fn){
			if(this.space_id.length>0){
				fn(this.backArr(this.space_id,data))
				return
			}
			this.api.data_filter_ad_space_id().then((ban)=>{
				this.space_id = ban;			
				fn(this.backArr(ban,data));
			});
		},
		get_ad_space_name(data,fn){
			if(this.space_name.length>0){
				fn(this.backArr(this.space_name,data))
				return
			}
			this.api.data_filter_ad_space_name().then((ban)=>{
				this.space_name = ban;			
				fn(this.backArr(ban,data));
			});
		},
		get_ad_space_type(data,fn){
			if(this.space_type.length>0){
				fn(this.backArr(this.space_type,data))
				return
			}
			this.api.data_filter_ad_space_type().then((ban)=>{
				this.space_type = ban;			
				fn(this.backArr(ban,data));
			});				
		},
		get_channel(data,fn){	
			if(this.channel.length>0){
				fn(this.backArr(this.channel,data))
				return
			}
			this.api.data_filter_channel().then((ban)=>{
				this.channel = ban;
				
				fn(this.backArr(ban,data));
			});				
		},
		backArr(data,xz){
			if(!xz){
				xz='';
			}
		    let arr = [];
			if(!data){
				return arr;
			}
		    for(let i=0,n=data.length;i<n;i++){
		    	if(String(data[i]).indexOf(xz)==0){
		    		arr.push({value:data[i]});
		    	}
		    	
		    }
		    return arr;
		},
	}	
}
</script>
<style>
.newBt{
	min-height: 160px;
	background:rgba(255,255,255,1);
	box-shadow:0px 1px 8px 0px rgba(0, 0, 0, 0.08);
	padding: 20px 40px;
	margin-bottom: 30px;
}
.newBt_1{
	font-size:14px;
font-family:PingFang-SC-Bold;
font-weight:bold;
color:rgba(0,0,0,1);
margin-bottom: 50px;
}
.newBt_1>span{
	cursor: pointer;
}
.newBt_2>div{
	display: inline-block;
	margin-right: 84px;
	margin-bottom: 15px;
}
.newBt_2>div>span{
	margin-right: 10px;
	font-size:12px;
font-family:PingFang-SC-Light;
font-weight:300;
color:rgba(0,0,0,1);
opacity:0.85;

}
.xsffbtn{
	position: absolute;
    top: 96px;
    right: 41px;
    width: 82px;
    height: 28px;
    background: rgba(255,120,117,1) !important;
    border-radius: 14px;
    line-height: 28px !important;
    padding: 0 !important;
    border: none !important;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255,255,255,1) !important;
}
.tipNew{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.3);
	z-index: 20;
}
.tipNew_1{
	width: 100%;
	height: 100%;
}
.tipNew_2{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	-moz-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
}
.tipNew_2_1{
	width:640px;
	height:36px;
	padding: 0 27px;
	line-height: 36px;
	background:rgba(255,156,110,1);
	font-size:16px;
font-family:PingFang-SC-Bold;
font-weight:bold;
color:rgba(255,255,255,1);
}
.tipNew_2_2{
	padding: 20px 27px;
	background:rgba(250,247,246,1);
}
.tipNew_2_2 h1{
font-size:14px;
font-family:PingFang-SC-Medium;
font-weight:bold;
color:rgba(0,0,0,1);
opacity:0.9;
margin-bottom:9px ;
}
.tipNew_2_2 p{
font-size:12px;
font-family:PingFang-SC-Light;
font-weight:300;
color:rgba(0,0,0,1);
opacity:0.7;
margin-bottom:17px ;
}
.gbclos{float: right;cursor: pointer;}
.fontwh{
	opacity: .4;
    font-size: 14px;
    margin-left: 6px;
}
</style>
