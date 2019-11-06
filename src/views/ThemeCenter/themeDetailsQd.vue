<template>
    <div>
        <seePack v-if="packSee" :data="data"></seePack>
        <div class="top" >
            <div class="tit_top_url">
                <span class="log_url" @click="fh()">主题库&nbsp;/</span>
                <span class="log_url">&nbsp;主题详情</span>
                <span class="new_url">&nbsp;渠道主题详情</span>
            </div>

                <div style="height: 60px ;border-bottom: 1px dashed #ddd">
                    <span class="ui" style="margin-right: 18px">厂商UI版本</span>
                    <span class="uiName"   v-for="(item,index) in ui" :class="{click:index==ind}" @click="selectBB(index)">{{item.ui_version}}</span>
                </div>
                <div>
                    <span class="zy" style="margin-right: 18px">资源版本号</span>
                    <span class="uiName" v-for="(key,da) in ui[indexs].version"  :class="{click:da==das}"  @click="bbh(da)">{{key}}</span>
                </div>

            <div style="height: 100%;position: absolute;width: 300px;top:1px;right: 175px">
                <img :src="bg"/>
            </div>
        </div>
        <div style="margin-top: 250px;background: #fff;height:266px;padding:0 24px">
            <div class="name">
                <span>主题名称:</span>
                <span>{{tableData.name}}</span>
                <div>
                    <span @click="bj()">编辑</span>
                    <a :href="this.tableData.attach.url" class="dowload">下载</a>
                </div>
            </div>
            <div>
                <span class="titName">主题类型:</span>
                <span class="titCon">{{tableData.type_name}}</span>
                <span class="titName">ID:</span>
                <span class="titCon">{{tableData.thid}}</span>
                <span class="titName">定投ID:</span>
                <span class="titCon" style="width: 150px">{{tableData.wpid!=''?'tableData.wpid':'不可定投主题'}}</span>
            </div>
            <div>
                <span class="titName">内容分类:</span>
                <span class="titCon">{{tableData.class_name}}</span>
                <span class="titName">资源版本:</span>
                <span class="titCon">{{tableData.ui_version}}</span>
                <span class="titName">标签</span>
                <div class="tag">
                    <span v-for="item in ((this.tableData.tags).split(','))" class="tagName" v-if="item!=''">{{item}}</span>
                    <!--<span class="tagADD">-->
                        <!--<img>-->
                        <!--标签-->
                    <!--</span>-->
                </div>
            </div>
            <div>
                <span class="titName">适用范围:</span>
                <span class="titCon">{{this.tableData.account}}</span>
                <span class="titName">创建时间:</span>
                <span class="titCon" style="width: 150px">{{tableData.created_at}}</span>
            </div>
            <div style="margin-bottom: 46px">
                <span class="titName">主题描述:</span>
                <span class="titCon" style="width: 70%">{{this.tableData.note}}</span>
            </div>
            <div class="switcher">
                <a href="#tabs0" :class="{clicks:isType==0}" @click="changeover('0')">预览图</a>
                <a href="#tabs0" :class="{clicks:isType==1}" @click="changeover('1')">相关主题素材</a>
                <a href="#tabs1" :class="{clicks:isType==2}" @click="changeover('2')">收益数据</a>
                <a href="#tabs3" :class="{clicks:isType==3}" @click="changeover('3')">相关打包件</a>
                <a href="#tabs4" :class="{clicks:isType==4}" @click="changeover('4')">相关合同</a>
            </div>
        </div>
        <div style="margin-top:24px">
            <div class="preview" id="tabs0">
                <div class="titID">
                    <span class="nameID">预览图</span>
                    <span class="derivation">{{this.$route.query.channel}}</span>
                </div>
                <div class="imgID" v-for="item in tableData.previews">
                    <img :src="item">
                </div>
            </div>
            <div  class="preview" id="tabs1">
                <div class="titID">
                    <span class="nameID">相关主题素材</span>
                    <span class="derivation">{{this.$route.query.channel}}</span>
                </div>
                <div class="imgID" v-for="item in sc">
                    <img :src="item.main_preview">
                </div>
            </div>
            <div class="preview" id="tabs3">
                <div class="titID">
                    <span class="nameID">收益数据</span>
                    <span class="derivation">{{this.$route.query.channel}}</span>
                    <div class="right">
                        <div class="block">
                            <el-date-picker
                                    v-model="time"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                        <span class="name_qd">渠道</span>
                        <select>
                            <option value="">全部</option>
                        </select>
                        <span class="cx">查询</span>
                        <span class="cx cxxq">查看详情</span>
                    </div>
                </div>
                <div>
                    <div class="left">
                        <span :class="{earnings_img:isUPload==1}" @click="histogram('1')">下载量</span>
                        <span class="xs" :class="{earnings_img:isUPload==2}" @click="histogram('2')">销售额</span>
                        <div class="left_right">
                            <span :class="{date:isTime=='d'}" @click="dateTime('d')">今天</span>
                            <span  :class="{date:isTime=='w'}" @click="dateTime('w')">本周</span>
                            <span  :class="{date:isTime=='m'}" @click="dateTime('m')">本月</span>
                            <span  :class="{date:isTime=='n'}" @click="dateTime('n')">全年</span>
                            <div class="block block_right">
                                <el-date-picker
                                        v-model="time"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="tendency">
                        <span>下载量趋势</span>
                    </div>
                    <div id="tendencyImg">

                    </div>
                </div>
            </div>
            <div  class="preview" id="tabs4">
                <div class="titID">
                    <span class="nameID">相关打包</span>
                    <span class="derivation">{{this.$route.query.channel}}</span>
                </div>
                <div class="imgID" v-for="item in pack" @click="ckPACK(item)">
                    <img :src="item.main_preview">
                </div>
            </div>
            <div  class="preview" id="tabs5">
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
    import seePack from './See_pack'
    export default {
        components:{seePack},
        name: "theme-details",
        data(){
            return{
                isType:0,
                isUPload:1,
                time:[],
                isTime:"w",
                tableData:{attach:{url:''}},
                sc:[],
                thid:this.$route.query.thid,
                channel:this.$route.query.channel,
                ch_thid:this.$route.query.ch_thid,
                ui:[],
                ui_version:"",
                version:'',
                pack:[],
                packSee:false,
                data:{},
                bg:"",
                ind:0,
                indexs:0,
                das:0,
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            selectBB(data){
                this.indexs=data;
                this.ind=data;
            },
            bbh(index){
                this.das=index;
            },
            ckPACK(data){
                this.packSee=true;
                this.data=data
            },
            gbPack(){
                this.packSee=false;
            },

            fh(){
                this.$router.push({
                    path:"./themeCook"
                });
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
            bj(){
                this.$router.push({
                    path:"./sheleRecord",
                    query:{
                        thid:this.thid,
                        channel:this.channel,
                        ch_thid:this.ch_thid,
                    }
                })
            },
            jump(){
                this.$router.push({
                    path:"./sheleRecord",
                    query:{
                        thid:this.thid
                    }
                })
            },
            qd(){
                this.api.themes_config_channel().then((res)=>{
                    // this.$route.query.channel
                    for(var i=0;i<res.length;i++){
                        if((this.$route.query.channel)==res[i].channel){
                            this.bg=res[i].icon
                        }
                    }
                })
            },
            getData(){
                let params={thid:this.thid,ch_thid:this.ch_thid,channel:this.channel};
                this.api.themes_theme_details({params}).then((res)=>{
                    this.tableData=res;
                    this.ui_version=this.tableData.ui_version;
                    this.version=this.tableData.version;
                    this.getsc();
                    this.getUI();
                    this.qd();
                })
            },
            getUI(){
                let params={channel:this.channel,thid:this.thid};
                this.api.themes_theme_uiversion({params}).then((res)=>{
                    this.ui=res;

                })
            },
            getsc(){
                let params={thid:this.thid,ch_thid:this.ch_thid,channel:this.channel};
                this.api.themes_theme_materials({params}).then((res)=>{
                    this.sc=res;
                    this.getPack();
                })
            },
            getPack(){
                let params={thid:this.thid,ch_thid:this.ch_thid,channel:this.channel};
              this.api.themes_theme_packeges({params}).then((res)=>{
                this.pack=res;
              })
            },
        },
    }
</script>

<style scoped>
    .top{
        width: 90%;
        height:160px;
        background: rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
    }
    .tit_top_url{padding-left: 0!important;}
    .new_url{color: rgba(61,73,102,1)!important;}
       .top>div{
        margin-left: 23px;
    }
    .name>span{
        display: inline-block;
        font-size:18px;
        margin-top: 24px;
        font-family:PingFang-SC;
        font-weight:bold;
        color:rgba(31,46,77,1);
    }
    .name>div{
        display: inline-block;
        float: right;
        margin-right: 24px;
    }
    .name>div>span{
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
        margin-top: 28px;
    }
    .dowload{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        font-size:14px;
        width:68px;
        font-weight:400;
        height:36px;
        color: #fff!important;
        background:rgba(51,119,255,1)!important;
        border: 0!important;
    }
    .titName{
        display: inline-block;
        width:70px;
        margin-bottom: 9px;
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
        line-height: 24px;
    }
    .tagName{
        display: inline-block;
        padding:2px 5px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        line-height: 24px;
        border:1px solid rgba(211,219,235,1);
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.45);
        text-align: center;
        margin-right: 5px;
        vertical-align: bottom;
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
    .clicks{
        font-weight:500!important;
        color:rgba(51,119,255,1)!important;
        border-bottom: 2px solid #3377FF;
    }
    .preview{
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        white-space:nowrap;
        min-height:425px;
        background:rgba(255,255,255,1);
        border-radius:2px;
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
        /*width:40px;*/
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
        background: #e3e7eb;
    }
    .imgID img{
        max-width:189px;
        max-height:315px;
        position: relative;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .block{
        display: inline-block;
        width:272px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
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
    .ui{
        display: inline-block;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(143,155,179,1);
        line-height: 60px;
    }
    .zy{
        display: inline-block;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(143,155,179,1);
        margin-top: 17px;
    }
    .uiName{
        display: inline-block;
        width:34px;
        height:24px;
        line-height: 24px;
        text-align: center;
        margin-right: 60px;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        cursor: pointer;
    }
    .click{
        background:rgba(51,119,255,1);
        border-radius:4px;
        color: #fff!important;
    }
</style>