<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
            <span class="log_url" @click="fh()"> {{this.$route.query.name+'主题素材'}}&nbsp;/</span>
            <span class="new_url">{{this.$route.query.name+'主题素材详情'}} &nbsp;</span>
        </div>
            <div class="name">
                <span>{{this.$route.query.name+'主题素材名称'}}:</span>
                <span></span>
                <div>
                    <span @click="bj()">编辑</span>
                    <a :href="tableData.attach.url" class="dowload" >下载</a>
                </div>
            </div>
            <div>
                <span class="titName">ID:</span>
                <span class="titCon">{{this.tableData.thmid}}</span>
                <span class="titName">使用范围:</span>
                <span class="titCon">{{this.tableData.account}}</span>
                <span class="titName">标签</span>
                <div class="tag">
                    <span v-for="item in ((this.tableData.tags).split(','))">{{item}}</span>
                    <span class="tagADD">
                        <img>
                        标签
                    </span>
                </div>
            </div>
            <div>
                <span class="titName">状态:</span>
                <span class="titCon">{{this.tableData.status}}</span>
                <span class="titName">创建时间:</span>
                <span class="titCon" style="width: 300px">{{this.tableData.created_at}}</span>
            </div>
            <div style="margin-bottom: 56px">
                <span class="titName">主题描述:</span>
                <span class="titCon">{{this.tableData.note}}</span>
            </div>
            <div class="switcher">
                <a href="#tab0" :class="{click:isType==0}" @click="changeover('0')">预览图</a>
                <a href="#tab1" :class="{click:isType==1}" @click="changeover('1')">相关主题</a>
                <a href="#tab2" :class="{click:isType==2}" @click="changeover('2')">相关项目</a>
                <a href="#tab3" :class="{click:isType==3}" @click="changeover('3')">相关打包件</a>
                <a href="#tab4" :class="{click:isType==4}" @click="changeover('4')">相关主题素材</a>
                <a href="#tab5" :class="{click:isType==5}" @click="changeover('5')">相关合同</a>
            </div>
        </div>
        <div style="margin-top: 394px">
            <div class="preview" id="tab0">
                <div class="titID">
                    <span class="nameID">预览图</span>
                </div>
                <div class="imgID" v-for="item in tableData.previews">
                    <img :src="item">
                </div>
            </div>
            <div class="preview" id="tab1">
                <div class="titID">
                    <span class="nameID">相关主题</span>
                </div>
                <div class="imgID" v-for="item in themeList">
                    <img :src="item">
                </div>
            </div>
            <div class="preview"  id="tab2">
                <div class="titID">
                    <span class="nameID">相关项目</span>
                </div>
                <div style="margin: 24px 0 0 24px">
                    <div class="preview_tet">
                        <span>项目ID：</span>
                        <span>{{}}</span>
                    </div>
                    <span>结算方式</span>
                    <span></span>
                    <span>分成比例</span>
                    <span></span>
                </div>
            </div>
            <div  class="preview" id="tab3">
                <div class="titID">
                    <span class="nameID">相关打包件</span>
                </div>
                <div class="imgID">
                    <img src="../../../public/img/IMG.png">
                </div>
            </div>
            <div  class="preview" id="tab4">
                <div class="titID">
                    <span class="nameID">相关主题素材</span>
                </div>
                <div class="imgID" v-for="item in sc">
                    <img :src="item.main_preview">
                </div>
            </div>
            <div  class="preview" id="tab5">
                <div class="titID">
                    <span class="nameID">相关合同</span>
                    <span class="derivation">汇总</span>
                </div>
                <div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "theme-details",
        data(){
            return{
                isType:0,
                isUPload:1,
                time:[],
                tableData:{},
                themeList:[],
                sc:[],
                type:'',
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            bj(){
                this.$router.push({
                    path:'./themelock_up',
                    query:{
                        thmid:this.$route.query.thmid,
                        type:this.type
                    },
                })
            },
            fh(){
                this.$router.go(-1);
            },
            changeover(num){
                this.isType=num;
            },
            histogram(data){
                this.isUPload=data;
            },
            dateTime(time){
                this.isTime=time;
            },
            getData(){
                let params={thmid:this.$route.query.thmid}
                this.api.themes_material_details({params}).then((res)=>{
                    this.tableData=res;
                    this.type=res.type;
                    this. getTheme();
                    this.getsc()
                })
            },
            getTheme(){
                let params={thmid:this.$route.query.thmid}
                this.api.themes_material_themes({params}).then((res)=>{
                    this.themeList =res;
                })
            },
            getsc(){
                let params={thmid:this.$route.query.thmid}
                this.api.themes_material_materials({params}).then((res)=>{
                    this.sc=res;
                })
            },
        },
    }
</script>

<style scoped>
    .top{
        width: 100%;
        min-height: 297px;
        background: rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
    }
    .tit_top_url{padding-left: 0!important;}
    .new_url{color: rgba(61,73,102,1)!important;}
    .name{
        margin: 12px 0 12px 23px;
    }
    .top>div{
        margin-left: 23px;
        margin-bottom: 12px;
    }
    .name>span{
        font-size:18px;
        font-family:PingFang-SC;
        font-weight:bold;
        color:rgba(31,46,77,1);
    }
    .name>div{
        display: inline-block;
        float: right;
        margin-right: 280px;
    }
    .name>div>span,.dowload{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .dowload{
        color: #fff!important;
        background:rgba(51,119,255,1)!important;
        border: 0!important;
    }
    #tab2{
        /*width:1616px;*/
        min-height:175px!important;
        background:rgba(255,255,255,1);
        border-radius:2px;
    }
    .titName{
        display: inline-block;
        width:70px;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .titCon{
        display: inline-block;
        width: 100px;
        font-size:14px;
        font-family:HelveticaNeue;
        color:rgba(31,46,77,0.65);
        margin-right:160px ;
    }
    .tag{
        display: inline-block;
    }
    .tagADD{
        display: inline-block;
        width:46px;
        height:24px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px dotted rgba(211,219,235,1);
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.45);
        text-align: center;
    }
    .switcher{
        margin-bottom: 0!important;
    }
    .switcher a{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
        margin-right: 48px;
        padding-bottom: 10px;
        cursor: pointer;
    }
    .click{
        font-weight:500!important;
        color:rgba(51,119,255,1)!important;
        border-bottom: 2px solid #3377FF;
    }
    .preview{
        width: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
        white-space:nowrap;
        min-height:425px;
        background:rgba(255,255,255,1);
        border-radius:2px;
        margin-bottom: 24px;
    }
    .titID{
        height: 55px;
        border-bottom: 1px solid #E6E9F0;
    }
    .nameID{
        display: inline-block;
        font-size:16px;
        font-family:PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        line-height: 55px;
        margin-left: 24px;
    }
    .derivation{
        display: inline-block;
        margin-left: 18px;
        width:40px;
        height:24px;
        background:rgba(247,249,252,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        text-align: center;
        line-height: 24px;
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.45);
    }
    .imgID{
        display: inline-block;
        margin:24px;
        width:189px;
        height:315px;
        vertical-align: top;
    }
    .imgID img{
        position: relative;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        max-width:189px;
        max-height:315px;
    }
    .block{
        display: inline-block;
        width:272px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 40px;
        margin-bottom: 0!important;
        margin-top: 8px;
    }
    .block .el-range-editor.el-input__inner{
        width: 100% !important;
    }
    .right{display: inline-block;float: right;margin-right: 24px}
    .name_qd{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 28px;
    }
    .right select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 20px;
    }
    .cx{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-right: 20px;
    }
    .cxxq{
        width:96px!important;
        background:rgba(255,255,255,1)!important;
        border:1px solid rgba(211,219,235,1)!important;
        color:rgba(31,46,77,1)!important;
        margin-right: 0!important;
    }
    .left{margin-left: 24px;margin-top: 20px}
    .left>span{
        width:70px;
        height:36px;
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(121,130,148,1);
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius:4px 0px 0px 4px;
        border:1px solid rgba(211,219,235,1);
    }
    .xs{
        border-radius:0px 4px 4px 0px!important;
    }
    .earnings_img{
        background:rgba(255,255,255,1)!important;
        border:1px solid rgba(51,119,255,1)!important;
        color:rgba(51,119,255,1)!important;
    }
    .left_right{
        display: inline-block;
        float: right;
        margin-right: 24px;
    }
    .left_right>span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(121,130,148,1);
        cursor: pointer;
        margin-right: 24px;
    }
    .block_right{
        margin-right: 0!important;
    }
    .date{
        color:rgba(51,119,255,1)!important;
    }
    .tendency span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        margin: 20px 0 20px 23px;
    }
    .addJl{
        display: inline-block;
        width:124px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        float: right;
        margin: 10px 24px 0 0 ;
    }
    .preview_tet>span{
        display: inline-block;
        font-size:16px;
        font-family:PingFang-SC-Bold,PingFang-SC;
        font-weight:bold;
        color:rgba(31,46,77,1);
    }
</style>