<template>
    <div class="template">
        <div class="top_name">
            <span class="top_txt" @click='fh(-1)'>杂志锁屏推送审核管理  / 子推送库列表 / 上线内容管理</span><div style="width:0;height:0;"><br/></div>
            <span class="top_txts" style="width: 113px;display: inline-block;">上线内容管理</span>
            <!-- <span class='qdName'>渠道</span>
            <select v-model="channel">
                    <option :value="item.channel" v-for="item in qdLists">{{item.channel}}</option>
            </select> -->
            <span class='qud'>{{this.$route.query.channel}}</span>
            <span class='qud1' v-if="this.$route.query.sub_plid">{{this.$route.query.sub_plid}}</span> 
            
            <span class="userGl" v-if="new Date(this.date)>=new Date(new Date().getTime() - 24*60*60*1000)" @click='jump()' style="margin: 0px 20% 0 0;">一键确认</span>
            <!-- <span class="userGl" style="margin: 0px 1% 0 0;" @click="getShow()">预警设置</span> -->
            <span class="userGl" style="margin: 0px 1% 0 0;" @click="copyContent()" v-if="total == 0&&total1 == 0">复制内容</span>
            <div class="user">
                <div class="sk" :class="{check:is_receiver==0}" @click="switchs(0)">
                    常规壁纸管理
                </div>
                <div class="fk" :class="{check:is_receiver==1}" @click="switchs(1)">
                    预加载壁纸管理
                </div>
            </div>
        </div> 
        <el-dialog
            title="一键确认"
            :visible.sync="confirmVisible"
            :showClose="showClo"
            :before-close="handleClose"
            width="30%">
            <span>将所有待确认状态的内容状态更新为已确认(已确认的内容会按排期下发到客户端)</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmSur">确 认</el-button>
                <el-button @click="confirmVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <div class="bg" v-if="tCopy">
            <div class='content'>
                <div class='con_tit'>
                    <span>复制内容</span>
                </div>
                <div class='sel'>
                    <span class='qdName'>子推送库：</span>
                    <el-select v-model="valueTs" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.sub_plid"
                        :label="item.name"
                        :value="item.sub_plid">
                        </el-option>
                    </el-select>
                </div>
                <div class='sel'>
                    <span class='qdName'>选择日期：</span>
                    <el-date-picker
                        v-model="date1"
                        type="date"
                        format="yyyy 年 MM 月 dd 日"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class='sel_btn'>
                    <span class="sel_btn_qd" @click="pushCopy()">确定</span>
                    <span @click='qxCopy()'>取消</span>
                </div>
            </div>
        </div>
        <ConventionalLocakscreen v-if="is_receiver == 0" :tableData="tableData" :total="total" :idse="ids"></ConventionalLocakscreen> 
        <PreloadLocakscreen v-if="is_receiver == 1" :tableData="tableData1" :total="total1" :idse="ids1"></PreloadLocakscreen>  
        <loading v-if='load'></loading> 
    </div>
</template>

<script>
    import ConventionalLocakscreen from './conventional_locakScreen';
    import PreloadLocakscreen from './preload_locakScreen';
    import loading from '../../../components/loading'
    export default {
        components: {ConventionalLocakscreen,PreloadLocakscreen,loading},
        data() {
            return {
                date:(new Date()).toLocaleDateString().split('/').join('-'),
                date1:(new Date()).toLocaleDateString().split('/').join('-'),
                is_receiver:0,
                confirmVisible:false,
                showClo:false,
                tCopy:false,
                valueTs:'',
                options:[],  
                plid:this.$route.query.plid,
                page:1,
                p:10,
                tableData:[],
                total:0,
                tableData1:[],
                total1:0,
                load:false,
                ids:'',
                ids1:'',
            };
        },
        methods: {
            switchs(num){
                this.is_receiver=num; 
                this.mJs.scTop(0); 
                localStorage.setItem('tabNum', num);  
                if(num == 0){
                    this.getData1()
                } 
                if(num == 1){
                    this.getData2()
                }
            },  
            getData1(p,page){
                if(p != undefined){
                    this.p = p;
                }
                if(page != undefined){
                    this.page = page;
                }
               this.load = true;
               let params={
                    p:this.p,
                    page:this.page,
                    tdate:this.date,
                    plid:this.plid,
                    type:this.$route.query.type,
                    ad_type:1,
                }
               if(this.$route.query.sub_plid != undefined){
                   params.sub_plid = this.$route.query.sub_plid
               }
                
                this.api.pushlib_textlink_search({params}).then((res)=>{
                    this.tableData=res.data;
                    this.total=res.total;
                    this.load = false;
                    this.mJs.scTop(0);
                    
                    var a = [];
                    for(let i=0;i<this.tableData.length;i++){
                        a.push(this.tableData[i].mfid);   
                    }
                    this.ids=a.join(';');
                //    this.$previewRefresh()
               })
            },
            getData2(p,page){
                if(p != undefined){
                    this.p = p;
                }
                if(page != undefined){
                    this.page = page;
                }
               this.load = true;
               let params={
                    p:this.p,
                    page:this.page,
                    tdate:this.date,
                    plid:this.plid,
                    type:this.$route.query.type,
                    ad_type:2,
                }
               if(this.$route.query.sub_plid != undefined){
                   params.sub_plid = this.$route.query.sub_plid
               }
                
                this.api.pushlib_textlink_search({params}).then((res)=>{
                    this.tableData1=res.data;
                    this.total1=res.total;
                    localStorage.setItem('preload', this.total);
                    this.load = false;
                    this.mJs.scTop(0);
                    var a = [];
                    for(let i=0;i<this.tableData.length;i++){
                        a.push(this.tableData[i].mfid);   
                    }
                    this.ids1=a.join(';');
                //    this.$previewRefresh()
               })
            },
            jump(){
                this.confirmVisible = true;          
            },  
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            //一键确认
            confirmSur(){
                let formData =new FormData;
                formData.append('plid',this.plid);
                formData.append('tdate',this.date);
                if(this.$route.query.sub_plid != undefined){
                    formData.append('sub_plid',this.$route.query.sub_plid);
                }
                if(this.type == 'meizu_first'){
                    formData.append('type','meizu_first');
                }
                this.api.pushlib_textlink_audit(formData).then((res)=>{
                    this.$message({
                        message: '一键确认成功',
                        type: 'success'
                    });
                    this.confirmVisible = false;
                    this.getData1()
                    this.getData2()
                })
            },   
            copyContent(){
                this.tCopy = true;
                this.init();
            },
            //查询子推送库列表
            init(){
                let params = {plid:this.plid}
                this.api.pushlib_sub_list({params}).then((res)=>{
                    this.options = res;
                    
                })

            }, 
            pushCopy(){
                if(!this.valueTs){
                    this.$message({
                        message: '请选择子推送库',
                        type: 'warning'
                    });
                    return false
                }
                if(!this.date1){
                    this.$message({
                        message: '请选择时间',
                        type: 'warning'
                    });
                    return false
                }
                let formData =new FormData;
                formData.append('plid',this.plid);
                if(this.$route.query.sub_plid != undefined){
                    formData.append('sub_plid',this.$route.query.sub_plid);
                }
                formData.append('tdate',this.date);
                formData.append('src_sub_plid',this.valueTs);
                formData.append('src_tdate',this.date1);
                this.api.pushlib_sub_copy(formData).then((res)=>{
                    this.$message({
                        message: '复制成功',
                        type: 'success'
                    });
                    this.tCopy = false;
                    this.getData1()
                    this.getData2()
                })

            },
            qxCopy(){
                this.tCopy = false;
            },  
            fh(index){
                this.$router.go(index)
            },   
        },
        created() {
            
        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            if (localStorage.getItem('tabNum')) {
                this.is_receiver = localStorage.getItem('tabNum')
            }  
            this.getData1();
            this.getData2();
        },
    }
</script>
<style  scoped>
    .top_name{
        height: 112px;
        border: 0;
    }
    .top_txt{
        cursor: pointer; margin-left: 24px;
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153,153,153,1);
        line-height: 20px!important;
        margin-top: 15px
    }
    .top_txts{
        margin-left: 24px;
        font-size: 18px;
        font-family: PingFang-SC;
        font-weight: 500;
        line-height: 30px;
        color: rgba(31,46,77,1);
        display: block;
        margin-top: 10px;
    }
    select{
        margin-left: 20px;
        width: 200px;
        height: 36px;
        border-radius: 5px;
    }
    .userGl{
        float: right;
        display: inline-block;
        height: 36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
        width: 144px;
        background: rgba(242,246,252,1);
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(61,73,102,1);
        margin-top: -10px!important
    }
    .qud{
       display: inline-block;
       padding: 5px;
       border:1px solid  rgba(51,119,255,1);
       text-align: center;
       color: rgba(51,119,255,1);
       border-radius: 5px;
       line-height: 1!important;
       margin-left: 10px;
       position: absolute;
       left: 173px;
       top:47px
    }
    .qud1{
       display: inline-block;
       padding: 5px;
       border:1px solid  rgba(51,119,255,1);
       text-align: center;
       color: rgba(51,119,255,1);
       border-radius: 5px;
       line-height: 1!important;
       margin-left: 10px;
       position: absolute;
       left: 270px;
       top:47px
    }
    .template >>> .el-textarea{
        width: 100%;
    }
    .template >>> select{
        margin-left: 0px;
    }
    .template >>> .el-button--primary{
        background: #155BD4;
    }
    .sk,.fk{
        display: inline-block;
        width:125px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
        text-align: center;
        cursor: pointer;
    }
    .check{
        border-bottom:3px solid rgba(51,119,255,1);
        padding-bottom: 8px;
    }
    .user{
        padding: 0 24px;
        margin-top: 8px;
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
        max-height:400px;
        position: absolute;
        top:30%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 10px;
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
        margin: 20px 0px 20px 24px;
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
       text-align: left;
       margin-top: 35px;
       border-top: 1px solid #ddd;
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
        margin-left: 40px;
    }
    .select{
        float: right;
        display: inline-block;
        height: 36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
        width: 144px;
        background: rgba(242,246,252,1);
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(61,73,102,1);
        margin: 10px 20% 0 0;
    }
   
</style>