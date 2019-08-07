<template>
    <div class="content">
        <div style="padding: 24px">
            <template>
                <el-table
                        :data="tableData"
                        header-align="center"
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="fid"
                            label="包名"
                            :show-overflow-tooltip="true"
                           >
                    </el-table-column>
                    <el-table-column
                            prop="tags_name"
                            label="请求量"
                            sortable
                    >
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="填充量"
                            sortable
                           >
                    </el-table-column>
                    <el-table-column
                            prop="md5"
                            label="物料数量"
                            sortable
                           >
                    </el-table-column>
                    <el-table-column
                            prop="created_at"
                            label="内容获取时间"
                            sortable
                    >
                    </el-table-column>

                    <el-table-column
                            prop="address"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small"  @click="jump(scope.$index)">查看详情</el-button>
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
        name: "theme",
        data(){
            return{
                tableData:[{md5:"00"}],
                p:10,
                page:1,
                total:0,
            }
        },
        methods:{
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
            jump(index){
                this.$router.push({
                    path:'./theme_details'
                })
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
            },
        },

    }
</script>

<style scoped>

</style>