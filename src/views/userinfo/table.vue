<template>
    <el-table
            :data="tableData2"
            height="250"
            header-align="center"
            :header-cell-style="getRowClass"
            :cell-style="cell"
            border
            style="width: 100%;color:#000">
        <el-table-column
                prop="date"
                label="用户ID"
                width="150">
        </el-table-column>
        <el-table-column
                prop="address"
                label="用户名">
        </el-table-column>
        <el-table-column
                prop="address"
                label="用户邮箱">
        </el-table-column>
        <el-table-column
                prop="address"
                label="创建时间">
        </el-table-column>
        <el-table-column
                prop="address"
                label="最近记录">
        </el-table-column>
        <el-table-column
                prop="address"
                label="账号状态">
            <template slot-scope="scope">
                <el-switch active-color="#13ce66" inactive-color="#ff4949" v-model="scope.row.status" @change=change(scope.$index,scope.row)>
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column
                prop="address"
                label="操作">
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        props:['tableData2'],
        name: "table",
        data(){
            return{}
        },
        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:#ddd;color:#000;text-align:center;font-size:9px;font-weight:500;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;'
            }
        }
    }
</script>

<style scoped>

</style>