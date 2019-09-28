<template>
        <div>
            <div class="top_name">
                <div>
                    <span class="theme_name">主题库</span>
                    <span class="top_txt">共</span>
                    <span class="top_txt">200</span>
                    <span class="top_txt">套/</span>
                    <span class="top_txt">120</span>
                    <span class="top_txt">套已上架</span>
                    <span class="tit_right" @click="upTheme()">上传主题</span>
                </div>
            </div>
            <div class="polling">
                <div class="polling_tag">
                    <span class="tag_name">内容标签</span>
                    <span class="labelName"  @click="getListTag()" :class="{active:listTag.length==0}">全部</span>
                    <div class="tags" :class="{ALLtags:this.class==true}">
                        <span v-for="(item,index) in preset_tags" class="labelName" @click="getListTag(item.name,index)" :class="{active:listTag.indexOf(item.name)!=-1}">{{item.name}}</span>
                    </div>
                    <span class="unfold" v-if="isType==0" @click="expansion">展开</span>
                    <img style="width: 10px;height: 6px" src="../../../public/img/xs.png" v-if="isType==0"/>
                    <span class="unfold" v-if="isType==1" @click="expansion">收起</span>
                    <img style="width: 10px;height: 6px" src="../../../public/img/sq.png" v-if="isType==1"/>
                </div>
                <div class="polling_tag">
                    <span class="tag_name">运营标签</span>
                    <span class="labelName" @click="getListTags()" :class="{active:listTagData.length==0}">全部</span>
                    <div class="tags" :class="{ALLtags:this.class1==true}">
                        <span v-for="(item,index) in self_tags" class="labelName" @click="getListTags(item.desc,index)" :class="{active:listTagData.indexOf(item.desc)!=-1}">{{item.desc}}</span>
                    </div>
                    <span class="unfold" v-if="isTypes==0" @click="expansionTag">展开</span>
                    <img style="width: 10px;height: 6px" src="../../../public/img/xs.png" v-if="isTypes==0"/>
                    <span class="unfold" v-if="isTypes==1" @click="expansionTag">收起</span>
                    <img style="width: 10px;height: 6px" src="../../../public/img/sq.png" v-if="isTypes==1"/>
                </div>
                <div>
                    <el-date-picker
                            class="time"
                            v-model="value1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                    <span class="tit_name">渠道</span>
                    <select style="margin-right: 40px" @change="getUI()" v-model="channel">
                        <option value="">全部</option>
                        <option :value="item.channel" v-for="item in channels">{{item.channel_name}}</option>
                    </select>
                    <span class="tit_name">厂商UI版本</span>
                    <select style="margin-right: 68px" v-model="ui_version">
                        <option value="">全部</option>
                        <option v-for="item in ui" :value="item.version">{{item.version}}</option>
                    </select>
                    <span class="tit_name">状态</span>
                    <select v-model="status">
                        <option>全部</option>
                        <option value="1">已使用</option>
                        <option value="0">未使用</option>
                    </select>
                </div>
                <div>
                    <img src="../../../public/img/ss.png" class="img"/>
                    <input type="text" placeholder="搜索主题库" v-model="search"/>
                    <span class="tit_name">主题类型</span>
                    <select style="margin-right: 54px" v-model="type" @change="content()">
                        <option :value="item.type" v-for="item in theme_type">{{item.type}}</option>
                    </select>
                    <span class="tit_name">内容分类</span>
                    <select style="margin-right: 40px" v-model="contemt">
                        <option :value="item.class" v-for="item in cont">{{item.class}}</option>
                    </select>
                    <span class="tit_name">适用范围</span>
                    <select style="margin-right: 24px" v-model="account">
                        <option :value="item.account" v-for="item in range">{{item.account}}</option>
                    </select>
                    <span class="cx" @click="getData()">查询</span>
                </div>
            </div>
            <div>
                <div class="phone">
                    <div style="width:189px;height:315px;" v-for="item in this.dataList">
                        <img :src="item.main_preview" style="height: 100%;width: 100%" @click="xq">
                        <div class="select_type">
                            <span>本地</span>
                            <img src="../../../public/img/zk.png" style="width: 9px;height: 5px"/>
                            <div class="select_con">
                                <el-radio-group v-model="radio" class="radio">
                                    <el-radio :label="3">VIVO海外</el-radio>
                                    <el-radio :label="6">VIVO海外</el-radio>
                                    <el-radio :label="9">备选项</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                    <div class="bottom_name">
                        <span>主题名称最多十个字数</span>
                    </div>
                </div>
            </div>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="page"
                        :page-size="p"
                        layout="prev, pager, next,total, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
</template>

<script>
    export default {
        name: "theme-cook",
        data(){
            return{
                radio:[],
                value1:[(new Date()).toLocaleDateString().split('/').join('-'),(new Date()).toLocaleDateString().split('/').join('-')],
                isType:0,
                isTypes:0,
                theme_type:[],
                cont:[],
                range:[],
                channel:'',
                channels:[],
                ui:[],
                ui_version:'',
                account:'',
                contemt:'',
                type:"",
                status:'',
                p:14,
                page:1,
                total:0,
                search:'',
                preset_tags:[],
                self_tags:[],
                listTag:[],
                listTagData:[],
                class:false,
                class1:false,
            }
        },
        mounted(){this.themeType();
                this.getData()
        },
        methods:{
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getData()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getData()
            },
            getTagsList(){
                let params = {preset:1,material:2,type:this.type,search:''};
                this.api.tags_search({params}).then((da)=>{
                    this.preset_tags = da.data.tags;
                })
            },
            getOperatorTag(){
                this.api.lockwallpaper_tags_list().then((res)=>{
                    this.self_tags=res;
                })
            },
            getData(){
                let params={tags:this.listTag.concat(this.listTagData).join(','),channel:this.channel,ui_version:this.ui_version,account:this.account,
                    status:this.status,type:this.type,class:this.contemt,tstart:this.value1[0],tend:this.value1[1],search:this.search,p:this.p,page:this.page};
                this.api.themes_theme_search({params}).then((res)=>{
                    this.dataList=res.data;
                    this.total=res.total;
                    this.getTagsList();
                    this.getOperatorTag();
                })
            },
            getListTag(name){
                if(!name){
                    this.listTag.length=0
                }else{
                    if(this.listTag.indexOf(name)==-1){
                        this.listTag.push(name);

                    }else{
                        for(var i=0;i<this.listTag.length;i++ ){
                            if(this.listTag[i]==name){
                                this.listTag.splice(i,1);

                            }
                        }
                    }
                }
                this.getList()
            },
            getListTags(name){
                if(!name){
                    this.listTagData.length=0
                }
                else{
                    if(this.listTagData.indexOf(name)==-1){
                        this.listTagData.push(name)

                    }else{
                        for(var i=0;i<this.listTagData.length;i++ ){
                            if(this.listTagData[i]==name){
                                this.listTagData.splice(i,1);

                            }
                        }
                    }
                }
                this.getList()
            },
            themeType(){
                this.api.themes_config_theme_type().then((res)=>{
                    this.theme_type=res;
                    this.content();
                    this.qd();
                })
            },
            getUI(){
                let params={channel:this.channel};
                this.api.themes_config_channelui({params}).then((res)=>{
                    this.ui=res
                })
            },
            qd(){
                this.api.themes_config_channel().then((res)=>{
                    this.channels=res;
                    this.Range()
                })
            },
            content(){
                let params={type:this.type};
                this.api.themes_config_theme_class({params}).then((res)=>{
                    this.cont=res;
                })
            },
            Range(){
             this.api.themes_config_account().then((res)=>{
                 this.range=res;
             })
            },
            expansion(){
                if(this.isType==0){
                    this.isType=1
                    this.class==true
                }else{
                    this.isType=0
                    this.class==false
                }

            },
            expansionTag(){
                if(this.isTypes==0){
                    this.isTypes=1
                    this.class1==true
                }else{
                    this.isTypes=0
                    this.class1==false
                }
            },
            upTheme(){
                this.$router.push({
                    path:'./themeUp'
                })
            },
            xq(){
                this.$router.push({
                    path:'./themeDetails'
                })
            },
        },
    }
</script>

<style scoped>
    .top_name{
        width: 100%!important;
        height: 61px!important;
    }
    .theme_name{
        display: inline-block;
        font-size:18px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 19px 9px 0 24px;
    }
    .polling{
        margin-top: 150px;
        background: #FFFFFF;
        margin-bottom: 24px;
    }
    .polling_tag{
        margin-left: 24px;
        height: 60px;
        margin-right: 22px;
        border-bottom: 1px dashed #E6E9F0;
    }
    .tags{
        display: inline-block;
        max-width: 1090px;
        max-height: 50px!important;
        overflow: hidden;
       margin-top: 7px;
    }
    .ALLtags{
        max-height: 100%!important;
    }
    .tag_name{
        display: inline-block;
        line-height: 60px;
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(143,155,179,1);
        margin-right: 32px;
    }
    .labelName{
        padding: 0 10px;
    }
    .unfold{
        display: inline-block;
        font-size:12px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(121,130,148,1);
        cursor: pointer;
        margin-right: 5px;
    }
    .time{
        margin:16px 40px 16px 24px;
        width:272px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .tit_name{
        display: inline-block;
        margin-right: 14px;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    input{
        margin-left: -5px;
        padding-left: 35px;
        margin-right: 12px;
        width:235px;
        height:32px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
   .img{
        position: relative;
        left: 35px;
        top: 10px;
    }
    .cx{
        display: inline-block;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height: 36px;
        text-align: center;
        margin-bottom: 23px;
    }
    .bottom_name{
        display: inline-block;
        width:189px;
        height:34px;
        background:rgba(255,255,255,1);
        opacity:0.8;
    }
    .bottom_name span{
        display: inline-block;
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        margin: 9px 0 0 10px;
    }
    .select_type{
        display: inline-block;
        position: relative;
        bottom: 38px;
        left: 0;
        z-index: 999;
        width:189px;
        height:34px;
        background:rgba(10,10,10,1);
        opacity:0.81;
    }
    .phone{
        display: inline-block;
       margin-right: 40px;
    }
    .select_type span{
        display: inline-block;
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(230,233,240,1);
        margin: 9px 8px 0 14px;
    }
    .select_type:hover .select_con{
        opacity: 1;
    }
    .select_con{
        width:189px;
        height:207px;
        background:rgba(28,28,28,1);
        border-radius:4px;
        opacity: 0;
        position: relative;
        left: 0;
        bottom: 233px;
    }
    .select_con input{
        width: 16px;
        height: 16px;
    }
    .radio{margin: 0px 9px}
    .radio .el-radio{
       margin: 16px 3px 0 3px;
    }
    .radio .el-radio__label{
        color: #fff!important;
    }
    .tit_right{
        display: inline-block;
        float: right;
        line-height: 36px;
        text-align: center;
        width:96px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        margin-right: 15%;
        cursor: pointer;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-top: 13px;
    }
    .active{
        background:#3377ff!important;
        color: #fff!important;
        border:0!important;
    }
</style>