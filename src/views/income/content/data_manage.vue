<template>
   <div>
        <div class="top_name">
            <span class="top_txt" @click='fh(-2)'>杂志锁屏付款&nbsp;/</span>
            <span class="top_txt" style="margin-left:0" @click='fh(-1)'>&nbsp;分成管理&nbsp;/</span>
            <span class="top_txt" style="margin-left:0">数据管理</span>
            <div class="title_left">
                <span>数据管理</span>
            </div>
        </div>
        <div class='content'>
            <div>
                 <div class='times'>
                    <el-date-picker
                        class='time_length'
                        v-model="tdate"
                        type="monthrange"
                        range-separator="至"
                        start-placeholder="开始月份"
                        value-format="yyyy-MM"
                        end-placeholder="结束月份">
                    </el-date-picker>
                    <span style="margin:0 16px 0 24px">渠道ID</span>
                    <input type="text" v-model="channel" placeholder="请输入">
                    <!-- <select name="" id="">
                        <option value="">全部</option>
                    </select> -->
                </div>
                <div class="btn_right">
                    <span class='cx' @click='getDataList()'>查询</span>
                    <span @click='cz()'>重置</span>
                    <span @click='czRecord()'>操作记录</span>
                </div>      
            </div>
           <div>
                 <template>
                    <el-table
                            :data="tableData"
                            header-align="center"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            style="width: 100%;color:#000">
                        <el-table-column
                                label="日期" prop="tdate"
                               >
                        </el-table-column>
                     
                        <el-table-column
                                label="渠道" prop="channel"
                                >
                           
                        </el-table-column>
                        <el-table-column
                                label="数据有效率" prop="complete"
                                >
                            <template slot-scope="scope">
                                <span>{{tableData[scope.$index].complete+'%'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="点击量" prop="click"
                                >
                           
                        </el-table-column>
                         <el-table-column
                                label="曝光量" prop="pv"
                                >
                           
                        </el-table-column>
                        <el-table-column
                                label="分成金额" prop="income"
                                >
                            <template slot-scope="scope">
                                <span>{{"￥"+tableData[scope.$index].income}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width='150'>
                            <template slot-scope="props" >
                                <el-button type="text" @click='bj(tableData[props.$index].tdate,tableData[props.$index].channel,tableData[props.$index].complete)'>编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="p"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                 </div>
           </div>
        </div>
        <div class='bg' v-if="boxsSize">
            <div class='redact'>
                 <div class='ts'>
                    <span>编辑</span>
                </div>
                <div class='tits'>
                    <span>日期：</span>
                    <span>{{time}}</span>
                </div>
                <div class='tits'>
                    <span>渠道：</span>
                    <span>{{qd}}</span>
                </div>
                <div class='tits'>
                    <span>数据有效率：</span>
                    <input type="number" v-model="complete">%
                </div>
                <div class='tits'>
                    <span>分成金额：</span>
                    <span>{{money}}</span>
                </div>
                <div class='btns'>
                    <span class='qr' @click='Edit()'>确认</span>
                    <span @click='qx()'>取消</span>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
export default {
            data(){
                return{
                    tdate:[],
                    p:10,
                    page:1,
                    total:0,
                    tableData:[],
                    is_confirmed:"",
                    boxsSize:false,
                    channel:"",
                    money:"",
                    complete:"",
                    time:"",
                    qd:"",
                }
            },
            mounted(){
                this.getDataList()
            },
            methods:{
                 fh(index){
                    this.$router.go(index)
                },
                cz(){
                    this.tdate='';
                    this.channel='';
                },
                getRowClass({row, column, rowIndex}) {
                    if (rowIndex === 0) {
                        return 'background:#f7f9fc;color:#1F2E4D;font-size:14px;font-weight:bold;height:48px;font-family:PingFang-SC-Regular;padding:20px 0px 20px 14px'
                    } else {
                        return ''
                    }
                },
                cell({row, column, rowIndex, columnIndex}){
                    return 'padding:15px 14px;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
                },
                handleSizeChange(p) { // 每页条数切换
                    this.p = p;
                    this.getDataList()
                },
                handleCurrentChange(page) {//页码切换
                    this.page = page;
                    this.getDataList()
                },
                bj(tdate,channel,complete){
                   this.boxsSize=true,
                   this.time=tdate;
                   this.qd=channel;
                   this.complete=complete;
                   this.getMoney(tdate,channel,complete)
                },
                Edit(){
                    let formData = new FormData;
                    formData.append('tdate',this.time)
                    formData.append('channel',this.qd);
                    formData.append('complete',this.complete)
                    this.api.ds_income_lock_screen_edit(formData).then((res)=>{
                        if(res!=false){
                            this. getDataList();
                            this.complete=''
                            this.qx();
                        }
                    })
                },
                qx(){
                    this.boxsSize=false
                },
                getDataList(){
                    let params={tdate_start:this.tdate[0],tdate_end:this.tdate[1],channel:this.channel}
                    this.api.ds_income_lock_screen_list({params}).then((res)=>{
                        this.total=res.total;
                        this.tableData=res.data; 
                    })
                },
                getMoney(tdate,channel,complet){
                    let params={tdate:tdate,channel:channel,complete:complet}
                    this.api.ds_income_lock_screen_sharing_income({params}).then((res)=>{
                        this.money=res.income
                    })
                },
                czRecord(){
                    this.$router.push({
                        path:"./cz_record"
                    })
                },
            },
}
</script>

<style scoped>
    .top_name{
         height:112px!important;
        background:rgba(255,255,255,1);
    }
    .title_left span{
        display: inline-block;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
        margin-left: 24px;
        text-align: right;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
        cursor: pointer;
    }
    .content{
        margin-top: 199px;
    }  
    .times{
        display: inline-block;
        margin: 24px;
    }
    .times .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width:200px!important
    }
    
    .btn_right{
        display: inline-block;
        float:right;
        margin: 24px 24px 0 0;
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
    .cx{
        color: #fff!important;
        border:0!important;
        background: #3377ff!important;
    }
    .fc_statuc{
        display: inline-block;
        margin-right: 15px;

    }
    select{
        width: 200px;
        height: 36px;

    }
    input{
        width: 190px;
        height: 32px;
        padding-left:10px ;
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
    .redact{
        width: 500px;
        height: 350px;
        background: #fff;
        border-radius: 5px;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
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
    .tits span{
        display: inline-block;
        width: 120px;
        text-align: left;
        margin: 24px 0 0 24px;
        font-size: 14px;
    }
    .btns span{
        display: inline-block;
        width: 90px;
        height: 36px;
        margin:24px 0 24px  24px;
        cursor: pointer;
        border:1px solid #ddd;
        line-height: 36px;
        text-align: center;
        border-radius: 3px;
    }
    .qr{
        background: #3377ff;
        color:#fff;
        border:0!important;
        margin-left: 60px!important;
    }
</style>