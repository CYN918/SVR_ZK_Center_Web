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
                           format="yyyy-MM-dd"
                           value-format="yyyy-MM-dd">
                   </el-date-picker>
               </div>
               <span class="cx" @click="getData()">查询</span>
               <span class="cz" @click="remove()">重置</span>
               <span class="dc">导出数据</span>
           </div>
           <div id="flowChart">

           </div>
            <div style="padding:0 24px">
                <template>
                    <el-table
                            :data="tableData"
                            header-align="center"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            style="width: 100%;color:#000">
                        <el-table-column
                                label="日期" prop="create_time"

                        >
                        </el-table-column>
                        <el-table-column
                                label="总成本" prop="cost_total"
                                sortable
                        >
                        </el-table-column>
                        <el-table-column
                                label="非分成成本" prop="cost_buyout"
                                sortable
                        >

                        </el-table-column>
                        <!--<el-table-column-->
                                <!--label="分成成本" prop="status"-->
                        <!--&gt;-->

                        <!--</el-table-column>-->
                        <el-table-column
                                label="其他成本" prop="cost_sharing"
                                sortable
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
    import canvas from '../../api/commonality'
    export default {
        name: "cost_management",
        data(){
            return{
                tableData:[],
                time:[(new Date((new Date()).getTime() - 24*60*60*1000)).toLocaleDateString().split('/').join('-'),(new Date()).toLocaleDateString().split('/').join('-')],
                p:10,
                page:1,
                total:0
            }
        },
        mounted(){this.Chart();this.getData()},
        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(247,249,252,1);color:rgba(31,46,77,1);text-align:left;font-size:14px;font-weight:500;font-family:PingFang-SC-Medium;height:56px'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:left;color:rgba(61,73,102,1);font-size:14px;font-weight:400;font-family:PingFangSC-Regula;'
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getData()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getData()
            },
            divided(){
                this.$router.push({
                    path:'/income/divided_details'
                })
            },
            Chart(){
                canvas.chart()
            },
            getData(){
                let params = {tstart:this.time[0],tend:this.time[1],p:this.p,page:this.page};
                this.api.report_cost_total({params}).then((res)=>{
                    this.tableData=res.data;
                    this.total=res.total;
                })
            },
            remove(){
                this.time=''
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
    .cx{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
        line-height:36px;
        text-align: center;
        cursor: pointer;
        margin:0 24px;
    }
    .cz{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(232,234,237,1);
        cursor: pointer;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(31,46,77,1);
        line-height:36px;
        text-align: center;
    }
    #flowChart{
        width: 100%;
        height:300px;
        margin-bottom: 30px;
    }
</style>