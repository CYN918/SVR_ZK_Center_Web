<template>
    <div class="template">
        <div class='screening'>
            <span class='qdName'>渠道:</span>
            <el-select v-model="channel" placeholder="请选择" @change="selectChanged">
                <el-option
                    v-for="item in channelList"
                    :key="item.channel"
                    :label="item.channel"
                    :value="item.channel">
                </el-option>
            </el-select>
            <div class="date">
                <el-date-picker
                    v-model="date"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    @change="changeDate">
                </el-date-picker>
            </div>
            <span class='qdName'>物料ID:</span>
            <input type='text' v-model='mfid'/>
            <span class='qdName'>壁纸ID:</span>
            <input type='text' v-model='wpid'/>
            <span class="sel" @click='getData()'>查询</span>
            <span class='yjqr' @click='reset()' >取消</span>     
        </div>
        <div class='rePadding'>
            <div class="el-tag-box">
                <ul v-if="dynamicTags.length != 0">
                    <li v-for="(tag,index) in dynamicTags" :key="index" :class="{active:active==index}" @click="ckTag(index,tag)">时段{{Number(index)+1}}({{tag.stime}}~{{tag.etime}})</li>
                </ul>
                <ul v-else>
                    <li>未设置时间段</li>
                </ul>
            </div>
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
    </div>
</template>

<script>
import loading from '../../components/loading'
import commonality from '../../api/commonality';
export default {
    components: {loading},
    data() {
        return {
            qdLists:[], 
            material:3,
            date:commonality.formatDateTime(new Date()),
            dateTime:'',
            status:'',
            tableData:[],
            page:1,
            p:10,
            total:0, 
            load:false,
            change:false,
            startTime: new Date(),
            endTime:'',
            Cdialog:false,
            ids:'',
            channel:this.$route.query.channel,
            pro_type:1,
            dynamicTags: [],
            value:[],
            mfid:'',
            wpid:'',
            channelList:[],
            active:0,
            stime:'',
            etime:'',
        };
    },

    methods: {
        ckTag(index,el){
            this.active = index;
            this.stime = el.stime;
            this.etime = el.etime;
            this.getData();
        },
        selectChanged(value){
            this.channel = value;
            this.getData();
            this.init();
            this.$router.push({
                path:'./Pro_type',
                query:{
                    channel:value,
                },
                
            })
        },
        init(){
            let params = {channel:this.channel,tdate:this.date}
            this.api.superwallpaper_date_timeframe({params}).then((res)=>{
                if(res.length != 0){
                    this.stime = res[0].stime;
                    this.etime = res[0].etime;
                    this.dynamicTags = res;
                    this.getData();
                }
                
            })
        },
        getType(){
            this.api.superwallpaper_channel().then((res)=>{
                if(res.length != 0){
                    this.channelList=res;
                    // this.channel = res[0].channel;
                    this.init();
                }  
            })
        },
        handleChange(value) {
            console.log(value);
        },
        deleteRow(){
            this.Cdialog = true;
        },
        changeDate(val){
            this.page = 1;
            this.getData();
            this.init();
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
                tdate:this.date,
                stime:this.stime,
                etime:this.etime,
                channel:this.channel,
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
        
        // console.log(this.date)
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.getType();
    },
}
</script>
<style  scoped>
    .rePadding{
        margin-top:60px;
        background:#fff;
        padding-bottom:30px
    }
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
    .el-tag-box{
        margin: 0px 20px 20px 20px;
        position: relative;
        top: 10px;
        height: 50px;
    }
    .el-tag-box > ul > li{
        width: 150px;
        height: 42px;
        text-align: center;
        line-height: 42px;
        float: left;
        border: 1px solid #d3dbeb;
        border-radius: 5px;
        cursor: pointer;
    }
    input{
        width: 150px;
        border-radius: 3px;
        height: 30px!important;
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
        margin-left: 404px!important;
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