<template>
    <div class="centNavBox">
        <div class="cx">
            <input type="text" placeholder="输入用户名或邮箱快速查询" v-model="search"/>
            <span @click="getAccountList()">查询</span>
            <span class="right_btn" @click="addUser">添加账号</span>
        </div>
        <template>
            <el-table
                    :data="tableData"
                    :header-cell-style="getRowClass"
                    :cell-style="cell"
                    style="width: 100%"
                    border
                    :default-sort = "{prop: 'date', order: 'descending'}"
            >
                <el-table-column
                        prop="user_name"
                        label="用户名"
                >
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="用户账号"
                        width="180">
                </el-table-column>
                <!--<el-table-column-->
                        <!--prop="roles[0].role_name"-->
                        <!--label="账号角色"-->

                        <!--&gt;-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--prop="status"-->
                        <!--label="状态"-->
                       <!--&gt;-->
                <!--</el-table-column>-->
                <el-table-column
                        prop="created_at"
                        label="注册时间"
                       >
                </el-table-column>
                <el-table-column
                        prop="updated_at"
                        label="最近记录"
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
                <el-table-column
                        prop="address"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="getUSERdATA(scope.$index)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange1"
                        @current-change="handleCurrentChange1"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="prev, pager, next,total, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </template>
        <ADD v-if="management" :userMessage="userMessage"></ADD>
    </div>
</template>

<script>
    import ADD from './ADDuser'
    export default {
        components:{ADD},
        name: "accoun-audit",
        data(){
            return {
                tableData:[],
                currentPage: 1,
                pageSize: 10,
                total: 0,
                management:false,
                userMessage:{},
                search:'',
            }
        },
        mounted(){
            this.getAccountList()
        },
        methods:{
            getAccountList(){
                let params ={p:this.pageSize,page:this.currentPage,search:this.search};
                this.api.account_all({params}).then((res)=>{
                    this.tableData = res.data;
                    console.log(res.data)
                    this.total= res.total;
                })
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(246,246,246,1);color:#000;text-align:center;font-size:16px;font-weight:500;height:48px;'
                } else {
                    return ''
                }
            },
            getUSERdATA(a){
                this.management= true;
                this.userMessage=this.tableData[a];
                console.log(this.userMessage);
            },
            addUser(){
                this.management=true;
            },
            qx(){
                this.management=false;
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:rgba(54,54,54,1);font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            change(a,b){
                this.api.edit_account_status({email:this.tableData[a].email,status:b}).then((res)=>{
                })
            },
            handleSizeChange1() { // 每页条数切换
                this.pageSize = pageSize;
                console.log(this.pagesize);
                this.getAccountList();
            },
            handleCurrentChange1(currentPage) {//页码切换
                console.log(currentPage);
                this.currentPage = currentPage;
                this.getAccountList();
            },
        },
    }
</script>

<style scoped>
.centNavBox{
    padding: 24px 80px!important;
}
.Aud_title{
    text-align: center;
}
.cx{margin-bottom: 28px}
.cx>input{
    margin-right: 40px;
    margin-left: 0!important;
    width: 418px!important;
}
.cx>span{
    display: inline-block;
    width:120px;
    height:48px;
    line-height: 48px;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    background:rgba(19,159,248,1);
    border-radius:5px;
    text-align: center;
    cursor: pointer;
}
.right_btn{margin-left: 60px}
.block{text-align: right}
</style>