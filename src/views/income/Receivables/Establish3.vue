<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh('-1')">收款结算 &nbsp;/</span>
                <span class="new_url" v-if="this.$route.query.id==undefined">&nbsp;新建收款结算</span>
                <span class="new_url" v-if="this.$route.query.id!=undefined">&nbsp;编辑收款结算</span>
            </div>
            <div class="title_left">
                <span v-if="this.$route.query.id==undefined">新建收款结算</span>
                <span v-if="this.$route.query.id!=undefined">编辑收款结算</span>
            </div>
        </div>
        <div class="tableBox">
            <div style="text-align: center;margin-bottom: 40px;max-width: 893px;border-bottom: 1px solid #ddd;position: relative;left: 50%;transform: translateX(-50%)">
                <div style="margin-right: 350px;text-align: center;display: inline-block">
                    <div class="box boxs">1</div>
                    <span class="boxName">对账确认</span>
                </div>
                <div style="margin-right: 350px;text-align: center;display: inline-block">
                    <div class="box boxs">2</div>
                    <span class="boxName">票据凭证</span>
                </div>
                <div style="text-align: center;display: inline-block;border-bottom: 1px solid #3377ff;">
                    <div class="box boxs">3</div>
                    <span class="boxName">结算汇款</span>
                </div>

            </div>
            <div style="text-align: center" class="fill">
                <div>
                    <span class="fillName">实际到账金额</span>
                    <input type="text" class="input" v-model="receive_amount">
                </div>
                <div>
                    <span class="fillName">到账时间</span>
                    <div class="fillTime">
                            <el-date-picker
                                    v-model="receive_tdate"
                                    type="date"
                                    placeholder="请以银行到账时间为准"
                                    format="yyyy-mm-dd"
                                    value-format="yyyy-mm-dd">
                            </el-date-picker>
                    </div>
                </div>
                <div>
                    <span class="fillName">备注说明</span>
                    <textarea v-model="note"></textarea>
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
                    <span class="tj" @click="ADD">提交</span>
                    <span @click="fh(-1)">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "establish",
        data(){
            return{
                time:[],
                note:"",
                attachs:[],
                receive_amount:"",
                receive_tdate:"",
            }
        },
        mounted(){
            if(this.$route.query.id!=undefined){
                this.getList()
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
                    this.attachs.push(res)
                })
            },
            getList(){
                let params={is_receiver:1,id:this.$route.query.id};
                this.api.settlemanage_detail({params}).then((res)=>{
                    this.receive_amount=res.remit.receive_amount;
                    this.note=res.remit.note;
                    this.receive_tdate=res.remit.receive_tdate;
                    this.attachs=res.remit.attachs;
                })
            },
            ADD(){
                if(!this.receive_amount){
                    this.$message.error('实际到账金额不能为空');
                    return
                }
                if(!this.note){
                    this.$message.error('备注不能为空');
                    return
                }
                if(!this.receive_tdate){
                    this.$message.error('实际到账时间不能为空');
                    return
                }
                if(this.attachs==[]){
                    this.$message.error('附件不能为空');
                    return
                }
                let formData=new FormData;
                formData.append('note',this.note);
                formData.append('id',this.$route.query.id);
                formData.append('is_receiver',1);
                formData.append('receive_amount',this.receive_amount);
                formData.append('receive_tdate',this.receive_tdate);
                formData.append('attachs',JSON.stringify(this.attachs));
               this.api.demandsettle_remit_edit(formData).then((res)=>{
                   this.$router.go(-1)
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
    .fillTime .el-date-editor.el-input, .el-date-editor.el-input__inner{
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