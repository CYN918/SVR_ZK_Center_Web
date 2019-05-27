<template>
    <div>
        <div class="bg">
            <div class="AddIMG">
                <div class="AddIMG_tit">
                    <span>发布素材需求</span>
                </div>
                <div>
                    <div>
                        <span class="tit_txt">素材类型</span>
                        <select style="margin-right: 24px" v-model="type">
                            <option v-for="(item,index) in types" :value="item.type">{{item.name}}</option>
                        </select>
                        <select>
                            <option>wanzheng</option>
                        </select>
                    </div>
                    <div>
                        <span class="tit_txt">优先级</span>
                        <select v-model="priority">
                            <option value="高">高</option>
                            <option value="中">中</option>
                            <option value="低">低</option>
                        </select>
                    </div>
                    <div>
                        <span class="tit_txt">需求数量</span>
                        <input type="number" v-model="num" class="number"/>
                    </div>
                    <div>
                        <span class="tit_txt">设计规范</span>
                        <select class="sj_sel" v-model="design_standard">
                            <option v-for="(item,index) in sj" :value="item.name">{{item.name}}</option>
                        </select>
                    </div>
                    <div class="time">
                        <span class="tit_txt">截止时间</span>
                        <el-date-picker
                                v-model="endtime"
                                type="datetime"
                                placeholder="选择日期时间"
                                default-time="24:00:00"
                                format="yyyy 年 MM 月 dd 日 H 时 m 分 s 秒"
                                value-format="yyyy-MM-dd HH:mm:ss"
                        >
                        </el-date-picker>
                    </div>
                    <div>
                        <span class="tit_txt top">设计要求</span>
                        <textarea maxlength="300" v-model="requirement"></textarea>
                    </div>
                    <div>
                        <span class="tit_txt">附件</span>
                        <input type="checkbox" class="check" v-model="is_attach"/><span class="name">附件</span>
                        <div class="uplaod">
                            <el-upload
                                    class="upload-demo"
                                    :limit="1"
                                    :on-exceed="handleExceed"
                                    :on-remove="handleRemove"
                                    :http-request="uploadF"
                                    action="111">
                                <el-button size="small" type="primary">添加附件</el-button>
                            </el-upload>

                        </div>

                    </div>
                    <div>
                        <span class="tit_txt">风格</span>
                        <input type="checkbox"  class="check" v-model="is_ref"/><span class="name">风格</span>
                        <div class="uplaod">
                            <el-upload
                                    class="upload-demo"
                                    :limit="1"
                                    :on-exceed="handleExceed"
                                    :on-remove="handleRemove"
                                    :http-request="uploadFile"
                                    action="111">
                                <el-button size="small" type="primary">上传参考图</el-button>
                            </el-upload>
                        </div>


                    </div>
                </div>
                <div class="btn">
                    <span class="btn_fb" @click="ADDsc()">发布</span>
                    <span @click="heid">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "work-bench_sc",
        data(){
            return{
                attach:{
                    name:'',
                    url:'',
                    size:'',
                    ext:'',
                    md5:'',
                },
                type:'',
                types:[],
                sj:[],
                num:0,
                priority:'',
                is_attach:'',
                requirement:'',
                endtime:'',
                design_standard:'',
                is_ref:'',
                ref_url:''
            }
        },
        mounted(){
            this.getTypes()
        },
        methods:{
            ADDsc(){
                if(!this.type){
                    this.$message.error('类型不能为空')
                }
                if(!this.priority){
                    this.$message.error('优先级不能为空')
                }
                if(!this.num){
                    this.$message.error('需求数量不能为空')
                }
                if(!this.design_standard){
                    this.$message.error('设计规范不能为空')
                }
                if(!this.endtime){
                    this.$message.error('截止时间不能为空')
                }
                if(!this.requirement){
                    this.$message.error('设计要求不能为空')
                }
                if(this.is_attach==true&&!this.ref_url){
                    this.$message.error('请上传附件')
                }
                if(this.is_ref==true&&!this.attach){
                    this.$message.error('请上传产考图')
                }
                let formData = new FormData;
                formData.append('type',this.type);
                formData.append('attach',this.attach);
                formData.append('num',this.num);
                formData.append('priority',this.priority);
                formData.append('endtime',this.endtime);
                formData.append('is_attach',this.is_attach==true?1:0);
                formData.append('is_ref',this.is_ref==true?1:0);
                formData.append('ref_url',this.ref_url);
                formData.append('design_standard',this.design_standard);
                formData.append('requirement',this.requirement)
                this.api.demand_material_add(formData).then((res)=>{
                    console.log(typeof(this.ref_url))
                })
            },
            heid(){
                this.$parent.heidSC();
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleRemove(file, fileList) {
                this.file = '';
            },
            Remove(file, fileList) {
                this.file = '';
            },
            uploadF(file){
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    this.attach.name = res.name;
                    this.attach.ext = res.ext;
                    this.attach.md5 = res.md5;
                    this.attach.url = res.url;
                    this.attach.size =res.size;
                })
            },
            uploadFile(file){
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    this.ref_url = res.url
                })
            },
            getTypes(){
                let params ={material:1};
                this.api.config_material_type({params}).then((res)=>{
                   this.types=res;
                    this.getSJlist()
                })
            },
            getSJlist(){
                this.api.config_standards().then((res)=>{
                    this.sj = res
                })
            },
        }
    }
</script>

<style scoped>
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
    }
    .AddIMG{
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        width:840px;
        height:800px;
        background:rgba(255,255,255,1);
        border-radius:4px;
    }
    .AddIMG_tit{
       height: 55px;
        border-bottom: 1px solid #ddd;
    }

    .AddIMG_tit>span{
        display: inline-block;
        text-align: center;
        line-height: 55px;
        margin-left:24px ;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .AddIMG div{
        margin-bottom: 21px;
    }
    .tit_txt{
        display: inline-block;
        width: 100px;
        text-align: right;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
    }
    .top{
        vertical-align: top;
    }
   .number{
       width: 190px;
   }
    select,input{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 8px;
    }
    .sj_sel{
        width:400px!important;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    textarea{
        width:376px;
        height:144px;
        padding: 14px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        resize:none;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
    }
    .time{
        margin-bottom: 0!important;
    }
    .check{
        width:16px;
        height:16px;
        background:rgba(242,246,252,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 8px;
    }
    .name{
        display: inline-block;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
        margin-right: 20px;
    }
    .btn{
        text-align: right;
        width:840px;
        height:58px;
        background:rgba(247,249,252,1);
        border-radius:0px 0px 4px 4px;
        margin-bottom: 0!important;
        position:fixed ;
        bottom: 0;
    }
    .btn span{
        display: inline-block;
        text-align: center;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-right: 44px;
        line-height: 36px;
        cursor: pointer;
        margin-top: 10px;
    }
    .btn_fb{
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
        margin-right: 14px!important;
    }
    .uplaod{
        display: inline-block;
        margin-bottom: 0!important;
    }
    .upload-demo{
        margin-bottom: 0!important;
    }
</style>