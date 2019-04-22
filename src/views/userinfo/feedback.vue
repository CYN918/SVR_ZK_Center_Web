<template>
    <div class="centNavBox">
        <div class="title">
            <div class="title_ss">
                <input type="text" placeholder="搜索关键词"/>
                <img src="../../../public/img/ss.jpg"/>
            </div>
            <div class="title_tj">
                <span>提交反馈</span>
            </div>
        </div>
        <div>
            <el-table
                    :data="listData"
                    style="width: 100%"
                    header-align="center"
                    :header-cell-style="getRowClass"
                    :cell-style="cell"
                    :default-sort = "{prop: 'date', order: 'descending'}"
            >
                <el-table-column
                        prop="user.email"
                        label="用户账号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="user.user_name"
                        label="用户名"
                >
                </el-table-column>
                <el-table-column
                        prop="fd_type"
                        label="问题类型"

                >
                </el-table-column>
                <el-table-column
                        prop="fd_desc"
                        label="问题描述"
                >
                </el-table-column>
                <el-table-column
                        prop="created_at"
                        label="提交时间"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="particulars(scope.row.fd_id)">查看</el-button>
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
        </div>
    </div>
</template>

<script>
    export default {
        name: "feedback",
        data(){
            return {
                listData:[
                    {

                    }
                ],
            }
        },
        mounted(){
            this.getList();
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
            },
            getList(){
                this.api.feedback_list().then((res)=>{
                    this.listData = res
                })
            },
            particulars(id){
                this.$router.push({
                    path:'/userinfo/details',
                    query: {
                        fd_id:id
                    },
                })
            }
        }
    }
</script>

<style scoped>
.title{
    margin-bottom: 80px;
}
.title_ss{
    display: inline-block;
    width: 400px;
}
.title_ss>img{
    width: 25px;
    margin-left: 20px;
    position: relative;
    top:9px
}
.title_tj{
    float: right;
    text-align: center;
}
.title_tj>span{
    display: block;
    width: 150px;
    height: 40px;
    background: #57a314;
    border-radius: 8px;
    line-height: 40px;
    color: #fff;
}
</style>