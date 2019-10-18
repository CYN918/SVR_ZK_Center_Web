<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh('-2')">付款结算 &nbsp;/</span>
                <span class="log_url" @click="fh('-1')">付款结算详情 &nbsp;/</span>
                <span class="new_url">&nbsp;变更记录</span>
            </div>
            <div class="title_left">
                <span>变更记录</span>
            </div>
            <div>
                <div class="fillTime">
                    <el-date-picker
                            v-model="time"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy-mm-dd"
                            value-format="yyyy-mm-dd"
                    >
                    </el-date-picker>
                </div>
                <div class="seach">
                    <img src="../../../../public/img/ss.png">
                    <input type="text" placeholder="搜索结算方名称">
                </div>
                <span class="cx">查询</span>
                <span class="dc">导出</span>
            </div>
        </div>
        <div class="table">
            <template>
                <el-table
                        :data="tableData"
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
                >
                    <el-table-column
                            prop="sdk_id"
                            label="更新时间">
                    </el-table-column>
                    <el-table-column
                            prop="pv"
                            label="操作人">
                    </el-table-column>
                    <el-table-column
                            label="更新字段">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button  type="text" size="small" @click="ck">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
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
        name: "change-record",
        data(){
            return{
                time:'',
                page:10,
                p:1,total:0,
                tableData:[{pv:0}]
            }
        },
        methods:{
            fh(num){
                this.$router.go(num)
            },
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
            ck(){
                this.$router.push({
                    path:"./Record"
                })
            }
        }
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:152px;
        border-top: 1px solid #ededed;
        background: white;
        -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
        position: fixed;
        left: 256px;
        top: 63px;
        z-index: 99;
    }
    .new_url{color: rgba(61,73,102,1)!important;}

    .title_left span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-left: 24px;
        margin-top: 15px;
        cursor: pointer;
    }
    .seach{
        display: inline-block;
        margin:0px 24px;
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
        height:32px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        padding-left: 30px;
        border:1px solid rgba(211,219,235,1);
    }
    .fillTime{display: inline-block;
        width:272px;
        margin:19px 0 0 24px;

    }
    .fillTime .filtrate .timesDate .content_table .time .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100%;
    }
    .cx,.dc{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .cx{
        color: #fff!important;
        background: #3377ff!important;
        border: none!important;
        margin-right: 23px;
    }
    .table{
        margin-top: 235px;
        background: #fff;
    }
</style>