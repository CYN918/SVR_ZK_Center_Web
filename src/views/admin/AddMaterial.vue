<template>
    <div>
        <div class="bg">
            <div class="AddIMG">
                <div class="AddIMG_tit">
                    <span>{{title}}</span>
                </div>
                <div class="AddIMG_content">
                    <div class="AddIMG_content_left">
                        <div>
                            <span>素材预览图</span>
                        </div>
                        <div class="AddIMG_box">
                            <img :src="item"  v-for="item in hqUrl" :class="{img1:hqUrl.length>1&&hqUrl.length<3,img1:3<hqUrl.length<7}"/>
                        </div>
                        <div class="AddIMG_box_txt">
                            <span v-for="item in bindMid">{{item}}</span>
                        </div>
                        <div>
                            <span>上传预览图</span>
                        </div>
                        <div class="AddIMG_box">
                            <img :src="chenck==false?prev_uri:attach.url"/>
                        </div>
                    </div>
                    <div class="AddIMG_content_right">
                        <div class="AddIMG_input">
                            <span class="tit">附件:</span>
                            <div class="AddIMG_input_box">
                                <el-upload
                                        class="upload-demo"
                                        :limit="1"
                                        :on-exceed="handleExceed"
                                        :on-remove="handleRemove"
                                        :http-request="uploadF"
                                        action="111"
                                >
                                    <el-button size="small" type="primary">上传</el-button>
                                </el-upload>
                            </div>
                            <img src="../../../public/img/msg.png" @click="showHint"/>
                            <div class="upChenck">
                                <input type="checkbox" class="AddIMG_sc_cjeckbox" v-model="chenck"/><span>仅图片</span>
                                <span class="upTIT">勾选后可直接上传图片、且无需再次上传预览图</span>
                            </div>
                        </div>
                        <div class="AddIMG_sc">
                            <span class="tit">绑定素材:</span>
                            <input type="text" placeholder="请输入素材ID" v-model="bind_mid" :disabled="(this.message.mfid!=undefined)"/>
                            <span class="AddIMG_sc_btn" @click="XSset" :class="{AddIMG_sc_btn_jy:(this.message.mfid!=undefined)}">从素材库选择</span>
                            <input type="checkbox" class="AddIMG_sc_cjeckbox"/><span>与素材库内已有素材无关</span>
                            <p>若由素材库内文件处理后上传，必须填写对应的素材ID，仅可填写一个</p>
                        </div>
                        <div class="AddIMG_select">
                            <span class="tit">素材类型:</span>
                            <select v-model="type" :disabled="(this.message.mfid!=undefined)">
                                <option :value="item.type" v-for="item in scType">{{item.name}}</option>
                            </select>
                        </div>
                        <div class="AddIMG_switch" v-if="sw">
                            <span  class="tit">是否启用:</span>
                            <el-switch
                                    v-model="value2"
                                    active-color="#409EFF"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </div>
                        <div class="AddIMG_yl">
                            <span class="tit">尺寸:</span>
                            <span class="AddIMG_yl_size" v-model="sjSize">{{chenck==false?sjSize:attach.size}}</span>
                            <!--<div class="AddIMG_yl_upload"><span>上传预览图</span></div>-->
                            <!--<input type="file"/>-->
                            <div class="AddIMG_yl_upload">
                                <el-upload
                                        :limit="1"
                                        :on-exceed="handleExceed"
                                        :http-request="uploadFile"
                                        :on-remove="Remove"
                                        class="upload-demo"
                                        action="111"
                                        :file-list="fileList">
                                    <el-button size="small" type="primary">上传预览图</el-button>
                                </el-upload>
                            </div>
                        </div>
                        <div class="AddIMG_bq">
                            <span class="tit">选择标签:</span>
                            <div class="AddIMG_bq_box">
                                <div class="AddIMG_bq_box_top">
                                    <div class="AddIMG_bq_box_top_tit">预置标签:</div>
                                    <div class="AddIMG_bq_box_top_bq">
                                        <!--<span class="bq" v-for="(item,index) in preset_tags">{{item.name}}</span>-->
                                        <template>
                                            <el-checkbox-group
                                                    v-model="preinstall">
                                                <el-checkbox v-for="(item,index) in preset_tags" :label="item.name" >{{item.name}}</el-checkbox>
                                            </el-checkbox-group>
                                        </template>
                                    </div>
                                </div>
                                <div class="AddIMG_bq_box_bottom">
                                    <div class="AddIMG_bq_box_top_tit">个性标签:
                                        <input type="text" placeholder="请输入标签" v-model="tagsName" @input="getTagsList()"/>
                                        <span class="ADDtag" @click="ADDtags()">+</span>
                                    </div>
                                    <div class="AddIMG_bq_box_top_bq AddIMG_bq_box_top_zdy">
                                        <template>
                                            <el-checkbox-group
                                                    v-model="bardian">
                                                <el-checkbox v-for="(item,index) in self_tags" :label="item.name">{{item.name}}</el-checkbox>
                                            </el-checkbox-group>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="box_sel">
                            <span class="tit">实现方式:</span>
                            <select v-model="model">
                                <option value="无">无</option>
                                <option value="H5">H5</option>
                                <option value="脚本">脚本</option>
                            </select>
                        </div>
                        <div v-if="model=='H5'">
                            <span class="tit">H5链接:</span>
                            <input type="text" v-model="link">
                        </div>
                    </div>
                </div>
                <div class="bg_btn">
                    <span class="bg_btn_up" @click="AddMatter">上传</span>
                    <span @click="heidSc">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['message','bindMid','hqUrl','material','types'],
        name: "content_component",
        data(){
            return {
                title:'添加素材',
                preinstall:[],
                bardian:[],
                value2:true,
                fileList:[],
                prev_uri:'',
                attach:{
                    name:'',
                    url:'',
                    size:'',
                    ext:'',
                    md5:''
                },
                bind_mid:'',
                bind_workid:'',
                self_tags:[],
                tags:[],
                sjSize:'',
                preset:[0,1],
                preset_tags:[],
                type:'',
                sw:false,
                size:'',
                scUrl:'',
                scType:'',
                tagsName:'',
                chenck:false,
                model:'',
                link:'',
            }
        },
        mounted(){
            this.getTagsList();
            console.log(this.bindMid);
            console.log(this.url);
            if(this.message.mfid!=undefined){
                this.getMatterDetails();
                this.title='编辑物料'
            }else{
                this.title='添加物料'
            }
            if(this.bindMid!=undefined&&this.material==0){
                this.bind_mid=this.bindMid.join(";");
                if(this.hqUrl.length>6){
                    this.hqUrl=this.hqUrl.slice(0,7);
                }
            }

        },
        methods:{

            heidSc(){
                this.$parent.heidSc();
            },
            showHint(){
                this.$parent.ShowHint()
            },
            XSset(){
                if(this.message.mfid!=undefined){
                    return
                }
                this.$parent.XSset()
            },
            uploadF(file){
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    this.attach.name = res.name;
                    this.attach.size = res.size;
                    this.attach.ext = res.ext;
                    this.attach.md5 = res.md5;
                    this.attach.url = res.url;
                })
            },
            getType(){
                let params={material:this.material}
                this.api.config_material_type({params}).then((res)=>{
                    this.scType=res;
                })
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
            uploadFile(file){
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    this.prev_uri = res.url
                    this.sjSize = res.size;
                })
            },
            getTagsList(){
                let params = {preset:this.preset,material:this.material,type:this.types,search:this.tagsName,p:50,page:1};
                this.api.tags_search({params}).then((da)=>{
                    console.log(da);
                    this.preset_tags = da.data.preset_tags;
                    this.self_tags = da.data.self_tags;
                    this. getType();
                })
            },
            ADDtags(){
                let formData = new FormData;
                formData.append('name',this.tagsName);
                formData.append('preset',0);
                formData.append('material',this.material);
                formData.append('type',this.types);
                this.api.tags_add(formData).then((res)=>{
                    this.tagsName=''
                    this. getTagsList();
                })
            },
            setMatter(){
                let formData = new FormData;
                formData.append('mid',this.message.mfid);
                formData.append('type',this.type);
                formData.append('status',(this.value2==true?1:0));
                formData.append('prev_uri',this.prev_uri);
                formData.append('attach',JSON.stringify(this.attach));
                formData.append('tags',this.preinstall);
                formData.append('self_tags',this.bardian);
                formData.append('size',this.sjSize)
                this.api.mfinal_edit(formData).then((res)=>{

                })
            },
            AddMatter(){
                if(this.message.mfid==undefined){
                    let formData = new FormData;
                    formData.append('type',this.type);
                    formData.append('ispic',(this.chenck==true?1:0));
                    formData.append('prev_uri',this.prev_uri);
                    formData.append('attach',JSON.stringify(this.attach));
                    formData.append('tags',this.preinstall);
                    formData.append('self_tags',this.bardian);
                    formData.append('bind_mid',this.bind_mid);
                    formData.append('model',this.model);
                    formData.append('size',this.sjSize);
                    formData.append('link',this.link)
                    this.api.mfinal_add(formData).then((res)=>{

                    }).catch(this.$message(message))
                }else{
                    this.setMatter();
                }

            },
            getMatterDetails(){
                let params ={mfid:this.message.mfid};
                this.api.mfinal_detail({params}).then((res)=>{
                    this.sw=true;
                    this.prev_uri=res.prev_uri;
                    this.preinstall=res.tags;
                    this.bardian=res.self_tags;
                    this.sjSize=res.size;
                    this.type=res.type;
                    this.link = res.link;
                    this.model = res.model
                    if(res.status==1201){
                        this.value2=false;
                    }else{
                        this.value2=true;
                    }
                    console.log(this.preinstall)
                })
            },
        }
    }
</script>

<style scoped>
    input{
        margin-left: 0;
        width: 226px;
    }

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
        top:15px;
        transform: translateX(-50%);
        width:1177px;
        min-height:903px;
        background:rgba(255,255,255,1);
        border-radius:5px;
    }
    .AddIMG_tit{
        text-align: center;
        margin: 20px 0;

    }
    .AddIMG_tit span{
        font-size:20px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(54,54,54,1);
    }
    .AddIMG_content_right{
        display: inline-block;
    }
    .AddIMG_content_left{
        margin-left: 60px;
        display: inline-block;
        margin-right: 85px;
        vertical-align: top;
    }
    .AddIMG_content_left span,.AddIMG_content_right span{
        display: inline-block;
        margin-bottom: 20px;
        font-size:16px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
    }
    .AddIMG_content_left img{
        width: 100%;
        height: 100%;
    }
    .AddIMG_content_right span{
        margin-bottom: 0px;
    }
    .AddIMG_box{
        width:141px;
        height:252px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(238,238,238,1);
        border-radius:5px;
        margin-left: 45px;
    }
    .img1{
        width: 45%!important;
        height: 45%!important;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .img1:nth-child(2n){
        margin-right: 0px;
    }
    .img2{
        width: 45%!important;
        height: 33%!important;
        margin-right: 10px;
        margin-bottom: 5px;
    }
    .img2:nth-child(2n){
        margin-right: 0;
    }
    .AddIMG_box_txt{
        margin-left: 45px;
        width:141px;
        text-align: center;
        margin-top: 19px;
    }
    .AddIMG_box_txt span{
        display: block;
        font-size:16px;
        margin-bottom: 5px!important;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(54,54,54,1);
        background:rgba(0,153,255,.1);
    }
    .AddIMG_input,.AddIMG_sc,.AddIMG_zp,.AddIMG_select,.AddIMG_switch,.AddIMG_yl,.box_sel,.AddIMG_bq{
        margin-bottom: 30px;
    }
    /*.AddIMG_input input{*/
        /*width:140px;*/
        /*height:50px;*/
        /*margin-left: 0;*/
        /*position: relative;*/
        /*left: -140px;*/
        /*padding: 0;*/
        /*opacity:0;*/
        /*top:-14px;*/
    /*}*/
    .AddIMG_input img{
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
    }
    .AddIMG_input_box{

        display: inline-block;
        width:140px;
        height:50px;
        background:rgba(19,159,248,1);
        border-radius:5px;
        text-align: center;
        line-height: 50px;
        font-size:16px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
    }
    .tit{
        display: inline-block;
        width:117px;
        margin-right: 16px;
        vertical-align: top;
    }
    .AddIMG_sc_cjeckbox{
        width: 14px!important;
        height: 14px!important;
        margin-right: 11px;
    }
    .AddIMG_sc_btn{
        display: inline-block;
        margin-left: 20px;
        margin-right: 21px;
        width:140px;
        height:50px;
        background:rgba(19,159,248,.1);
        border-radius:5px;
        font-size:16px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(19,159,248,1);
        text-align: center;
        line-height: 50px;
    }
    .AddIMG_sc_btn_jy{
        background:rgba(153,153,153,1)!important;
        color:rgba(255,255,255,1)!important;
    }
    .AddIMG_sc p,.AddIMG_zp p ,.AddIMG_yl p,.AddIMG_input p{
        margin:10px 0 0 133px;
        padding: 0;
        font-size:12px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
    .AddIMG_zp_text{
        margin-right: 21px;
    }
    select{
        width:242px;
        height:50px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(230,230,230,1);
        border-radius:5px;
    }
    .AddIMG_yl_size{
        display: inline-block;
        width: 226px;
        height: 50px;
        padding-left: 10px;
        border:1px solid rgba(230,230,230,1);
        border-radius:5px;
    }
    .AddIMG_yl input{
        width:125px;
        height:50px;
        position: relative;
        left: -140px;
        top:-35px;
        opacity: 0;
    }
    .AddIMG_yl_upload{
        display: inline-block;
        width:140px;
        height:50px;
        background:rgba(19,159,248,.1);
        border-radius:5px;
        text-align: center;
        vertical-align: top;
        margin-left: 20px;
    }
    .AddIMG_yl_upload>span{
        display: inline-block;
        font-size:16px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(19,159,248,1);
        line-height: 50px;
    }
    .AddIMG_bq_box{
        display: inline-block;
        width:655px;
        min-height:240px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(230,230,230,1);
        border-radius:5px;
    }
    .AddIMG_bq_box_top{
        border-bottom: 1px solid rgba(230,230,230,1);
    }
    .AddIMG_bq_box_top_tit{
        margin: 17px 0 15px 17px;
        font-size:16px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(54,54,54,1);
    }
    .AddIMG_bq_box_top_bq,.AddIMG_bq_box_top_zdy{
        margin:0 20px 0px 20px ;
    }

    .AddIMG_bq_box_top_zdy{
        width: 638px;
        height: 80px;
        overflow-y: auto;
    }
    .AddIMG_bq_box_top_tit input{
        float: right;
        margin-right: 10px;
        width:91px;
        height:26px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(220,220,220,1);
        border-radius:5px;
        padding-right: 25px;
    }
    .bg_btn{
        text-align: center;
        margin: 40px 0;
    }
    .bg_btn span{
        display: inline-block;

        width:140px;
        height:50px;
        border:1px solid rgba(153,153,153,1);
        border-radius:5px;
        font-size:16px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(54,54,54,1);
        line-height: 50px;
    }
    .bg_btn_up{
        border:0!important;
        background:rgba(19,159,248,1);
        color:rgba(255,255,255,1)!important;
        margin-right: 40px;
    }
    .ADDtag{
        display: inline-block;
        line-height: 26px;
        text-align: center;
        width: 25px;
        height: 26px;
        color: #fff;
        border: 1px solid #cfcfcf;
        float: right;
        background: #d1d1d1;
        position: relative;
        left: 132px;
        top:1px;
        border-radius: 5px;
        cursor: pointer;
    }
    .upChenck{
        display: inline-block;
        margin-left: 31px;
        vertical-align: bottom;
    }
    .upTIT{
        display: block!important;
        font-size:12px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        margin-top: 10px;
    }
    .AddIMG_sc_btn_jy{
        background:rgba(153,153,153,1)!important;
        color:rgba(255,255,255,1)!important;
    }
</style>