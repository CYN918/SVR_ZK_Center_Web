<template>
    <div>
        <div class="top">
            <span class="topName">排期管理</span>
            <div>
                <div class="selTime">
                    <el-date-picker
                            v-model="time"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <span class="upLock" >新建排期</span>
            </div>

        </div>
        <div class="seach">
            <template>
                <el-table
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="create_time"
                            label="排期计划名称"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="admaster"
                            label="周期"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="pv"
                            label="进度(实际/计划)">
                    </el-table-column>
                    <el-table-column
                            prop="click"
                            label="创建人"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="click_ratio"
                            label="最后更新时间"
                            :show-overflow-tooltip="true"
                    >
                    </el-table-column>

                    <el-table-column
                            prop="ecpc"
                            label="操作">
                        <template solt-scope="scope">
                            <span>编辑</span>
                            <span>查看详情</span>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
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
        name: "scheduling_management",
        data(){
            return{
                time:[],
                page:1,
                p:10,
                total:0,
                tableData:[],
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
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
            },
        }
    }
</script>

<style scoped>
    .top{
        width:100%;
        height:120px;
        background:rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
    }
    .topName{
        margin-left: 24px;
        margin-top: 19px;
        display: block;
        font-size:18px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .selTime{
        margin-top: 20px;
        display: inline-block;
        width:272px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        display: inline-block;
        margin-left: 24px;
    }
    .selTime .el-date-editor{width: 100%}
    .upLock{
        margin-right: 15%;
        float: right;
        display: inline-block;
        width:96px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        cursor: pointer;
        text-align: center;
        line-height: 36px;
    }
    .seach{
        background:rgba(255,255,255,1);
        border-radius:4px;
        margin-top: 200px;
        margin-bottom: 24px;
    }
</style>