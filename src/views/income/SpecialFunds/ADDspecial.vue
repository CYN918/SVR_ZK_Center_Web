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
                <span>结算方</span>
                <select style="margin-top: 29px">
                    <option></option>
                </select>
            </div>
            <div>
                <span>支出金额</span>
                <input type="text">
            </div>
            <div>
                <span>状态</span>
                <select>
                    <option></option>
                </select>
            </div>
            <div>
                <span style="vertical-align: top">备注</span>
               <textarea></textarea>
            </div>
            <div>
                <span>附件</span>
                <div class="uplaod">
                    <el-upload
                            class="upload-demo"
                            :limit="1"
                            :on-exceed="handleExceed"
                            :on-remove="handleRemove"
                            :http-request="uploadFile"
                            action="111">
                        <el-button size="small" type="primary">上传</el-button>
                    </el-upload>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "a-d-dspecial",
        data(){
            return{}
        },
        methods:{
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
        margin-top: 148px;
        background: #fff;
        min-height: 760px;
    }
    .content>div>span{
        display: inline-block;
        width:116px;
        height:20px;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 0 24px 0 0;
        text-align: right;
    }
    select{
        width:467px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-bottom: 24px;
    }
    input{
        width:457px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-bottom: 24px;
    }
    textarea{
        width:448px;
        height:68px;
        padding: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-bottom: 24px;
    }
    .uplaod{
        display: inline-block;
        width:96px;
    }
   .content .uplaod .upload-demo{
        width: 100%;
    }
</style>