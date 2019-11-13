<template>
    <div>
        <sel v-if="sel" @linet="linet"></sel>
        <sel-theme v-if="themeSelect" @listData="listData"></sel-theme>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh()">{{this.type=='th_lock_screen'?'锁屏主题素材':this.type=='th_icon'?'图标主题素材':this.type=='theme_two'?'二级页主题素材':'宣传图'}}&nbsp;/</span>
                <span class="new_url">&nbsp;上传{{this.type=='th_lock_screen'?'锁屏主题素材':this.type=='th_icon'?'图标主题素材':this.type=='theme_two'?'二级页主题素材':'宣传图'}}</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">上传{{this.type=='th_lock_screen'?'锁屏主题素材':this.type=='th_icon'?'图标主题素材':this.type=='theme_two'?'二级页主题素材':'宣传图'}}</span>
            </div>
        </div>
        <div class="themeUp">
            <div class="themeUpLeft">
                <div>
                    <span >名称</span>
                    <input type="text" placeholder="起个名字" style=" margin-top: 26px;"  v-model="name">
                </div>
                <div style="margin-bottom: 0">
                    <span >附件</span>
                    <div style="display: inline-block" v-if="this.type!='th_advertise'">
                        <div class="upBag">
                            <img src="../../../public/img/upbag.png"/>
                        </div>
                        <el-upload
                                class="upload-demo"
                                action="222"
                                :http-request="upLoad"
                                multiple
                                :on-remove="handleRemove"
                                :before-upload="beforeAvatarUploads"
                                >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                        <div style="display: inline-block">
                            <div style="margin-bottom: 3px;margin-top:3px ">
                                <span style="font-size:14px;font-family:PingFangSC;font-weight:400;color:rgba(61,73,102,1);">上传附件</span>
                            </div>
                            <div style="margin-bottom: 3px">
                                <span style="font-size:14px;font-family:PingFangSC;font-weight:400;color:rgba(143,155,179,1);" v-if="type!='th_advertise'">支持扩展名：.zip</span>
                                <span style="font-size:14px;font-family:PingFangSC;font-weight:400;color:rgba(143,155,179,1);" v-if="type=='th_advertise'">支持扩展名：.zip、jpg、png</span>
                            </div>
                            <div style="margin-bottom: 3px">
                                <span>{{attach.name}}</span>
                                <span class="content_xz" @click="dels()" v-if="this.attach.name!=undefined">删除</span>
                            </div>
                            <el-progress :percentage="this.times" v-if="up"></el-progress>
                        </div>
                    </div>
                    <div style="display: inline-block" v-if="this.type=='th_advertise'">
                        <div class="upBag">
                            <img src="../../../public/img/upbag.png"/>
                        </div>
                        <el-upload
                                class="upload-demo"
                                action="222"
                                :http-request="upLoad"
                                :on-remove="handleRemove"
                                :on-exceed="handleExceed"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                        <div style="display: inline-block">
                            <div style="margin-bottom: 3px;margin-top:3px ">
                                <span style="font-size:14px;font-family:PingFangSC;font-weight:400;color:rgba(61,73,102,1);">上传附件</span>
                            </div>
                            <div style="margin-bottom: 3px">
                                <span style="font-size:14px;font-family:PingFangSC;font-weight:400;color:rgba(143,155,179,1);" v-if="type!='th_advertise'">支持扩展名：.zip</span>
                                <span style="font-size:14px;font-family:PingFangSC;font-weight:400;color:rgba(143,155,179,1);" v-if="type=='th_advertise'">支持扩展名：.zip、jpg、png</span>
                            </div>
                            <div style="margin-bottom: 3px">
                                <span>{{attach.name}}</span>
                                <span class="content_xz" @click="dels()" v-if="this.attach.name!=undefined">删除</span>
                            </div>
                            <el-progress :percentage="this.times" v-if="up"></el-progress>
                        </div>
                    </div>
                </div>
                <div v-if="this.type!='th_advertise'">
                    <span>使用范围</span>
                    <select class="fw" v-model="range" :disabled="this.$route.query.thmid!=undefined">
                        <option value="all">不限</option>
                        <option v-for="item in AcctounsList" :value="item.range">{{item.range}}</option>
                    </select>
                </div>

                <div>
                    <span style="vertical-align: top">备注描述</span>
                    <textarea  placeholder="写个自我介绍，50字内" v-model="note" maxlength="50"></textarea>
                </div>
                <div>
                    <span style="vertical-align: top">内容标签</span>
                    <div class="tag_box">
                        <input  type="text" placeholder="创建或搜索个性标签" v-model="tagsName" @input="getTagsList()"/>
                        <div class="tags_box">
                            <span class="CJ" v-if="tagsName!=''" @click="ADDtag()" >创建“{{tagsName}}”标签</span>
                            <div>
                                <template>
                                    <el-checkbox-group
                                            v-model="tags">
                                        <el-checkbox v-for="(item,index) in tag" :label="item.name">{{item.name}}</el-checkbox>
                                    </el-checkbox-group>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>

                    <div  v-if="this.$route.query.thmid!=undefined&&this.type!='th_advertise'">
                        <span>绑定设计师素材</span>
                        <input class="xmID" type="text" v-model="previews" placeholder="请输入项目ID" disabled="disabled">
                        <!--<input type="checkbox" class="check" v-model="is_work" disabled="disabled"/>-->
                        <template>
                            <el-checkbox v-model="is_work" style="margin: 0 10px" disabled></el-checkbox>
                        </template>
                        <span class="sm">与作品无关</span>
                        <span class="sm2">绑定制作图标的相关作品，千万不要填错了</span>
                    </div>
                    <div v-if="this.$route.query.thmid==undefined&&this.type!='th_advertise'">
                        <span>绑定设计师素材</span>
                        <input class="xmID" type="text" v-model="previews" placeholder="请输入项目ID">
                        <!--<input type="checkbox" class="check" v-model="is_work" />-->
                        <template>
                            <el-checkbox v-model="is_work" style="margin: 0 10px"></el-checkbox>
                        </template>
                        <span class="sm">与作品无关</span>
                        <span class="sm2">绑定制作图标的相关作品，千万不要填错了</span>

                    </div>


                <div v-if="this.type!='th_advertise'">
                    <span>绑定主题素材</span>
                    <a @click="jump()" v-if="this.$route.query.thmid==undefined">从主题素材库选择</a>
                    <a v-if="this.$route.query.thmid!=undefined">从主题素材选择</a>
                    <!--<input type="checkbox" class="check" v-model="is_material"/>-->
                    <template>
                        <el-checkbox v-model="is_material" style="margin: 0 10px"></el-checkbox>
                    </template>
                    <span class="sm">与主题素材无关</span>
                    <span class="sm2">绑定制作图标的相关主题素材，千万不要填错了</span>
                    <div class="img_box">
                        <div class="img_box1" v-for="(item,index) in listSC">
                            <img class="img_box1_img" :src="item.main_preview">
                            <img class="del" src="../../../public/img/del.png" style="width: 17px;height: 16px" v-if="this.$route.query.thmid==undefined" @click="Del(item.thmid)"/>
                        </div>
                    </div>
                </div>
                <div v-if="this.type=='th_advertise'">
                    <span>绑定主题</span>
                    <a @click="jumpTheme()" v-if="this.$route.query.thmid==undefined">从主题库选择</a>
                    <a v-if="this.$route.query.thmid!=undefined">从主题选择</a>
                    <div class="img_box">
                        <div class="img_box1" v-for="(item,index) in listThm">
                            <img class="img_box1_img" :src="item.main_preview">
                            <img class="del" src="../../../public/img/del.png" style="width: 17px;height: 16px" v-if="this.$route.query.thmid==undefined" @click="DelList(index)"/>
                        </div>
                    </div>
                </div>
                <div class="themeBtn">
                    <span class="tj" @click="ADD()">提交</span>
                    <span @click="fh()">返回</span>
                </div>
            </div>
            <div class="themeUpRight">
                <div style="margin:0 0 20px 24px">
                    <span class="upName">上传界面预览图</span>
                    <span class="max_num">最多上传10张预览图</span>
                </div>
                <div class="imgBox">
                    <div class="upPreview">
                        <div class="icon">
                            <img src="../../../public/img/add_msg.png" style="width: 18px;height: 18px;margin-bottom: 10px">
                            <div>
                                <span style="display: inline-block;font-size:12px;font-family:PingFangSC;font-weight:400;color:rgba(31,46,77,0.45);">封面预览图</span>
                            </div>
                        </div>
                        <el-upload
                                class="upload"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :http-request="upYl"
                                 multiple
                                :limit="10"
                                :on-exceed="handleExceed"
                                >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                    <div class="imgCanvas" v-for="item in pic">
                        <img class="dels" src="../../../public/img/del.png" style="width: 16px" v-if="item!=main_preview" @click="Delete(item)">
                        <img src="../../../public/img/select.png" style="width: 48px;height: 48px;position: relative;left:96px;top:0px;z-index: 99" v-if="item==main_preview">
                        <img :src="item" class="sc">
                        <div class="sz" @click="fm(item)">
                            <span>设置为封面</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="bg" class="bg">
            <div class="ts">
                <div class="ts_name">
                    <span>确认提示</span>
                </div>
                <div class="ts_con">
                    <span>
                        提交后主题名称、主题类型 及主题素材、主题之间的绑定关系将无法修改请仔细核对相关信息，是否无误？
                    </span>
                </div>
                <div class="btn">
                    <span class="qd" @click="tj()">确定</span>
                    <span @click="qx()">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import sel from './select_material'
    import selTheme from './select'
    export default {
        components:{sel,selTheme},
        name: "theme_up",
        data(){
            return{
                bg:false,
                attach:{},
                previews:[],
                materials:[],
                is_material:false,
                works:[],
                is_work:false,
                tags:[],
                tag:[],
                tagsName:"",
                range:'',
                note:'',
                name:'',
                type:this.$route.query.type,
                AcctounsList:[],
                pic:[],
                main_preview:'',
                sel:false,
                scID:[],
                IMGList:[],
                listSC:[],
                up:false,
                times:0,
                themeSelect:false,
                listTheme:[],
                themeID:[],
                listThm:[],
            }
        },
        mounted(){
            this.getTagsList();

            this.Acctouns();
        },
        methods:{
            jumpTheme(){this.themeSelect=true},
            heidThm(){this.themeSelect=false},
            setData(){
                let params={thmid:this.$route.query.thmid};
                this.api.themes_material_details({params}).then((res)=>{
                  this.name=res.name;
                  this.attach=res.attach;
                  this.range=res.range;
                  this.note=res.note;
                  var arr=[];
                    for(var j=0;j<(res.tags.split(',')).length;j++){
                        for(var i=0;i<this.tag.length;i++){
                            if(this.tag[i].name==(res.tags.split(','))[j]){
                                arr.push((res.tags.split(','))[j])
                            }
                        }
                    }
                  this.tags=arr;
                  if(res.is_work==0){
                      this.is_work=true
                  }else {
                      this.is_work=false
                  }
                    if(res.is_material==0){
                        this.is_material=true
                    }else {
                        this.is_material=false
                    }
                    this.works=res.works;
                    this.main_preview=res.main_preview;
                    this.pic= res.previews;
                })
            },
            listData(data,data1,data2,data3,data4,data5,data6,data7){
                var themeD= {thid:"",channel:"",ch_thid:""};
                themeD.thid=data;
                themeD.channel=data5;
                themeD.channel=data1;
                this.themeID.push(themeD);
                this.getTheme()
            },
            getTheme(){
                let params={tags:'',channel:'',ui_version:'',account:'',
                    status:'',type:'',class:'',tstart:"2019-09-29",tend:(new Date()).toLocaleDateString().split('/').join('-'),search:'',p:1000000,page:1};
                this.api.themes_theme_search({params}).then((res)=>{
                    var list=[];
                    for(var i=0;i<res.data.length;i++ ){
                        for(var j =0;j<this.themeID.length;j++){
                            if((res.data)[i].thid==this.themeID[j].thid){
                                list.push((res.data)[i]);
                            }
                        }
                    }
                    this.listThm=list;

                })
            },
            DelList(index){
                this.listThm.splice(index,1);
                this.themeID.splice(index,1);
            },
            getsc(){
                let params={thmid:this.$route.query.thmid};
                this.api.themes_material_materials({params}).then((res)=>{
                    this.listSC=res;
                })
            },
            beforeAvatarUploads(file) {
                this.file = file;
                const isXzip = file.type === 'application/x-zip-compressed';
                const iszip = file.type === 'application/zip';
                if (!(isXzip||iszip)) {
                    this.$message.error('只支持ZIP格式!');
                }
                return isXzip||iszip;
            },
            getList(){
                let params ={page:1,p:100000,type:'',search:'',tags:'',status:''};
                this.api.themes_material_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    var list=[];
                    for(var i=0;i<this.IMGList.length;i++ ){
                        for(var j =0;j<this.scID.length;j++){
                            if(this.IMGList[i].thmid==this.scID[j]){
                                list.push(this.IMGList[i]);
                            }
                        }
                    }
                    this.listSC=list;
                })
            },
            ADDtag(){
                let formData =new FormData;
                formData.append('name',this.tagsName);
                formData.append('preset',"0");
                formData.append('material','2');
                formData.append('type','theme');
                this.api.tags_add(formData).then((res)=>{
                    this.tagsName='';
                    this.getTagsList();
                })
            },
            fm(url){
                this.main_preview=url;
            },
            Del(id){
                for(var i=0;i<this.scID.length;i++){
                    if(this.scID[i]==id){
                        this.scID.splice(i,1);
                    }
                }
                this.getList();
            },
            getTagsList(){
                let params = {material:'2',type:'theme',search:this.tagsName,p:500,page:1};
                this.api.tags_search({params}).then((da)=>{
                    this.tag=da.data.self_tags;
                    if(this.$route.query.thmid!=undefined){
                        this.setData();
                        this.getsc();
                    }
                })
            },
            handleExceed(files, fileList) {
                this.$message.error(`当前限制选择10个文件`);
            },
            fh(){
                this.$router.go(-1)
            },

          linet(data){
                this.scID=data;
                this.getList();
            },
            ADD(){
                this.bg=true;
            },
            qx(){
                this.bg=false;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            dels(){
                this.attach={};
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
            upLoad(file){
                this.up=true;
                this.times=0;
                ++this.fcounter;
                this.attach={};
                this.scope();
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    this.attach=res;
                    this.times=100;
                    --this.fcounter;
                    this.up=false;
                })
            },
            upYl(file){
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    this.pic.push(res.url);
                })
            },
            jump(){
               this.sel=true;
            },

            setJump(){
                this.sel=false;
            },
            Acctouns(){
                this.api.themes_config_account().then((res)=>{
                   this.AcctounsList=res;
                })
            },
            tj(){
                if(this.$route.query.thmid==undefined){
                    this.ADDs()
                }else{
                    this.setADDS()
                }
            },
            Delete(data){
                for(var i=0;i<this.pic.length;i++){
                    if(this.pic[i]==data){
                        this.pic.splice(i,1);
                    }
                }
            },
            setADDS(){
                if(this.type=='th_advertise'){
                    if(!this.name){
                        this.$message.error('名称不能为空')
                        return
                    }
                    if(!this.attach.name){
                        this.$message.error('附件不能为空')
                        return
                    }
                    if(!this.note){
                        this.$message.error('备注不能为空')
                        return
                    }
                    if(this.tags.length==0){
                        this.$message.error('标签不能为空')
                        return
                    }
                    if(!this.main_preview){
                        this.$message.error('封面图不能为空')
                        return
                    }
                    var formData =new FormData;
                    formData.append('type',this.type);
                    formData.append('thmid',this.$route.query.thmid);
                    formData.append('name',this.name);
                    formData.append('note',this.note);
                    formData.append('tags',this.tags.join(','));
                    formData.append('previews',JSON.stringify(this.pic));
                    formData.append('attach',JSON.stringify(this.attach));
                    formData.append('main_preview',this.main_preview);
                }else{
                    if(!this.name){
                        this.$message.error('名称不能为空')
                        return
                    }
                    if(!this.attach.name){
                        this.$message.error('附件不能为空')
                        return
                    }
                    if(!this.range){
                        this.$message.error('使用范围不能为空')
                        return
                    }
                    if(!this.note){
                        this.$message.error('备注不能为空')
                        return
                    }
                    if(this.tags.length==0){
                        this.$message.error('标签不能为空')
                        return
                    }
                    if(!this.main_preview){
                        this.$message.error('封面图不能为空')
                        return
                    }
                    if(this.is_work==false){
                        this.is_work=1
                    }else{
                        this.is_work=0
                    }
                    if(this.is_material==false){
                        this.is_material=1
                    }else{
                        this.is_material=0
                    }
                    var formData =new FormData;
                    formData.append('type',this.type);
                    formData.append('thmid',this.$route.query.thmid);
                    formData.append('name',this.name);
                    formData.append('note',this.note);
                    formData.append('range',this.range);
                    formData.append('tags',this.tags.join(','));
                    formData.append('is_work',this.is_work);
                    formData.append('works',JSON.stringify(this.works));
                    formData.append('materials',JSON.stringify(this.scID));
                    formData.append('is_material',this.is_material);
                    formData.append('previews',JSON.stringify(this.pic));
                    formData.append('attach',JSON.stringify(this.attach));
                    formData.append('main_preview',this.main_preview);
                }
                this.api.themes_material_edit(formData).then((res)=>{
                    if(res!=false){
                        this.qx();
                        this.$router.go(-1)
                    }

                })
            },
            ADDs(){
                if(this.type=='th_advertise'){
                    if(!this.name){
                        this.$message.error('名称不能为空')
                        return
                    }
                    if(!this.attach.name){
                        this.$message.error('附件不能为空')
                        return
                    }
                    if(!this.note){
                        this.$message.error('备注不能为空')
                        return
                    }
                    if(this.tags.length==0){
                        this.$message.error('标签不能为空')
                        return
                    }
                    if(!this.main_preview){
                        this.$message.error('封面图不能为空')
                        return
                    }
                    if(this.themeID.length==0){
                        this.$message.error('绑定主题不能为空')
                        return
                    }
                    let formData =new FormData;
                    formData.append('type',this.type);
                    formData.append('name',this.name);
                    formData.append('note',this.note);
                    formData.append('tags',this.tags.join(','));
                    formData.append('themes',JSON.stringify(this.themeID));
                    formData.append('previews',JSON.stringify(this.pic));
                    formData.append('attach',JSON.stringify(this.attach));
                    formData.append('main_preview',this.main_preview);
                }else{
                    if(!this.name){
                        this.$message.error('名称不能为空');
                        return
                    }
                    if(!this.attach.name){
                        this.$message.error('附件不能为空')
                        return
                    }
                    if(!this.range){
                        this.$message.error('使用范围不能为空')
                        return
                    }
                    if(!this.note){
                        this.$message.error('备注不能为空')
                        return
                    }
                    if(this.tags.length==0){
                        this.$message.error('标签不能为空')
                        return
                    }
                    if(!this.main_preview){
                        this.$message.error('封面图不能为空')
                        return
                    }

                    if(this.is_work==false){
                        this.is_work=1
                    }else{
                        this.is_work=0
                    }
                    if(this.is_material==false){
                        this.is_material=1
                    }else{
                        this.is_material=0
                    }
                    var formData =new FormData;
                    formData.append('type',this.type);
                    formData.append('name',this.name);
                    formData.append('note',this.note);
                    formData.append('range',this.range);
                    formData.append('tags',this.tags.join(','));
                    formData.append('is_work',this.is_work);
                    formData.append('works',JSON.stringify(this.works));
                    formData.append('materials',JSON.stringify(this.scID));
                    formData.append('is_material',this.is_material);
                    formData.append('previews',JSON.stringify(this.pic));
                    formData.append('attach',JSON.stringify(this.attach));
                    formData.append('main_preview',this.main_preview);
                }
                this.api.themes_material_add(formData).then((res)=>{
                    if(res!=false){
                        this.qx();
                        this.$router.go(-1)
                    }
                })
            },
        },
    }
</script>

<style scoped>

    .top{
        width: 100%;
        height: 98px;
        background: rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
    }
    .new_url{color: rgba(61,73,102,1)!important;}
    .themeUp{
        margin-top: 187px;
    }
    .themeUpLeft{
        display: inline-block;
        width:870px;
        min-height:852px;
        background: #fff;
        margin-right: 24px;
    }
    .themeUpLeft>div{margin-bottom: 20px;margin-left: 10px;}
    .themeUpLeft>div>span{
        text-align: right;
        margin-right: 24px;
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        width: 100px;
    }
    textarea{
        padding: 10px;
        width:448px;
        height:68px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .themeUpLeft>div>input{
        padding-left: 14px;
        width:451px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .themeUpLeft>div>select{
        width:404px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 50px;
    }
    .upBag{
        display: inline-block;
        position: relative;
        top:-19px;
        width:98px;
        height:98px;
        background:rgba(0,0,0,0.02);
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        text-align: center;
        margin-right: 17px;
    }
    .upBag img{
        display: inline-block;
        width: 24px;
        height: 24px;
        position: relative;
        top:50%;
        transform: translateY(-50%);
    }
    .upload-demo{
        display: inline-block;

    }
    .upload-demo .el-button {
        width:98px;
        height:98px;
        position: absolute;
        top:87px;
        left: 135px;
        opacity: 0;
    }
    .tag_box{
        display: inline-block;
        width:467px;
        height:200px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        overflow-y: auto;
    }
    .tag_box input{
        margin: 20px 0 0px 14px;
        padding-left: 14px;
        width:390px;
        height:28px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    a{
        display: inline-block;
        width:152px;
        height:36px;
        background:rgba(242,246,252,1);
        border-radius:4px;
        border:1px solid rgba(51,119,255,1);
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        text-align: center;
        line-height: 36px;
        cursor: pointer;
    }
    .img_box{
        margin-left: 126px;
        margin-top: 20px;
    }
    .img_box1{
        display: inline-block;
        margin-right: 25px;
        width:144px;
        height:240px;
        border:1px solid rgba(211,219,235,1);
        position: relative;
        vertical-align: top;
    }
    .img_box1_img{
        max-width:144px;
        max-height:240px;
        position: relative;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .del{
        display: inline-block;
        cursor: pointer;
        position: absolute;
        top:-6px;
        right:-6px;
    }
    .themeBtn{
        margin-left: 136px!important;
    }
    .themeBtn span{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        line-height: 36px;
        text-align: center!important;
        cursor: pointer;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .tj{
        background:rgba(51,119,255,1)!important;
        color: #fff!important;
        margin-right: 20px;
    }
    .themeUpRight{
        vertical-align: top;
        display: inline-block;
        width:696px;
        min-height:648px;
        background:rgba(255,255,255,1);
    }
    .upName{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-top: 24px;
        margin-right: 9px;
    }
    .max_num{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(143,155,179,1);
    }
    .imgBox{
        margin-left: 24px;
    }
    .upPreview{
        position: relative;
        display: inline-block;
        vertical-align: top;
        width:144px;
        height:240px;
        margin-right: 20px;
        background:rgba(0,0,0,0.05);
        border:1px dashed rgba(0,0,0,0.15);
        text-align: center;
        margin-bottom: 20px;
    }
    .icon{
        text-align: center;
        position:relative ;
        top: 50%;
        transform: translateY(-50%);
    }
    .upload{
        position: absolute;
        top: 0;
        opacity: 0;
        width: 100%;
    }
    .upload .el-button{
        width:144px;
        height:240px;
    }
    .imgCanvas{
        position: relative;
        vertical-align: top;
        display: inline-block;
        width:144px;
        height:240px;
        margin-right: 20px;
        border: 1px solid #ddd;
        margin-bottom: 20px;
    }
    .sc{
        max-width:144px;
        max-height:240px;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        bottom: 0;
        right: 0;
    }
    .ts{
        position: fixed;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        width:420px;
        height:166px;
        padding: 20px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
    }
    .ts_name span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:bold;
        color:rgba(31,46,77,1);
        margin-bottom: 13px;
    }
    .ts_con span{
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
        margin-bottom: 44px;
    }
    .btn{
        text-align: right;
        width: 90%!important;
    }
    .btn span{
        text-align: center;
        cursor: pointer;
        line-height: 36px;
        width:80px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .qd{
        background:rgba(51,119,255,1)!important;
        border: 0px!important;
        color: #fff!important;
        margin-right: 20px;
    }
    .check{
        width:16px!important;
        height:16px!important;
        background:rgba(51,119,255,1);
        border-radius:4px;
        margin: 0 6px 0 10px;
    }
    .sm{
        display: inline-block;
        width: auto!important;
        font-size:14px!important;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.65)!important;
        margin-right: 12px;
    }
    .sm2{
        width: auto!important;
        display: inline-block;
        font-size:14px!important;
        font-family:PingFangSC;
        font-weight:400!important;
        color:rgba(31,46,77,0.45)!important;
    }
    .tags_box{
        margin:14px;
    }
    .xmID{
        width:302px!important;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
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

    .sz{
        width:144px;
        height:34px;
        background:rgba(0,0,0,1);
        position: absolute;
        bottom: 0px;
        text-align: center;
        opacity: 0;
    }
    .imgCanvas:hover .sz{
        opacity: 0.8;
    }
    .sz span{
        display: inline-block;
        cursor: pointer;
        line-height: 34px;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
    }
    .dels{
        position: absolute;
        top:0;
        right: -6px;
        z-index: 9;
        opacity: 0;
    }
    .imgCanvas:hover .dels{
        opacity: 1;
    }
    .content_xz{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left: 10px;
        cursor: pointer;
    }
</style>