<template>
    <div class="centNavBox">
        <div class="Aud_title">
            <span>账号审核</span>
        </div>
        <div class="cx">
            <input type="text" placeholder="输入用户名或邮箱快速查询"/>
            <span>查询</span>
        </div>
        <template>
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    :default-sort = "{prop: 'date', order: 'descending'}"
            >
                <el-table-column
                        prop="email"
                        label="用户账号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="用户名"
                        >
                </el-table-column>
                <el-table-column
                        prop="roles[0].role_name"
                        label="账号角色"

                        >
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态"
                       >
                </el-table-column>
                <el-table-column
                        prop="created_at"
                        label="注册时间"
                        sortable
                       >
                </el-table-column>
                <el-table-column
                        prop="updated_at"
                        label="最近登录时间"
                        sortable
                        >
                </el-table-column>
                <el-table-column
                        label="是否启用"
                        prop="status"
                >
                    <template slot-scope="scope">
                        <el-switch
                                :active-value="1"
                                :inactive-value="0"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                v-model="scope.row.status"
                                @change=change(scope.$index,scope.row.status)>
                        </el-switch>
                    </template>
                </el-table-column>
                <!--<el-table-column-->
                        <!--prop="address"-->
                        <!--label="操作">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button type="text" size="small">通过</el-button>-->
                        <!--<el-button type="text" size="small">拒绝</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
            <!--<el-pagination-->
                    <!--@size-change="handleSizeChange"-->
                    <!--@current-change="handleCurrentChange"-->
                    <!--:current-page="currentPage4"-->
                    <!--:page-sizes="[10, 20, 30, 40]"-->
                    <!--:page-size="10"-->
                    <!--layout="total, sizes, prev, pager, next, jumper"-->
                    <!--:total="40">-->
            <!--</el-pagination>-->
        </template>
    </div>
</template>

<script>
    export default {
        name: "accoun-audit",
        data(){
            return {
                tableData:[],
            }
        },
        mounted(){
            this.getAccountList()
        },
        methods:{
            getAccountList(){
                this.api.get_accounts().then((res)=>{
                    this.tableData = res;
                    console.log(res);
                })
            },
            change(a,b){
                this.api.edit_account_status({email:this.tableData[a].email,status:b}).then((res)=>{

                })
            },
        },
    }
</script>

<style scoped>
.Aud_title{
    text-align: center;
}
.cx>input{
    margin-right: 50px;
}
.cx>span{
    display: inline-block;
    width: 120px;
    height: 35px;
    line-height: 35px;
    border: 1px solid #000;
    text-align: center;
    border-radius: 8px;
    background: #ddd;
}
</style>