<template>
   <div>
        <div class="top_name">
            <span class="top_txt" @click='fh(-1)'>素材付款&nbsp;/</span>
            <span class="top_txt" style="margin-left:0" @click='fh(-2)'>&nbsp;分成管理&nbsp;/</span>
            <span class="top_txt" style="margin-left:0" @click='fh(-1)'>&nbsp;数据管理&nbsp;/</span>
            <span class="top_txt" style="margin-left:0">操作记录</span>
            <div class="title_left">
                <span>操作记录</span>
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
                    <span style="margin:0 16px 0 24px">渠道</span>
                    <input type="text" v-model="channel" placeholder="请输入">
                    <span style="margin:0 16px 0 24px">处理人</span>
                    <input type="text" v-model="creator">
                </div>
                <div class="btn_right">
                    <span class='cx' @click='getDataList()'>查询</span>
                    <span @click='cz()'>重置</span>
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
                                label="修改前数据有效率" prop="complete_before"
                                >
                           
                        </el-table-column>
                        <el-table-column
                                label="修改后数据有效率" prop="complete_after"
                                >
                           
                        </el-table-column>
                         <el-table-column
                                label="更新时间" prop="created_at"
                                >
                           
                        </el-table-column>
                        <el-table-column
                                label="处理人" prop="creator"
                                >
                           
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
                    tableData:[{time:2020}],
                    channel:"",
                    creator:""
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
                    this.channel="",
                    this.creator=""
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
              
                getDataList(){
                    let params={p:this.p,page:this.page,tdate_start:this.tdate[0],tdate_end:this.tdate[1],channel:this.channel,creator:this.creator}
                    this.api.ds_income_lock_screen_detail_operate_logs({params}).then((res)=>{
                        this.total=res.total;
                        this.tableData=res.data; 
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
   
</style>