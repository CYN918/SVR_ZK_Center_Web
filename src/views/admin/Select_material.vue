<template>
    <div class="bg">
        <div class="content">
            <div class="tit_name">
                <span>从素材库选择素材</span>
            </div>
            <div class="Search">
                <div class="Search_select">
                    <span class="Search_select_tit">素材类型：</span>
                    <select>
                        <option>广告图</option>
                    </select>
                </div>
                <input type="text" placeholder="输入用户名或邮箱快速查询" v-model="search"/>
                <img src="../../../public/img/ss.png" />
            </div>
            <div class="contentImg">
                <div class="label">
                    <span class="label_txt">预置标签:</span>
                    <span v-for="(item,index) in preset_tags" class="labelName">{{item.name}}</span>
                </div>
                <div>
                    <span class="label_txt">个性标签:</span>
                    <span v-for="(item,index) in self_tags" class="labelName">{{item.name}}</span>
                </div>
                <div class="box">
                    <div class="box_select" v-for="(DL,index) in IMGList">
                        <!--<input type="radio"/>-->
                        <el-radio v-model="radioSize" :label="index" @change="getID(index)"></el-radio>
                        <div class="boxImg">
                            <img :src="DL.prev_uri"/>
                            <div class="boxImg_right">
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
                                            <img src="../../../public/img/add.png" />
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
                            <img src="../../../public/img/bj.png" class="bjImg"/>
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
            <div class="select_btn">
                <span class="select_btn_left" @click="messageID">确定</span>
                <span @click="YCset">取消</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "select_material",
        props:['type'],
        data(){
            return {
                radioSize:'',
                pageSize: 10,
                total: 0,
                currentPage: 1,
                preset_tags:[],
                self_tags:[],
                IMGList:[],
                search:'',
                scMid:'',
                scUrl:''
            }
        },
        mounted() {
            this.getList()

        },
        methods:{
            getID(index){
              this.scMid =  this.IMGList[index].mid;
              this.scUrl = this.IMGList[index].prev_uri;
            },
            YCset(){this.$parent.SCsc();this.$parent.YCset()},
            messageID(){
                this.$emit('listenToChildEvent', this.scMid,this.scUrl,true);
                this.$parent.SCsc();
                this.$parent.YCset();
            },
            getList(){
                let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search}
                this.api.material_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    this.total=res.total;
                    this.getTagsList()
                })
            },
            getTagsList(){
                let params = {preset:this.preset};
                this.api.tags_search({params}).then((da)=>{
                    this.preset_tags = da.data.preset_tags;
                    this.self_tags = da.data.self_tags
                })
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
        },
    }
</script>

<style scoped>
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
    }
    .content{
        position: absolute;
        width:1660px;
        height:1005px;
        background:rgba(255,255,255,1);
        border-radius:5px;
        top:40%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .tit_name{
        margin: 50px 0 28px 0;
        text-align: center;
    }
    .tit_name span{
        font-size:20px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(54,54,54,1);
    }
    .Search_select{
        display: inline-block;
        margin-right: 30px;
    }
    .Search_select_tit{
        display: inline-block;
        font-size:16px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(54,54,54,1);
        line-height: 50px;
        margin-right: 16px;
    }
    .Search_select>select{
        width:260px;
        height:50px;
        border:1px solid rgba(230,230,230,1);
        border-radius:5px;
    }
    .top_name>span{
        display: inline-block;
        line-height: 50px;
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
        margin: 30px 14px !important;
    }
    .box_select{display: inline-block}
    .box_select:nth-child(2n){
        margin-left: 26px;
    }
    .box_select input{
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 18px;
        margin-left: 0!important;
    }
    .boxImg{
        display: inline-block;
        width:690px;
        padding: 18px 0 18px 30px;
        height:201px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 10px 0px rgba(153,153,153,0.14);
        border-radius:5px;
        margin-right: 60px;
    }
    .boxImg:nth-child(2n){
        margin-right: 0px;

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
        right: -20px;
        top: -180px;
    }
    .select_btn{
        text-align: center;
    }
    .select_btn span{
        display: inline-block;
        width:140px;
        height:50px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(153,153,153,1);
        border-radius:5px;
        font-size:16px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(54,54,54,1);
        line-height: 50px;
        cursor: pointer;
    }
    .select_btn_left{
        border: 0!important;
        background:rgba(19,159,248,1)!important;
        color:rgba(255,255,255,1)!important;
        margin-right: 40px;
    }
</style>