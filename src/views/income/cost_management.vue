<template>
   <div>
       <div class="top_name">
           <span class="top_txt">收益管理\设计师成本管理</span>
           <div class="title_left">
               <span>设计师成本管理</span>
           </div>
       </div>
       <div class="content">
           <div>
               <div class="timesDate">
                   <el-date-picker
                           v-model="time"
                           type="daterange"
                           range-separator="至"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期"
                           format="yyyy 年 MM 月 dd 日"
                           value-format="yyyy-MM-dd ">
                   </el-date-picker>
               </div>
               <span class="dc">导出数据</span>
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
                                label="日期" prop="demand_type"
                        >
                        </el-table-column>
                        <el-table-column
                                label="总成本" prop="did"
                        >
                        </el-table-column>
                        <el-table-column
                                label="买断金额" prop="status_name"
                        >
                        </el-table-column>
                        <el-table-column
                                label="分成金额" prop="status"
                        >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="props">
                                <el-button type="text">查看买断详情</el-button>
                                <el-button type="text" @click="divided()">查看分成详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
       </div>
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
</template>

<script>
    export default {
        name: "cost_management",
        data(){
            return{
                tableData:[{status:1}],
                time:[],
                p:10,
                page:1,
                total:0
            }
        },
        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(247,249,252,1);color:rgba(31,46,77,1);text-align:center;font-size:14px;font-weight:500;font-family:PingFang-SC-Medium;height:56px'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:rgba(61,73,102,1);font-size:14px;font-weight:400;font-family:PingFangSC-Regula;'
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
            },
            divided(){
                this.$router.push({
                    path:'/income/divided_details'
                })
            }
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
        margin-top: 199px!important;
    }
    .timesDate{
        display: inline-block;
        margin:24px 0 28px 24px!important;
    }
    .dc{
        display: inline-block;
        width:96px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        float: right;
        margin: 24px 24px 0 0;
    }
</style>