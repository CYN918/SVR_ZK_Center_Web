<template>
    <div>
        <div class="top_name">
            <span class="inner">|</span>
            <span class="top_txt">投放库/面包屑</span>
            <div class="fh">
                <img src="../../../public/img/fh.png" style="width: 16px;margin-right: 10px"/>
                <span @click="fh">新建投放库</span>
            </div>
            <div class="top_con">
                <input type="text" placeholder="输入ID查询" v-model="search" @input="getDATAlist"/>
                <div class="top_btn">
                    <span class="xq" @click="delWL()">删除</span>
                    <span class="xq" @click="qx()">取消</span>
                </div>
            </div>
        </div>
        <div class="con">
            <div class="box">
                <div class="boxImg" v-for="(DL,index) in IMGList">
                    <div class="border" :class="{active:ind==index}" @click="ADDclass(index)">
                        <div class="img_box">
                            <img :src="DL.prev_uri"/>
                        </div>
                    <div class="boxImg_right" >
                        <div class="boxImg_right_1">
                            <div>
                                <span class="boxImg_text">物料ID:</span>
                                <span class="boxImg_content">{{DL.mfid}}</span>
                            </div>
                            <div>
                                <span class="boxImg_text boxImg_bq">标签:</span>
                                <div class="boxImg_xz">
                                    <span class="box_box" v-for="(tag,index2) in DL.self_tags">{{tag}}</span>
                                    <span class="box_box" v-for="(ta,index3) in DL.tags">{{ta}}</span>
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
                                <span class="boxImg_content">{{parseInt(DL.size/1024)}}kb</span>
                                <a class="dowload">下载</a>
                            </div>
                        </div>
                    </div>
                    <div class="bjImg" @click="getLt(index)">
                        <span>编辑素材</span>
                    </div>
                        <div class="img_right" :class="{active_class:ind==index}"><span>√</span></div>
                </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        name: "details_library",
        data(){
            return{
                IMGList:[],
                ind:null,
                bind_mfid:'',
                search:'',
            }
        },
        mounted(){
            this.getDATAlist();
        },
        methods:{
            fh(){
                this.$router.go(-1)
            },
            getDATAlist(){
                let params = {id:this.$route.query.id,search:this.search};
                this.api.putlib_binds({params}).then((res)=>{
                    this.IMGList = res;
                    console.log(this.IMGList)
                })
            },
            ADDclass(index){
                this.ind =index;
                this.bind_mfid = this.IMGList[index].mfid;
            },
            delWL(){
                let formData = new FormData;
                formData.append('id',this.$route.query.id);
                formData.append('bind_mfid',JSON.stringify([this.bind_mfid]));
                this.api.putlib_del_mfinal(formData).then((res)=>{
                    this.getDATAlist();
                })
            },
            qx(){
                this.ind=null;
                this.bind_mfid=''
            }
        },
    }
</script>

<style scoped>
    .top_name{
        height: 167px!important;
    }
    .top_name img{
        display: inline-block;
        width:20px;
        margin-left: 24px;
    }
    .top_con{
        margin: 24px 0 0 24px;
    }
    .top_con input{
        width:339px;
        height:36px;
        padding-left: 5px;
        background:rgba(255,255,255,1);
        border-radius:4px 0px 0px 4px;
        border:1px solid rgba(211,219,235,1);
    }
    .top_btn{
        display: inline-block;
        float: right;
        margin-right: 274px
    }
    .top_btn span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
    }
    .wl{
        width:144px;
        height:36px;
        background:rgba(242,246,252,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 24px;
    }
    .boxImg{
        padding: 0!important;
        width:793px!important;
        height:353px!important;
        margin-right: 13px;
    }
    .border{
        padding:13px 0 14px 14px ;
        width: 98%;
        height: 91%;
        border: 2px solid #ddd;
    }
    .active_class{
        border-color: #1583e2 #1583e2 transparent transparent!important;
    }
    .active{
        border: 2px solid #3377FF!important;
    }
    .xq{
        width:124px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        color:rgba(255,255,255,1);
        margin-right: 20px;
    }
    .gl{
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        color:rgba(255,255,255,1) ;
    }
    .img_right{
        display: inline-block;
        width: 0!important;
        height: 0!important;
        position: relative;
        top: -384px;
        right: -738px;
        cursor: pointer;
        border: 20px solid;
        border-color: rgba(211,219,235,1) rgba(211,219,235,1) transparent transparent;


    }
    .img_right span{
        display: inline-block;
        color: #fff;
        position: relative;
        right: -3px;
        top: -17px;

    }
    .con{
        width: 100%;
        height: 100%;
        margin-top: 251px;
    }
    .boxImg .img_box{
        display: inline-block;
        width:252px;
        height:326px;
        background:#e3e7eb;
        border-radius:4px;
        margin-right: 24px;
        text-align: center;
    }
</style>