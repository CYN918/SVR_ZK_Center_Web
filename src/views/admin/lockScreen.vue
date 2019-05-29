<template>
	<div>
		<div class="top_name">
			<span class="inner">|</span>
			<span class="top_txt">物料库>广告</span>
		</div>
		<div class="content">
			<div class="Search">
				<input type="text" placeholder="输入用户名或邮箱快速查询" v-model="search" @input="getList()"/>
				<img src="../../../public/img/ss.png" @click="getList()"/>
				<span style="font-size:14px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(31,46,77,1);margin-right: 20px">状态</span>
				<select v-model="status" @click="getWl()">
					<option value="" selected>全部</option>
					<option value="1101">使用中</option>
					<option value="1001">未使用</option>
					<option value="1201">禁用</option>
				</select>
				<span class="Search_tit" @click="getCon">添加本地素材</span>
			</div>
			<div class="contentImg">
				<div class="label">
					<span class="label_txt">预置标签:</span>
					<span class="labelName" @click="getListTag()">全部</span>
					<span v-for="(item,index) in preset_tags" class="labelName" @click="getListTag(item.name,index)" :class="{active:inx==index}">{{item.name}}</span>
				</div>
				<div class="label">
					<span class="label_txt">个性标签:</span>
					<span class="labelName" @click="getListTag()">全部</span>
					<span v-for="(item,index) in self_tags" class="labelName" @click="getListTag2(item.name,index)" :class="{active:inde==index}">{{item.name}}</span>
				</div>
			</div>
			<rel v-if="getRe" :num="num" :material="material" ></rel>
			<AM v-if="sc" :message="message" :hqUrl="hqUrl" :bindMid="bindMid" :material="material" :types="type"></AM>
			<hin v-if='hint' ></hin>
			<tag v-if="tags" :message="message" :typeSC='type' :material="material" @updata="updata"></tag>
			<set v-if="sets" :typeSC='type'  @listenToChildEvent="listen" :material="material"></set>
		</div>
		<div class="box">
			<div class="boxImg" v-for="(DL,index) in IMGList">
				<img :src="DL.prev_uri"/>
				<div class="boxImg_right" >
					<div class="boxImg_right_1">
						<div>
							<span class="boxImg_text">物料ID:</span>
							<span class="boxImg_content">{{DL.mfid}}</span>
						</div>
						<div>
							<span class="boxImg_text boxImg_bq">标签:</span>
							<div class="boxImg_xz">
								<div class="boxImg_xz_yz">
									<span class="box_box"  v-for="(tag,index2) in DL.tags" v-if="tag!=''">{{tag}}</span>
									<span class="box_box"  v-for="(ta,index3) in DL.self_tags" v-if="ta!=''">{{ta}}</span>
								</div>
								<span class="img"  @click="XStag(index)">+ 标签</span>
							</div>
						</div>
						<div>
							<div class="zt">
								<span class="boxImg_text">素材状态:</span>
								<span class="boxImg_content">{{DL.status==1201?'禁用':'启用'}}</span>
							</div>
							<div class="cc">
								<span class="boxImg_text">预览图尺寸:</span>
								<span class="boxImg_content">{{DL.size}}</span>
							</div>
						</div>
						<div>
							<div class="xgsc">
								<span class="boxImg_text">相关素材:</span>
								<span class="ck" @click="getRel(index)">查看详情</span>
							</div>
							<div class="dx">
								<span class="boxImg_text">预览图大小:</span>
								<span class="boxImg_content">{{DL.size}}</span>
							</div>
						</div>

						<div>
							<span class="boxImg_text">物料使用记录:</span>
							<span class="ck">查看详情</span>
						</div>
						<div>
							<span class="boxImg_text">动效实现方式:</span>
							<span class="boxImg_content">{{DL.model}}</span>
						</div>
						<div>
							<span class="boxImg_text">链接:</span>
							<span class="boxImg_content">{{DL.link}}</span>
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
				<div class="bjImg" @click="getLt(index)">
					<span>编辑素材</span>
				</div>
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

</template>
<script>
    import rel from './relevant_matreial'
    import AM from './AddMaterial'
    import hin from './hintMessage'
    import tag from './tag'
    import set from './Select_material'
    export default {
        components:{AM,hin,tag,set,rel},
        data() {
            return {
                sc:false,
                hint:false,
                tags:false,
                sets:false,
                IMGList:[],
                search:'',
                pageSize: 4,
                total: 0,
                currentPage: 1,
                type:'f_sls_lockscreen',
                message:{},
                preset_tags:[],
                preset:[],
                self_tags:[],
                bindMid:[],
                hqUrl:[],
                material:0,
                getRe:false,
                num:'',
                inx:null,
                inde:null,
                status:null,
            }
        },
        mounted() {
            this.getWl()
        },
        methods: {
            getCon(){
                this.sc = true;
                this.message=''
            },
            SCsc(){
                this.sc = true
            },

            heidSc(){
                this.sc = false;
                this.hqUrl=''
                this.bindMid=''
            },
            ShowHint(){
                this.hint = true;
            },
            YCHint(){
                this.hint = false;
            },
            getRel(index){
                this.getRe=true;
                this.num =this.IMGList[index].mfid;
            },
            heidRel(){
                this.getRe=false;
            },
            YCtag(){
                this.tags = false
            },
            XSset(){
                this.sets = true
            },
            YCset(){
                this.sets = false
            },
            updata(){
                this.getWl()
            },
            listen(msg,ddd){
                this.bindMid=msg;
                this.hqUrl=ddd;
                console.log(this.bindMid,this.hqUrl);
            },
            handleSizeChange1() { // 每页条数切换
                this.pageSize = pageSize;
                console.log(this.pagesize);
                this.getWl()
            },
            handleCurrentChange1(currentPage) {//页码切换
                console.log(currentPage);
                this.currentPage = currentPage;
                this.getWl()
            },
            getLt(a){
                let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search,status:this.status}
                this.api.mfinal_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    if(a!=undefined){
                        this.message = res.data[a];
                        this.sc = true;
                    }

                })
            },
            XStag(a){
                let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search}
                this.api.mfinal_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    console.log(res.data);
                    if(a!=undefined){
                        this.message = res.data[a];
                        this.tags = true;
                    }
                })
            },
            getTagsList(){
                let params = {preset:this.preset,material:this.material,type:this.type};
                this.api.tags_search({params}).then((da)=>{
                    console.log(da);
                    this.preset_tags = da.data.tags;
                    this.self_tags = da.data.self_tags
                })
            },
            getWl(){
                let params={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search,status:this.status};
                this.api.mfinal_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    this.total=res.total;
                    this.getTagsList();
                })
            },
            getListTag(name,index){
                this.inx=index;
                let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:name,status:this.status}
                this.api.mfinal_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    this.total=res.total;
                    this.getTagsList()
                })
            },
            getListTag2(name,index){
                this.inde=index;
                let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:name,status:this.status}
                this.api.mfinal_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    this.total=res.total;
                    this.getTagsList()
                })
            },

        },

    }
</script>
<style>
	.active{
		color: #1583e2!important;
		border:0!important;}
</style>