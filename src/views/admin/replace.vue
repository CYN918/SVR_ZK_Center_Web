<template>
    <div class="content_right">
        <div>
            <span>待替换</span>
            <span>已替换</span>
        </div>
        <div>
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        border
                >
                    <el-table-column
                            prop="url"
                            label="URL"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="url_md5"
                            label="MD5"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="adid"
                            label="广告ID">
                    </el-table-column>
                    <el-table-column
                            prop="sdk_id"
                            label="SDK ID">
                    </el-table-column>
                    <el-table-column
                            prop="src"
                            label="来源">
                    </el-table-column>
                    <el-table-column
                            prop="tdate"
                            label="记录时期">
                    </el-table-column>
                    <el-table-column
                            prop="model"
                            label="实现方式">
                    </el-table-column>
                    <el-table-column
                            prop="pv"
                            label="访问量">
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "replace",
        data(){
            return{
                tableData:[],
            }
        },
    }
</script>

<style scoped>
.content_right{
    width: 100%;
    padding: 24px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #fff;
}
</style>