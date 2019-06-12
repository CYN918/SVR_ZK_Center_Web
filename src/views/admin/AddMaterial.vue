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
                            <img :src="item"  v-for="item in hqUrl"/>
                        </div>
                        <div class="AddIMG_box_txt">
                            <span v-for="item in bindMid">{{item}}</span>
                        </div>
                        <div>
                            <span>上传预览图</span>
                        </div>
                        <div class="AddIMG_box_1">
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
                            <input type="checkbox" class="AddIMG_sc_cjeckbox" v-model="chenck"/><span>仅图片</span>
                            <div class="upChenck">
                                <p>勾选后可直接上传图片、且无需再次上传预览图</p>
                            </div>
                        </div>
                        <div class="AddIMG_sc">
                            <span class="tit">绑定素材:</span>
                            <input type="text" placeholder="请输入素材ID" v-model="bind_mid" :disabled="(this.message.mfid!=undefined)"/>
                            <span class="AddIMG_sc_btn" @click="XSset" :class="{AddIMG_sc_btn_jy:(this.message.mfid!=undefined)}">从素材库选择</span>
                            <input type="checkbox" class="AddIMG_sc_cjeckbox"/><span>与素材库内已有素材无关</span>
                            <p>若由素材库内文件处理后上传，必须填写对应的素材ID,最多九个</p>
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
                                        <input type="text" placeholder="创建或搜索个性标签" maxlength="=5" v-model="tagsName" @input="getTagsList()"/>
                                    </div>
                                    <div class="AddIMG_bq_box_top_bq AddIMG_bq_box_top_zdy">
                                        <span class="CJ" v-if="tagsName!=''" @click="ADDtags()">创建“{{tagsName}}”标签</span>
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
                        <div v-if="model=='H5'" class="link">
                            <span class="tit">H5链接:</span>
                            <input type="text" v-model="link">
                        </div>
                        <div class="bg_btn">
                            <span class="bg_btn_up" @click="AddMatter">上传</span>
                            <span @click="heidSc">取消</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['message','bindMid','hqUrl','material','types',],
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
            if(this.message.mfid!=undefined){
                this.getMatterDetails();
                this.title='编辑物料'
            }else{
                this.title='添加物料'
            }
            // if(this.bindMid!=undefined){
            //     this.bind_mid=this.bindMid.join(";");
            //     // if(this.hqUrl.length>6){
            //     //     this.hqUrl=this.hqUrl.slice(0,7);
            //     // }
            // }
            // console.log(this.bindMid)
        },
        methods:{
            // GETbindmid(){ this.bind_mid=this.bindMid.join(";");},
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
                    var image = new Image();
                    var _this=this;
                    image.onload=function(){
                        var width = image.width;
                        var height = image.height;
                        _this.sjSize = (width+"*"+height)
                    };
                    image.src= res.url;
                })
            },
            getTagsList(){
                let params = {preset:this.preset,material:this.material,type:this.types,search:this.tagsName,p:50,page:1};
                this.api.tags_search({params}).then((da)=>{
                    console.log(da);
                    this.preset_tags = da.data.tags;
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
                formData.append('size',this.sjSize);
                this.api.mfinal_edit(formData).then((res)=>{

                })
            },
            AddMatter(){
                if(this.message.mfid==undefined){
                    if(!this.type){
                        this.$message('类型不能为空')
                        return
                    }
                    if(!this.prev_uri){
                        this.$message('未上传预览图')
                        return
                    }
                    if(!this.attach){
                        this.$message('未上传文件')
                        return
                    }
                    if(!this.preinstall){
                        this.$message('标签为空')
                        return
                    }
                    if(!this.bardian){
                        this.$message('标签为空')
                        return
                    }
                    if(!this.bind_mid&&this.is_bind_mid!=true){
                        this.$message('未绑定素材ID')
                        return
                    }

                    let formData = new FormData;
                    formData.append('type',this.type);
                    formData.append('ispic',(this.chenck==true?1:0));
                    formData.append('prev_uri',this.prev_uri);
                    formData.append('attach',JSON.stringify(this.attach));
                    formData.append('tags',this.preinstall);
                    formData.append('self_tags',this.bardian);
                    formData.append('bind_mid',this.bindMid);
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
                    this.model = res.model;
                    var a = [];
                    var b = [];
                    for(let i=0;i<res.bind_mid.length;i++){
                       a.push(res.bind_mid[i].mid);
                       b.push(res.bind_mid[i].prev_uri);
                    }
                    this.bind_mid = a.join(';');
                    this.hqUrl = b;

                    if(res.status==1201){
                        this.value2=false;
                    }else{
                        this.value2=true;
                    }
                    console.log(this.preinstall)
                })
            },
        },
        watch: {
            'bindMid': function(newVal){
                this.bind_mid = newVal.join(';')
            },

        },
    }
</script>

<style scoped>
    input{
        margin-left: 0;
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
        width:1115px;
        height:884px;
        background:rgba(255,255,255,1);
        border-radius:4px;
    }
    .AddIMG_tit{
        text-align: left;
        height: 55px;
        border-bottom: 1px solid #E6E9F0;

        margin-bottom: 24px;
    }
    .AddIMG_tit span{
        display: inline-block;
        margin-left: 24px;
        color:rgba(54,54,54,1);
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        line-height: 55px;
    }
    .AddIMG_content_right{
        display: inline-block;
        width: 750px;
        margin-top: 25px;
    }
    .AddIMG_content_left{
        margin-left: 24px;
        display: inline-block;
        margin-right: 20px;
        vertical-align: top;
    }
    .AddIMG_content_left span,.AddIMG_content_right span{
        display: inline-block;
        margin-bottom: 10px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
    }

    .AddIMG_content_left img{
        width: 100%;
        height: 100%;
        border:0px!important;
    }
    .AddIMG_content_right span{
        margin-bottom: 0px;
    }
    .AddIMG_box{
        width:216px;
        padding: 0 8px;
        height:326px;
        background:rgba(247,249,252,1);
        border-radius:4px;
    }
    .AddIMG_box img{
        width:64px;
        height:90px;
        background:rgba(227,231,235,1);
        border-radius:4px;
        margin: 14px 11px 0 0;
    }
    .AddIMG_box_1{
        text-align: center;
        width:216px;
        padding: 0 8px;
        height:326px;
        background:rgba(247,249,252,1);
        border-radius:4px;
    }
    .AddIMG_box_1 img{
        margin: 0 11px 17px 0;
        display: inline-block;
        width:218px;

    }
    .AddIMG_box img:nth-child(3n){
        margin: 14px 0 0 0!important;
    }
    .AddIMG_box_txt{
        margin-left: 45px;
        width:141px;
        max-height: 60px;
        overflow-y: auto;
        text-align: center;
        margin-top: 19px;
    }
    .AddIMG_box_txt span{
        display: inline-block;
        font-size:16px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(54,54,54,1);
        background:rgba(0,153,255,.1);
    }
    .AddIMG_input,.AddIMG_sc,.AddIMG_bq,.AddIMG_select,.AddIMG_yl,.box_sel{
        margin-bottom: 20px;
    }
    .AddIMG_switch{
        display: inline-block;
    }
    .AddIMG_sc input{
        width:254px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .AddIMG_input input{
       margin: 3px 10px 0 20px;
    }
    .AddIMG_input img{
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
    }
    .AddIMG_input_box{
        display: inline-block;
        width:106px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1)!important;
    }
    .tit{
        display: inline-block;
        width:117px;
        margin-right: 16px;
        vertical-align: middle;
        text-align: right;
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
        width:124px;
        height:36px;
        background:rgba(242,246,252,1);
        border-radius:4px;
        border:1px solid rgba(51,119,255,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1)!important;
        text-align: center;
        line-height: 38px;
        cursor: pointer;
    }
    .AddIMG_sc_btn_jy{
        background:rgba(153,153,153,1)!important;
        color:rgba(255,255,255,1)!important;
    }
    .AddIMG_sc p,.AddIMG_zp p ,.AddIMG_yl p,.AddIMG_input p,.upChenck p{
        margin:10px 0 0 133px;
        padding: 0;
        font-size:12px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
    .AddIMG_zp_text{
        width:254px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 21px;
    }
    .link input{
        width:185px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .AddIMG_select{
        display: inline-block;
    }
    .AddIMG_select select,.box_sel select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .AddIMG_yl_size{
        display: inline-block;
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
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
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1);
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
        width:395px;
        height:258px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        overflow-y: auto;
    }
    .AddIMG_bq_box_top{
        border-bottom: 1px solid rgba(230,230,230,1);
    }
    .AddIMG_bq_box_top_tit{
        margin: 14px 0 14px 14px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
    }
    .AddIMG_bq_box_top_bq,.AddIMG_bq_box_top_zdy{
        margin:0 20px 0px 20px ;

    }


    .AddIMG_bq_box_top_tit input{
        display: block;
        width:326px;
        height:28px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-top: 10px;
    }
    .bg_btn{

        margin: 40px 0;
    }
    .bg_btn span{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        line-height: 36px;
        text-align: center;
    }
    .bg_btn_up{
        border:0!important;
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
        margin-right: 14px;
        margin-left: 133px;
    }
    .CJ{
        display: inline-block;
        line-height: 26px;
        text-align: center;
        cursor: pointer;
        padding: 3px 5px ;
        background: #d7d7d7;
        font-size: 12px;
        border-radius: 5px;
        margin-bottom: 10px!important;
    }
</style>