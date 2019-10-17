<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh()">特殊款项管理 &nbsp;/</span>
                <span class="new_url">&nbsp;添加特殊款项</span>
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
                <select>
                    <option></option>
                </select>
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
                <span class="bc">保存</span>
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
        },
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:62px;
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
        margin-top: 142px;
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
        margin:27px 0 0 20px;
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
   .bc{
       display: inline-block;
       width:68px;
       height:36px;
       background:rgba(51,119,255,1);
       border-radius:4px;
       line-height: 36px;
       text-align: center;
       cursor: pointer;
       margin-left: 140px;
       color: #fff!important;
   }

    select{
        width:467px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
</style>