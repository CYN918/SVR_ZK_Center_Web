<template>
    <div>
        <div class="top_name">
            <span class="inner">|</span>
            <span class="top_txt">投放库/面包屑</span>
            <div class="fh">
                <img src="../../../public/img/fh.png"/>
                <span @click="fh">新建投放库</span>
            </div>
            <div class="top_con">
                <input type="text" placeholder="输入用户名或邮箱快速查询"/>
                <div class="top_btn">
                    <span class="wl" @click="getWl">从物料库添加</span>
                    <span class="xq" @click="Addyw">发布业务需求</span>
                    <span class="gl">管理</span>
                </div>
            </div>
        </div>
        <div class="con">
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
        </div>
        <YW v-if="yw"></YW>
    </div>
</template>

<script>
    import YW from './Add_business'
    export default {
        components:{YW},
        name: "details_library",
        data(){
            return{
                IMGList:[],
                yw:false,
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
                let params = {id:this.$route.query.id};
                this.api.putlib_binds({params}).then((res)=>{
                    this.IMGList = res;
                })
            },
            getWl(){

            },
            Addyw(){
                this.yw = true;
            },
        }
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
        margin-right: 244px;
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
    .con{
        width: 100%;
        height: 100%;
        margin-top: 251px;
    }
</style>