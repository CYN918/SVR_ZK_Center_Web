<template>
    <div>
        <DS v-if="msg" :name="name"></DS>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="jump">收款结算&nbsp;/</span>
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
                    <div style="margin-right: 350px;text-align: center;border-bottom: 1px solid #3377ff;display: inline-block">
                        <div class="box boxs">1</div>
                        <span class="boxName">对账确认</span>
                    </div>
                   <div style="margin-right: 350px;text-align: center;display: inline-block">
                       <div class="box ">2</div>
                       <span class="boxName">票据凭证</span>
                   </div>
                   <div style="text-align: center;display: inline-block">
                       <div class="box">3</div>
                       <span class="boxName">结算汇款</span>
                   </div>

                </div>
            <div style="text-align: center" class="fill">
                <div>
                    <span class="fillName">结算单名称</span>
                    <div style="display: inline-block;width: 593px;text-align: left">
                        <input type="text" class="input" v-model="statement">
                    </div>

                </div>
                <div>
                    <span class="fillName">结算方</span>
                    <div style="display: inline-block;width: 593px;text-align: left">
                        <select v-model="name">
                            <option v-for="item in list" :value="item.name">{{item.name}}</option>
                        </select>
                        <span class="click" @click="massgae()">查看结算方信息</span>
                    </div>
                </div>
                <div>
                    <span class="fillName">结算时间段</span>
                    <div style="display: inline-block;width: 593px;text-align: left">
                        <div class="fillTime">
                            <el-date-picker
                                    v-model="time"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                        </div>
                    </div>
                </div>
                <div>
                    <span class="fillName">预计结算金额</span>
                    <div style="display: inline-block;width: 593px;text-align: left" >
                        <input type="number" class="input" v-model="expect_amount">
                        <span class="click">查看预计结算数据</span>
                    </div>
                </div>
                <div>
                    <span class="fillName">实际结算金额</span>
                    <div style="display: inline-block;width: 593px;text-align: left">
                        <input type="number" class="input" v-model="real_amount">
                    </div>
                </div>
                <div>
                    <span class="fillName">备注说明</span>
                    <div style="display: inline-block;width: 593px;text-align: left">
                        <textarea v-model="note"></textarea>
                    </div>
                </div>
                <div>
                    <div style="display: inline-block;width: 84px;margin-right: 20px">
                        <img src="../../../../public/img/wh.png" style="margin-right: 6px;cursor: pointer">
                        <span class="fj">附件</span>
                    </div>
                    <div style="display: inline-block;width: 593px;text-align: left">
                        <div class="uplaod">
                            <el-upload
                                    class="upload-demo"
                                    :on-remove="handleRemove"
                                    :http-request="uploadFile"
                                    multiple
                                    action="111">
                                <el-button size="small" type="primary">上传文件</el-button>
                            </el-upload>
                            <el-progress :percentage="times" v-if="up"></el-progress>
                        </div>
                        <div style="margin: 14px 0 14px 0px" v-for="(item,index) in attachs">
                            <div style="display: inline-block;max-width: 200px;height: 20px;overflow:hidden;font-size:14px;font-family:PingFangSC-Regular,PingFangSC;font-weight:400;color:rgba(31,46,77,1);text-align: left">{{item.name}}</div>
                            <span class="content_ck">查看</span>
                            <a class="content_xz" :href="item.url">下载</a>
                            <span class="content_xz" @click="dels(index)">删除</span>
                        </div>
                    </div>

                </div>
                <div class="fillBtn">
                    <span class="tj" @click="ADD">提交</span>
                    <span @click="fh(-1)" style="margin-right: 330px">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DS from './DetailsSettlement'
    export default {
        components:{DS},
        name: "establish",
        data(){
            return{
                msg:false,
                time:[],
                name:"",
                statement:"",
                is_receiver:"1",
                expect_amount:"",
                real_amount:"",
                note:"",
                attachs:[],
                list:[],
                times:"",
                up:false,
                fcounter:0,
            }
        },
        mounted(){
            this.getData();
            if(this.$route.query.id!=undefined){
                this.getList();
            }
        },
        methods:{
            jump(){
                this.$router.push({
                    path:"./Administration"
                })
            },

            fh(num){
                this.$router.go(num)
            },

            handleRemove(file, fileList) {
                this.file = '';
                this.initiate2 = false
            },
            scope(){
                var _this=this;
                _this.times=0;
                var timer = setInterval(function () {
                    if(_this.times<99){
                        _this.times++
                    }
                },100);
            },
            uploadFile(file){
                this.up=true;
                ++this.fcounter;
                this.times=0
                this.scope();
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    this.attachs.push(res);
                    this.times=100;
                    --this.fcounter;
                    this.up=false;
                })
            },
            dels(index){
                this.attachs.splice(index,1)
            },
            ADD(){
                if(this.fcounter != 0)
                {
                    this.$message.error('文件上传中');
                    return
                }
                if(this.$route.query.id!=undefined){
                    this.setData();
                    return
                }
                if(!this.name){
                    this.$message.error('结算方不能为空');
                    return
                }
                if(!this.statement){
                    this.$message.error('结算单名称不能为空');
                    return
                }
                if(this.time.length==0){
                    this.$message.error('结算时间段不能为空');
                    return
                }
                if(!this.expect_amount){
                    this.$message.error('预计结算金额不能为空');
                    return
                }
                if(!this.real_amount){
                    this.$message.error('实际结算金额不能为空');
                    return
                }
                if(!this.note){
                    this.$message.error('备注不能为空');
                    return
                }
                if(this.attachs.length==0){
                    this.$message.error('附件不能为空');
                    return
                }
                let formData = new FormData;
                formData.append('name',this.name);
                formData.append('statement',this.statement);
                formData.append('is_receiver',this.is_receiver);
                formData.append('tstart',this.time[0]);
                formData.append('tend',this.time[1]);
                formData.append('expect_amount',this.expect_amount);
                formData.append('real_amount',this.real_amount);
                formData.append('note',this.note);
                formData.append('attachs',JSON.stringify(this.attachs));
                this.api.settlemanage_check_add(formData).then((res)=>{
                   if(res!=false){
                       this.fh(-1);
                   }
                })

            },
            massgae(){this.msg=true},
            heidMassage(){
                this.msg=false
            },
            getData(){
                let params={is_receiver:1};
                this.api.settle_settlement({params}).then((res)=>{
                    this.list=res;
                })
            },
            getList(){
                let params={is_receiver:1,id:this.$route.query.id};
                this.api.settlemanage_detail({params}).then((res)=>{
                    this.statement=res.check.statement;
                    this.name=res.check.name;
                    this.time[0]=res.check.tstart;
                    this.time[1]=res.check.tend;
                    this.expect_amount=res.check.expect_amount;
                    this.real_amount=res.check.real_amount;
                    this.note=res.check.note;
                    this.attachs=res.check.attachs;
                })
            },
            setData(){
                if(this.fcounter != 0)
                {
                    this.$message.error('文件上传中');
                    return
                }
                if(!this.name){
                    this.$message.error('结算方不能为空');
                    return
                }
                if(!this.statement){
                    this.$message.error('结算单名称不能为空');
                    return
                }
                if(this.time.length==0){
                    this.$message.error('结算时间段不能为空');
                    return
                }
                if(!this.expect_amount){
                    this.$message.error('预计结算金额不能为空');
                    return
                }
                if(!this.real_amount){
                    this.$message.error('实际结算金额不能为空');
                    return
                }
                if(!this.note){
                    this.$message.error('备注不能为空');
                    return
                }
                if(this.attachs.length==0){
                    this.$message.error('附件不能为空');
                    return
                }
                let formData = new FormData;
                formData.append('name',this.name);
                formData.append('statement',this.statement);
                formData.append('is_receiver',this.is_receiver);
                formData.append('tstart',this.time[0]);
                formData.append('id',this.$route.query.id);
                formData.append('tend',this.time[1]);
                formData.append('expect_amount',this.expect_amount);
                formData.append('real_amount',this.real_amount);
                formData.append('note',this.note);
                formData.append('attachs',JSON.stringify(this.attachs));
                this.api.demandsettle_check_edit(formData).then((res)=>{
                    this.$router.go(-1);
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
    .click{
        display: inline-block;
        margin-left: 12px;
        font-size:14px;
        cursor: pointer;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(51,119,255,1);
    }
    select{
        width:467px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
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
</style>