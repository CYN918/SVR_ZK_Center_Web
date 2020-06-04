<template>
<div>
    <div class="top_name">
            <div class="tit_top_url" v-if="this.$route.query.auditType == 'Externalpretrialgx'">
                <span class="log_url" @click="fh(-1)"> 推送审核内容管理 &nbsp;/&nbsp;</span>
                <span class="log_ur">个性化内容详情</span>
            </div>
            <div class="tit_top_con" v-if="this.$route.query.auditType == 'Externalpretrialgx'">
                <span class="tit_name">个性化内容详情</span>
            </div>
            <div class="tit_top_url" v-if="this.$route.query.auditType == 'Externalpretrialstrategy'">
                <span class="log_url" @click="fh(-1)"> 推送审核内容管理 &nbsp;/&nbsp;</span>
                <span class="log_ur">通用策略详情</span>
            </div>
            <div class="tit_top_con" v-if="this.$route.query.auditType == 'Externalpretrialstrategy'">
                <span class="tit_name">通用策略详情</span>
            </div>
    </div>
    <div class='details' >
        <div v-if="this.$route.query.auditType == 'Externalpretrialgx'">
            <div class='tits'>
                <span>广告内容</span>
            </div>
            <div class='details_left' v-if='list.adver' >
                <el-tooltip placement="right" class="tit_txt_2 logs tit_txts">
                    <div slot="content">
                        <img :src='list.adver.pict_url' style="max-width:261px;max-height: 464px" />

                    </div>
                    <img :src='list.adver.pict_url' style="cursor: pointer"  preview="0"/>                               
                </el-tooltip>
            </div>
            <div class='details_right'>
               <div>
                   <span>广告图URL</span>
                    <a :href="list.adver.pict_url" v-if='list.adver'>{{list.adver.pict_url}}</a>
               </div>
                <div>
                    <span>落地页URL</span>
                    <a :href="list.adver.click_url" v-if='list.adver'>{{list.adver.click_url}}</a>
               </div>
               <div>
                    <span>应用包URL</span>
                    <a :href="list.adver.package_url" v-if='list.adver'>{{list.adver.package_url}}</a>
               </div>
            </div>
        </div>
        <div>
            <div class='tits' v-if="this.$route.query.auditType == 'Externalpretrialgx'">
                <span>杂志锁屏</span>
            </div>
            <div class='details_left' v-if="list.mfinal && this.$route.query.auditType == 'Externalpretrialgx'">
                <el-tooltip placement="right" class="tit_txt_2 logs tit_txts">
                    <div slot="content">
                        <img :src='list.mfinal.prev_uri' style="max-width:261px;max-height: 464px" />

                    </div>
                    <img :src='list.mfinal.prev_uri' style="cursor: pointer"  preview="0"/>                               
                </el-tooltip>
            </div>
            <div class='details_right2' v-if="this.$route.query.auditType == 'Externalpretrialgx'">
               <div>
                   <div class='tab_box' v-if="list.mfinal">
                       <span class='tab_box_name'>审核ID</span>
                       <span class='tab_box_con'>{{list.check_md5}}</span>
                   </div>
                   <div class='tab_box' v-if="list.mfinal">
                       <span  class='tab_box_name' style="margin-left:30px">尺寸</span>
                       <span  class='tab_box_con' style="margin-left:30px">{{list.mfinal.size}}</span>
                   </div>
                    <div class='tab_box' style="border-right:0!important" v-if="list.mfinal">
                       <span  class='tab_box_name' style="margin-left:30px">文件大小</span>
                        <span style="margin-left:30px" class="tab_box_con" v-if="(list.mfinal.attach.size/1024).toFixed(0)<1">1kb</span>
						<span style="margin-left:30px" class="tab_box_con" v-if="list.mfinal.attach.size>1024&&list.mfinal.attach.size<1024*1024">{{(list.mfinal.attach.size/1024).toFixed(0)}}kb</span>
						<span style="margin-left:30px" class="tab_box_con" v-if="list.mfinal.attach.size>1024*1024&&list.mfinal.attach.size<1024*1024*1024">{{(list.mfinal.attach.size/1024/1024).toFixed(1)}}MB</span>
						<span style="margin-left:30px" class="tab_box_con" v-if="list.mfinal.attach.size>1024*1024*1024">{{(list.mfinal.attach.size/1024/1024/1024).toFixed(2)}}GB</span>
                       <a class='xz' :href='list.mfinal.attach.url'>下载</a>
                   </div>
               </div>
                <!-- <div>
                   <div class='tab_box'>
                       <span  class='tab_box_name'>文件大小</span>
                       <span  class='tab_box_con'>{{list.mfinal.attach.size}}</span>
                       <a class='xz' :href='list.mfinal.attach.url'>下载</a>
                   </div>
                   <div class='tab_box'>
                       <span  class='tab_box_name' style="margin-left:30px">埋点状态</span>
                       <span  class='tab_box_con' style="margin-left:30px">{{}}</span>
                   </div>
                   <div class='tab_box' style="border-right:0!important">
                       <span  class='tab_box_name' >上线状态</span>
                       <span  class='tab_box_con' >{{list.status_online==0?'待确定':list.status_online==1?'已上线':'未上线'}}</span>
                   </div>
               </div> -->
            </div>
            <div v-if="this.$route.query.auditType == 'Externalpretrialgx'">
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
                            <span class="strategy_box_bottom_reg" v-if="list.adver">{{list.adver.freqPv}}</span>
                        </li>
                        <li>
                            <span class="strategy_box_bottom_lef">
                                点击频控
                                <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                                    <div slot="content" class="text">广告到达点击频控次数限制后不再展示广告</div>
                                    <img src="../../../public/img/msgAt.png" style="vertical-align: top !important;margin-top: 20px;"/>
                                </el-tooltip>
                            </span>
                            <span class="strategy_box_bottom_reg" v-if="list.adver">{{list.adver.freqClick}}</span>
                        </li>
                        <li>
                            <span class="strategy_box_bottom_lef">
                                地域限制
                                <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                                    <div slot="content" class="text">控制广告投放地区</div>
                                    <img src="../../../public/img/msgAt.png" style="vertical-align: top !important;margin-top: 20px;"/>
                                </el-tooltip>
                            </span>
                            <span class="strategy_box_bottom_reg" v-if="list.adver">{{list.adver.geo}}</span>
                        </li>
                    </ul>
                </div>
                
                
            </div>
            <div v-if="this.$route.query.auditType == 'Externalpretrialstrategy'">
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
                            <span class="strategy_box_bottom_reg" v-if="tesData.targeted_tags">{{tesData.targeted_tags.action.show_space_time}}</span>
                        </li>
                        <li>
                            <span class="strategy_box_bottom_lef">
                                广告壁纸显示频次控制
                                <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                                    <div slot="content" class="text">控制用户看到广告壁纸次数，到达上限后不再展示广告壁纸</div>
                                    <img src="../../../public/img/msgAt.png" style="vertical-align: top !important;margin-top: 20px;"/>
                                </el-tooltip>
                            </span>
                            <span class="strategy_box_bottom_reg" v-if="tesData.targeted_tags">{{tesData.targeted_tags.action.show_count}}</span>
                        </li>
                        <li>
                            <span class="strategy_box_bottom_lef">
                                壁纸展示间隔次数控制
                                <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                                    <div slot="content" class="text">通过用户亮灭屏次数，在下次亮屏展示广告壁纸</div>
                                    <img src="../../../public/img/msgAt.png" style="vertical-align: top !important;margin-top: 20px;"/>
                                </el-tooltip>
                            </span>
                            <span class="strategy_box_bottom_reg" v-if="tesData.targeted_tags">{{tesData.targeted_tags.action.bright_screen_times}}</span>
                        </li>
                    </ul>
                </div>
                
                
            </div>
            <div v-if="list.adver_status!=0&&this.$route.query.auditType == 'Externalpretrialgx'">
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
                         <span class='jg_con' v-else>-</span>
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
            <div v-if="tesData.audit_status!=0 && this.$route.query.auditType == 'Externalpretrialstrategy'">
                <div class='tits'>
                    <span>处理结果</span>
                </div>
                <div class='jg'>
                    <div>
                        <span>审核结果</span>
                         <span class='jg_con'>{{tesData.audit_status==0?'待审核':tesData.audit_status==1?"审核通过":"审核不通过"}}</span>
                    </div>
                    <div>
                        <span>原因说明</span>
                         <span class='jg_con' v-if="tesData.note != ''">{{tesData.note}}</span>
                         <span class='jg_con' v-else>-</span>
                    </div>
                    <div>
                        <span>更新时间</span>
                         <span class='jg_con'>{{tesData.updated_at}}</span>
                    </div>
                    <div style="border:0!important">
                        <span>操作人员</span>
                         <span class='jg_con'>{{tesData.updator}}</span>
                    </div>
                </div>
               
            </div>
           <div v-if="list.adver_status==0&&this.$route.query.auditType == 'Externalpretrialgx'" class='wcl'>
                <div class='tits'>
                    <span>处理结果</span>
                </div>
               <span>暂未处理</span>
           </div>
           <div v-if="tesData.audit_status==0&&this.$route.query.auditType == 'Externalpretrialstrategy'" class='wcl'>
                <div class='tits'>
                    <span>处理结果</span>
                </div>
               <span>暂未处理</span>
           </div>
        </div>

        <div style="margin:0 40px">
            <span class='sh' v-if="list.adver_status==0&&this.$route.query.auditType == 'Externalpretrialgx'" @click='SH()'>审核</span>
            <span class='sh' v-if="tesData.audit_status==0&&this.$route.query.auditType == 'Externalpretrialstrategy'" @click='TYSH()'>审核</span>
            <span class='qx' v-if='list.adver_status==0'  @click='fh(-1)'>取消</span>
            <span @click='fh(-1)' class='qx' v-if='list.adver_status!=0'>返回</span>
        </div>
    </div>
     <div class="bg" v-if="tc">
        <div class='content' style="min-height:350px;">
            <div class='con_tit'>
                <span>审核</span>
            </div>
            <div class='sel'>
                <select v-model="status2">
                    <option value="1">审核通过</option>
                    <option value="2">审核不通过</option>
                </select>
                <div class='sel_1' v-if="status2=='2'">
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="物料和落地页不匹配" class='aaa'></el-checkbox>
                        <el-checkbox label="物料内容差"  class='aaa'></el-checkbox>
                        <el-checkbox label="屏蔽竞品"  class='aaa'></el-checkbox>
                        <el-checkbox label=""  class='aaa bb'>
                            <template>
                                <span style="margin-right:10px">其他</span>
                                <textarea placeholder="最多20字" maxlength="20" v-model="yy"></textarea>
                            </template>
                        </el-checkbox>
                    </el-checkbox-group>
                    
                </div>
            </div>
            <div class='sel_btn'>
                <span class="sel_btn_qd" @click="pushLib()">确定</span>
                <span @click='qx()'>取消</span>
            </div>
        </div>
    </div>

    <div class="bg" v-if="TYtc">
        <div class='content'>
            <div class='con_tit'>
                <span>审核</span>
            </div>
            <div class='sel'>
                <select v-model="status2">
                    <option value="1">审核通过</option>
                    <option value="2">审核不通过</option>
                </select>
                <div class='sel_1' v-if="status2=='2'"> 
                    <textarea placeholder="不通过原因,最多20字" maxlength="20" v-model="content" style="width:202px;"></textarea>  
                </div>
            </div>
            <div class='sel_btn'>
                <span class="sel_btn_qd" @click="TYpushLib()">确定</span>
                <span @click='TYqx()'>取消</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default {

components: {},
data() {        
    return {
        list:{},
        tc:false,
        TYtc:false,
        status2:"1",
        checkList:[],
        yy:"",
        advers: [],
        content:'',
        tesData:'',
    };
},

methods: {
    fh(index){
        this.$router.go(index)
    },
    qx(){
        this.tc=false;
        this.status2=1;
        this.checkList=[];
        this.yy='';
    }, 
    TYqx(){
        this.TYtc=false;
        this.status2=1;
        this.content = '';
    },
    getDetail(){
        let params={adid:this.$route.query.adid,
					mfid:this.$route.query.mfid,
					plid:this.$route.query.plid,
					tags_id:this.$route.query.tags_id}
        this.api.pushlib_adver_mfinal_detail({params}).then((res)=>{
            this.list=res;
        })
    },
    SH(){
        this.tc=true;
    },
    TYSH(){
        this.TYtc=true;
    },
    pushLib(){    
        let array={plid:"",adid:"",mfid:"",tags_id:""}
            array.plid=this.$route.query.plid;
            array.adid=this.$route.query.adid;
            array.mfid=this.$route.query.mfid;
            array.tags_id=this.$route.query.tags_id;
        this.advers.push(array);
        if(!this.status2){
            this.$message.error('状态不能为空')
        }
        let formData =new FormData;
        formData.append('status',this.status2);
        
        if(!this.yy){
            formData.append('note',this.checkList.join(',')); 
        }else{
            formData.append('note',this.checkList.join(',') + this.yy);
        }  
        
        formData.append('advers',JSON.stringify(this.advers))
        console.log(this.checkList.join(',') + this.yy)
        this.api.pushlib_adver_mfinal_audit(formData).then((res)=>{
            if(res!=false){
                this.qx(); 
                this.getDetail();  
            }
        })
    },
    TYpushLib(){
        let formData =new FormData;
        formData.append('audit_status',this.status2);
        formData.append('id',this.auditData.id)
        formData.append('note',this.content)
        this.api.ctrlapi_tags_action_audit(formData).then((res)=>{
            if(res!=false){
                this.getDetail();
                this.qx();
                
            }
        })

    },
    init(){
        this.tesData = JSON.parse(this.$route.query.row);
        console.log(this.tesData)
    },  
},

created() {
    if(this.$route.query.auditType == 'Externalpretrialstrategy'){
        this.init()
    }else{
        this.getDetail();
    }

},

mounted() {
    // this.getDetail()
},

}
</script>
<style  scoped>
.top_name{
        height: 98px;
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
        left:90px;
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
    .bg{
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
    }
    .content{
        width: 400px;
        max-height:250px;
        position: absolute;
        top:30%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 2px;
    }
    .con_tit{
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #ddd;
    }
    .con_tit span{
        display: inline;
        margin-left: 24px;
        display: inline-block;
        line-height: 40px;
        font-size: 18px;
        font-weight: 500;
    }
    .sel{
        margin: 20px 0;
    }
    .sel select{
        width: 200px;
        height: 36px;
        margin-left: 24px;
        border-radius: 5px;
    }
    .sel_1{
        margin: 30px 0 0px 24px;
    }
    .aaa{
          display: block!important;
      margin: 0 0 15px 0 !important
    }
     .bb span{
        vertical-align: top;
    }
   .bb textarea{
       padding: 5px
   }
   .sel_btn{
       width: 100%;
       height: 50px;
       text-align: right;
       position: absolute;
    bottom: 0px;
   }
   .sel_btn span{
    margin-right: 24px;
    display: inline-block;
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
    margin-top: 7px
   }
   .sel_btn_qd{
       border: 0!important;
    background: rgba(51,119,255,1)!important;
    color: rgba(255,255,255,1)!important;
   }
   .wcl{
       position: relative;
       padding-bottom:30px ;
   }
   .wcl>span{
       color: #ddd;
       font-size: 14px;
       position: absolute;
       top:80px;
       left: 50%;
       transform: translate-x(-50%)
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