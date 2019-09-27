<template>
    <div>
        <div class="top">
            <span class="topName">锁屏打包件</span>
            <span class="total">共299套/</span>
            <span class="total">200套已使用</span>
            <span class="upLock" @click="jump">上传</span>
        </div>
        <div class="seach">
            <div class="tagSeach">
                <span class="tagSeachName">内容标题</span>
                <span class="labelName" :class="{active:tags.length==0}" @click="ClickTag()">全部</span>
                <div class="tags">
                    <span v-for="(item,index) in tag" class="labelName" @click="ClickTag(item.name)" :class="{active:tags.indexOf(item.name)!=-1}">{{item.name}}</span>
                </div>
                <span class="tagsAll" v-if="this.class1==false" @click="getClass">查看更多</span>
                <span class="tagsAll" v-if="this.class1==true" @click="getClass">收起</span>
            </div>
            <div class="seachIiput">
                <img  src="../../../../public/img/ss.png"/>
                <input type="text" placeholder="搜索名称或ID" v-model="search"/>
                <span class="seachSelect">渠道</span>
                <select style="margin-right: 40px" @change="getUI()" v-model="channel">
                    <option value="">全部</option>
                    <option :value="item.channel" v-for="item in channels">{{item.channel_name}}</option>
                </select>
                <span class="seachSelect">厂商UI版本</span>
                <select style="margin-right: 68px" v-model="ui_version">
                    <option value="">全部</option>
                    <option v-for="item in ui" :value="item.version">{{item.version}}</option>
                </select>
                <span class="seachSelect">状态</span>
                <select v-model="status">
                    <option value="">全部</option>
                    <option value="1">已使用</option>
                    <option value="0">未使用</option>
                </select>
                <span class="cx" @click="dataList()">查询</span>
            </div>
        </div>
        <div>
            <div class="box" v-for="item in list">
                <div class="boxImgs">
                    <img :src="item.previews[0]" @click="xq">
                </div>
                <div class="boxName">
                    <span>{{item.name}}</span>
                </div>
                <div class="boxTag">
                    <span></span>
                    <span class="addTags"><span>+</span>标签</span>
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
        name: "theme_lock",
        data(){
            return{
                type:'th_icon',
                status:'',
                search:'',
                tags:[],
                tag:[],
                p:10,
                page:1,
                total:0,
                list:[],
                class1:false,
                ui:[],
                channel:'',
                channels:[],
                ui_version:'',

            }
        },
        mounted(){this.dataList()},
        methods:{
            getUI(){
                let params={channel:this.channel};
                this.api.themes_config_channelui({params}).then((res)=>{
                    this.ui=res
                })
            },
            qd(){
                this.api.themes_config_channel().then((res)=>{
                    this.channels=res;
                })
            },
            ClickTag(name){

                if(name==undefined){
                    this.tags=[]
                }else{
                    if(this.tags.indexOf(name)==-1){
                        this.tags.push(name);

                    }else{
                        for(var i=0;i<this.tags.length;i++ ){
                            if(this.tags[i]==name){
                                this.tags.splice(i,1);

                            }
                        }
                    }
                }
            },
            getClass(){
                if(this.class1==false){
                    this.class1=true
                }else{
                    this.class1=false
                }
            },
            xq(){
                this.$router.push({
                    path:'./themeSc_details',
                    query:{
                        name:'锁屏'
                    }
                })
            },
            getTagsList(){
                let params = {material:'2',type:this.type,search:this.tagsName,p:500,page:1};
                this.api.tags_search({params}).then((da)=>{
                    this.tag=da.data.tags;
                })
            },
            dataList(){
                let params ={type:this.type,status:this.status,search:this.search,tags:this.tags.join(','),p:this.p,page:this.page,channel:this.channel,ui_version:this.ui_version};
                this.api.themes_package_search({params}).then((res)=>{
                    this.list=res.data;
                    this.total=res.total;
                    this. getTagsList();
                    this.qd();
                })
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.dataList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.dataList()
            },
            jump(){
                this.$router.push({
                    path:'./upPack',
                    query:{
                        type:this.type
                    }
                })
            },
        },
    }
</script>

<style scoped>
    .labelName{
        padding:0px 10px;
    }
    .labelName:hover{
        margin-right: 24px!important;
    }
    .active{
        background:rgba(51,119,255,1);
        color: #fff!important;

    }
    .tags{
        margin-top: 7px;
    }
    .tagsAll{
        margin-top: 13px;
    }
    .top{
        width: 100%;
        height:62px;
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
        line-height: 62px;
    }
    .total{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(143,155,179,1);
    }
    .upLock{
        display: inline-block;
        width:96px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height: 36px;
        text-align: center;
        float: right;
        margin-right: 274px;
        margin-top: 13PX;
    }
    .seach{
        min-height:147px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        margin-top: 148px;
        padding: 0 24px;
        margin-bottom: 24px;
    }
    .tagSeach{
        min-height: 60px;
        border-bottom: 1px dashed #E6E9F0;
    }
    .tagSeachName{
        display: inline-block;
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(143,155,179,1);
        line-height: 60px;
        margin-right: 22px;
    }
    .seachIiput{
        height: 84px;
    }
    .seachIiput img{
        position: relative;
        top:10px;
    }
    .seachIiput input{
        width:236px;
        height:36px;
        margin: 24px 40px 0 -30px;
        padding-left: 36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .seachSelect{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 14px;
    }
    .seachIiput select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 24px;
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
    }
    .box{
        margin-top: 0;
        display: inline-block;
        width:189px;
        height: 411px;
        margin-right: 40px;
        margin-bottom: 24px;
    }
    .boxImgs{
        width: 189px;
        height: 315px;
        margin: 0 auto;
        background: #fff;
        padding: 0 auto!important;
    }
    .boxImgs img{
        max-width: 189px;
        max-height: 315px;
        position: relative;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .boxName{
        width: 100%;
        height: 34px;
        background:rgba(255,255,255,1);
    }
    .boxName span{
        display: inline-block;
        margin-left: 10px;
        line-height: 34px;
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .boxTag{
        width: 169px;
        height: 62px;
        background: #fff;
        padding:0 10px ;

    }
    .addTags{
        display: inline-block;
        width:56px;
        height:24px;
        border-radius:4px;
        border:1px dashed rgba(230,233,240,1);
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.45);
        line-height: 24px;
        text-align: center;
        cursor: pointer;
    }

</style>