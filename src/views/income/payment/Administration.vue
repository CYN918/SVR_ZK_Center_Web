<template>
    <div>
        <div class="top">
            <div class="top_tit">
                <span>付款结算</span>
            </div>
            <div>
                <div class="AD_time">
                    <el-date-picker
                            v-model="value"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="seach">
                    <img src="../../../../public/img/ss.png">
                    <input type="text" placeholder="搜索结算方名称" v-model="search">
                </div>
                <span class="cx" @click="getDataList()">查询</span>
                <span class="clear" @click="establish">新建结算</span>
                <span class="sf" @click="jump()">收款结算方管理</span>
            </div>
        </div>
        <div class="table">
            <div>
                <template>
                    <el-table
                            :data="tableData"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                    >
                        <el-table-column
                                prop="id"
                                label="结算单ID">
                        </el-table-column>
                        <el-table-column
                                prop="creator"
                                label="结算方名称">
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="状态">
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="结算时间段">
                            <template slot-scope="scope">
                                <span>{{tableData[scope.$index].check.tstart}}--</span>
                                <span>{{tableData[scope.$index].check.tend}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="check.expect_amount"
                                label="预计结算金额">
                        </el-table-column>
                        <el-table-column
                                prop="check.real_amount"
                                label="实际结算金额">
                        </el-table-column>
                        <el-table-column
                                prop="remit"
                                label="实际到账金额">
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <el-button  type="text" size="small" @click="details()">查看详情</el-button>
                                <el-button  type="text" size="small">作废</el-button>
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
                    :current-page.sync="page"
                    :page-size="p"
                    layout="prev, pager, next,total, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "administration",
        data(){
            return{
                value:[(new Date()).toLocaleDateString().split('/').join('-'),(new Date()).toLocaleDateString().split('/').join('-')],
                page:1,
                p:10,
                total:0,
                tableData:[{pv:0}],
                is_receiver:0,
                search:"",
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgb(246, 245, 245,1);color:rgba(30,30,30,1);text-align:center;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },

            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:#000;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            jump(){
                this.$router.push({
                    path:"./ReceiverManagement"
                })
            },
            establish(){
                this.$router.push({
                    path:"./establish"
                })
            },
            details(){
                this.$router.push({
                    path:"./DetailsOfCollection"
                })
            },
            getData(){
                let params={search:this.search,p:this.p,page:this.page,is_receiver:this.is_receiver}
                this.api.settle_prepayment_search({params}).then((res)=>{
                    this.tableData=res.data;
                    this.total=res.total;
                })
            },
        }
    }
</script>

<style scoped>
.top{
    width: 100%;
    height:120px;
    border-top: 1px solid #ededed;
    background: white;
    -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
    position: fixed;
    left: 256px;
    top: 63px;
    z-index: 99;
}
    .top_tit span{
        display: inline-block;
        font-size:18px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin:19px 0 20px 24px;
    }
    .AD_time{
        display: inline-block;
        margin: 0 24px 0 24px;
    }
    .AD_time .filtrate .timesDate .content_table .time .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width:272px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .seach{
        display: inline-block;
        margin-right: 24px;
        position:relative;
    }
    .seach img{
        width: 24px;
        height: 24px;
        position: absolute;
        left: 3px;
        top:8px;
    }
    .seach input{
        width:170px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        padding-left: 30px;
        border:1px solid rgba(211,219,235,1);
    }
    .cx,.clear,.sf{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-right: 24px;
    }
    .clear{
        width:96px!important;
    }
    .sf{
        width:138px!important;
    }
    .table{
        margin-top: 204px;
        background: #fff;
    }

</style>