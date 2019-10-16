<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh('-1')">收款结算 &nbsp;/</span>
                <span class="new_url">&nbsp;新建收款结算</span>
            </div>
            <div class="title_left">
                <span>新建收款结算</span>
                <div class="top_btn">
                    <span class="bj">编辑</span>
                    <span class="ck">查看变更记录</span>
                </div>
            </div>
        </div>
        <div class="tableBox">
            <div style="text-align: center;margin-bottom: 40px;max-width: 893px;border-bottom: 1px solid #ddd;position: relative;left: 50%;transform: translateX(-50%)">
                <div style="margin-right: 350px;text-align: center;border-bottom: 1px solid #3377ff;display: inline-block">
                    <div class="box boxs">1</div>
                    <span class="boxName">对账确认</span>
                </div>
                <div style="margin-right: 350px;text-align: center;display: inline-block">
                    <div class="box" @click="scope2()">2</div>
                    <span class="boxName">票据凭证</span>
                </div>
                <div style="text-align: center;display: inline-block">
                    <div class="box">3</div>
                    <span class="boxName">结算汇款</span>
                </div>

            </div>
            <div style="text-align: center" class="fill">
                <div>
                    <span class="fillName">结算方名称</span>
                    <div style="display: inline-block;width: 300px">
                        <span class="text">啊啊啊啊啊</span>
                    </div>

                </div>
                <div>
                    <span class="fillName">结算方</span>
                    <div style="display: inline-block;width: 300px">
                        <span  class="text"></span>
                        <span class="click">查看结算方信息</span>
                    </div>

                </div>
                <div>
                    <span class="fillName">结算时间段</span>
                    <div style="display: inline-block;width: 300px">
                        <span  class="text"></span>
                    </div>

                </div>
                <div>
                    <span class="fillName">预计结算金额</span>
                    <div style="display: inline-block;width: 300px">
                        <span  class="text"></span>
                        <span class="click">查看预计结算金额</span>
                    </div>

                </div>
                <div>
                    <span class="fillName">实际结算金额</span>
                    <div style="display: inline-block;width: 300px">
                        <span  class="text"></span>
                    </div>

                </div>
                <div>
                    <span class="fillName">备注说明</span>
                    <div style="display: inline-block;width: 300px">
                        <span  class="text"></span>
                    </div>

                </div>
                <div>
                    <div style="display: inline-block;width: 84px;margin-right: 20px;text-align: right">
                        <span class="fj">附件</span>
                    </div>
                    <div style="display: inline-block;width: 300px">
                        <div>
                            <span  class="text"></span>
                            <span class="click">查看</span>
                            <span class="click">下载</span>
                        </div>
                    </div>

                </div>
                <div class="fillBtn">
                    <span @click="fh">返回</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "establish",
        data(){
            return{}
        },
        methods:{
            fh(num){
                this.$router.go(num)
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleRemove(file, fileList) {
                this.file = '';
                this.initiate2 = false
            },
            uploadFile(file){
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{

                })
            },
            ADD(){
                this.$router.push({
                    path:"./establish2"
                })
            },
            scope2(){
                this.$router.push({
                    path:"./DetailsOfCollection2"
                })
            }
        }
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

    .title_left span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-left: 24px;
        margin-top: 15px;
        cursor: pointer;
    }
    .tableBox{
        margin-top: 182px;
        background: #fff;
        padding-top:48px ;
    }
    .box{
        width:32px;
        height:32px;
        border-radius: 50%;
        border:1px solid rgba(143,155,179,1);
        text-align: center;
        line-height: 32px;
        font-size:16px;
        font-family:HelveticaNeue;
        color:#8F9BB3;
        margin: 0 0 10px 15px;
    }
    .boxs{
        background:rgba(0,122,255,1)!important;
        color:rgba(255,255,255,1)!important;
        border: none!important;
    }

    .boxName{
        display: inline-block;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        margin-bottom: 5px;
        color:rgba(31,46,77,1);
    }
    .fill>div{
        margin-bottom: 20px;
    }
    .fillName{
        display: inline-block;
        width:84px;
        height:20px;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 21px;
        text-align: right!important;
    }
  .text{
      display: inline-block;
      font-size:14px;
      font-family:PingFangSC-Regular,PingFangSC;
      font-weight:400;
      color:rgba(109,119,139,1);
      text-align: left;
  }
    .fj{display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }

    .fillBtn span{
        display: inline-block;
        text-align: center;
        line-height: 36px;
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
        margin-bottom: 50px;
    }
    .click{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(51,119,255,1);
        margin-left: 10px;
        cursor: pointer;
    }
    .top_btn{
        display: inline-block;
        float: right;
        margin-right: 20%;
    }
    .top_btn span{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        width:68px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-top: 0!important;
    }
    .ck{
        width:124px!important;
        margin-left: 24px;
    }
</style>