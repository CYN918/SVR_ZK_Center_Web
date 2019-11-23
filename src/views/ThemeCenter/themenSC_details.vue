<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
            <span class="log_url" @click="fh()"> {{this.$route.query.name+'主题素材'}}&nbsp;/</span>
            <span class="new_url">{{this.$route.query.name+'主题素材详情'}}&nbsp;</span>
        </div>
            <div class="name">
                <span>{{this.$route.query.name+'主题素材名称'}}:</span>
                <span>{{tableData.name}}</span>
                <div>
                    <span @click="bj()">编辑</span>
                    <a :href="tableData.attach.url" class="dowload">下载</a>
                </div>
            </div>
            <div>
                <span class="titName" style="width: 20px;margin-right: 10px">ID:</span>
                <span class="titCon" style="margin-right: 174px">{{this.tableData.thmid}}</span>
                <span class="titName" v-if="this.$route.query.name!='宣传图'">使用范围:</span>
                <span class="titCon" v-if="this.$route.query.name!='宣传图'">{{this.tableData.range=='all'?'不限':this.tableData.range}}</span>
                <span class="titName" style="width: 33px;margin-right: 10px">标签:</span>
                <div class="tag">
                    <span v-for="item in tags" class="tagName" v-if="item!=''">{{item}}</span>
                    <!--<span class="tagADD">-->
                        <!--<img>-->
                        <!--标签-->
                    <!--</span>-->
                </div>
            </div>
            <div>
                <span class="titName" v-if="this.$route.query.name!='宣传图'" style="width: 33px;margin-right: 10px">状态:</span>
                <span class="titCon" v-if="this.$route.query.name!='宣传图'">{{this.tableData.status_name}}</span>
                <span class="titName">创建时间:</span>
                <span class="titCon" style="width: 300px">{{this.tableData.created_at}}</span>
            </div>
            <div style="margin-bottom: 24px">
                <span class="titName">备注描述:</span>
                <span class="titCon" style="width: 70%">{{this.tableData.note}}</span>
            </div>
            <div class="switcher">
                <a href="#tab0" :class="{click:isType==0}" @click="changeover('0')">预览图</a>
                <a href="#tab1" :class="{click:isType==1}" @click="changeover('1')">相关主题</a>
                <a href="#tab2" :class="{click:isType==2}" @click="changeover('2')" v-if="this.$route.query.name!='宣传图'">相关项目</a>
                <a href="#tab3" :class="{click:isType==3}" @click="changeover('3')" v-if="this.$route.query.name!='宣传图'">相关打包件</a>
                <a href="#tab4" :class="{click:isType==4}" @click="changeover('4')" v-if="this.$route.query.name!='宣传图'">相关主题素材</a>
                <a href="#tab5" :class="{click:isType==5}" @click="changeover('5')" v-if="this.$route.query.name!='宣传图'">相关合同</a>
            </div>
        </div>
        <div style="margin-top: 314px">
            <div class="preview" id="tab0">
                <div class="titID">
                    <span class="nameID">预览图</span>
                </div>
                <div class="imgID" v-for="item in tableData.previews" v-if="(tableData.previews)!=[]">
                    <img :src="item">
                </div>
                <div style="width: 100%;text-align: center" v-if="(tableData.previews)==[]">
                    <img src="../../../public/img/null.png" style="width:48px;margin-top: 150px">
                    <div>
                        <span>暂无数据</span>
                    </div>

                </div>
            </div>
            <div class="preview" id="tab1">
                <div class='line' style="height:24px;width:100%;background:rgba(239,244,248,1)"></div>
                <div class="titID">
                    <span class="nameID">相关主题</span>
                </div>
                <div class="imgID" v-for="item in themeList" v-if="themeList.length!=0">
                    <img :src="item.main_preview">
                    <div class="See" @click="seeTheme(item.thid,item.channel,item.ch_thid)">
                        查看详情
                    </div>
                </div>
                <div style="width: 100%;text-align: center" v-if="themeList.length==0">
                    <img src="../../../public/img/null.png" style="width:48px;margin-top: 150px">
                    <div>
                        <span>暂无数据</span>
                    </div>

                </div>
            </div>
            <div class="preview"  id="tab2" v-if="this.$route.query.name!='宣传图'">
               <div class='line' style="height:24px;width:100%;background:rgba(239,244,248,1)"></div>
                <div class="titID">
                    <span class="nameID">相关项目</span>
                </div>
                <div style="margin: 24px 0 0 24px">
                    <div class="preview_tet">
                        <span>项目ID：</span>
                        <span v-if="xm.length!=''">{{xm[0].work_id}}</span>
                    </div>
                    <span>结算方式</span>
                    <span v-if="xm.length!=''">{{xm[0].hire_type}}</span>
                    <span>分成比例</span>
                    <span v-if="xm.length!=''">{{xm[0].price}}</span>
                </div>
            </div>
            <div  class="preview" id="tab3" v-if="this.$route.query.name!='宣传图'">
                <div class='line' style="height:24px;width:100%;background:rgba(239,244,248,1)"></div>
                <div class="titID">
                    <span class="nameID">相关打包件</span>
                </div>
                <div class="imgID" v-for="item in pack" v-if="pack.length!=0">
                    <img :src="item.main_preview">
                </div>
                <div style="width: 100%;text-align: center" v-if="pack.length==0">
                    <img src="../../../public/img/null.png" style="width:48px;margin-top: 150px">
                    <div>
                        <span>暂无数据</span>
                    </div>

                </div>
            </div>
            <div  class="preview" id="tab4" v-if="this.$route.query.name!='宣传图'">
                <div class='line' style="height:24px;width:100%;background:rgba(239,244,248,1)"></div>
                <div class="titID">
                    <span class="nameID">相关主题素材</span>
                </div>
                <div class="imgID" v-for="item in sc" v-if="sc.length!=0">
                    <img :src="item.main_preview">
                    <div class="See" @click="see(item.thmid,item.name)">
                        查看详情
                    </div>
                </div>
                <div style="width: 100%;text-align: center" v-if="sc.length==0">
                    <img src="../../../public/img/null.png" style="width:48px;margin-top: 150px">
                    <div>
                        <span>暂无数据</span>
                    </div>

                </div>
            </div>
            <div  class="preview" id="tab5" v-if="this.$route.query.name!='宣传图'">
                <div class='line' style="height:24px;width:100%;background:rgba(239,244,248,1)"></div>
                <div class="titID">
                    <span class="nameID">相关合同</span>
                    <span class="derivation">汇总</span>
                </div>
                <div style="border-bottom: 1px solid #E6E9F0" v-for="item in Contract" v-if="Contract.length!=0">
                    <div>
                        <span class="Contract_name">合同名称({{item.contract_id}})</span>
                        <div style="display: inline-block;width: 10px;height: 10px;border-radius: 50%;background: #39BD65" v-if="new Date(item.contract_end_time)>new Date()"></div>
                        <span class="Contract_status"  v-if="new Date(item.contract_end_time)>new Date()">生效中</span>
                        <div style="display: inline-block;width: 10px;height: 10px;border-radius: 50%;background: #F05656"  v-if="new Date(item.contract_end_time)<new Date()"></div>
                        <span class="Contract_status"  v-if="new Date(item.contract_end_time)<new Date()">已过期</span>
                    </div>
                    <div >
                        <span class="Contract_tit">甲方：</span>
                        <span class="Contract_con">{{((item.signatories).split(','))[0]}}</span>
                        <span class="Contract_tit">生效时间：</span>
                        <span class="Contract_con">{{item.contract_start_time}}</span>
                        <span class="Contract_tit">合同文件：</span>
                        <div style="display: inline-block" v-for="da in item.contract_files">
                            <span class="Contract_con">{{da.name}}</span>
                            <a style="font-size:14px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,119,255,1);" :href="da.url">下载</a>
                        </div>
                    </div>
                    <div>
                        <span class="Contract_tit">乙方：</span>
                        <span class="Contract_con">{{((item.signatories).split(','))[1]}}</span>
                        <span class="Contract_tit">失效时间：</span>
                        <span class="Contract_con">{{item.contract_end_time}}</span>
                    </div>
                    <div>
                        <span class="Contract_tit">描述</span>
                        <span class="Contract_con">{{item.note}}</span>
                    </div>
                </div>
                <div style="width: 100%;text-align: center" v-if="Contract.length==0">
                    <img src="../../../public/img/null.png" style="width:48px;margin-top: 150px">
                    <div>
                        <span>暂无数据</span>
                    </div>

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
                tableData:{name:'',attach:{url:''}},
                themeList:[],
                sc:[],
                type:'',
                pack:[],
                xm:[],
                Contract:[],
                tags:[],
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
            see(id,name){
                let Logistics= this.$router.resolve({
                    path:'./themeSc_details',
                    query:{
                        name:name,
                        thmid:id,
                    },
                })
                window.open(Logistics.href, '_blank','toolbar=yes');
            },
            seeTheme(id,name,qdid){
                if(name=='local'){
                    var path='./themeDetails'
                }else{
                    path='./themeDetailsQd'
                }
                let Logistics= this.$router.resolve({
                    path:path,
                    query:{
                        thid:id,
                        channel:name,
                        ch_thid:qdid,
                    },
                })
                window.open(Logistics.href);
            },
            fh(){
                this.$router.go(-1);
            },
            changeover(num){
                this.isType=num;
            },
            getXM(){
                let params={thmid:this.$route.query.thmid};
                this.api.themes_material_hireworks({params}).then((res)=>{
                    this.xm=res;
                })
            },
            getContract(){
                let params={thmid:this.$route.query.thmid};
                this.api.themes_material_contracts({params}).then((res)=>{
                    this.Contract=res;
                })
            },

            histogram(data){
                this.isUPload=data;
            },
            dateTime(time){
                this.isTime=time;
            },
            getData(){
                let params={thmid:this.$route.query.thmid};
                this.api.themes_material_details({params}).then((res)=>{
                    this.tableData=res;
                    this.tags=(this.tableData.tags).split(',');
                    this.type=res.type;
                    this. getTheme();
                    this.getsc();
                    this.getPack();
                    this.getXM();
                    this.getContract();
                })
            },
            getTheme(){
                let params={thmid:this.$route.query.thmid}
                this.api.themes_material_themes({params}).then((res)=>{
                    this.themeList =res;
                })
            },
            getPack(){
                let params={thmid:this.$route.query.thmid}
                this.api.themes_material_packages({params}).then((res)=>{
                    this.pack=res;
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
        min-height: 230px;
        background: rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
        box-shadow: 0 5px 5px #dfdfdf;
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
        min-height:300px!important;
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
    .click{
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
        background: #e3e7eb;
        position: relative;
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
    .Contract_name{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 24px 10px 12px 24px;
    }
    .Contract_status{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(31,46,77,0.45);
        margin-left: 10px;
    }
    .Contract_tit{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(31,46,77,1);
        margin-bottom: 8px;
        margin-left: 24px;
    }
    .Contract_con{
        text-align: left;
        display: inline-block;
        width:150px;
        height:22px;
        font-size:14px;
        font-family:HelveticaNeue;
        color:rgba(31,46,77,0.65);
    }
    .See{
        width: 100%;
        height:45px;
        background:rgba(28,28,28,1);
        border-radius:0px;
        opacity: 0;
        position: absolute;
        left: 0;
        bottom: 0px;
        text-align: center;
        line-height: 45px;
        color: #fff;
        cursor: pointer;
    }
    .imgID:hover .See{
        opacity:0.8;

    }
    #tab0,#tab1,#tab2,#tab3,#tab4,#tab5{
        padding-top:300px;
        margin-top:-300px!important;
    }
</style>