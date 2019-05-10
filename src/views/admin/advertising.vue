<template>
	<div>
		<div class="top_name">
			<span class="inner">|</span>
			<span class="top_txt">素材库>广告</span>
		</div>
		<div class="content">
			<div class="Search">
				<input type="text" placeholder="输入用户名或邮箱快速查询" v-model="search" @input="getList()"/>
				<img src="../../../public/img/ss.png" @click="getList()"/>
				<span class="Search_tit" @click="getCon">添加本地素材</span>
			</div>
			<div class="contentImg">
				<div class="label">
					<span class="label_txt">预置标签:</span>
					<span v-for="(item,index) in preset_tags" class="labelName" @click="">{{item.name}}</span>
				</div>
				<div>
					<span class="label_txt">个性标签:</span>
					<span v-for="(item,index) in self_tags" class="labelName">{{item.name}}</span>
				</div>
				<div class="box">
					<div class="boxImg" v-for="(DL,index) in IMGList">
						<img :src="DL.prev_uri"/>
						<div class="boxImg_right" >
							<div class="boxImg_right_1">
								<div>
									<span class="boxImg_text">素材ID:</span>
									<span class="boxImg_content">{{DL.mid}}</span>
								</div>
								<div>
									<span class="boxImg_text">尺寸:</span>
									<span class="boxImg_content"></span>
								</div>
								<div>
									<span class="boxImg_text">素材状态:</span>
									<span class="boxImg_content">{{DL.status==1201?'禁用':'启用'}}</span>
								</div>
								<div>
									<span class="boxImg_text boxImg_bq">标签:</span>
									<div class="boxImg_xz">
										<span class="box_box" v-for="(tag,index2) in DL.self_tags">{{tag}}</span>
										<span class="box_box" v-for="(ta,index3) in DL.tags">{{ta}}</span>
										<img src="../../../public/img/add.png" @click="XStag"/>
									</div>

								</div>
							</div>
							<div  class="boxImg_right_2">
								<div>
									<span class="boxImg_text">素材使用记录:</span>
									<span class="ck">查看详情</span>
								</div>
								<div>
									<span class="boxImg_text">相关素材:</span>
									<span class="ck">查看详情</span>
								</div>
								<div>
									<span class="boxImg_text">更新时间:</span>
									<span class="boxImg_content">{{DL.updated_at}}</span>
								</div>
								<div>
									<span class="boxImg_text">附件:</span>
									<span class="boxImg_content">{{parseInt(DL.attach.size/1024)}}kb</span>
									<a class="dowload" :href="DL.attach.url">下载</a>
								</div>
							</div>
						</div>
						<img src="../../../public/img/bj.png" class="bjImg" @click="getLt(index)"/>
					</div>
				</div>
				<div class="block">
					<el-pagination
							@size-change="handleSizeChange1"
							@current-change="handleCurrentChange1"
							:current-page.sync="currentPage"
							:page-size="pageSize"
							layout="prev, pager, next,total, jumper"
							:total="total">
					</el-pagination>
				</div>
			</div>
			<con v-if="sc" :message="message" :hqUrl="hqUrl" :bindMid="bindMid" :material="material"></con>
			<hin v-if='hint'></hin>
			<tag v-if="tags"></tag>
			<set v-if="sets" :type='type'  @listenToChildEvent="listen"></set>
		</div>
	</div>

</template>
<script>
import con from './content_component'
import hin from './hintMessage'
import tag from './tag'
import set from './Select_material'
export default {
	components:{con,hin,tag,set},
    data() {
		return {
			sc:false,
			hint:false,
			tags:false,
			sets:false,
			IMGList:[],
            search:'',
            pageSize: 10,
            total: 0,
            currentPage: 1,
            type:'ad_picture',
			message:{},
            preset_tags:[],
            self_tags:[],
            bindMid:'',
			hqUrl:'',
            material:1
		}
    },
	mounted() {
        this.getList()
	}, 
	methods: {
        getCon(){
            this.sc = true;
		},
	    SCsc(){
            this.sc = true
		},

		heidSc(){
			this.sc = false
		},
		ShowHint(){
		    this.hint = true;
		    this.sc = false
		},
		YCHint(){
            this.hint = false;
		},
		XStag(){
		    this.tags = true
		},
        YCtag(){
            this.tags = false
        },
        XSset(){
            this.sc = false;
            this.sets = true
		},
		YCset(){
            this.sets = false
		},
        listen(msg,ddd){
			this.bindMid=msg;
			this.hqUrl=ddd

		},
        handleSizeChange1() { // 每页条数切换
            this.pageSize = pageSize;
            console.log(this.pagesize);
			this.getList()
        },
        handleCurrentChange1(currentPage) {//页码切换
            console.log(currentPage);
            this.currentPage = currentPage;
            this.getList()
        },
        getLt(a){
            let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search}
            this.api.material_search({params}).then((res)=>{
                this.IMGList=res.data;
                if(a!=undefined){
                    this.message = res.data[a];
                    this.sc = true;
                }
            })
        },
        getTagsList(){
            let params = {preset:this.preset};
            this.api.tags_search({params}).then((da)=>{
                console.log(da);
                this.preset_tags = da.data.preset_tags;
                this.self_tags = da.data.self_tags
            })
        },
		getList(){
		    let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search}
		    this.api.material_search({params}).then((res)=>{
				this.IMGList=res.data;
                this.total=res.total;
                this.getTagsList()
			})
		},

    },
	
}	
</script>
<style>
.top_name{
	width:100%;
	height:50px;
	background:rgba(255,255,255,1);
	box-shadow:0px 0px 6px 0px rgba(0, 0, 0, 0.04);
	position: fixed;
	left: 220px;
	top:65px;
}
.inner{
	margin-left: 18px;
	color:rgba(19,159,248,1);
	margin-right: 10px;
	border-radius:2px;
}
.top_name>span{
	display: inline-block;
	line-height: 50px;
}
.top_txt{
	font-size:14px;
	font-family:PingFang-SC-Regular;
	font-weight:400;
	color:rgba(153,153,153,1);
	line-height:36px;
}
.content{
	width: 100%;
	height: 100%;
	background:rgba(255,255,255,1);
	box-shadow:0px 0px 6px 0px rgba(0, 0, 0, 0.04);
	margin-top: 135px;
}
.Search{
	margin-left: 40px;
	margin-bottom: 34px;
}
.Search img{
	width: 28px;
	position: relative;
	left: -40px;
	top: 10px;
	cursor: pointer;
}
.Search input{
	width:435px;
	height:50px;
	background:rgba(255,255,255,1);
	box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.08);
	border-radius:5px;
	margin-left: 0;
	margin-top: 29px;
}
.Search_tit{
	display: inline-block;
	width:140px;
	height:48px;
	background:rgba(19,159,248,1);
	border-radius:5px;
	font-size:16px;
	font-family:PingFang-SC-Regular;
	font-weight:400;
	color:rgba(255,255,255,1);
	line-height:48px;
	text-align: center;
	float: right;
	margin-top: 29px;
	margin-right: 40px;
}
.label{
	margin-bottom: 18px;
}
.labelName{
	display: inline-block;
	width:78px;
	height:38px;
	background:rgba(255,255,255,1);
	border:1px solid rgba(153,153,153,1);
	border-radius:5px;
	font-size:16px;
	font-family:PingFang-SC-Regular;
	font-weight:400;
	color:rgba(54,54,54,1);
	margin-right: 18px;
	text-align: center;
	line-height: 38px;
	cursor: pointer;
}
.label_txt{
	font-size:16px;
	font-family:PingFang-SC-Regular;
	font-weight:400;
	color:rgba(102,102,102,1);
	margin-right: 16px;
}
.contentImg{
	margin: 0 40px;
}
.active{
	background:rgba(255,255,255,1);
	border:1px solid rgba(19,159,248,1);
}
.box{
	margin: 30px 40px!important; ;
}
.boxImg{
	display: inline-block;
	width:690px;
	padding: 18px 0 18px 30px;
	height:201px;
	background:rgba(255,255,255,1);
	box-shadow:0px 0px 10px 0px rgba(153,153,153,0.14);
	border-radius:5px;
	margin-right: 40px!important;
}
.boxImg:nth-child(2n){
	margin-right: 0!important;
}
.boxImg img{
	width: 113px;
	height: 201px;
	margin-right: 24px;
}
.boxImg_right{
	display: inline-block;
	vertical-align: top;
}
.boxImg_right_1 img{
	width: 28px;
	height: 28px;
	margin-left: 15px;
	margin-right: 0;
}
.boxImg_right_1,.boxImg_right_2{
	display: inline-block;
	vertical-align: top;
}
.boxImg_text,.boxImg_content{
	display: inline-block;
	font-size:16px;
	font-family:PingFang-SC-Regular;
	font-weight:400;
	color:rgba(54,54,54,1);
	margin-bottom: 15px;
}

.boxImg_right_1 .boxImg_text{
	width: 70px;
	margin-right: 11px;
}
.boxImg_right_2 .boxImg_text{
	width: 100px;
	margin-right: 12px;
}
.ck{
	color:rgba(19,159,248,1);
	cursor: pointer;
}
.box_box{
	display:inline-block;
	background:rgba(255,255,255,1);
	border:1px solid rgba(230,230,230,1);
	border-radius:14px;
	font-size:14px;
	font-family:PingFang-SC-Regular;
	font-weight:400;
	color:rgba(153,153,153,1);
	padding: 5px 10px;
	margin-right: 12px;
	margin-bottom: 8px;
}
.box_box:nth-child(2n){
	margin-right: 0;
}
.boxImg_xz{
	display: inline-block;
	width: 170px;
	max-height: 80px;
	overflow: hidden;
}
.boxImg_bq{
	vertical-align: top;
}
.dowload{
	display: inline-block;
	width:66px;
	height:28px;
	background:rgba(255,255,255,1);
	border:1px solid rgba(153,153,153,1);
	border-radius:14px;
	font-size:14px;
	font-family:PingFang-SC-Regular;
	font-weight:400;
	color:rgba(54,54,54,1);
	text-align: center;
	line-height: 28px;
	margin-left: 20px;
}
.bjImg{
	width: 20px!important;
	height: 20px!important;
	position: relative;
	margin-right: 0!important;
	right: 0px!important;
	top: -180px;
}
	.block{
		text-align: right;
	}
</style>