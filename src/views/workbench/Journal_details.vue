
<template>
<div>
    <div class="top_name">
            <div class="tit_top_url" v-if="this.$route.query.auditType == '2'">
                <span class="log_url" @click="fh(-1)">杂志锁屏推送 &nbsp;/&nbsp;</span>
                <span class="log_url" @click="fh(-1)"> 推送审核内容管理 &nbsp;/&nbsp;</span>
                <span class="log_ur">内容详情</span>
            </div>
            <div class="tit_top_con" v-if="this.$route.query.auditType == '2'">
                <span class="tit_name">内容详情</span>
                <!-- <span class='cx' @click='updateG()' v-if="list.adver_status == '0'">更新广告图</span> -->
            </div>
            <div class="tit_top_url" v-if="this.$route.query.auditType == '5' && this.$route.query.strategy != 'Strategyaudit'">
                <span class="log_url" @click="fh(-1)">杂志锁屏推送审核管理 &nbsp;/&nbsp;</span>
                <span class="log_url" @click="fh(-1)"> 外部审核及锁屏管理 &nbsp;/&nbsp;</span>
                <span class="log_ur">个性化内容详情</span>
            </div>
            <div class="tit_top_con" v-if="this.$route.query.auditType == '5' && this.$route.query.strategy != 'Strategyaudit'">
                <span class="tit_name">个性化内容详情</span>
                <!-- <span class='cx' @click='updateG()' v-if="list.adver_status == '0'">更新广告图</span> -->
            </div>
            <div class="tit_top_url" v-if="this.$route.query.auditType == '5' && this.$route.query.strategy == 'Strategyaudit'">
                <span class="log_url" @click="fh(-1)">杂志锁屏推送审核管理 &nbsp;/&nbsp;</span>
                <span class="log_url" @click="fh(-1)"> 外部审核及锁屏管理 &nbsp;/&nbsp;</span>
                <span class="log_ur">通用策略详情</span>
            </div>
            <div class="tit_top_con" v-if="this.$route.query.auditType == '5' && this.$route.query.strategy == 'Strategyaudit'">
                <span class="tit_name">通用策略详情</span>
                <!-- <span class='cx' @click="fh(-1)">返回</span> -->
            </div>
    </div>
    <div class='details'>
        <div v-if="this.$route.query.strategy != 'Strategyaudit'">
            <div class='tits'>
                <span>广告内容</span>
            </div>
            <div class='details_left' v-if="adver.pict_url" >
                <el-tooltip placement="right" class="tit_txt_2 logs tit_txts">
                    <div slot="content">
                        <img :src='adver.pict_url' style="max-width:261px;max-height: 464px" />

                    </div>
                    <img :src='adver.pict_url' style="cursor: pointer"  preview="0"/>                               
                </el-tooltip>
            </div>
            <div class='details_right'>
                <div>
                   <span>广告ID</span>
                    <span v-if="adver.adid" style="color: #666;">{{adver.adid}}</span>
               </div>
               <div>
                   <span>广告图URL</span>
                    <a :href="adver.pict_url" v-if="adver.pict_url">{{adver.pict_url}}</a>
               </div>
                <div>
                    <span>落地页URL</span>
                    <a :href="adver.click_url">{{adver.click_url}}</a>
               </div>
               <div>
                    <span>应用包URL</span>
                    <a :href="adver.package_url">{{adver.package_url}}</a>
               </div>
            </div>
        </div>
        <div>
            <div class='tits' v-if="this.$route.query.strategy != 'Strategyaudit'">
                <span>杂志锁屏</span>
            </div>
            <div class='details_left' v-if="this.$route.query.strategy != 'Strategyaudit'">
                <el-tooltip placement="right" class="tit_txt_2 logs tit_txts">
                    <div slot="content">
                        <img :src='mfinal.prev_uri' style="max-width:261px;max-height: 464px" />

                    </div>
                    <img :src='mfinal.prev_uri' style="cursor: pointer"  preview="0"/>                               
                </el-tooltip>
            </div>
            <div class='details_right2' v-if="this.$route.query.strategy != 'Strategyaudit'">
               <div>
                   <div class='tab_box'>
                       <span class='tab_box_name'>物料ID</span>
                       <span class='tab_box_con'>{{mfinal.mfid}}</span>
                   </div>
                   <div class='tab_box'>
                       <span class='tab_box_name' style="margin-left:30px">壁纸标签</span>
                       <!-- <span  class='tab_box_con tag' style="margin-left:30px" v-for='da in list.mfinal.sls_tags'>{{da}}</span> -->
                       <span  class='tab_box_con tag' style="margin-left:30px">{{list.wpid_tags_id}}</span>
                   </div>
                   <div class='tab_box' style="border-right:0!important">
                       <span  class='tab_box_name' style="margin-left:30px">尺寸</span>
                       <span  class='tab_box_con' style="margin-left:30px">{{mfinal.size}}</span>
                   </div>
               </div>
                <div>
                   <div class='tab_box'>
                       <span  class='tab_box_name'>文件大小</span>
                       <!-- <span  class='tab_box_con'>{{list.mfinal.attach.size}}</span> -->
                       <span class="tab_box_con" v-if="mfinal.attach&&(mfinal.attach.size/1024).toFixed(0)<1">1kb</span>
						<span class="tab_box_con" v-if="mfinal.attach&&mfinal.attach.size>1024&&mfinal.attach.size<1024*1024">{{(mfinal.attach.size/1024).toFixed(0)}}kb</span>
						<span class="tab_box_con" v-if="mfinal.attach&&mfinal.attach.size>1024*1024&&mfinal.attach.size<1024*1024*1024">{{(mfinal.attach.size/1024/1024).toFixed(1)}}MB</span>
						<span class="tab_box_con" v-if="mfinal.attach&&mfinal.attach.size>1024*1024*1024">{{(mfinal.attach.size/1024/1024/1024).toFixed(2)}}GB</span>
                       <a class='xz' :href='mfinal.attach.url' v-if="mfinal.attach">下载</a>
                   </div>
                   <!-- <div class='tab_box'>
                       <span  class='tab_box_name' style="margin-left:30px">埋点状态</span>
                       <span  class='tab_box_con' style="margin-left:30px">{{mfinal.status_check==0?'暂未上线':"已上线"}}</span>
                   </div> -->
                   <div class='tab_box' style="border-right:0!important">
                       <span  class='tab_box_name' style="margin-left:30px">对接上线状态</span>
                       <span  class='tab_box_con' style="margin-left:30px">{{list.status_online==0?'待确定':list.status_online==1?'已上线':'未上线'}}</span>
                   </div>
               </div>
               
            </div>
            <div v-if="this.$route.query.auditType == '5' &&  this.$route.query.strategy != 'Strategyaudit'">
                <div class='tits'>
                    <span>个性化策略</span>
                </div>
                <div class="strategy_box">
                    <ul class="strategy_box_top">
                        <li>
                            <span class="strategy_box_top_lef">策略名称</span>
                            <span class="strategy_box_top_reg">策略内容</span>
                        </li>
                    </ul>
                    <ul class="strategy_box_bottom">
                        <li>
                            <span class="strategy_box_bottom_lef">
                                展示频控
                                <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                                    <div slot="content" class="text">广告到达设置展示频次上线后停止展示</div>
                                    <img src="../../../public/img/msgAt.png" style="vertical-align: top !important;margin-top: 20px;"/>
                                </el-tooltip>
                            </span>
                            <span class="strategy_box_bottom_reg">{{adver.freqPv}}</span>
                        </li>
                        <li>
                            <span class="strategy_box_bottom_lef">
                                点击频控
                                <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                                    <div slot="content" class="text">广告到达点击频控次数限制后不再展示广告</div>
                                    <img src="../../../public/img/msgAt.png" style="vertical-align: top !important;margin-top: 20px;"/>
                                </el-tooltip>
                            </span>
                            <span class="strategy_box_bottom_reg">{{adver.freqClick}}</span>
                        </li>
                        <li>
                            <span class="strategy_box_bottom_lef">
                                地域限制
                                <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                                    <div slot="content" class="text">控制广告投放地区</div>
                                    <img src="../../../public/img/msgAt.png" style="vertical-align: top !important;margin-top: 20px;"/>
                                </el-tooltip>
                            </span>
                            <span class="strategy_box_bottom_reg">{{adver.geo}}</span>
                        </li>
                    </ul>
                </div>
                
                
            </div>
            <div v-if="this.$route.query.auditType == '5' &&  this.$route.query.strategy == 'Strategyaudit'">
                <div class='tits'>
                    <span>通用策略</span>
                </div>
                <div class="strategy_box">
                    <ul class="strategy_box_top">
                        <li>
                            <span class="strategy_box_top_lef">策略名称</span>
                            <span class="strategy_box_top_reg">策略内容</span>
                        </li>
                    </ul>
                    <ul class="strategy_box_bottom">
                        <li>
                            <span class="strategy_box_bottom_lef">
                                广告壁纸显示间隔时间
                                <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                                    <div slot="content" class="text">满足显示间隔时间后亮屏时展示广告壁纸</div>
                                    <img src="../../../public/img/msgAt.png" style="vertical-align: top !important;margin-top: 20px;"/>
                                </el-tooltip>
                            </span>
                            <span class="strategy_box_bottom_reg" v-if="tesData.action">{{tesData.action.show_space_time}}</span>
                        </li>
                        <li>
                            <span class="strategy_box_bottom_lef">
                                广告壁纸显示频次控制
                                <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                                    <div slot="content" class="text">控制用户看到广告壁纸次数，到达上限后不再展示广告壁纸</div>
                                    <img src="../../../public/img/msgAt.png" style="vertical-align: top !important;margin-top: 20px;"/>
                                </el-tooltip>
                            </span>
                            <span class="strategy_box_bottom_reg" v-if="tesData.action">{{tesData.action.show_count}}</span>
                        </li>
                        <li>
                            <span class="strategy_box_bottom_lef">
                                壁纸展示间隔次数控制
                                <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                                    <div slot="content" class="text">通过用户亮灭屏次数，在下次亮屏展示广告壁纸</div>
                                    <img src="../../../public/img/msgAt.png" style="vertical-align: top !important;margin-top: 20px;"/>
                                </el-tooltip>
                            </span>
                            <span class="strategy_box_bottom_reg" v-if="tesData.action">{{tesData.action.bright_screen_times}}</span>
                        </li>
                        
                    </ul>
                </div>
                
                
            </div>
            <div v-if='list.adver_status!=0'>
                <div class='tits'>
                    <span>处理结果</span>
                </div>
                <div class='jg'>
                    <div>
                        <span>审核结果</span>
                         <span class='jg_con'>{{list.adver_status==0?'待审核':list.adver_status==1?"审核通过":"审核不通过"}}</span>
                    </div>
                    <div>
                        <span>原因说明</span>
                         <span class='jg_con' v-if="list.note != ''">{{list.note}}</span>
                         <span class='jg_con' v-else>--</span>
                    </div>
                    <div>
                        <span>更新时间</span>
                         <span class='jg_con'>{{list.updated_at}}</span>
                    </div>
                    <div style="border:0!important">
                        <span>操作人员</span>
                         <span class='jg_con'>{{list.updator}}</span>
                    </div>
                </div>
               
            </div>
             <div v-if='list.adver_status==0' class='wcl'>
                  <div class='tits' style="text-align: left;color: #000;">
                    <span style="color: #000;">处理结果</span>
                </div>
               <span>暂未处理</span>
           </div>
           
        </div>
        <div style="margin:0 40px">
            <!-- <span class='sh'>审核</span>
            <span class='qx'>取消</span> -->
            <span @click='fh(-1)' class='qx'>返回</span>
        </div>
    </div>
    <el-dialog
        title="更新广告图"
        :visible.sync="dialogVisible"
        :showClose="showClo"
        :before-close="handleClose"
        width="30%">
        <div class="AddIMG_content_right">
            <div class="AddIMG_input">
                <div class="AddIMG_input_box">
                    <el-upload
                            class="upload-demo"
                            :before-upload="beforeAvatarUploads"
                            :on-remove="handleRemove"
                            :http-request="uploadF"
                            action="111"
                    >   
                        <el-button size="small" type="primary">选择</el-button>
                    </el-upload>
                    <el-tooltip placement="top" class="tit_txt_2 logs tit_txts" v-if="attach.name!=undefined">
                        <div slot="content" class="text">{{this.attach.name}}</div>
                        <span  class="text" style="overflow: hidden;width: 200px;height: 20px;line-height: 28px;margin-top: 25px;">{{this.attach.name}}<span class="content_xz" @click="dels()" v-if="attach.name!=undefined">删除</span></span>
                    </el-tooltip>

                </div>
                <!-- <img src="../../../public/img/msg.png" @click="showHint" style="vertical-align: top"/> -->
                <div class="progress" style="width: 100px;height: 5px;opacity: 0.5;display: inline-block;margin-top: 25px;" v-if="initiate" >
                    <div class="strip" :style="{width:aaa+'%'}" style="background: blue;height: 5px;"></div>
                    <div style="text-align: center;font-size: 10px;">上传中{{aaa}}%</div>
                </div>
                
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="surRemove">确 认</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
    </el-dialog>
    <hin v-if='hint' ></hin>
</div>
</template>

<script>
import hin from '../admin/hintMessage'
export default {

components:{hin},
data() {        
    return {
        list:{},
        mfinal:{},
        adver:{},
        dialogVisible: false,
        showClo:false,
        hint:false,
        initiate:false,
        attach:{},
        aaa:0,
        tesData:'',
    };
},

methods: {
    showHint(){
        this.hint = true;
        this.stop();
    },
    beforeAvatarUploads(file) {
        console.log(file);
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        // const isGIF = file.type === 'image/gif';
        // const isXzip = file.type === 'application/x-zip-compressed';
        // const iszip = file.type === 'application/zip';
        
        if (!isJPG&&!isPNG) {
            this.$message.error('只支持JPG、PNG格式!');
        }
        return isPNG || isJPG;
    },
    handleRemove(file, fileList) {
        this.file = '';
        this.initiate=false;
    },
    time(){
        var _this=this;
        _this.aaa=0;
        var timer = setInterval(function () {
            if(_this.aaa<99){
                _this.aaa++
            }
        },100);
    },
    dels(){
        this.attach={}
    },
    uploadF(file){
        if(this.status==1101){
            return
        }else{
            this.initiate=true;
            this.time();
            let formData = new FormData;
            formData.append('file',file.file);
            this.api.file_upload(formData).then((res)=>{
                this.aaa=100;
                this.initiate=false;
                // this.attach.name = res.name;
                // this.attach.size = res.size;
                // this.attach.ext = res.ext;
                // this.attach.md5 = res.md5;
                // this.attach.url = res.url;
                this.attach=res;
            })
        }

    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      stop(){
            document.body.style.overflow='hidden';
            document.body.style.position='fixed';
            document.body.style.width='100%';
        },
    updateG(){
        this.dialogVisible = true;
    },
    surRemove(){
        let formData = new FormData;
        formData.append('adid',this.$route.query.adid);
        formData.append('mfid',this.$route.query.mfid);
        formData.append('plid',this.$route.query.plid);
        formData.append('tags_id',this.$route.query.tags_id);
        formData.append('wpid',this.list.mfinal.wpid);
        if(this.attach.url == undefined){
            this.$message.error('请上传广告图!');
            return false
        }else{
            formData.append('ad_url',this.attach.url);
        }
        this.api.tools_pushlib_adver_url_edit(formData).then((res)=>{
            this.getDetail();
            this.dialogVisible = false;
            this.attach = {};
        })
        
    },
    fh(index){
        this.$router.go(index)
    },
    getDetail(){
        let params={adid:this.$route.query.adid,mfid:this.$route.query.mfid,plid:this.$route.query.plid,tags_id:this.$route.query.tags_id}
        this.api.pushlib_adver_mfinal_detail({params}).then((res)=>{
            this.list=res;
            this.mfinal = res.mfinal;
            this.adver = res.adver;
        })
    },
    init(){
        let params={plid:this.$route.query.plid,channel:this.$route.query.channel}
        this.api.ctrlapi_tags_action({params}).then((res)=>{
            if(res != false){
                this.tesData = res;
            }
        })
    }
},

created() {
    if(this.$route.query.auditType == '5' &&  this.$route.query.strategy == 'Strategyaudit'){
        this.init()
    }else{
        this.getDetail();
    }
},

mounted() {
    
},

}
</script>
<style  scoped>
.AddIMG_input_box .el-upload .el-button--small{
    color: #FFF !important;
    background-color: #409EFF !important;
    border-color: #409EFF !important;
}
.content_xz{
    margin-left: 20px;
    cursor: pointer;
}
.top_name{
        height: 98px;
    }
    .cx{
        display: inline-block;
        height: 36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
        width: 75px;
        background: rgba(51,119,255,1);
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255,255,255,1);
        margin-right: 320px;
        float: right;
    }
.log_ur{
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .details{
        margin-top: 185px;
        background: #fff;
        padding: 0 40px;
    }
    .details_left{
        margin: 20px 100px 10px 40px;
        display: inline-block;
        width: 160px;
        height: 230px;
        background: #ddd;
        position: relative;
    }
    .details_left img{
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%)
        
    }
    .details_right,.details_right2{
        display: inline-block;
        position: relative;
        vertical-align: top;
        margin-top: 40px;
        width: 60%;
    }
    .details_right>div{
        width: 100%;
        height: 50px;
        border:1px solid rgb(241, 240, 240);
        padding: 15px 30px;
    } 
    .details_right2>div{
        width: 100%;
        height: 80px;
        padding: 0 30px;
        border:1px solid rgb(241, 240, 240);
    }
    .details_right>div>span{
        display: block;
        font-size: 12px;
        color: rgb(177, 174, 174);
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        margin-top: 10px;
    }
    .details_right>div>a{
        display: inline-block;
         font-size: 12px;
         color: #3377ff;
        font-family: Arial, Helvetica, sans-serif;
        overflow: hidden;
        text-decoration:#3377ff!important;
        overflow: hidden;
        width: 100%;
        height: 14px;
    }
    .details_name{
        display: inline-block;
        font-family: 'Courier New', Courier, monospace;
        font-size: 18px;
        font-weight: 500;
        color: #000;
    }
    .details_num{
        display: inline-block;
         font-size: 12px;
        font-weight: 500;
        color: ddd;
        font-family: 'Courier New', Courier, monospace;
    }
    .details_box{
        width: 100%;
        height: 150%;
        overflow-y: auto;
    }
    .details_url{
        height: 30px;
        width: 100%;
        line-height: 30px;
        border-bottom: 1px solid #ddd;
    }
    .details_tit{
        width: 100%;
        height: 50px;
        border-bottom: 3px solid #ddd
    }
    .img_box{
        width: 100%;
        height: 150px;
        overflow-x: auto;
        margin-top: 15px;
        border-bottom: 1px solid #ddd;
    }
    .img_url{
        width: 80px;
        height: 120px;
        background: #ddd;
        margin-right:40px; 
    }
    .sh,.qx{
        display: inline-block;
        cursor: pointer;
        margin-right: 24px;
        width: 68px;
        height: 36px;
        background: rgba(255,255,255,1);
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(61,73,102,1);
        line-height: 36px;
        cursor: pointer;
        text-align: center;
        margin-top: 7px;
        margin-bottom: 50px;
    }
    .sh{
           border: 0!important;
    background: rgba(51,119,255,1)!important;
    color: rgba(255,255,255,1)!important;
    }
    .tits{
        width: 100%;
        border-bottom: 1px solid #ddd;
    }
    .tits span{
        display: inline-block;
        margin: 20px 0 20px 40px;
        font-family: 'Courier New', Courier, monospace;
        font-size: 16px;
        font-weight: bold;
        color: #000;

    }
    .tab_box{
        display: inline-block;
        width: 33%;
        height: 100%;
        border-right: 1px solid rgb(241, 240, 240);
        position: relative;
    }
    .tab_box_name{
        display: block;
        margin: 25px 0 0 0;
        font-size: 12px;
        color: rgb(177, 174, 174);
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        
    }
    .tab_box_con{
        font-size: 12px;
        color: rgb(43, 42, 42);
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
    }
    .xz{
        display: inline-block;
        padding: 5px 10px;
        text-align: center;
        border:1px solid #ddd;
        border-radius: 3px;
        cursor: pointer;
        position: absolute;
        right:30px;
        top:25px;
    }
    .jg{
        margin: 30px 0 30px 0;
        width: 100%;
        height: 80px;
        border:1px solid  rgb(241, 240, 240);
    }
    .jg>div{
        width: 24.5%;
        display: inline-block;
        border-right:1px solid rgb(241, 240, 240);
        height: 100%;
    }
    .jg>div>span{
        display: block;
        font-size: 12px;
        color: rgb(177, 174, 174);
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        margin: 25px 0 0 40px;
    }
    .jg_con{
      display: inline-block!important;
      color: rgb(53, 53, 53)!important;
       margin: 0 0 0 40px!important;
    }
    .tag{
        display: inline-block;
        padding: 2px 5px;
        border:1px solid #ddd;
    }
     .wcl{
       text-align: center;
   }
   .wcl span{
       color: #ddd;
       font-size: 14px;
   }
   .strategy_box{
       width: 100%;
       min-height: 230px;
       margin-top: 20px;
   }
   .strategy_box_top{
       height: 53px;
       line-height: 53px;
       border: 1px solid #ddd;
       background: #ddd;
   }
   .strategy_box_top > li > span{
       width: 50%;
       display: block;
       float: left;
       text-align: center;
       font-size: 16px;
       font-weight: bold;
   }
   .strategy_box_bottom > li{
       height: 54px;
       line-height: 54px;
       border-bottom: 1px solid #ddd;
   }
   .strategy_box_bottom > li > span{
       width: 50%;
       display: block;
       float: left;
       text-align: center;
       font-size: 14px;
   }
</style>