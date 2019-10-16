<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh('-2')">收款结算 &nbsp;/</span>
                <span class="log_url" @click="fh('-1')">&nbsp;收款结算方管理 &nbsp;/</span>
                <span class="new_url">&nbsp;添加结算方</span>
            </div>
            <div class="title_left">
                <span>添加结算方</span>
            </div>
        </div>
        <div class="tableBox">
            <div>
                <span class="titName">结算方名称</span>
                <input type="text" class="input">
            </div>
            <div>
                <span  class="titName">生成对账时间</span>
                <span class="titText">每月</span>
                <select>
                    <option>01</option>
                </select>
                <input type="checkbox" class="check">
                <span class="titText">不自动生成</span>
            </div>
            <div>
                <span  class="titName">开户名</span>
                <input type="text" class="input">
            </div>
            <div>
                <span  class="titName">银行账号</span>
                <input type="text" class="input">
            </div>
            <div>
                <span  class="titName">开户银行</span>
                <input type="text" class="input">
            </div>
            <div>
                <span  class="titName">税号</span>
                <input type="text" class="input">
            </div>
            <div>
                <span  class="titName">联系人</span>
                <input type="text" class="input">
            </div>
            <div>
                <span  class="titName">联系电话</span>
                <input type="text" class="input">
            </div>
            <div>
                <span  class="titName" style="vertical-align: top">备注</span>
                <textarea></textarea>
            </div>
            <div style="margin-bottom:20px">
                <span  class="titName" >相关合同</span>
                <span class="ADDs" @click="ADDht">添加合同</span>
            </div>
            <div style="margin-bottom:20px">
                <span  class="titName" >附件</span>
                <span class="ADDs" @click="ADDfj()">上传</span>
            </div>
            <div class="ADDbtn">
                <span class="tj">添加</span>
                <span >取消</span>
            </div>
        </div>
        <div class="bg" v-if="ht">
            <div class="content">
                <div class="content_tit">
                    <span>添加合同</span>
                </div>
                <div>
                    <input type="text" class="content_input"/>
                    <span class="content_seach">查询</span>
                </div>
                <div style="margin: 14px 20px">
                    <div style="display: inline-block;width: 200px;height: 20px;overflow-x:auto "></div>
                    <span class="content_ck">查看</span>
                    <span class="content_xz">下载</span>
                </div>
                <div class="content_btn">
                    <span class="btn_tj">添加</span>
                    <span @click="heidHT()">取消</span>
                </div>
            </div>
        </div>
        <div class="bg" v-if="fj">
            <div class="content">
                <div class="content_tit">
                    <span>添加附件</span>
                </div>
                <div class="uplaod">
                    <el-upload
                         class="upload-demo"
                        :limit="1"
                        :on-exceed="handleExceed"
                        :on-remove="handleRemove"
                        :http-request="uploadFile"
                        action="111">
                        <el-button size="small" type="primary">选择文件</el-button>
                     </el-upload>
                </div>
                <div class="content_btn">
                    <span class="btn_tj">添加</span>
                    <span @click="heidFj()">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "a-d-d-settlement",
        data(){
            return{
                ht:false,
                fj:false,
            }
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
            ADDht(){
                this.ht=true;
            },
            ADDfj(){
                this.fj=true;
            },
            heidFj(){
                this.fj=false
            },
            heidHT(){
                this.ht=false;
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
    padding-top:24px ;
}
    .titName{
        display: inline-block;
        width:116px;
        height:20px;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        text-align: right;
        margin-right: 24px;
    }
    .input{
        width:457px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-bottom: 20px;
    }
    .titText{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(109,119,139,1);
        margin-right: 13px;
    }
    select{
        width:118px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin:0 20px 20px 0;

    }
    .check{
        width:16px;
        height:16px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        margin:0 6px 0 0!important;
    }
   textarea{
       width:452px;
       height:72px;
       padding: 8px;
       background:rgba(255,255,255,1);
       border-radius:4px;
       border:1px solid rgba(211,219,235,1);
       margin-bottom: 20px;
   }
    .ADDbtn span{
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
        margin: 0 20px 50px 140px;
    }
    .ADDs{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:96px;
        height:36px;
        background:rgba(242,246,252,1);
        border-radius:4px;
        border:1px solid rgba(51,119,255,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
    }
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0
    }
    .content{
        position: relative;
        left: 50%;
        top: 30%;
        transform: translate(-50%,-50%);
        width:460px;
        height:312px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
    }
    .content_tit span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 21px 0 24px 20px;
    }
    .content_btn{
        position: absolute;
        width: 100%;
        bottom: 0;
        margin-bottom: 24px;
        text-align: right;
    }
.content_btn span{
    display: inline-block;
    text-align: center;
    line-height: 36px;
    cursor: pointer;
    width:80px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    margin-right: 20px;
}
    .btn_tj{
        color: #fff!important;
        background: #3377ff!important;
        border: none!important;
    }
    .content_input{
        width:190px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 10px;
        margin:0  24px 0 20px;
    }
    .content_seach{
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
        color:rgba(255,255,255,1);
    }
    .content_ck, .content_xz{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left: 10px;
        cursor: pointer;
    }
    .uplaod{
        margin-left: 20px;
        width: 200px;
    }
</style>