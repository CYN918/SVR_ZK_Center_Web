<template>
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
            <div style="margin-left: 21px">
                <input type="checkbox"/>
                <span>全选</span>
                <input type="checkbox"/>
                <span>设置为通过</span>
                <input type="checkbox"/>
                <span>设置为不通过</span>
                <span class="qd">确定</span>
                <span class="qx">取消</span>
            </div>
            <div>
                <template>
                    <el-table ref="tab0"
                              :data="tableData"
                              style="width: 100%"
                              :header-cell-style="getRowClass"
                              :cell-style="cell"
                              @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="序号"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="SDK_ID"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="原始物料"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="原始落地页"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="审核状态"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="审核时间"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="审核人"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="广告详情"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="SDK_ID"
                        >
                            <template slot-scope="props">
                                <el-button type="text" >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ad_select",
        data(){
            return{}
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
    .content_right input{
        margin:33px 12px 33px 0!important;
        width: 16px;
        height: 16px;

    }
    .content_right span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 60px;
    }
    .qd,.qx{
        display: inline-block;
        cursor: pointer;
        text-align: center;
        width:68px;
        height:36px;
        line-height: 36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .qd{
        background:rgba(51,119,255,1)!important;
        border: 0!important;
        color: #fff!important;
    }
</style>