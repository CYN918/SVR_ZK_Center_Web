<template>
    <div>
        <div class="top_name">
            <span class="inner">|</span>
            <span class="top_txt">设计规范库</span>
        </div>
        <div>
            <div class="content">
                <div class="tit_tag">
                    <span>素材库标签管理</span>
                </div>
                <template>
                    <el-table
                            :data="tableData"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="分类"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="预置标签"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="个性标签">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small">管理</el-button>

                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <div class="content_2">
                <div class="tit_tag">
                    <span>物料库标签管理</span>
                </div>
                <template>
                    <el-table
                            :data="tableData2"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="分类"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="预置标签"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="个性标签">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="details(scope.$index)">管理</el-button>

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
        name: "set_tags",
        data(){
            return{
                tableData2:[{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                tableData:[{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
            }
        },
        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:#F7F9FC;color:rgba(30,30,30,1);margin-left:44px;font-size:14px;font-weight:500;height:48px;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'color:rgba(153,153,153,1);font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;margin-left:44px;'
            },
            details(index){
                this.$router.push({
                    path:'/admin/tags_details'
                })
            }
        },
    }
</script>

<style scoped>
.tit_tag{
    height: 57px;
    border-bottom: 1px solid #E6E9F0;
}
.tit_tag span{
    display: inline-block;
    margin-left: 24px;
    font-size:16px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1);
    line-height: 57px;
}
.content_2{
    width: 100%;
    height: 100%;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 6px 0px rgba(0, 0, 0, 0.04);
    margin-top: 24px;
}
</style>