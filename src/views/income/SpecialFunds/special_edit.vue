<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh()">特殊款项管理 &nbsp;/</span>
                <span class="new_url">&nbsp;特殊款项详情</span>
            </div>
            <div class="title_left">
                <img src="../../../../public/img/fh.png"  @click="fh()">
                <span>特殊款项详情</span>
                <div style="display: inline-block;float: right;margin-right: 15%">
                    <span class="bj" @click="add()">编辑</span>
                    <span class="ck">查看变更记录</span>
                </div>
            </div>
        </div>
        <div class="content">
            <div>
                <span class="TitName">结算方</span>
                <span class="text"></span>
                <span class="click">查看结算方信息</span>
            </div>
            <div>
                <span  class="TitName">支出金额</span>
                <span class="text"></span>
            </div>
            <div>
                <span  class="TitName">状态</span>
                <span class="text"></span>
            </div>
            <div>
                <span  class="TitName">备注</span>
                <span class="text"></span>
            </div>
            <div>
                <span  class="TitName">附件</span>
                <div style="display: inline-block">
                    <div>
                        <span  class="text"></span>
                        <span class="click">查看</span>
                        <span class="click">下载</span>
                    </div>
                </div>
            </div>
            <div>
                <span class="boxBtn">返回</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "change",
        data(){
            return{}
        },
        methods:{
            fh(){
                this.$router.go(-1)
            },
            add(){
                this.$router.push({
                    path:"./AddEdit"
                })
            }
        },
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:98px;
        border-top: 1px solid #ededed;
        background: white;
        -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
        position: fixed;
        left: 256px;
        top: 63px;
        z-index: 99;
    }
    .new_url{color: rgba(61,73,102,1)!important;}
    .content{
        margin-top: 182px;
        background: #fff;
        min-height: 760px;
    }
    .TitName{
        width:116px;
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 26px 21px 0 56px;
        text-align: right;
    }
    .text{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(109,119,139,1);
    }
    .click{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left: 12px;
        cursor: pointer;
    }
    .boxBtn{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        margin:28px 0 0 173px;
    }
    .title_left span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-top: 15px;
        cursor: pointer;
    }
    .title_left img{
        width:12px;
        height:12px;
        margin-right: 9px;
        margin-left: 24px;
    }
    .bj,.ck{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
    }
    .ck{
        width:124px!important;
        margin-left: 24px;
    }
</style>