<template>
    <div class="template">
        <div class='screening'>
            <span class='qdName'>渠道:</span>
            <el-select v-model="channelTs" placeholder="请选择" @change="selectChanged">
                <el-option
                    v-for="item in channelList"
                    :key="item.channel"
                    :label="item.channel"
                    :value="item.channel">
                </el-option>
            </el-select>
            <span class='qdName'>物料ID:</span>
            <input type='text' v-model='mfid'/>
            <span class='qdName'>壁纸ID:</span>
            <input type='text' v-model='wpid'/>
            <span class="sel" @click='getData()'>查询</span>
            <span class='yjqr' @click='reset()' >取消</span>
            <span class='userGl' v-if="new Date(this.date)>=new Date(new Date().getTime() - 24*60*60*1000)" @click='addWl()'>选择高定壁纸</span>     
        </div>
        <div class='rePadding'>
            <template>
                <el-table
                    ref="tab"
                    :data="tableData"
                    style="width: 100%"
                    :header-cell-style="getRowClass"
                    :cell-style="cell"
                    @selection-change="handleSelectionChange"
                    >
                    <el-table-column
                        prop="mfid"
                        label="物料ID">      
                    </el-table-column>
                    <el-table-column
                        prop="count"
                        label="杂志锁屏"
                        >
                        <template slot-scope="scope">
                            <img :src='tableData[scope.$index].prev_uri' style="max-width:80px;max-height: 80px;cursor: pointer"  preview="1" />
                        </template>
                    </el-table-column>
                    
                    <el-table-column 
                        label="壁纸ID">
                        <template slot-scope="scope">
                            <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                                <div slot="content">
                                    <div>{{tableData[scope.$index].wpid}}</div>
                                </div>
                                <div>{{tableData[scope.$index].wpid}}</div>                         
                            </el-tooltip>
                        </template>      
                    </el-table-column>
                    <el-table-column 
                        label="时段">
                        <template slot-scope="scope">
                            <el-button @click="jump(tableData[scope.$index].id)" type="text" size="small">查看详情</el-button>
                        </template>      
                    </el-table-column>
                    
                    <el-table-column
                        label="操作"   
                        v-if="new Date(this.date)>=new Date(new Date().getTime() - 24*60*60*1000)">
                        <template slot-scope="scope">
                            <el-button @click="auidSc(tableData[scope.$index].id)" type="text" size="small">管理时段</el-button>
                            <el-button  type="text" size="small" @click="deleteRow(scope.$index, scope.row)">移除</el-button>
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
        <div class='bg' v-if="change" style="z-index: 1000!important;">
            <div class='compile'>
                <div class='ts'>
                    <span>添加时段</span>
                </div>
                <div>
                    <div class='regulation'>
                        <div>
                            <span  class='titName'>选择日期: </span>
                            <template>
                                <el-date-picker
                                    v-model="date"
                                    type="date"
                                    format="yyyy 年 MM 月 dd 日"
                                    placeholder="选择日期"
                                    value-format="yyyy-MM-dd"
                                    :picker-options="pickerOptions0"
                                    @change="changeDate">
                                </el-date-picker>
                            </template>
                        </div>
                        <div>
                            <span  class='titName'>开始时间: </span>
                            <template>
                                <el-time-picker
                                    v-model="startTime"
                                    format='HH:mm'
                                    value-format='HH:mm'
                                    :picker-options="{
                                    selectableRange:  '00:00:00 - 23:59:59'
                                    }"
                                    placeholder="任意时间点">
                                </el-time-picker>
                            </template>
                        </div>
                        <div>
                            <span  class='titName'>结束时间: </span>
                            <template>
                                <el-time-picker
                                    v-model="endTime"
                                    format='HH:mm'
                                    value-format='HH:mm'
                                    :picker-options="{
                                    selectableRange:  '00:00:00 - 23:59:59'
                                    }"
                                    placeholder="任意时间点">
                                </el-time-picker>
                            </template>
                        </div>

                    </div>
                </div>
                <div class="btn_right" style="float:left;">
                    <span class='cx' style="margin-bottom:20px" @click='bj()'>确认</span>
                    <span @click='HeidChange'>取消</span>
                </div>
            </div>
        </div>

        <div class='bg' v-if="Sd_detail">
            <div class='compile'>
                <div class='ts'>
                    <span>时段详情</span>
                    <span style="float: right;margin-right: 25px;font-size: 25px;cursor: pointer;" @click="Sdel"><i class="el-icon-close"></i></span>
                </div>
                <div>
                    <div class='regulation'>
                        <template>
                            <el-table
                                :data="dataList"
                                border
                                style="width: 100%">
                                <el-table-column
                                    prop="tdate"
                                    label="日期"
                                    align="center"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="stime"
                                    label="开始时间"
                                    align="center"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="etime"
                                    align="center"
                                    label="截止时间">
                                </el-table-column>
                            </el-table>
                        </template>
                        <div class="blocks" style="text-align: right;">
                            <el-pagination
                                @size-change="handleSizeChange1"
                                @current-change="handleCurrentChange1"
                                :current-page.sync="page"
                                :page-sizes="[10, 50, 100, 200]"
                                :page-size="p"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total1">
                            </el-pagination>
                        </div>  
                    </div>
                </div>
                <div class="btn_right" style="float:left;margin-bottom: 30px;">
                    
                </div>
            </div>
        </div>

        <div class='bg' v-if="Sd_audit">
            <div class='compile' style="width: 660px;">
                <div class='ts'>
                    <span>管理时段</span>
                    <span @click="addPeriod()" style="float: right;margin-right: 25px;cursor: pointer;color:#3377ff;">添加时段</span>
                </div>
                <div>
                    <div class='regulation'>
                        <template>
                            <el-table
                                :data="dataList"
                                border
                                style="width: 100%">
                                <el-table-column
                                    prop="tdate"
                                    label="日期"
                                    align="center"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="stime"
                                    label="开始时间"
                                    align="center"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="etime"
                                    align="center"
                                    label="截止时间">
                                </el-table-column>
                                <el-table-column
                                    fixed="right"
                                    align="center"
                                    label="操作"
                                    width="100">
                                    <template slot-scope="scope">
                                        <el-button v-if="new Date(dataList[scope.$index].tdate)>=new Date(new Date().getTime() - 24*60*60*1000)"  @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                        <div class="blocks" style="text-align: right;">
                            <el-pagination
                                @size-change="handleSizeChange2"
                                @current-change="handleCurrentChange2"
                                :current-page.sync="page"
                                :page-sizes="[10, 50, 100, 200]"
                                :page-size="p"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total2">
                            </el-pagination>
                        </div>
                    </div>
                </div>
                <div class="btn_right" style="float:left;">
                    <span class='cx' style="margin-bottom:20px" @click='audit_add()'>确认</span>
                    <span @click='audit_gb()'>取消</span>
                </div>
            </div>
        </div>

        <div class='bg' v-if="del_sd">
            <div class='compile' style="width: 380px;">
                <div class='ts'>
                    <span>删除时段</span>
                </div>
                <div>
                    <div class='regulation'>
                        <div>删除后时段内的数据也将清空</div>
                    </div>
                </div>
                <div class="btn_right" style="float:left;">
                    <span class='cx' @click='del_ADDc()'>确认</span>
                    <span @click='del_gb()'>取消</span>
                </div>
            </div>
        </div>

        <div class='bg' v-if="Cdialog">
            <div class='compile' style="width: 380px;">
                <div class='ts'>
                    <span>移除</span>
                </div>
                <div>
                    <div class='regulation'>
                        <div>移除后，在该时段内壁纸投放的内容不强制为高定内容</div>
                    </div>
                </div>
                <div class="btn_right" style="float:left;">
                    <span class='cx' @click='ADDc()'>确认</span>
                    <span @click='gb()'>取消</span>
                </div>
            </div>
        </div>
        <loading v-if='load'></loading>
        <ADDWL v-if="ADDwl" @listenToChildEvent="listenToChildEvent" :date="date" :channel='channel' :material="material" :ids='ids' :video="1" :gdsrc="gdsrc"></ADDWL>
    </div>
</template>

<script>
import loading from '../../components/loading'
import ADDWL from './Jounrnal_select'
import commonality from '../../api/commonality';
export default {
    components: {ADDWL,loading},
    props:['channel','channelList'],
    data() {
        return {
            qdLists:[], 
            material:3,
            date:(new Date()).toLocaleDateString().split('/').join('-'),
            dateTime:'',
            status:'',
            tableData:[],
            page:1,
            p:10,
            total:0, 
            ADDwl:false,
            load:false,
            change:false,
            startTime: '',
            endTime:'',
            Cdialog:false,
            ids:'',
            gdsrc:1,
            value:[],
            mfid:'',
            wpid:'',
            Sd_detail:false,
            Sd_audit:false,
            dataList:[],
            del_sd:false,
            total1:0,
            total2:0,
            auditId:'',
            delObj:{},
            CdialogObj:{},
            detailId:'',
            channelTs:this.channel,
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的
                }
            },
        };
    },

    methods: {
        selectChanged(value){
            this.channelTs = value;
            this.getData();
            this.$router.push({
                path:'./Pro_type',
                query:{
                    channel:value,
                },
                
            })
        },
        Sdel(){
            this.Sd_detail = false;
        },
        audit_gb(){
            this.Sd_audit = false;
        },
        audit_add(){
            this.Sd_audit = false;
            this.getData();
        },
        addPeriod(){
            this.change = true;
        },
        handleClick(row){
            this.delObj = row;
            this.del_sd = true;
        },
        del_ADDc(){
            let formData =new FormData;
            formData.append('id',this.delObj.id);
            this.api.superwallpaper_timeframe_del(formData).then((res)=>{
                this.del_sd = false;
                this.auidSc(this.auditId)
            })
        },
        del_gb(){
            this.del_sd = false;
        },
        
        jump(id){
            this.Sd_detail = true;
            this.detailId = id;
            let params = {id:id,p:this.p,page:this.page}
            this.api.superwallpaper_timeframe({params}).then((res)=>{
                if(res == false){return}
                this.dataList = res.data;
                this.total1 = res.total;
            })
        },
        handleSizeChange1(p) { // 每页条数切换
            this.p = p;
            this.page = 1;
            this.jump(this.detailId);    
        },
        handleCurrentChange1(page) {//页码切换
            this.page = page;
            this.jump(this.detailId); 
        }, 
        auidSc(id){
            this.Sd_audit = true;
            this.auditId = id;
            let params = {id:id,p:this.p,page:this.page}
            this.api.superwallpaper_timeframe({params}).then((res)=>{
                if(res == false){return}
                this.dataList = res.data;
                this.total2 = res.total;
            })
        },
        handleSizeChange2(p) { // 每页条数切换
            this.p = p;
            this.page = 1;
            this.auidSc(this.auditId);    
        },
        handleCurrentChange2(page) {//页码切换
            this.page = page;
            this.auidSc(this.auditId); 
        }, 
        reset(){
            this.channel = '';
            this.wpid = '';
            this.mfid = '';
        },
        getShow(){
            this.change = true;
        },
        HeidChange(){
            this.change=false
        },
        bj(){
            let state = commonality.compareTime(this.startTime,this.endTime);
            if(state ==false){
                this.$message({message: '结束时间不能小于或等于开始时间',type: 'warning'});
                return false
            }
            let formData =new FormData;
            formData.append('id',this.auditId);
            formData.append('tdate',this.date);
            formData.append('stime',this.startTime);
            formData.append('etime',this.endTime);
            this.api.superwallpaper_timeframe_add(formData).then((res)=>{
                this.change = false;
                this.auidSc(this.auditId)
            })
            
        },
        ADDc(){
            let formData =new FormData;
            formData.append('id',this.CdialogObj.id);
            this.api.superwallpaper_del(formData).then((res)=>{
                this.Cdialog = false;
                this.getData()
            })
        },
        gb(){
            this.Cdialog = false;
        },
        handleChange(value) {
            console.log(value);
        },
        deleteRow(index,row){
            this.Cdialog = true;
            this.CdialogObj = row;
        },
        changeDate(val){
            this.page = 1;
            this.getData();
        },
        addWl(){
            this.ADDwl = true;
        },
        heidWL(){
            this.ADDwl = false;
        },
        listenToChildEvent(id,date){
            let formData =new FormData;
            formData.append('channel',this.channel);
            formData.append('bind_mfid',JSON.stringify(id));
            this.api.superwallpaper_add(formData).then((res)=>{
                this.heidWL();
                this.getData()
            })
        },
        getRowClass({row, column, rowIndex}) {
            if(rowIndex === 0) {
                return 'background:#f7f9fc;color:#1F2E4D;font-size:14px;font-weight:bold;height:48px;font-family:PingFang-SC-Regular;padding:20px 0px 20px 14px'
            }else{
                return ''
            }
        },
        cell({row, column, rowIndex, columnIndex}){
            return 'padding:15px 14px;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
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
        handleSelectionChange(val) {
            this.value= val;
        },   
        getData(){
            this.load = true;
            let params={
                p:this.p,
                page:this.page,
                channel:this.channelTs,
                wpid:this.wpid,
                mfid:this.mfid,
            }
            this.api.superwallpaper_search({params}).then((res)=>{
                this.tableData=res.data;
                this.total=res.total;
                this.load = false;
            })
        },           
    },
    created() {
        
    
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.getData();
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
    .rePadding{
        margin-top:60px;
        background:#fff;
        padding-bottom:30px
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
        width:60px;
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
        margin: 11px;
    }
    .screening{
        position: relative;
        width: 100%;
        height: 60px;
        top:55px;
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
        margin: 12px 0;
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
    input{
        width: 148px;
        border-radius: 3px;
        height: 38px!important;
        padding-left: 3px!important;
        border: 1px solid #d3dbeb!important;
    }
    .sel{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        border-radius: 5px;
        color: #f5f6fa;
        background: #37f;
        border: 0;
        text-align: center;
        margin-left: 485px!important;
        width: 90px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
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
   
</style>