<template>
    <div class="bg">
        <div class="content">
            <div class="tit_name">
                <span>从主题库选择</span>
            </div>
            <div class="contentImg">
                <div class="label">
                    <span class="label_txt">内容标签:</span>
                    <span class="labelName" @click="getListTag()" :class="{active:listTag.length==0}">全部</span>
                    <div class="tags" :class="{ALLtags:this.class==true}">
                        <span v-for="(item,index) in preset_tags" class="labelName" @click="getListTag(item.name,index)" :class="{active:listTag.indexOf(item.name)!=-1}">{{item.name}}</span>
                    </div>
                    <span class="tagsAll" v-if="this.class==false" @click="getTag">查看更多</span>
                    <span class="tagsAll" v-if="this.class==true" @click="heidTag">收起</span>
                </div>
                <div class="label">
                    <span class="label_txt" >运营标签:</span>
                    <span class="labelName" @click="getListTags()" :class="{active:listTagData.length==0}">全部</span>
                    <div class="tags" :class="{ALLtags:this.class1==true}">
                        <span v-for="(item,index) in self_tags" class="labelName" @click="getListTags(item.desc,index)" :class="{active:listTagData.indexOf(item.desc)!=-1}">{{item.desc}}</span>
                    </div>
                    <span class="tagsAll" v-if="this.class1==false" @click="getTag1">查看更多</span>
                    <span class="tagsAll" v-if="this.class1==true" @click="heidTag1">收起</span>
                </div>
                <div class="Search">
                    <div>
                        <el-date-picker
                                v-model="time"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                        <span>渠道</span>
                        <select v-model="channel" @change="getUI">
                            <option v-for="item in channels" :value="item.channel">{{item.channel_name}}</option>
                        </select>
                        <span>厂商UI版本</span>
                        <select v-model="ui_version">
                            <option v-for="item in ui" :value="item.version" v-if="ui.length!=0">{{item.version}}</option>
                            <option value="" v-if="ui.length==0&&channel!=''">暂无</option>
                        </select>
                        <span>状态</span>
                        <select v-model="status">
                            <option value="">全部</option>
                            <option value="1">已上架</option>
                            <option value="0">未上架</option>
                        </select>
                    </div>
                    <div>
                        <img src="../../../public/img/ss.png" />
                        <input type="text" placeholder="搜索标签或ID" v-model="search" @input="getList()"/>
                        <span>主题类型</span>
                        <select v-model="type" @change="getCon()">
                            <option value="">全部</option>
                            <option v-for="item in theme" :value="item.type">{{item.type}}</option>
                        </select>
                        <span>内容分类</span>
                        <select v-model="content">
                            <option value="">全部</option>
                            <option v-for="item in con" :value="item.class">{{item.class}}</option>
                        </select>
                        <span class="box_btn" @click="getList()" v-if="this.$route.query.type==undefined">查询</span>
                        <span class="box_btn" @click="getData()" v-if="this.$route.query.type!=undefined">查询</span>
                    </div>
                </div>
                    <div class="box">
                        <div class="box_img"  v-for="(item,index) in IMGList" @click="clicks(index)">
                            <div class="box_top">
                                <img src="../../../public/img/select2.png" style="width: 48px;height: 48px;position: relative;right: -141px;z-index: 99" v-if="ind.indexOf(IMGList[index].thid)==-1">
                                <img src="../../../public/img/select.png" style="width: 48px;height: 48px;position: relative;right: -141px;z-index: 99" v-if="ind.indexOf(IMGList[index].thid)!=-1">
                                <img :src="item.main_preview" class="box_top_img">
                            </div>
                            <div class="box_name">
                                <span>{{item.name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange1"
                        @current-change="handleCurrentChange1"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="prev, pager, next,total, jumper"
                        :total="total">
                </el-pagination>
                <div class="select_btn">
                    <span class="select_btn_left" @click="messageID">确定</span>
                    <span @click="YCset">取消</span>
                </div>
            </div>
        </div>
        <div class="bg" v-if="ADDqd">
            <div class="selectQD">
                <div class="Names">
                    <span>选择</span>
                </div>
                <div class="select_cons">
                    <div >
                        <span>渠道</span>
                        <select v-model="ADDchannel" @change="qd()">
                            <option :value="item.channel" v-for="(item,index) in channelDataList">{{item.channel_name}}</option>
                        </select>
                    </div>
                    <div>
                        <span>厂商UI版本</span>
                        <select v-model="ADDui">
                            <option v-for="item in channelData" :value="item" v-if="channelData.length!=0">{{item}}</option>
                            <option value="" v-if="channelData.length==0&&channel!=''">暂无</option>
                        </select>
                    </div>
                    <div>
                        <span>资源版本</span>
                        <select v-model="bb">
                            <option v-for="item in uiLIST" :value="item">{{item}}</option>
                        </select>
                    </div>
                </div>
                <div class="selectBox">
                    <span class="selectBox_qd" @click="setID">确定</span>
                    <span @click="heidTC()">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "select_material",
        props:['material','typeSC'],
        data(){
            return {
                checked:[],
                radioSize:'',
                pageSize: 6,
                total: 0,
                currentPage: 1,
                preset_tags:[],
                self_tags:[],
                IMGList:[],
                search:'',
                scMid:'',
                scUrl:'',
                scType:'',
                type:'',
                mid_list:[],
                url_list:[],
                inx:null,
                inde:null,
                ind:[],
                listData:[],
                class:false,
                class1:false,
                listTag:[],
                listTagData:[],
                search_tags:[],
                time:[(new Date()).toLocaleDateString().split('/').join('-'),(new Date()).toLocaleDateString().split('/').join('-')],
                channels:[],
                channel:'',
                ui:[],
                theme:[],
                con:[],
                content:'',
                status:'',
                ui_version:'',
                ADDqd:false,
                ADDchannel:'',
                TCchannel:[],
                ADDui:'',
                zyBb:[],
                uis:[],
                ch_thids:'',
                qdList:'',
                main_preview:'',
                name:"",
                channelName:'',
                index:"",
                bb:'',
                channelData:[],
                channelDataList:[],
                uiLIST:[],
            }
        },
        mounted() {
            if(this.$route.query.type!=undefined){
                this.getData()
            }else{
                this.getList();
            }
            this.getChannel()
        },
        methods:{
            setID(){
                this.ch_thids='';
                this.qdList=[];
                for(var i=0 ;i<this.TCchannel.length;i++){
                    if(this.TCchannel[i].channel==this.ADDchannel){
                        this.ch_thids=this.TCchannel[i].ch_thid;
                        this.qdList=this.TCchannel[i].channel_name;
                        this.channelName=this.TCchannel[i].channel;
                        this.main_preview=this.TCchannel[i].main_preview;
                    }
                }
                this.ADDqd=false;
            },
            heidTC(){
                this.ADDqd=false;
                this.ind=[];
                this.ADDchannel='';
                this.ADDui='';
                this.bb='';
            },
            qd(){
                alert('a')
                this.channelData=[];
                this.uiLIST=[];
                this.ADDui='';
                this.bb='';
                for(var i=0;i<this.TCchannel.length;i++){
                    if((this.TCchannel[i].channel==this.ADDchannel)&&(this.channelData.indexOf(this.TCchannel[i].ui_version)==-1)){
                        this.channelData.push(this.TCchannel[i].ui_version);
                    }
                }
                for(var i=0;i<this.TCchannel.length;i++){
                    if((this.TCchannel[i].channel==this.ADDchannel)&&(this.uiLIST.indexOf(this.TCchannel[i].version)==-1)){
                        this.uiLIST.push(this.TCchannel[i].version);
                    }
                }

            },
            clicks(index){
                this.channelDataList=[];
                if(this.ind.indexOf(this.IMGList[index].thid)==-1){
                    this.ind=[];
                    this.index=index;
                    this.ADDqd=true;
                    this.TCchannel=this.IMGList[index].channel_themes;
                    this.channelDataList=this.TCchannel;
                    // // for(var i=0;i<this.channelDataList.length;i++){
                    // //     if(this.channelDataList[i].channel==this.channelDataList[i+2].channel){
                    // //         this.channelDataList.splice(i,1);
                    // //     }
                    // // }
                    // for(var i=0; i<this.channelDataList.length; i++){
                    //     for(var j=i+1; j<this.channelDataList.length; j++){
                    //         if(this.channelDataList[i]==this.channelDataList[j]){
                    //             this.channelDataList.splice(j,1);
                    //             j--;
                    //         }
                    //     }
                    // }
                    this.name=this.IMGList[index].name;
                    this.ind.push(this.IMGList[index].thid);

                }

            },
            getThemeType(){
                let params={channel:this.ADDchannel,ui_version:this.ADDui};
                this.api.themes_config_version({params}).then((res)=>{
                    this.zyBb=res;
                })
            },
            getUIs(){
                let params={channel:this.ADDchannel};
                this.api.themes_config_channelui({params}).then((res)=>{
                    this.uis=res;
                })
            },
            getChannel(){
                this.api.themes_config_channel().then((res)=>{
                    this.channels=res;
                    this.getTheme();
                })
            },
            getCon(){
                let params ={type:this.type};
                this.api.themes_config_theme_class({params}).then((res)=>{
                    this.con=res;
                })
            },
            getTheme(){
                this.api.themes_config_theme_type().then((res)=>{
                    this.theme=res
                })
            },
            getUI(){
                let params ={channel:this.channel};
                this.api.themes_config_channelui({params}).then((res)=>{
                    this.ui=res
                })
            },

            YCset(){this.$parent.heidThm()},
            messageID(){
                    this.$emit('listData',this.ind,this.ch_thids,this.qdList,this.main_preview,this.name,this.channelName,this.ADDchannel,this.ADDui);
                    this. YCset()
            },
            getData(){
                let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search,
                    tags:this.listTagData.concat(this.listTag).join(','),status:this.status,
                    class:this.content,ui_version:this.ui_version,channel:this.channel,account:'',tstart:this.time[0],tend:this.time[1]};
                this.api.themes_theme_channel_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    this.total=res.total;
                    this.getTagsList();
                    this.getOperatorTag()
                })
            },
            getList(){
                let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search,
                    tags:this.listTagData.concat(this.listTag).join(','),status:this.status,
                    class:this.content,ui_version:this.ui_version,channel:this.channel,account:'',tstart:this.time[0],tend:this.time[1]};
                this.api.themes_theme_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    this.total=res.total;
                    this.getTagsList();
                    this.getOperatorTag()
                })
            },
            getTag(){
                this.class=true;
            },
            heidTag(){
                this.class=false;
            },
            getTag1(){
                this.class1=true;
            },
            heidTag1(){
                this.class1=false;
            },
            getTagsList(){
                let params = {preset:1,material:2,type:"theme",search:''};
                this.api.tags_search({params}).then((da)=>{
                    this.preset_tags = da.data.self_tags;
                })
            },
            getOperatorTag(){
                this.api.lockwallpaper_tags_list().then((res)=>{
                    this.self_tags=res;
                })
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
            handleSizeChange1(pageSize) { // 每页条数切换
                this.pageSize = pageSize;
                this.getList()
            },
            handleCurrentChange1(currentPage) {//页码切换
                this.currentPage = currentPage;
                this.getList()
            },
        },
        watch:{
            'listData':function (val,oldVal) {
                console.log(val);
                console.log(oldVal)
            }
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
    .content{
        position: absolute;
        width:1416px;
        height:886px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        top:-140px;
        left: 50%;
        transform: translateX(-50%);
        overflow-y: auto;
    }
    .tit_name{
        height: 55px;
        border: 1px solid #E6E9F0;
    }
    .tit_name span{
        display: inline-block;
        line-height: 55px;
        margin-left: 24px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
    }

    .top_name>span{
        display: inline-block;

        line-height: 50px;
    }
    .Search{
        margin-left: 0!important;
        margin-bottom: 28px;
    }
    .Search span{
        display: inline-block;
        text-align: right;
        width: 80px;
        height:20px;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .Search .el-date-editor{
        margin-right: 29px;
        width: 272px;
    }
    .Search img{
        width: 28px;
        position: relative;
        top: 10px;
        cursor: pointer;
        z-index: 99;
    }
    .Search input {
        position: relative;
        left: -30px;
        width: 232px;
        height: 32px;
        background: white;
        border-radius: 4px;
        border: 1px solid #d3dbeb;
        margin-right: 0px!important;
        margin-top: 0px!important;
    }
    select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin: 0px  40px 16px 14px;
    }
    .label{
        margin-left: 0!important;
    }
    .labelName{
        display: inline-block;
        width:78px;
        height:38px;
        border-radius:5px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 18px;
        text-align: center;
        line-height: 38px;
        cursor: pointer;
        vertical-align: top;
    }
    .label_txt{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(143,155,179,1);
        margin-right: 16px;
        vertical-align: top;
    }
    .contentImg{
        margin: 0 24px;
    }
    .active{
        background:#3377ff!important;
        color: #fff;
        border:0!important;
    }
    .box{
        width: 100%;
        overflow-y:auto ;
        height: 452px;
        background: #F5F5F5;
    }
    .box_select input{
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 18px;
        margin-left: 0!important;
    }
    .select_btn{
        display: inline-block;
        text-align: right;
        position: fixed;
        bottom: 30px;
        right: 56px;
    }
    .select_btn span{
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
        cursor: pointer;
        text-align: center;
    }
    .select_btn_left{
        border: 0!important;
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
        margin-right: 20px;
    }
    .box_btn{
        display: inline-block;
        width:68px!important;
        height:36px!important;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
        text-align: center!important;
        line-height: 36px;
        cursor: pointer;
    }
    .block{
        width: 100%;
        height:84px;
        background:rgba(255,255,255,1);
        box-shadow:0px -2px 6px 0px rgba(0,0,0,0.1);
        border-radius:0px 0px 4px 4px;
        margin-bottom: 0!important;
        position: fixed;
        bottom: 0;
        text-align: left;
    }

    .block .el-pagination{display: inline-block;margin-top:15px}
    .tags{
        display: inline-block;
        max-width: 1090px;
        max-height: 50px!important;
        overflow: hidden;
        vertical-align: bottom;
    }
    .ALLtags{
        max-height: 100%!important;
    }
    .tagsAll{
        display: inline-block;
        color:rgba(51,119,255,1);
        cursor: pointer;
        vertical-align: top;
        font-size: 12px;
    }
    .box_img{
        display: inline-block;
        width: 189px;
        height: 349px;
        margin-right: 44px;
        margin-bottom: 20px;
    }
    .box_top{
        width: 189px;
        height: 315px;
    }
    .box_top span{
        display: inline-block;
        width:50px;
        height:24px;
        background:rgba(10,10,10,1);
        opacity:0.81;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(230,233,240,1);
        text-align: center;
        line-height: 24px;
        position: relative;
        top:-31px
    }
    .box_top_img{
        max-width: 189px;
        max-height: 349px;
        position: relative;
        top: 36%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .box_name{
        width:189px;
        height:34px;
        background:rgba(255,255,255,1);
        opacity:0.8;
    }
    .box_name span{
        display: inline-block;
        text-align: center;
        line-height: 34px;
        margin-left: 10px;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
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
    .selectQD{
        width:460px;
        height:312px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        position: absolute;
    }
    .top{
        width: 100%;
        height:147px;
        background: rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
    }
    .topName{
        display: inline-block;
        font-size:18px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-left: 24px;
        margin-right: 10px;
        line-height: 45px;
    }
    .new_url{
        color: rgba(61,73,102,1)!important;
    }
    .scope1,.scope2{
        display: inline-block;
        width:20px;
        height:20px;
        border-radius:10px;
        border:1px solid rgba(204,204,204,1);
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(204,204,204,1);
        text-align: center;
        line-height: 20px;
    }
    .scope1{
        color:rgba(255,255,255,1)!important;
        background:rgba(51,119,255,1)!important;
        border: none!important;
        margin-right: 14px;
    }
    .selectName{
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
        margin-left: 14px;
        margin-right: 43px;
    }
    .name{
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(0 0 0 1);
        margin-right: 14px;
    }
    .top select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 24px;
    }

    .Names{
        margin: 21px 0 28px 20px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }

    .select_cons  span{
        display: inline-block;
        text-align: right;
        width: 80px;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 14px;
        margin-left: 30px;
    }
    .select_cons select{
        width:272px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-bottom: 20px;
    }
    .selectBox{
        text-align: center;
    }
    .selectBox span{
        display: inline-block;
        cursor: pointer;
        line-height: 36px;
        text-align: center;
        width:80px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .selectBox_qd{
        background:rgba(51,119,255,1)!important;
        color: #fff!important;
        border: none!important;
        margin-right: 20px;
    }
</style>