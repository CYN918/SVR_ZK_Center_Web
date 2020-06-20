<template>
    <div class="template">
        <div class="top_name">  
            <span class="top_txt" @click='fh(-1)'>杂志锁屏推送审核管理  /  子推送库列表</span><div style="width:0;height:0;"><br/></div>
            <span class="top_txts" style="width: 113px;display: inline-block;">子推送库列表</span>    
            <span class='qud'>{{this.$route.query.channel}}</span>
            <span class="userGl" style="margin: 0px 19% 0 0;" @click="opens()" v-if="total != 0">测试管理</span>
            <span class='userGl' style="margin: 0px 1% 0 0;" @click="addLd">新建子推送库</span>
        </div>
        <div class='screening'>
            <span class='qdName'>子推送库ID:</span>
            <input type='text' v-model='channelTs'/>
            <span class='qdName'>子推送库名称:</span>
            <input type='text' v-model='mfid'/>
            <span class='qdName'>策略ID:</span>
            <input type='text' v-model='wpid'/>
            <span class="selbtn" @click='getData()'>查询</span>
            <span class='yjqr' @click='reset()' >取消</span>     
        </div>
        <div style="margin-top:85px;background:#fff;padding-bottom:30px" class='rePadding'>
            <template>
                <el-table
                    ref="tab"
                    :data="tableData"
                    style="width: 100%"
                    :header-cell-style="getRowClass"
                    :cell-style="cell">
                        <el-table-column
                            label="子推送库ID">
                            <template slot-scope="scope">
                                <span>
                                    {{tableData[scope.$index].sub_plid}}
                                    <el-tooltip placement="top" class="tit_txt_2 logs tit_txts" v-if="tableData[scope.$index].is_test == 1">
                                        <div slot="content" class="text">测试中{{tableData[scope.$index].tdate}}</div>
                                        <img src="../../../public/img/tishi.png" style="vertical-align: top !important;margin-top: 3px;width: 20px;height: 20px;"/>
                                    </el-tooltip>
                                </span>
                            </template>
                        </el-table-column>  
                        <el-table-column
                            prop="name"
                            label="子推送库名称">
                        </el-table-column>
                        <el-table-column
                            prop="ctrl_id"
                            label="策略ID">        
                        </el-table-column>
                        <el-table-column 
                            prop="note"    
                            label="备注">
                        </el-table-column>
                        <el-table-column
                            prop="num" 
                            label="今日上线数"
                            :show-overflow-tooltip="true">
                        </el-table-column>  
                        <el-table-column
                            prop="created_at" 
                            label="最后上线时间">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">   
                                <el-button  type="text" size="small" @click="details(scope.row)">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <div class="block">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="page"
                        :page-sizes="[10, 50, 100, 200]"
                        :page-size="p"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        <loading v-if='load'></loading> 
        <div class="bg" v-if="tc">
            <div class='content'>
                <div class='con_tit'>
                    <span>新建子推送库</span>
                </div>
                <div class='sel'>
                   <span class='qdName'>子推送库名称：</span>
                   <input type="text" maxlength="20" placeholder="请输入子推送库名称" v-model="name"/>
                </div>
                <div>
                    <span class='qdName'>备注：</span>
                    <input type="textarea" maxlength="40" placeholder="请输入备注" show-word-limit v-model="des"/>
                </div>
                
                <div class='sel_btn'>
                    <span class="sel_btn_qd" @click='ADDlist()'>确定</span>
                    <span @click='qx()'>取消</span>
                </div>
            </div>
        </div>
        <div class='bg' v-if="Cdialog">
            <div class='compile'>
                <div class='ts'>
                    <span>测试管理</span>
                    <el-popover placement="top">
                        <div>
                            根据测试管理选择日期，将对应日期的内容标记为测试内容
                        </div>
                        <img src="../../../public/img/msg.png" style="position: relative;top: 8px;" slot="reference"/>
                    </el-popover>
                </div>
                <div class="bg_txbox">
                    <p>当前测试内容</p>
                    <div class="bg_txbox_detail" v-if="Object.keys(detailsObj).length != 0">
                        <ul>
                            <li><span>子推送库：</span><span>{{detailsObj.sub_plid}}</span></li>
                            <li><span>选择日期：</span><span>{{detailsObj.tdate}}</span></li>
                        </ul>
                    </div>
                    <div class="bg_txbox_detail" v-if="Object.keys(detailsObj).length == 0" style="text-align: center;">
                        无测试内容
                    </div>
                </div>
                <div class="bg_txbox">
                    <p>更改测试内容</p>
                    <div class='sel'>
                        <span class='qdName'>子推送库：</span>
                        <el-select v-model="valueTs" placeholder="请选择" @change="change">
                            <el-option
                            v-for="item in options"
                            :key="item.sub_plid"
                            :label="item.name"
                            :value="item.sub_plid">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="bg_txbox">
                        <div class='regulation'>
                            <div>
                                <span  class='titName' style="width: 90px;margin-right: 7px;">测试内容日期: </span>
                                <template>
                                    <el-date-picker
                                        v-model="dateTime"
                                        type="date"
                                        format="yyyy 年 MM 月 dd 日"
                                        placeholder="选择日期"
                                        value-format="yyyy-MM-dd"
                                        >
                                    </el-date-picker>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn_right" style="float:left;">
                    <span class='cx' style="margin-bottom:20px" @click='ADDc()'>确认</span>
                    <span @click='gb()'>取消</span>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
import loading from '../../components/loading'

export default {
    components: {loading},
    data() {
        return {
            plid:this.$route.query.plid,
            channel:this.$route.query.channel,
            date:(new Date()).toLocaleDateString().split('/').join('-'),
            tableData:[],
            page:1,
            p:10,
            total:0,
            pl:false,
            channelTs:'',
            mfid:'',
            wpid:'',
            load:false,
            tc:false,  
            name:'', 
            des:'',
            Cdialog:false,
            dateTime:'',
            options:[],
            valueTs:'',
            detailsObj:{},
        };
    },

    methods: {
        opens(){
            this.Cdialog = true;
            this.init();  
        },
        change(value){
            
        },
        //查询子推送库列表
        init(){
            let params = {plid:this.plid}
            this.api.pushlib_sub_list({params}).then((res)=>{
                if(res != false){
                    this.options = res;
                    res.forEach((item) => {
                        if(item.is_test == 1){
                            this.detailsObj = item;
                            this.valueTs = item.sub_plid;
                            this.dateTime = item.tdate;
                        }
                    })
                }
                  
            })
        },
        ADDc(){
            if(!this.valueTs){
                this.$message({
                    message: '请选择子推送库',
                    type: 'warning'
                });
                return false
            }
            if(!this.dateTime){
                this.$message({
                    message: '请选择时间',
                    type: 'warning'
                });
                return false
            }
            let formData =new FormData;
            formData.append('plid',this.$route.query.plid);
            formData.append('tdate',this.dateTime);
            formData.append('sub_plid',this.valueTs);
            this.api.pushlib_wptest_edit(formData).then((res)=>{
                this.Cdialog = false;
                this.getData()
            })
        },
        gb(){
            this.Cdialog = false;
        },
        reset(){
            this.channelTs = '';
            this.mfid = '';
            this.wpid = '';
        },
        selectChanged(value){
            this.channelTs = value;
            this.getData();
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
    
        getData(){
            this.load = true;
            let params={
                p:this.p,
                page:this.page,
                name:this.mfid,
                plid:this.plid,
                sub_plid:this.channelTs,
                ctrl_id:this.wpid,    
            }
            this.api.pushlib_sub_search({params}).then((res)=>{
                this.tableData=res.data;
                this.total=res.total;
                this.load = false;
            })
        },
        handleSizeChange(p) { // 每页条数切换
            this.p = p;
            this.page = 1;
            this.getData();   
        },
        handleCurrentChange(page) {//页码切换
            this.page = page;
            this.getData();
        }, 
        details(row){
            this.$router.push({
                path:"./journal_nb",
                query:{
                    channel:this.channel,
                    plid:this.plid,
                    sub_plid:row.sub_plid
                },
            })
        },
        //新建子推送库
        addLd(){
            this.tc = true;
        },
        //新建子推送库确认
        ADDlist(){
            if(!this.name){
                this.$message({message: '请输入子推送库名称',type: 'warning'});
                return false
            }
            if(!this.des){
                this.$message({message: '请输入备注',type: 'warning'});
                return false
            }
            let formData =new FormData;
            formData.append('plid',this.plid);
            formData.append('name',this.name);
            formData.append('note',this.des);
            this.api.pushlib_sub_add(formData).then((res)=>{
                this.tc = false;
                this.getData()
            })

        },
        //新建子推送库取消
        qx(){
            this.tc = false;
            this.name = '';
            this.des = '';
        },
        fh(index){
            this.$router.go(index)
        },
            
    },

    created() {
    

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        
        this.getData()
    },

}
</script>
<style  scoped>
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
       
    }
    .compile{
        position: absolute;
        top:50%;
        left:50%;
        width:550px;
        min-height: 200px;
        max-height: 800px;
        overflow-y: auto;
        background: #fff;
        transform: translate(-50%,-50%);
        border-radius: 5px;
    }
    .ts{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
    }
    .ts span{
        font-size: 14px;
        font-weight: bold;
        margin-left: 24px;
        display: inline-block;
        line-height: 50px;

    }
    .regulation{
        padding: 0 24px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
    }
    .el-input{
        width: 180px;
    }
    .regulation>div{
        margin-bottom: 16px;
    }
    .titName{
        display: inline-block;
        width:140px;
        text-align: right;
    }
    .btn_right{
        display: inline-block;
        float:right;
    }
    .btn_right span{
        display: inline-block;
        cursor: pointer;
        width: 90px;
        height: 36px;
        border: 1px solid #ddd;
        border-radius: 3px;
        line-height: 36px;
        text-align: center;
        margin-left: 24px;
            
    }
    .top_name{
        height: 100px;
        border: 0;
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
    .screening{
        position: relative;
        width: 100%;
        height: 60px;
        top:75px;
        background: #fff
    }
    .date{
        margin:10px 12px 0 24px;
        display: inline-block;
    }
    .btn_sx{
        display: inline-block;
        float:right;
        margin: 10px 20% 0 0 
    }
    .cx{
        display: inline-block;
        height: 36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
        width: 68px;
        background: rgba(51,119,255,1);
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255,255,255,1);
        margin-right: 20px;
    }
    .cz,.dc{
            display: inline-block;
        height: 36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
            width: 144px;
        background: rgba(242,246,252,1);
        border: 1px solid rgba(211,219,235,1);
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(61,73,102,1);
    }
    .dc{
        width: 68px!important;
        margin-left: 20px
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
    .top_txt{
        cursor: pointer; margin-left: 24px;
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153,153,153,1);
        line-height: 20px!important;
        margin-top: 15px
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
    .box{
        display: block;
        width: 100%;
        height: 100%;  
    }
    .box > input{
        display: none;
        width: 80px;
        height: 25px;
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
    .qdName{
        display: inline-block;
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(50,50,50,1);
        margin-left: 40px;
        margin-right: 10px;
    }
    select{
        margin-left: 20px;
        width: 200px;
        height: 36px;
        border-radius: 5px;
    }
    input{
        width: 148px;
        border-radius: 3px;
        height: 38px!important;
        padding-left: 3px!important;
        border: 1px solid #d3dbeb!important;
    }
    .selbtn{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        border-radius: 5px;
        color: #f5f6fa;
        background: #37f;
        border: 0;
        text-align: center;
        width: 90px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        margin: 12px  0px 12px 540px;
    }
    .yjqr{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        border-radius: 5px;
        color: #3d3d3d;
        border: 1px solid #ddd;
        background: transparent;
        text-align: center;
        margin-left: 15px!important;
        width: 90px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
    }
    .bg_txbox{
        margin: 0 auto;     
    }
    .bg_txbox > p{
        margin: 0 auto;
        width: 95%;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        font-weight: bold;
        border-bottom: 1px solid #ddd;
        margin-bottom: 15px;
    }
    .bg_txbox_detail{
        margin: 0 auto;
        width: 95%;
        min-height: 65px;
    }
    .bg_txbox_detail > ul > li{
        height: 30px;
        line-height: 30px;
        margin-top: 15px;
    }
   
</style>