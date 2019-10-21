<template>
    <div>
        <div class="bg" >
            <div class="AddIMG" >
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
                            <img :src="chenck==false?prev_uri:attach.url" v-if="this.arr[this.arr.length-1]!='mp4'"/>
                            <video  :src="chenck==false?prev_uri:attach.url" controls="controls" v-if="this.arr[this.arr.length-1]=='mp4'" />
                        </div>
                    </div>
                    <div class="AddIMG_content_right">
                        <div class="AddIMG_input">
                            <span class="tit" style="vertical-align: top">附件:</span>
                            <div class="AddIMG_input_box" v-if="this.types!='f_sls_lockscreen'">
                                <el-upload
                                        class="upload-demo"
                                        :limit="1"
                                        :on-exceed="handleExceed"
                                        :on-remove="handleRemove"
                                        :http-request="uploadF"
                                        action="111"
                                >
                                    <el-button size="small" type="primary" >上传</el-button>
                                </el-upload>
                            </div>
                            <div class="AddIMG_input_box" v-if="this.types=='f_sls_lockscreen'">
                                <el-upload
                                        class="upload-demo"
                                        :limit="1"
                                        :on-exceed="handleExceed"
                                        :on-remove="handleRemove"
                                        :http-request="uploadZip"
                                        :before-upload="beforeAvatarUploads"
                                        action="111"
                                >
                                    <el-button size="small" type="primary" >上传</el-button>
                                </el-upload>
                            </div>
                            <img src="../../../public/img/msg.png" @click="showHint" style="vertical-align: top"/>
                            <div class="progress" style="width: 100px;height: 5px;opacity: 0.5;display: inline-block " v-if="initiate" >
                                <div class="strip" :style="{width:aaa+'%'}" style="background: blue;height: 5px"></div>
                                <div style="text-align: center;font-size: 10px">当前附件上传{{aaa}}%</div>
                            </div>
                            <input type="checkbox" class="AddIMG_sc_cjeckbox" v-model="chenck" v-if="this.types!='f_sls_lockscreen'" @click="checkSelect()"/><span v-if="this.types!='f_sls_lockscreen'" >仅图片</span>
                            <div class="upChenck" v-if="this.types!='f_sls_lockscreen'">
                                <p>勾选后可直接上传图片、且无需再次上传预览图</p>
                            </div>
                        </div>
                        <div class="AddIMG_sc">
                            <span class="tit">绑定素材:</span>
                            <input type="text" placeholder="请输入素材ID" v-model="bind_mid" :disabled="(this.message.mfid!=undefined)" @change="IDchange"/>
                            <span class="AddIMG_sc_btn" @click="XSset" :class="{AddIMG_sc_btn_jy:(this.message.mfid!=undefined)}">从素材库选择</span>
                            <p>上传物料前，请务必保证素材库内有对应素材！多个素材用英文半角;隔开</p>
                        </div>
                        <div class="AddIMG_select">
                            <span class="tit">物料类型:</span>
                            <select v-model="type" :disabled="(this.message.mfid!=undefined)">
                                <option :value="types" >{{lx}}</option>
                            </select>
                            <div v-if="type=='f_sls_lockscreen'" style="display: inline-block">
                                <span  class="tit">打底广告图</span>
                                <select v-model="ad_pic" style="width: 118px">
                                    <option value="1">有</option>
                                    <option value="0">无</option>
                                </select>
                            </div>
                            <div style="display: inline-block" v-if="type=='f_sls_lockscreen'">
                                <span class="tit">广告图位数</span>
                                <input type="number" placeholder="请输入广告位数量" v-model="ad_num" style="width: 100px;height: 30px;border-radius: 5px"/>

                            </div>
                        </div>
                        <div class="AddIMG_yl">
                            <span class="tit">尺寸:</span>
                            <input class="AddIMG_yl_size" v-model="sjSize" placeholder="上传预览图后自动获取"  disabled v-if="chenck==false&&this.arr[this.arr.length-1]!='mp4'">
                            <input class="AddIMG_yl_size" v-model="cc" placeholder="上传预览图后自动获取"  disabled v-if="chenck==true&&this.arr[this.arr.length-1]!='mp4'">
                            <select v-model="sjSize" v-if="chenck==false&&this.arr[this.arr.length-1]=='mp4'">
                                <option :value="item.size" v-for="item in sizeList">{{item.size}}</option>
                            </select>
                            <div class="AddIMG_yl_upload" >
                                <el-upload
                                        :disabled="this.chenck==true"
                                        :limit="1"
                                        :on-exceed="handleExceed"
                                        :http-request="uploadFile"
                                        :on-remove="Remove"
                                        class="upload-demo"
                                        action="111"
                                        :before-upload="beforeAvatarUpload"
                                        :file-list="fileList">
                                    <el-button size="small" type="primary" :class="{disbld:this.chenck==true}">上传预览图</el-button>
                                </el-upload>
                            </div>
                            <div class="AddIMG_switch" v-if="sw">
                                <span  class="tit">是否启用:</span>
                                <el-switch
                                        @change="open"
                                        v-model="value2"
                                        active-color="#409EFF"
                                        inactive-color="#ff4949">
                                </el-switch>
                            </div>
                            <div class="progress" style="width: 100px;height: 5px;opacity: 0.5;display: inline-block " v-if="initiate2" >
                                <div class="strip" :style="{width:bbb+'%'}" style="background: blue;height: 5px"></div>
                                <div style="text-align: center;font-size: 10px">当前附件上传{{bbb}}%</div>
                            </div>
                        </div>
                        <div class="box_sel" v-if="this.types=='f_ad_picture'">
                            <span class="tit">实现方式:</span>
                            <select v-model="model">
                                <option value="无">无</option>
                                <option value="H5">H5</option>
                                <option value="脚本">脚本</option>
                            </select>
                        </div>
                        <div class="box_sel" v-if="this.types=='f_ad_template'">
                            <span class="tit">实现方式:</span>
                            <select v-model="model">
                                <option value="H5">H5</option>
                                <option value="脚本">脚本</option>
                            </select>
                        </div>
                        <div class="box_sel" v-if="this.types=='f_sls_lockscreen'">
                            <span class="tit">实现方式:</span>
                            <select v-model="model">
                                <option value="脚本" selected>脚本</option>
                            </select>
                        </div>
                        <div v-if="model=='H5'" class="link" style="margin-bottom: 10px">
                            <span class="tit">H5链接:</span>
                            <input type="text" v-model="link">
                        </div>
                        <div class="box_sel" v-if="this.types=='f_sls_lockscreen'">
                            <span class="tit">壁纸标识:</span>
                            <input class="AddIMG_yl_size" v-model="attach.wpid" placeholder="上传附件后自动获取"  disabled >
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
                                        <input type="text" placeholder="创建或搜索个性标签" maxlength="6" v-model="tagsName" @input="getTagsList()"/>
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

                        <div class="bg_btn">
                            <span class="bg_btn_up" v-if="this.message.mfid==undefined" @click="AddMatter">上传</span>
                            <span class="bg_btn_up" v-if="this.message.mfid!=undefined" @click="AddMatter">保存</span>
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
        props:['message','bindMid','hqUrl','material','types','lx'],
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
                    md5:'',
                    check_md5:'',
                    checksum_md5:'',
                    wpid:"",
                },
                bind_mid:'',
                bind_workid:'',
                self_tags:[],
                tags:[],
                sjSize:'',
                preset:[0,1],
                preset_tags:[],
                type:this.types,
                sw:false,
                size:'',
                scUrl:'',
                scType:'',
                tagsName:'',
                chenck:false,
                model:'',
                link:'',
                aaa:0,
                bbb:0,
                initiate:false,
                initiate2:false,
                Urllist:[],
                cc:"",
                status:'',
                ad_pic:'0',
                ad_num:'',
                arr:[],
                sizeList:[],
            }
        },
        mounted(){
            this.getTagsList();
            if(this.message.mfid!=undefined){
                this.title='编辑物料'
            }else{
                this.title='添加物料'
            }
            if(this.types=='f_sls_lockscreen'){
                this.model='脚本'
            }
        },
        methods:{
            checkSelect(){
                if(this.chenck==false&&this.types=='f_ad_picture'){
                    this.model='无'
                }
            },
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
                this.$parent.XSset();
            },
            time(){
                var _this=this;
                _this.aaa=0;
                var timer = setInterval(function () {
                    if(_this.aaa<99){
                        _this.aaa++
                    }
                },100);
            },
            time1(){
                var _this=this;
                _this.bbb=0;
                var timer = setInterval(function () {
                    if(_this.bbb<99){
                        _this.bbb++
                    }
                },100);
            },
            uploadZip(file){
                this.time();
                this.initiate=true;
                let formData =new FormData;
                formData.append('file',file.file);
                this.api.file_zip_upload(formData).then((res)=>{
                    this.aaa=100;
                    this.initiate=false;
                    this.attach.md5=res.md5;
                    this.attach.name = res.name;
                    this.attach.size = res.size;
                    this.attach.ext = res.ext;
                    this.attach.url = res.url;
                    this.attach.check_md5 = res.check_md5;
                    this.attach.checksum_md5 = res.checksum_md5;
                    if(res.wpid==''){
                        this.$message.error('您上传的非壁纸压缩包，请重新上传')
                        return
                    }else{
                        this.attach.wpid = res.wpid;
                    }
                    var image = new Image();
                    var _this=this;
                    image.onload=function(){
                        var width = image.width;
                        var height = image.height;
                        _this.cc = (width+"*"+height)
                    };
                    image.src= res.url;
                })
            },
            uploadF(file){
                this.time();
                this.initiate=true;
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    this.aaa=100;
                    this.initiate=false;
                    this.attach.name = res.name;
                    this.attach.size = res.size;
                    this.attach.ext = res.ext;
                    this.attach.md5 = res.md5;
                    this.attach.url = res.url;
                    var image = new Image();
                    var _this=this;
                    image.onload=function(){
                        var width = image.width;
                        var height = image.height;
                        _this.cc = (width+"*"+height)
                    };
                    image.src= res.url;

                })
            },
            open(){
                let formData = new FormData;
                formData.append('mfid',this.message.mfid);
                formData.append('status',this.status);
                formData.append('valid',this.value2==true?1:0);
                this.api.mfinal_status_change(formData).then((res)=>{
                    this.$emit('updatas',0,true);
                })
            },
            getType(){
                let params={material:this.material}
                this.api.config_material_type({params}).then((res)=>{
                    this.scType=res;
                })
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isPSD = file.type === 'image/psd';
                const isBMP = file.type === 'image/bmp';
                const isGIF = file.type === 'image/gif';
                const isTIF = file.type === 'image/tif';
                const isVideo = file.type ==='video/mp4';
                if (!isJPG&&!isPNG&&!isPSD&&!isBMP&&!isGIF&&!isTIF&&!isVideo) {
                    this.$message.error('只支持JPG、PNG、psd、bmp、gif、tif、mp4格式!');
                }
                return isPNG || isJPG ||isPSD||isBMP||isGIF||isTIF||isVideo;
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeAvatarUploads(file) {
                this.file = file;
                console.log(this.file)
                const isXzip = file.type === 'application/x-zip-compressed';
                const iszip = file.type === 'application/zip';
                if (!(isXzip||iszip)) {
                    this.$message.error('只支持ZIP格式!');
                }
                return isXzip||iszip;
            },
            handleRemove(file, fileList) {
                this.file = '';
               this.initiate=false;
            },
            Remove(file, fileList) {
                this.file = '';
                this.initiate2=false;
            },
            uploadFile(file){
                this.time1();
                this.initiate2=true;
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    this.bbb=100;
                    this.initiate2=false;
                    this.prev_uri = res.url;
                    this.arr=this.prev_uri.split('.');
                    if(this.arr[this.arr.length-1]=='mp4'){
                        this.getSize()
                    }
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
            getSize() {
                this.api.config_size().then((res) => {
                    this.sizeList = res
                })
            },
            getTagsList(){
                let params = {preset:this.preset,material:this.material,type:this.types,search:this.tagsName,p:50,page:1};
                this.api.tags_search({params}).then((da)=>{
                    console.log(da);
                    this.preset_tags = da.data.tags;
                    this.self_tags = da.data.self_tags;
                    if(this.message.mfid!=undefined){
                        this.getMatterDetails();
                    }
                    this. getType();
                })
            },
            ADDtags(){
                this.bardian.push(this.tagsName);
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
                if(this.preinstall.length<=0){
                    this.$message('预置标签不能为空');
                    return
                }
                if(!this.model){
                    this.$message('实现方式不能为空');
                    return
                }
                if(!this.ad_pic){
                    this.$message('有无打底广告图不能为空')
                    return
                }
                if(!this.ad_num&&this.type=='f_sls_lockscreen'){
                    this.$message('广告位数数量不能为空');
                    return
                }
                if(this.ad_num<=0&&this.type=='f_sls_lockscreen'){
                    this.$message('广告位数必须为正整数');
                    return
                }
                if(this.chenck==true){
                   this.size=this.cc
                }else{
                    this.size=this.sjSize
                }
                let formData = new FormData;
                formData.append('mfid',this.message.mfid);
                formData.append('type',this.type);
                formData.append('prev_uri',this.prev_uri);
                formData.append('attach',JSON.stringify(this.attach));
                formData.append('tags',this.preinstall);
                formData.append('self_tags',this.bardian);
                formData.append('size',this.size);
                formData.append('model',this.model);
                this.api.mfinal_edit(formData).then((res)=>{
                    if(res.data!=''){
                        this.$parent.heidSc();
                    }
                })
            },
            AddMatter(){
                if(this.message.mfid==undefined){

                    if(!this.type){
                        this.$message('类型不能为空')
                        return
                    }
                    if(!this.prev_uri&&this.chenck!=true){
                        this.$message('未上传预览图')
                        return
                    }
                    if(!this.ad_pic){
                        this.$message('有无打底广告图不能为空')
                        return
                    }

                    if(!this.attach.name){
                        this.$message('未上传文件')
                        return
                    }
                    if(this.preinstall.length<=0){
                        this.$message('预置标签不能为空')
                        return
                    }
                    if(!this.model){
                        this.$message('实现方式不能为空')
                        return
                    }
                    if(!this.bind_mid&&this.is_bind_mid!=true){
                        this.$message('未绑定素材ID');
                        return
                    }
                    if(!this.ad_pic&&this.type=='f_sls_lockscreen'){
                        this.$message('未选择是否有打底广告');
                        return
                    }
                    if(!this.ad_num&&this.type=='f_sls_lockscreen'){
                        this.$message('广告位数数量不能为空');
                        return
                    }
                    if(this.ad_num<=0&&this.type=='f_sls_lockscreen'){
                        this.$message('广告位数必须为正整数');
                        return
                    }
                    if(this.types=='f_sls_lockscreen'&&!this.attach.wpid){
                        this.$message('壁纸标识不能为空');
                        return
                    }
                    if(this.type=='f_sls_lockscreen'){
                        if(this.chenck==true){
                            this.size=this.cc
                        }else{
                            this.size=this.sjSize
                        }
                        let formData = new FormData;
                        formData.append('type',this.type);
                        formData.append('ispic',(this.chenck==true?1:0));
                        formData.append('prev_uri',this.prev_uri);
                        formData.append('attach',JSON.stringify(this.attach));
                        formData.append('tags',this.preinstall);
                        formData.append('self_tags',this.bardian);
                        formData.append('bind_mid',this.bind_mid);
                        formData.append('model',this.model);
                        formData.append('size',this.size);
                        formData.append('link',this.link);
                        formData.append('ad_pic',this.ad_pic);
                        formData.append('ad_num',this.ad_num);
                        this.api.mfinal_add(formData).then((res)=>{
                            if(res.data!=''){
                                this.$parent.heidSc();
                            }
                        }).catch()
                    }else{
                        if(this.chenck==true){
                            this.size=this.cc
                        }else{
                            this.size=this.sjSize
                        }
                        let formData = new FormData;
                        formData.append('type',this.type);
                        formData.append('ispic',(this.chenck==true?1:0));
                        formData.append('prev_uri',this.prev_uri);
                        formData.append('attach',JSON.stringify(this.attach));
                        formData.append('tags',this.preinstall);
                        formData.append('self_tags',this.bardian);
                        formData.append('bind_mid',this.bind_mid);
                        formData.append('model',this.model);
                        formData.append('size',this.size);
                        formData.append('link',this.link);
                        this.api.mfinal_add(formData).then((res)=>{
                            if(res.data!=''){
                                this.$parent.heidSc();
                            }
                        }).catch(this.$message(message))
                    }
                }else{
                    this.setMatter();
                }

            },
            getMatterDetails(){
                let params ={mfid:this.message.mfid};
                this.api.mfinal_detail({params}).then((res)=>{
                    this.sw=true;
                    this.prev_uri=res.prev_uri;

                    for (var j=0;j<res.tags.length;j++){
                        if(this.preset_tags.indexOf(res.tags[j])==-1){
                            this.preinstall= res.tags.splice(j);
                        }
                    }
                    for (var e=0;e<res.self_tags.length;e++){
                        if(this.self_tags.indexOf(res.self_tags[e])==-1){
                            this.bardian=res.self_tags.splice(e);
                        }
                    }
                    this.attach = res.attach;
                    console.log(this.attach)
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
                   this.status=res.status;
                })
            },
            IDchange(){
                if(this.bind_mid==''){
                    this.hqUrl.splice(0);
                    this.bindMid.splice(0);
                }else{
                    let params ={p:10000000,page:1,type:this.type,search:''};
                    this.api.material_search({params}).then((res)=>{
                        this.hqUrl=[];
                        var id=[];
                        id=this.bind_mid.split(';');
                        this.bindMid=this.bind_mid.split(';');
                        for(var i=0;i<id.length;i++){
                            for(var j=0;j<res.data.length;j++){
                                if(id[i]==res.data[j].mid){
                                    this.hqUrl.push(res.data[j].prev_uri);
                                }
                            }
                        }
                    })

                }

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
        padding-left: 10px;
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
        min-height: 850px;
        max-height:940px;
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
        margin-bottom: 20px;
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
        /*width: 100%;*/
        /*height: 100%;*/
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
    .AddIMG_box_1 img,.AddIMG_box_1 video{
        margin: 0 11px 17px 0;
        display: inline-block;
        max-width:216px!important;
        max-height:326px!important;
        border:0px!important;
        position: relative;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
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
        margin-bottom: 12px;
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
        width:80px;
        margin-right: 16px;
        vertical-align: top;
        text-align: right;
    }
    .AddIMG_sc_cjeckbox{
        width: 14px!important;
        height: 14px!important;
        margin-right: 11px;
        padding-left: 0!important;
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
        margin:10px 0 0 99px;
        padding: 0;
        font-size:12px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:#8b9bb3;
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
        display: block;
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
        width:190px;
        padding-left: 10px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .AddIMG_yl select{
        display: inline-block;
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgb(229, 227, 235);
    }
    /*.AddIMG_yl input{*/
        /*width:125px;*/
        /*height:50px;*/
        /*position: relative;*/
        /*left: -140px;*/
        /*top:-35px;*/
        /*opacity: 0;*/
    /*}*/
    .AddIMG_yl_upload{
        width: 150px;
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
        width:560px;
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
        margin:0 20px 0px 0px ;

    }
    .AddIMG_bq_box_top_tit input{
        display: block;
        width:326px;
        height:28px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-top: 10px;
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
        cursor: pointer;
    }
    .bg_btn_up{
        border:0!important;
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
        margin-right: 14px;
        margin-left: 96px;
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
    .disbld{
        background: #e0e0e0 !important;
       border: 0px!important;
    }
    .disbld>span{
        color: #e0e0e0!important;
    }
</style>