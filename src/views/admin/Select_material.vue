<template>
    <div class="bg" @click="YCset">
        <div class="content" @click.stop>
            <div class="tit_name">
                <span>从素材库选择素材</span>
            </div>
            <div class="Search">
                <img src="../../../public/img/ss.png" />
                <input type="text" placeholder="搜索标签或ID" v-model="search" @input="getList()"/>
                <div class="Search_select">
                    <span class="Search_select_tit">素材类型：</span>
                    <select v-model="type" @change="getList()">
                        <option value="">全部</option>
                        <option v-for="item in scType" :value="item.type">{{item.name}}</option>
                    </select>
                </div>
            </div>
            <div class="contentImg">
                <div class="label">
                    <span class="label_txt">预置标签:</span>
                        <span class="labelName" @click="getListTag()" :class="{active:listTag.length==0}">全部</span>
                        <div class="tags" :class="{ALLtags:this.class==true}">
                            <span v-for="(item,index) in preset_tags" class="labelName" @click="getListTag(item.name,index)" :class="{active:listTag.indexOf(item.name)!=-1}">{{item.name}}</span>
                        </div>
                        <span class="tagsAll" v-if="this.class==false" @click="getTag">查看更多</span>
                        <span class="tagsAll" v-if="this.class==true" @click="heidTag">收起</span>
                </div>
                <div class="label">
                    <span class="label_txt" >个性标签:</span>
                    <span class="labelName" @click="getListTags()" :class="{active:listTagData.length==0}">全部</span>
                    <div class="tags" :class="{ALLtags:this.class1==true}">
                        <span v-for="(item,index) in self_tags" class="labelName" @click="getListTags(item.name,index)" :class="{active:listTagData.indexOf(item.name)!=-1}">{{item.name}}</span>
                    </div>
                    <span class="tagsAll" v-if="this.class1==false" @click="getTag1">查看更多</span>
                    <span class="tagsAll" v-if="this.class1==true" @click="heidTag1">收起</span>

                </div>
                <div class="box">
                    <div class="boxImg" v-for="(DL,index) in IMGList" :class="{boxImgActive:checked.indexOf(DL.mid)!=-1}">
                        <div class="boxCheck">
                            <el-radio v-model="checked" :label="DL.mid" v-if="material==1" @change="getID(index)"></el-radio>
                            <template>
                                <el-checkbox-group v-model="checked" v-if="material==0">
                                    <el-checkbox :label="DL.mid" @change="getID(index)"></el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </div>
                        <div class="showing">
                            <img :src="DL.prev_uri" v-if="(DL.prev_uri.split('.'))[(DL.prev_uri.split('.')).length-1]!='mp4'"/>
                            <video  :src="DL.prev_uri" controls="controls" v-if="(DL.prev_uri.split('.'))[(DL.prev_uri.split('.')).length-1]=='mp4'" />
                        </div>
                        <div class="boxImg_right">
                            <div class="boxImg_right_1">
                                <div>
                                    <span class="boxImg_text">素材ID:</span>
                                    <span class="boxImg_content">{{DL.mid}}</span>
                                </div>
                                <div>
                                    <span class="boxImg_text">尺寸:</span>
                                    <span class="boxImg_content">{{DL.size}}</span>
                                </div>
                                <div>
                                    <span class="boxImg_text">素材状态:</span>
                                    <span class="boxImg_content">{{DL.status==1201?'禁用':'启用'}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="bjImg" @click="getLt(index)" style="opacity: 0">
                            <span >编辑物料</span>
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
            </div>
            <div class="select_btn">
                <span class="select_btn_left" @click="messageID">确定</span>
                <span @click="YCset">取消</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "select_material",
        props:['material','typeSC','ids'],
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
                listData:[],
                class:false,
                class1:false,
                listTag:[],
                listTagData:[],
                search_tags:[],
            }
        },
        mounted() {
            this.getList();
            if(this.ids.length>0){
                this.checked=this.checked.concat(this.ids.split(';'));
            }
            
        },
        methods:{
            getID(index){
                if(this.material==1){
                this.scMid=this.IMGList[index].mid;
                this.scUrl=this.IMGList[index].prev_uri;
               
                }
            },
            YCset(){this.$parent.YCset()},
            messageID(){
                if(this.material==1){
                    this.$emit('listenToChildEvent',this.scMid,this.scUrl,true);
                    this.$parent.SCsc();
                    this.$parent.YCset();
                }else{
                    this.mid_list = [];
                    for(let i=0;i<this.checked.length;i++){
                        this.mid_list.push(this.checked[i]);
                        for(let k = 0;k<this.listData.length;k++){
                            if(this.listData[k].mid==this.checked[i]){
                                if(this.url_list.indexOf(this.listData[k].prev_uri)==-1){
                                    this.url_list.push(this.listData[k].prev_uri);
                                }

                            }
                        }
                    }
                    this.$emit('listenToChildEvent',this.mid_list,this.url_list,true);
                    this.$parent.getCon();
                    this.$parent.YCset();
            }

            },
            getList(){
                let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search,search_tags:JSON.stringify(this.listTag),search_self_tags:JSON.stringify(this.listTagData),status:this.status}
                this.api.material_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    this.total=res.total;
                    this.getTagsList();
                    this.getType();
                    this.listData=this.listData.concat(res.data);
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
            getType(){
                let params={material:1};
                this.api.config_material_type({params}).then((res)=>{
                    this.scType=res;
                })
            },
            getTagsList(){
                let params = {preset:this.preset,material:1,type:this.type,search:this.search};
                this.api.tags_search({params}).then((da)=>{
                    this.preset_tags = da.data.tags;
                    this.self_tags = da.data.self_tags
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

                let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search,search_tags:JSON.stringify(this.listTag),search_self_tags:JSON.stringify(this.listTagData),status:this.status}
                this.api.material_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    this.total=res.total;
                    this.getTagsList()
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

                let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search,search_tags:JSON.stringify(this.listTag.concat(this.listTagData)),status:this.status}
                this.api.material_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    this.total=res.total;
                    this.getTagsList()
                })
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
        height:912px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        top:-122px;
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
    .Search_select{
        display: inline-block;
        margin-right: 30px;
    }
    .Search_select_tit{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 16px;
    }
    .Search_select>select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .top_name>span{
        display: inline-block;
        line-height: 50px;
    }
    .Search{
        margin-left: 0!important;
        margin-bottom: 28px;
    }
    .Search img{
        width: 28px;
        position: relative;
        left: 40px;
        top: 10px;
        cursor: pointer;
    }
    .Search input{
        width:160px;
        height:32px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-left: 0;
        margin-top: 29px;
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

    .box_select input{
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 18px;
        margin-left: 0!important;
    }
    .boxImgActive{
        border:1px solid rgba(51,119,255,1);
    }
    .boxImg{
        display: inline-block;
        width:400px;
        height:190px;
        background:rgba(245,247,250,1);
        border-radius:4px;
        padding: 18px 0 18px 30px;
        /*box-shadow:0px 0px 10px 0px rgba(153,153,153,0.14);*/
        margin: 0 15px 20px 0!important;
    }
    .boxImg:nth-child(2n){
        margin: 0 15px 20px 0!important;
    }
    .boxImg:nth-child(3n){
        margin: 0 0 20px 0!important;
    }
    .showing{
        display: inline-block;
        width:99px;
        height:149px;
        margin-right: 24px;
        background: #e1e0e4;
    }
    .showing img, .showing video{
        max-width:99px!important;
        max-height:149px!important;
    }
    .boxImg_right_1{
        margin-top: 23px;
    }
    .boxImg_right{
        display: inline-block;
        vertical-align: top;
    }
    .boxImg_right_1 img{
        width: 28px;
        height: 28px;
        margin-left: 15px;
        margin-right: 0;
    }
    .boxImg_right_1,.boxImg_right_2{
        display: inline-block;
        vertical-align: top;
    }
    .boxImg_text{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(143,155,179,1);
        margin-bottom: 15px;
        text-align: left;
    }
    .boxImg_content{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-bottom: 15px;
    }
    .boxImg_right_1 .boxImg_text{
        width: 70px;
        margin-right: 11px;
    }
    .boxImg_right_2 .boxImg_text{
        width: 100px;
        margin-right: 12px;
    }
    /*.ck{*/
        /*color:rgba(19,159,248,1);*/
        /*cursor: pointer;*/
    /*}*/
    /*.box_box{*/
        /*display:inline-block;*/
        /*background:rgba(255,255,255,1);*/
        /*border:1px solid rgba(230,230,230,1);*/
        /*border-radius:14px;*/
        /*font-size:14px;*/
        /*font-family:PingFang-SC-Regular;*/
        /*font-weight:400;*/
        /*color:rgba(153,153,153,1);*/
        /*padding: 5px 10px;*/
        /*margin-right: 12px;*/
        /*margin-bottom: 8px;*/
    /*}*/
    /*.box_box:nth-child(2n){*/
        /*margin-right: 0;*/
    /*}*/
    /*.boxImg_xz{*/
        /*display: inline-block;*/
        /*width: 170px;*/
        /*max-height: 80px;*/
        /*overflow: hidden;*/
    /*}*/
    /*.boxImg_bq{*/
        /*vertical-align: top;*/
    /*}*/
    /*.dowload{*/
        /*display: inline-block;*/
        /*width:66px;*/
        /*height:28px;*/
        /*background:rgba(255,255,255,1);*/
        /*border:1px solid rgba(153,153,153,1);*/
        /*border-radius:14px;*/
        /*font-size:14px;*/
        /*font-family:PingFang-SC-Regular;*/
        /*font-weight:400;*/
        /*color:rgba(54,54,54,1);*/
        /*text-align: center;*/
        /*line-height: 28px;*/
        /*margin-left: 20px;*/
    /*}*/
    /*.bjImg{*/
        /*width: 20px!important;*/
        /*height: 20px!important;*/
        /*position: relative;*/
        /*margin-right: 0!important;*/
        /*right: -20px;*/
        /*top: -180px;*/
    /*}*/
    .select_btn{
        width: 100%;
        text-align: right;
       position: fixed;
        /* bottom: 30px; */
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
    .boxCheck{
        display: inline-block;
        margin-right: 20px;
        vertical-align: top;
        margin-top: 60px;
        width: 30px!important;
    }
    .block{
        margin-right: 24px;
    }
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
</style>