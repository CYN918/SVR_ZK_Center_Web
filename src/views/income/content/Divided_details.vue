<template>
   <div>
        <div class="top_name">
             <span class="top_txt">主题付款  /   </span>
             <span class="top_txt">分成管理   /   </span>
              <span class="top_txt">分成详情</span>
            <div class="title_left">
                <span>分成详情</span>
            </div>
        </div>
        <div class='content'>
            <div>
                <span class='fc_statuc'>设计师ID</span>
                <input type="text" placeholder="请输入">
                <span class='fc_statuc'>结算放</span>
                <select>
                    <option value=""></option>
                </select>
                <div class="btn_right">
                    <span class='cx'>查询</span>
                    <span>重置</span>
                    <span>确认金额</span>
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
                                label="设计师ID" prop="time"
                               >
                        </el-table-column>
                        <el-table-column
                                label="结算金额" prop=""
                                >
                        </el-table-column>
                        <el-table-column
                                label="收益加成" prop=""
                                >
                            <template slot-scope="scope">
                                <span></span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                sortable
                                label="加成金额" prop=""
                                >
                        </el-table-column>
                         <el-table-column
                                sortable
                                label="抵消预约金" prop=""
                                >
                        </el-table-column>
                          <el-table-column
                                sortable
                                label="付款金额" prop=""
                                >
                        </el-table-column>
                          <el-table-column
                                sortable
                                label="确认时间" prop=""
                                >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="props">
                                <el-button type="text" >查看详情</el-button>
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
   </div>
</template>

<script>
export default {
            data(){
                return{
                    value1:"",
                    p:10,
                    page:1,
                    total:0,
                    tableData:[{time:2020}]
                }
            },
            methods:{
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
                dr(){
                    this.$router.push({
                        path:"./exports"
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
        margin:0 0 24px 24px;

            
    }
    .cx{
        color: #fff!important;
        border:0!important;
        background: #3377ff!important;
    }
    .fc_statuc{
        display: inline-block;
        margin:24px  15px 24px 24px;

    }
    select{
        width: 200px;
        height: 36px;

    }
    input{
        width: 190px;
        height: 30px;
        padding-left: 10px;
    }
</style>