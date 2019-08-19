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
                            prop="pkg_name"
                            label="包名"
                            :show-overflow-tooltip="true"
                           >
                    </el-table-column>
                    <el-table-column
                            prop="req"
                            label="请求量"
                            sortable
                    >
                    </el-table-column>
                    <el-table-column
                            prop="fill"
                            label="填充量"
                            sortable
                           >
                    </el-table-column>
                    <el-table-column
                            prop="status_name"
                            label="状态"
                           >
                        <template slot-scope="scope">
                            <span class="red" v-if="tableData[scope.$index].status==0">{{tableData[scope.$index].status_name}}</span>
                            <span  v-if="tableData[scope.$index].status==1">{{tableData[scope.$index].status_name}}</span>
                        </template>
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
        mounted(){
            this.getList();
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
                // this.$router.push({
                //     path:'./theme_details',
                //     query:{
                //         pkg_name:this.tableData[index].pkg_name,
                //         fill:this.tableData[index].fill,
                //         req:this.tableData[index].req
                //     },
                // })
                let routeData = this.$router.resolve({
                    path:'./theme_details',
                    query:{
                        pkg_name:this.tableData[index].pkg_name,
                        fill:this.tableData[index].fill,
                        req:this.tableData[index].req
                    },
                });
                window.open(routeData.href, '_blank');
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getList()
            },
            getList(){
                let params = {p:this.p,page:this.page};
                this.api.appad_pkglist({params}).then((res)=>{
                    this.tableData=res;
                    this.total=res.total;
                })
            },
        },

    }
</script>

<style scoped>
.red{color: red}
</style>