<template>
    <div>
        <div>
            <div class="top_name">
                <div class="tit_top_url">
                    <span class="log_url">广告源列表 &nbsp;/&nbsp;</span>
                    <span class="log_ur">广告源详情</span>
                </div>
                <div class="tit_top_con">
                    <span class="tit_name">广告源详情</span>
                </div>
            </div>
            <div class="content_right">
                <div class="screen">
                    <div class="date">
                        <el-date-picker
                                v-model="value"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <span>SDK-ID</span>
                    <select>
                        <option value="">全部</option>
                    </select>
                    <span>广告主</span>
                    <select>
                        <option value="">全部</option>
                    </select>
                    <span>广告类</span>
                    <select>
                        <option value="">全部</option>
                    </select>
                    <span>审核状态</span>
                    <select>
                        <option value="">全部</option>
                    </select>
                    <div class="wl">
                        <span>物料URL</span>
                        <input>
                        <span>落地页URL</span>
                        <input>
                        <span class="screen_btn1">查询</span>
                        <span class="screen_btn2">重置</span>
                        <span class="screen_btn2">导出</span>
                        <span class="screen_btn">批量操作</span>
                    </div>

                </div>
                <div>
                    <template>
                        <el-table
                                :data="tableData"
                                style="width: 100%"
                                :header-cell-style="getRowClass"
                                :cell-style="cell"
                        >
                            <el-table-column
                                    prop="num"
                                    label="序号">
                            </el-table-column>
                            <el-table-column
                                    prop="SDK-ID"
                                    label="SDK-ID">
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="原始物料">
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="原始落地页">
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="审核状态">
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="审核时间">
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="审核人">
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="广告详情">
                                <template slot-scope="scope">
                                    <el-button  type="text" @click="particulars" size="small">查看详情</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    width="150"
                            >
                                <template slot-scope="scope">
                                    <el-button  type="text" @click="status" size="small">修改审核状态</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
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
        name: "ad_details",
        data(){
            return{
                tableData:[{num:0}],
                page:1,
                p:10,
                total:0,
                value:''
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
            particulars(){
                this.$router.push({
                    path:'./ad_particulars'
                })
            },
            status(){
                this.$router.push({
                    path:'./ad_select'
                })
            },
        }
    }
</script>

<style scoped>
    .content_right{
         margin-top:186px;
        background: #fff;
        min-height: 776px;
    }
    .top_name{
        height: 98px;
    }
    .log_ur{
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .screen{
        margin: 0 24px 25px 24px;
    }
    .screen>span,.screen .wl span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 20px;
    }
    .screen .wl input{
        padding-left: 14px;
        width:300px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 20px;
        margin-top: 27px;
    }
    .screen>select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 20px;
        margin-top: 27px;
    }
    .screen_btn1{
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
        border: 0!important;
    }
    .screen_btn{
        width: 96px!important;
    }
    .screen_btn1,.screen_btn2,.screen_btn{
        width:68px;
        height:36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .date{
        display: inline-block;
        margin-right: 20px;
    }
    .date .el-date-editor {
        width: 125px;
    }
</style>