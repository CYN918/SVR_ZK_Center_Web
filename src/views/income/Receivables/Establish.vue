<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh('-1')">收款结算 &nbsp;/</span>
                <span class="new_url">&nbsp;新建收款结算</span>
            </div>
            <div class="title_left">
                <span>新建收款结算</span>
            </div>
        </div>
        <div class="tableBox">
                <div style="text-align: center;margin-bottom: 40px">
                    <div class="box boxs">1</div>
                    <span class="boxName">对账确认</span>
                    <div class="line"></div>
                    <div class="box">2</div>
                    <span class="boxName">票据凭证</span>
                    <div class="line"></div>
                    <div class="box">3</div>
                    <span class="boxName">结算汇款</span>
                </div>
            <div style="text-align: center" class="fill">
                <div>
                    <span class="fillName">结算方名称</span>
                    <input type="text" class="input">
                </div>
                <div>
                    <span class="fillName">结算方</span>
                    <input type="text" class="input">
                </div>
                <div>
                    <span class="fillName">结算时间段</span>
                    <div class="fillTime">
                        <el-date-picker
                                v-model="time"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format="yyyy-mm-dd"
                                value-format="yyyy-mm-dd"
                        >
                        </el-date-picker>
                    </div>
                </div>
                <div>
                    <span class="fillName">预计结算金额</span>
                    <input type="number" class="input">
                </div>
                <div>
                    <span class="fillName">实际结算金额</span>
                    <input type="number" class="input">
                </div>
                <div>
                    <span class="fillName">备注说明</span>
                    <textarea></textarea>
                </div>
                <div>
                    <div style="display: inline-block;width: 84px;margin-right: 20px">
                        <img src="../../../../public/img/wh.png" style="margin-right: 6px;cursor: pointer">
                        <span class="fj">附件</span>
                    </div>
                    <div class="uplaod">
                        <el-upload
                                class="upload-demo"
                                :limit="1"
                                :on-exceed="handleExceed"
                                :on-remove="handleRemove"
                                :http-request="uploadFile"
                                action="111">
                            <el-button size="small" type="primary">上传文件</el-button>
                        </el-upload>
                    </div>
                </div>
                <div class="fillBtn">
                    <span class="tj">提交</span>
                    <span>取消</span>
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
        display: inline-block;
        width:32px;
        height:32px;
        border-radius: 50%;
        border:1px solid rgba(143,155,179,1);
        text-align: center;
        line-height: 32px;
        font-size:16px;
        font-family:HelveticaNeue;
        color:#8F9BB3;
        margin: 0 8px 40px 0;
    }
    .boxs{
        background:rgba(0,122,255,1)!important;
        color:rgba(255,255,255,1)!important;
        border: none!important;
    }
    .line{
        display: inline-block;
        width:192px;
        height:1px;
        background:rgba(143,155,179,1);
        margin: 0 16px 0px 48px;
    }
    .boxName{
        display: inline-block;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
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
    input{
        width:457px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .fillTime{display: inline-block;
        width:467px
    }
    .fillTime .filtrate .timesDate .content_table .time .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100%;
    }
    textarea{
        width:468px;
        height:88px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .uplaod{
        width:474px;
        display: inline-block;
        text-align: left!important;
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
    }
    .tj{
        color: #fff!important;
        background: #3377ff!important;
        border: none!important;
        margin-right: 20px;
        margin-bottom: 50px;
    }
</style>