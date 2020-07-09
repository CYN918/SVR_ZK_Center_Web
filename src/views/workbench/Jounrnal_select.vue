<template>
    <div class="bg" >
        <div class="content" >
            <div class="tit_name">
                <span>从物料库添加</span>
                <div class="select_btn">
                    <span class="select_btn_left" @click="messageID">确定</span>
                    <span @click="YCset">取消</span>
                </div>
            </div>
            <div class="Search">
                <img src="../../../public/img/ss.png" />
                <input type="text" placeholder="搜索标签或ID" v-model="search" @input="getList1()"/>
                <div class="Search_select">
                    <span class="Search_select_tit">物料类型：</span>
                    <select v-model="type" @change="getList1()">
                        <!-- <option value="">全部</option> -->
                        <option v-for="item in scType" :value="item.type" v-if='video==undefined&&audit_type==undefined&&(item.type=="f_sls_lockscreen"||item.type=="f_sls_picture")'>{{item.name}}</option>
                        <option v-for="item in scType" :value="item.type" v-if='video!=undefined&&item.type=="f_sls_lockscreen"'>{{item.name}}</option>
                        <option v-for="item in scType" :value="item.type" v-if='video==undefined&&audit_type==6&&item.type=="f_sls_picture"'>{{item.name}}</option>
                    </select>
                </div>
                <div class="Search_select" v-if="gdsrc==1">
                    <span class="Search_select_tit">制作方式：</span>
                    <select v-model="pro_type" @change="getList1()">
                        <option value="1">高定</option>
                    </select>
                </div>
                <div class="Search_select" v-if="gdsrc!=1 && type != 'f_sls_picture'">
                    <span class="Search_select_tit">制作方式：</span>
                    <select v-model="pro_type" @change="getList1()">
                        <option value="" selected>全部</option>
                        <option value="1">高定</option>
                        <option value="0">微定</option>
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
                <div class="box" :class="{boxScroll:whether}">
                    <div class="boxImg" v-for="(DL,index) in IMGList">
                        <div class="boxCheck" v-if="ids&&gdsrc!=1">
                            <template>
                                <el-checkbox-group v-model="checked">
                                    <el-checkbox :label="DL.mfid" @change="clcBox(DL.mfid)" v-if="ids.split(';').indexOf(DL.mfid) > -1" disabled></el-checkbox>
                                    <el-checkbox :label="DL.mfid" @change="clcBox(DL.mfid)" v-else></el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </div>
                        <div class="boxCheck" v-if="!ids&&gdsrc!=1">
                            <template>
                                <el-checkbox-group v-model="checked">
                                    <el-checkbox :label="DL.mfid" @change="clcBox(DL.mfid)"></el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </div> 
                        <div class="boxCheck" v-if="gdsrc==1">
                            <template>
                                <el-checkbox-group v-model="checked">
                                    <el-checkbox :label="DL.mfid"></el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </div>
                        <img :src="DL.prev_uri" v-if="(DL.prev_uri.split('.'))[(DL.prev_uri.split('.')).length-1]!='mp4'"/>
                        <video :src="DL.prev_uri" controls="controls" v-if="(DL.prev_uri.split('.'))[(DL.prev_uri.split('.')).length-1]=='mp4'"/>
                        <div class="boxImg_right">
                            <div class="boxImg_right_1">
                                <div>
                                    <span class="boxImg_text">素材ID:</span>
                                    <span class="boxImg_content">{{DL.mfid}}</span>
                                </div>
                                <div>
                                    <span class="boxImg_text">尺寸:</span>
                                    <span class="boxImg_content">{{DL.size}}</span>
                                </div>
                                <!-- <div v-if="!ids">
                                    <span class="boxImg_text">素材状态:</span>
                                    <span class="boxImg_content">{{DL.status==1201?'禁用':'启用'}}</span>
                                </div> -->
                                <div v-if="type != 'f_sls_picture'">
                                    <span class="boxImg_text">制作方式:</span>
                                    <span class="boxImg_content">{{DL.pro_type==1?'高定':'微定'}}</span>
                                </div>
                                <div>
                                    <span class="boxImg_text">更新时间:</span>
                                    <span class="boxImg_content">{{DL.updated_at}}</span>
                                </div>
                                <div v-if="checked.indexOf(DL.mfid) > -1 && gdsrc!=1">
                                    <span class="boxImg_text">上次使用日期:</span>
                                    <span class="boxImg_content" v-if="listMfid.indexOf(DL.mfid) < 0">--</span>
                                    <span class="boxImg_content" v-else v-for="todo in list">
                                        <span v-if="todo.mfid == DL.mfid">{{todo.tdate}}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <div class="ckBox">
                        <input type="checkbox" v-model="checkModel" @click="checkAll"/>
                        <span>全选</span>
                    </div>
                    <el-pagination
                        @size-change="handleSizeChange1"
                        @current-change="handleCurrentChange1"
                        :current-page="page"
                        :page-sizes="[6, 12, 18, 24]"
                        :page-size="p"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <loading v-if='load'></loading>
    </div>
</template>

<script>
    import loading from '../../components/loading'
    export default {
        components: {loading},
        name: "select_material",
        props:['material','typeSC',"date",'channel','video','ids','gdsrc','audit_type'],
        data(){
            return {
                checked:[],
                radioSize:'',
                page:1,
                p:6,
                total: 0,
                preset_tags:[],
                self_tags:[],
                IMGList:[],
                search:'',
                scMid:[],
                scUrl:'',
                scType:'',
                type:'f_sls_lockscreen',
                inx:null,
                inde:null,
                listData: [],
                class:false,
                class1:false,
                listTag:[],
                listTagData:[],
                search_tags:[],
                search_self_tags:[],
                list:[],
                listMfid:[],
                load:false,
                whether:false,
                checkModel:false,
                pro_type:'',
            }
        },
        mounted() {
            if(this.ids&&this.ids.length>0){
                this.checked=this.checked.concat(this.ids.split(';'));
                this.clcBox()
            }
            if(this.gdsrc == 1){
                this.pro_type = 1;
                this.getList();
            }else{
                this.getList();
            }
            if(this.audit_type == 6){
                this.type = 'f_sls_picture';
            }
            // console.log(this.gdsrc)
            // console.log(this.ids)
            console.log(this.video)
        },
        methods:{
            checkAll(){
                if(this.checkModel){
                    if(this.ids == ''||this.ids == undefined){
                        this.checked=[];
                    }else{
                        this.ids.split(';').forEach((item)=>{
                            if(this.checked.indexOf(item)==-1){
                                this.checked=this.checked.concat(this.ids.split(';'));
                            }else{
                                this.checked=[];
                            }
                        })
                    }    
                }else{
                    this.IMGList.forEach((item)=>{
                        if(this.checked.indexOf(item.mfid)==-1){
                            this.checked.push(item.mfid)
                        }
                    })
                }
            },
            clcBox(data){
                let mfid = [];
                mfid.push(data);
                if(this.checked.length == '0'){
                    let params = {mfid:mfid,plid:this.$route.query.plid,type:this.$route.query.type}; 
                    if(this.$route.query.sub_plid){
                        params.sub_plid = this.$route.query.sub_plid
                    }
                    
                    this.api.pushlib_textlink_mfid_lastuse({params}).then((res)=>{
                        if(res != false){
                            this.list = res;
                            this.list.forEach(element => {
                                this.listMfid.push(element.mfid)
                            })
                        } 
                    })
                }else{
                    let params = {mfid:this.checked,plid:this.$route.query.plid,type:this.$route.query.type}
                    if(this.$route.query.sub_plid){
                        params.sub_plid = this.$route.query.sub_plid
                    }
                    this.api.pushlib_textlink_mfid_lastuse({params}).then((res)=>{
                        if(res != false){
                            this.list = res;
                            this.list.forEach(element => {
                                this.listMfid.push(element.mfid)
                            })
                        } 
                    })
                }  
            },
            YCset(){
                this.$parent.heidWL();
            },
            messageID(){
                if(this.checked.length == 0){
                    this.$message({message: '请选择壁纸',type: 'warning'});
                    return false
                }
                this.$emit('listenToChildEvent',this.checked,this.date,this.ids,true);
                this.$parent.heidWL();
            },
            getList1(){
                this.page = 1;
                this.getList();
            },
            getList(){
                let status = [];
                status.push('1101');
                status.push('1001');
                this.load = true;
                let params ={p:this.p,page:this.page,type:this.type,pro_type:this.pro_type,search:this.search,search_tags:JSON.stringify(this.listTag),search_self_tags:JSON.stringify(this.listTagData),status:status}
                this.api.mfinal_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    console.log(this.IMGList);
                    this.total=res.total;
                    this.load = false;
                    this.getTagsList();
                    this.getType();
                    this.listData=this.listData.concat(res.data);
                })
            },

            getType(){
                let params={material:0};
                this.api.config_material_type({params}).then((res)=>{
                    this.scType=res;
                })
            },
            getTagsList(){
                let params = {preset:this.preset,material:0,type:this.type,search:this.search};
                this.api.tags_search({params}).then((da)=>{
                    this.preset_tags = da.data.tags;
                    this.self_tags = da.data.self_tags
                })
            },
            handleSizeChange1(p) { // 每页条数切换
                this.p = p;
                this.checkModel = false;
                console.log(this.p);
                this.getList()
                if(p != 6){
                    this.whether = true;
                }else{
                    this.whether = false; 
                }
            },
            handleCurrentChange1(page) {//页码切换
                this.checkModel = false;
                console.log(page);
                this.page = page;
                this.getList()
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
            getListTags(name){
                if(!name){
                    this.listTagData.length=0
                }else{
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

                let params ={p:this.p,page:this.page,type:this.type,search:this.search,search_tags:JSON.stringify(this.listTag),search_self_tags:JSON.stringify(this.listTagData),status:this.status}
                this.api.mfinal_search({params}).then((res)=>{
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

                let params ={p:this.p,page:this.page,type:this.type,search:this.search,search_tags:JSON.stringify(this.listTag),search_self_tags:JSON.stringify(this.listTagData),status:this.status}
                this.api.mfinal_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    this.total=res.total;
                    this.getTagsList()
                })
            },
        },
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
        height:820px;
        background: #F5F5F5;
        border-radius: 4px;
        top:-125px;
        left: 50%;
        transform: translateX(-50%);
        /* overflow-y: auto; */
    }
    .tit_name{
        height: 54px;
        line-height: 54px;
        background: #FFFFFF;
        border: 1px solid #E6E9F0;
    }
    .tit_name span{
        display: inline-block;
        margin-left: 24px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #1F2E4D;
        font-weight: bold;
        float: left;
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
        /* margin-bottom: 34px; */
        background: #FFFFFF;
    }
    .Search img{
        width: 28px;
        position: relative;
        left: 40px;
        top: 10px;
        cursor: pointer;
    }
    .Search input{
        width:404px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-left: 0;
        margin-top: 29px;
    }
    .label{
        background: #FFFFFF;
        padding: 9px 26px 9px 26px;
        margin: 0 !important;
    }
    .block{
        height: 84px;
        background: #FFFFFF;
        box-shadow: 0 -2px 6px 0 rgba(0,0,0,0.10);
        border-radius: 0 0 4px 4px;
        position: fixed;
        bottom: 0;
        margin-bottom: 0px;
        width: 1416px;
    }
    .block .ckBox{
        width: 100px;
        height: 84px;
        float: left;
        line-height: 84px;
    }
    .block .ckBox input{
        height: 24px;
        width: 24px;
        border-radius: 4px;
        position: relative;
        top: 8px;
    }
    .block .ckBox span{
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #1F2E4D;
        font-weight: bold;
        margin: 0px 0px 10px 15px;
    }
    .block >>> .el-pagination{
        margin-top: 21px !important;
        float: right;
    }
    .labelName{
        display: inline-block;
        padding:0px 10px;
        border-radius:5px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 18px;
        text-align: center;
        cursor: pointer;
    }
    .contentImg .label .active{
        padding: 0 !important;
        width: 40px;
        height: 24px;
        text-align: center;
        line-height: 24px;
    }
    .label_txt{
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(143,155,179,1);
        margin-right: 16px;
    }
    .contentImg{
        /* margin: 0 26px; */
    }
    .active{
        background:rgba(255,255,255,1);
        border:1px solid rgba(19,159,248,1);
        padding:5px 10px!important;
    }

    .box_select input{
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 18px;
        margin-left: 0!important;
    }
    .boxImg{
        float: left;
        width:411px;
        height:177px;
        border-radius:4px;
        background: #FFFFFF;
        /* border: 1px solid #3377FF; */
        padding: 14px 0 14px 20px;
        box-shadow:0px 0px 10px 0px rgba(153,153,153,0.14);
        margin: 0px 5px 20px 26px!important;
    }
    /* .boxImg:nth-child(2n){
        margin: 0 13px 20px 0!important;
    }
    .boxImg:nth-child(3n){
        margin: 0 0 20px 0!important;
    } */
    .boxImg img ,video{
        width:99px;
        height:149px;
        margin-right: 15px;
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
        width: 80px;
        margin-right: 11px;
    }
    .boxImg_right_2 .boxImg_text{
        width: 100px;
        margin-right: 12px;
    }
    .ck{
        color:rgba(19,159,248,1);
        cursor: pointer;
    }
    .box{
        width: 1416px;
        height: 474px;
        overflow: hidden;
    }
    .boxScroll{
        overflow-y: scroll;
    }
    .boxScroll::-webkit-scrollbar {/*滚动条整体样式*/
        width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    .boxScroll::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #D1D1D1;
    }

    .boxScroll::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #EEEEEE;
    }


    .box_box{
        display:inline-block;
        background:rgba(255,255,255,1);
        border:1px solid rgba(230,230,230,1);
        border-radius:14px;
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        padding: 5px 10px;
        margin-right: 12px;
        margin-bottom: 8px;
    }
    .box_box:nth-child(2n){
        margin-right: 0;
    }
    .boxImg_xz{
        display: inline-block;
        width: 170px;
        max-height: 80px;
        overflow: hidden;
    }
    .boxImg_bq{
        vertical-align: top;
    }
    .dowload{
        display: inline-block;
        width:66px;
        height:28px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(153,153,153,1);
        border-radius:14px;
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(54,54,54,1);
        text-align: center;
        line-height: 28px;
        margin-left: 20px;
    }
    .bjImg{
        width: 20px!important;
        height: 20px!important;
        position: relative;
        margin-right: 0!important;
        right: -20px;
        top: -180px;
    }
    .select_btn{
        text-align: right;
        float: right;
        margin: 9px 26px 9px 0px;
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
        margin-top: 93px;
    }
    .tags{
        max-height: 50px!important;
    }
</style>