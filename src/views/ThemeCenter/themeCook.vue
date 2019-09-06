<template>
        <div>
            <div class="top_name">
                <div>
                    <span class="theme_name">主题库</span>
                    <span class="top_txt">共</span>
                    <span class="top_txt">200</span>
                    <span class="top_txt">套/</span>
                    <span class="top_txt">120</span>
                    <span class="top_txt">套已上架</span>
                    <span class="tit_right" @click="upTheme()">上传主题</span>
                </div>
            </div>
            <div class="polling">
                <div class="polling_tag">
                    <span class="tag_name">内容标签</span>
                    <span class="labelName">全部</span>
                    <span class="unfold" v-if="isType==0" @click="expansion">展开</span>
                    <img style="width: 10px;height: 6px" src="../../../public/img/xs.png" v-if="isType==0"/>
                    <span class="unfold" v-if="isType==1" @click="expansion">收起</span>
                    <img style="width: 10px;height: 6px" src="../../../public/img/sq.png" v-if="isType==1"/>
                </div>
                <div class="polling_tag">
                    <span class="tag_name">运营标签</span>
                    <span class="labelName">全部</span>
                    <span class="unfold" v-if="isTypes==0" @click="expansionTag">展开</span>
                    <img style="width: 10px;height: 6px" src="../../../public/img/xs.png" v-if="isTypes==0"/>
                    <span class="unfold" v-if="isTypes==1" @click="expansionTag">收起</span>
                    <img style="width: 10px;height: 6px" src="../../../public/img/sq.png" v-if="isTypes==1"/>
                </div>
                <div>
                    <el-date-picker
                            class="time"
                            v-model="value1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                    <span class="tit_name">渠道</span>
                    <select style="margin-right: 40px">
                        <option>全部</option>
                    </select>
                    <span class="tit_name">厂商UI版本</span>
                    <select style="margin-right: 68px">
                        <option>全部</option>
                    </select>
                    <span class="tit_name">状态</span>
                    <select>
                        <option>全部</option>
                    </select>
                </div>
                <div>
                    <img src="../../../public/img/ss.png" class="img"/>
                    <input type="text" placeholder="搜索主题库"/>
                    <span class="tit_name">主题类型</span>
                    <select style="margin-right: 54px">
                        <option>全部</option>
                    </select>
                    <span class="tit_name">内容分类</span>
                    <select style="margin-right: 40px">
                        <option>全部</option>
                    </select>
                    <span class="tit_name">适用范围</span>
                    <select style="margin-right: 24px">
                        <option>全部</option>
                    </select>
                    <span class="cx">查询</span>
                </div>
            </div>
            <div>
                <div class="phone">
                    <div style="width:189px;height:315px;">
                        <img src="../../../public/img/IMG.png" style="height: 100%;width: 100%">
                        <div class="select_type">
                            <span>本地</span>
                            <img src="../../../public/img/zk.png" style="width: 9px;height: 5px"/>
                            <div class="select_con">
                                <el-radio-group v-model="radio" class="radio">
                                    <el-radio :label="3">VIVO海外</el-radio>
                                    <el-radio :label="6">VIVO海外</el-radio>
                                    <el-radio :label="9">备选项</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                    <div class="bottom_name">
                        <span>主题名称最多十个字数</span>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: "theme-cook",
        data(){
            return{
                radio:[],
                value1:[],
                isType:0,
                isTypes:0,
            }
        },
        methods:{
            expansion(){
                if(this.isType==0){
                    this.isType=1
                }else{
                    this.isType=0
                }

            },
            expansionTag(){
                if(this.isTypes==0){
                    this.isTypes=1
                }else{
                    this.isTypes=0
                }
            },
            upTheme(){
                this.$router.push({
                    path:'./themeUp'
                })
            },
        },
    }
</script>

<style scoped>
    .top_name{
        width: 86%!important;
        height: 61px!important;
    }
    .theme_name{
        display: inline-block;
        font-size:18px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 19px 9px 0 24px;
    }
    .polling{
        margin-top: 150px;
        background: #FFFFFF;
        margin-bottom: 24px;
    }
    .polling_tag{
        margin-left: 24px;
        height: 60px;
        margin-right: 22px;
        border-bottom: 1px dashed #E6E9F0;
    }
    .tag_name{
        display: inline-block;
        line-height: 60px;
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(143,155,179,1);
        margin-right: 32px;
    }
    .labelName{
        padding: 0 10px;
    }
    .unfold{
        display: inline-block;
        font-size:12px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(121,130,148,1);
        cursor: pointer;
        margin-right: 5px;
    }
    .time{
        margin:16px 40px 16px 24px;
        width:272px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .tit_name{
        display: inline-block;
        margin-right: 14px;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    input{
        margin-left: -5px;
        padding-left: 35px;
        margin-right: 12px;
        width:235px;
        height:32px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
   .img{
        position: relative;
        left: 35px;
        top: 10px;
    }
    .cx{
        display: inline-block;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height: 36px;
        text-align: center;
        margin-bottom: 23px;
    }
    .bottom_name{
        display: inline-block;
        width:189px;
        height:34px;
        background:rgba(255,255,255,1);
        opacity:0.8;
    }
    .bottom_name span{
        display: inline-block;
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        margin: 9px 0 0 10px;
    }
    .select_type{
        display: inline-block;
        position: relative;
        bottom: 38px;
        left: 0;
        z-index: 999;
        width:189px;
        height:34px;
        background:rgba(10,10,10,1);
        opacity:0.81;
    }
    .phone{
        display: inline-block;
       margin-right: 40px;
    }
    .select_type span{
        display: inline-block;
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(230,233,240,1);
        margin: 9px 8px 0 14px;
    }
    .select_type:hover .select_con{
        opacity: 1;
    }
    .select_con{
        width:189px;
        height:207px;
        background:rgba(28,28,28,1);
        border-radius:4px;
        opacity: 0;
        position: relative;
        left: 0;
        bottom: 233px;
    }
    .select_con input{
        width: 16px;
        height: 16px;
    }
    .radio{margin: 0px 9px}
    .radio .el-radio{
       margin: 16px 3px 0 3px;
    }
    .radio .el-radio__label{
        color: #fff!important;
    }
    .tit_right{
        display: inline-block;
        float: right;
        line-height: 36px;
        text-align: center;
        width:96px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        margin-right: 36px;
        cursor: pointer;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-top: 13px;
    }
</style>