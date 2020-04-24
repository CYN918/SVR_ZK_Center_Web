<template>
 <div>
        
        <div class="top_name">
            <span class="top_txt" @click='fh(-1)'>杂志锁屏推送审核管理&nbsp;/&nbsp; 内部音频配置管理</span>
            <div class="title_left">
                <span>内部音频配置管理</span>
                <span class='lk'>{{this.$route.query.channel}}</span>
                <span class='open_status'>启用状态：</span>
                <span class='open_status' style="margin-left:0">aaaa</span>
            </div>
            <div class='right_btn'>
                <span>启用</span>
                <span>一键确认</span>
                <span @click='getWl()'>添加物料</span>
            </div>
            
        </div>
        <div style="position: relative;">
            <div class='condition'>
                <span class='tit_name'>物料ID</span>
                <input type="text" v-model='mfid'>
                <span class='tit_name'>壁纸标识</span>
                <input type="text" v-model='wpid'>
                <span class='tit_name'>音频ID</span>
                <input type="text" v-model='song_id'>
                <span class='tit_name'>是否启用</span>
                <select v-model='is_valid'>
                    <option value="">全部</option>
                    <option value="0">否</option>
                    <option value="1">是</option>
                </select>
                <span class='tit_name'>状态</span>
                <select v-model='status'>
                    <option value="">全部</option>
                    <option value="1">已确认</option>
                    <option value="0">待确认</option>
                    <option value="-1">信息缺失</option>
                </select>
                <span class='cx'>查询</span>
                <span class='cz'>重置</span>
                <span class='gd' @click='unwind()'>更多筛选项</span>
                <img :src="img" alt="" style="width:10px;margin-left:10px"/>
            </div>
            <div class='more' v-if='unfold'>
                 <div class="polling_tag">
                    <span class="tag_name">内容标签</span>
                    <!-- <span class="labelName"  @click="getListTag('')" :class="{active:listTag.length==0}">全部</span>
                    <div class="tags" :class="{ALLtags:class0==true}">
                        <span v-for="(item,index) in preset_tags" class="labelName" @click="getListTag(item.name,index)" :class="{active:listTag.indexOf(item.name)!=-1}">{{item.name}}</span>
                    </div> -->
                    <span class="unfold" v-if="isType==0" @click="expansion">展开</span>
                    <img style="width: 10px;height: 6px" src="../../../public/img/xs.png" v-if="isType==0"/>
                    <span class="unfold" v-if="isType==1" @click="expansion">收起</span>
                    <img style="width: 10px;height: 6px" src="../../../public/img/sq.png" v-if="isType==1"/>
                </div>

                <div class="polling_tag" style="margin-top:0">
                    <span class="tag_name">运营标签</span>
                    <!-- <span class="labelName" @click="getListTags('')" :class="{active:listTagData.length==0}">全部</span>
                    <div class="tags" :class="{ALLtags:class1==true}">
                        <span v-for="(item,index) in self_tags" class="labelName" @click="getListTags(item.desc,index)" :class="{active:listTagData.indexOf(item.desc)!=-1}">{{item.desc}}</span>
                    </div> -->
                    <span class="unfold" v-if="isTypes==0" @click="expansionTag">展开</span>
                    <img style="width: 10px;height: 6px" src="../../../public/img/xs.png" v-if="isTypes==0"/>
                    <span class="unfold" v-if="isTypes==1" @click="expansionTag">收起</span>
                    <img style="width: 10px;height: 6px" src="../../../public/img/sq.png" v-if="isTypes==1"/>
                </div>
            </div>
        </div>
        <div class='titlt'>
             <template>
                <el-table
                        :data="list"
                        style="width: 100%"
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
                >
                    <el-table-column
                            prop="num"
                            label="杂志锁屏">
                            <template slot-scope="scope">
                                        <el-tooltip placement="right" class="tit_txt_2 logs tit_txts">
                                            <div slot="content">
                                               <img src='' style="max-width:261px;max-height: 464px"  />
                                            </div>
                                            <img src='' style="max-width:80px;max-height: 80px;cursor: pointer"  preview="0" />                               
                                         </el-tooltip>
                            </template>
                    </el-table-column>
                    <el-table-column
                            prop="user.email"
                            label="详细信息">
                            <template slot-scope="scope">
                                        <a href='' target="_blank" style="color:#3377ff;cursor: pointer">点击查看</a>
                                    </template>
                    </el-table-column>
                    <el-table-column
                            prop="channel.channel"
                            label="是否生效">
                            <template slot-scope="scope">
                                <el-switch
                                        :active-value="1"
                                        :inactive-value="0"
                                        active-color="#3377ff"
                                        inactive-color="#e6e9f0"
                                        v-model="scope.row.status"
                                        @change='change(scope.$index,scope.row.status)'>
                                </el-switch>
                            </template>
                    </el-table-column>
                     <el-table-column
                            prop="channel.channel"
                            label="策略内容">
                    </el-table-column>
                     <el-table-column
                            prop="num"
                            label="循环播放次数">
                    </el-table-column>
                     <el-table-column
                            prop="channel.channel"
                            label="音量">
                            <template slot-scope="scope">
                                <span></span>
                            </template>
                    </el-table-column>
                     <el-table-column
                            prop="channel.channel"
                            label="状态">
                             <template slot-scope="scope">
                                <span></span>
                            </template>
                    </el-table-column>
                     <el-table-column
                            prop="channel.channel"
                            label="更新时间">
                    </el-table-column>
                    <el-table-column
                            prop="channel.channel"
                            label="操作人员">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="150"
                    >
                        <template slot-scope="scope">
                            <el-button  type="text"  @click="getShow(scope.$index)"  size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="page"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="10"
                            layout="sizes, prev, pager, next"
                            :total="total">
                    </el-pagination>
            </div>
        </div>
        <ADDWL v-if="ADDwl" @listenToChildEvent="listenToChildEvent" :video='video'></ADDWL>
        <loading v-if='load'></loading>
 </div>
</template>
<script>
 import ADDWL from './Jounrnal_select'
 import loading from '../../components/loading'
 export default {
    components:{ADDWL,loading},
   data () {
     return {
            img:"/img/xs.png",
            unfold:false,
            isType:"0",
            class0:false,
            isTypes:"0",
            class1:false,
            list:[{num:'2'}],
            p:10,
            page:1,
            total:0,
            wpid:"",
            mfid:"",
            song_id:"",
            status:"",
            is_valid:"",
            search_tags:"",
            search_self_tags:"",
            op_tags:"",
            ADDwl:false,
            video:'video',
            load:true
            }
   },
   mounted(){
       this.getData()
   },
   methods:{
       fh(index){this.$router.go(index)},
       getData(){

           let params={wpid:this.wpid,mfid:this.mfid,song_id:this.song_id,status:this.status,is_valid:this.is_valid,search_tags:this.search_tags,search_self_tags:this.search_self_tags,op_tags:this.op_tags,p:this.p,page:this.page,plid:this.$route.query.plid}
           this.api.pushlib_slssong_search({params}).then((res)=>{
               this.list=res.data;
               this.total=res.total
               this.load=false
           })
       },
       getWl(){
                this.ADDwl = true;
        },
        heidWL(){
               this.ADDwl = false;
        },
       unwind(){
            if(this.unfold==false){
                    this.unfold=true;
                    this.img="/img/sq.png"
                }else{
                    this.unfold=false;
                    this.img="/img/xs.png"
            }
       },
        expansion(){
                if(this.isType==0){
                    this.isType=1;
                    this.class0=true
                }else{
                    this.isType=0;
                    this.class0=false
                }

        },
        expansionTag(){
                if(this.isTypes==0){
                    this.isTypes=1;
                    this.class1=true
                }else{
                    this.isTypes=0;
                    this.class1=false
                }

        },
         getRowClass({row, column, rowIndex}) {
            if (rowIndex === 0) {
                return 'background:#f7f9fc;color:#1F2E4D;font-size:14px;font-weight:bold;height:48px;font-family:PingFang-SC-Regular;padding:20px 0px 20px 14px'
            } 
            else {
                return ''
            }
        },
        cell({row, column, rowIndex, columnIndex}){
                return 'padding:15px 14px;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
        },
        getSize(){
            this.api.template_config_size().then((res)=>{
                this.sizeList=res
            })
        },
        handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getData()
        },
        handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getData()
        },
        listenToChildEvent(id){
                let formData =new FormData;
                formData.append('plid',this.$route.query.plid);
                formData.append('bind_mfid',JSON.stringify(id));
                this.api.pushlib_slssong_add(formData).then((res)=>{
                    if(res!=false){
                        this.heidWL();
                        this.getData()
                    }
                    
                })
        },
   },
  
 }
</script>

<style scoped>
    .top_name{height: 112px}
    .top_txt,.title_left span{
        margin-left: 24px;
    }
    .top_txt{cursor: pointer;}
    .right_btn{
        display: inline-block;
        float:right;
        margin-right: 20%;
        margin-top:-25px
    }
    .title_left span{
        font-weight: bold;
    }
    .right_btn span,.cx,.cz{
        margin-left: 24px;
        display: inline-block;
        cursor: pointer;
        text-align: center;
        width:100px;
        height: 36px;
        line-height: 36px;
        border:1px solid #ddd;
        border-radius: 3px;
        margin-left: 24px;
        font-size: 14px;
        margin-top: -30px;
    }
    .lk{
        display: inline-block;
        padding:3px;
        border: 1px solid #ddd;
        color:#3377ff;
        border-radius:5px;
        font-size: 12px!important;
    }
    .open_status{
        display: inline-block;
        font-size: 12px!important;
        font-weight: 500!important;
    }
    .condition{
        padding:24px;
        background: #fff;
        margin-top: 196px;
        height:40px;
    }
    .tit_name{
        display: inline-block;
        margin-right: 14px;
        width: 56px;
        height: 20px;
        font-size: 14px;
        font-family: PingFang-SC-Medium,PingFang-SC;
        font-weight: 500;
        color: rgba(31,46,77,1);
        text-align: right;
    }
    select{
        width: 100px;
        height: 36px;
        background: rgba(255,255,255,1);
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
    }
    input{
        width: 175px;
        height: 32px;
        padding-left: 5px;
        background: rgba(255,255,255,1);
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
        margin-right: 24px;
    }
    .gd{
        color:#3377ff;
        margin-left: 24px;
        cursor: pointer;
    }
    .more{
        position:absolute;
        top:88px;
        background:rgba(255,255,255,1);
        z-index: 8;
        width: 100%;
    }
    .polling_tag{
        margin:20px 22px 0 24px;
        min-height: 60px;
        border-top: 1px dashed #E6E9F0;
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
    .tags{
        display: inline-block;
        max-width: 1090px;
        height: 45px;
        overflow: hidden;
        margin-top: 7px;
        margin-bottom: 5px;
    }
    .ALLtags{
        height: 100%!important;
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
    .titlt{
        margin-top: 24px;
        background: #fff;
        padding:24px 
    }
</style>
