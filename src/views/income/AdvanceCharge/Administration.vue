<template>
    <div>
        <div class="top">
            <div class="top_tit">
                <span>收款结算</span>
            </div>
            <div class="user">
                <div class="sk" :class="{check:is_receiver==1}" @click="switchs(1)">
                    收款方
                </div>
                <div class="fk" :class="{check:is_receiver==0}" @click="switchs(0)">
                    付款方
                </div>
                <div class="seach">
                    <img src="../../../../public/img/ss.png">
                    <input type="text" placeholder="搜索关键词" v-model="search">
                </div>
                <span class="cx">查询</span>
            </div>
        </div>
        <div class="table">
            <template>
                <el-table
                        :data="tableData"
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
                >
                    <el-table-column
                            prop="sdk_id"
                            label="结算放名称">
                    </el-table-column>
                    <el-table-column
                            prop="pv"
                            label="预付款金额">
                    </el-table-column>
                    <el-table-column
                            label="更新时间">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button  type="text" size="small" @click="ck(tableData[scope.$index].prid)">查看详情</el-button>
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
        name: "administration",
        data(){
            return{
                p:10,
                page:1,
                total:0,
                tableData:[{pv:0}],
                is_receiver:1,
                search:"",
            }
        },
        mounted(){
            // this.getData()
        },
        methods:{
             switchs(num){
                 this.is_receiver=num;
             },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
            },
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
            ck(id){
                this.$router.push({
                    path:"./YFdetails",
                    qurey:{
                        prid:id,
                    }
                })
            },
            getData(){
                 let params={search:this.search,p:this.p,page:this.page,is_receiver:this.is_receiver}
                 this.api.settle_prepayment_search({params}).then((res)=>{
                     this.tableData=res.data;
                     this.total=res.total;
                 })
            },
        },
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:120px;
        border-top: 1px solid #ededed;
        background: white;
        -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
        position: fixed;
        left: 256px;
        top: 63px;
        z-index: 99;
    }
    .top_tit span{
        display: inline-block;
        font-size:18px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin:19px 0 20px 24px;
    }
    .seach{
        display: inline-block;
        margin:0px 24px;
        position:relative;
    }
    .seach img{
        width: 24px;
        height: 24px;
        position: absolute;
        left: 3px;
        top:8px;
    }
    .seach input{
        width:170px;
        height:32px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        padding-left: 30px;
        border:1px solid rgba(211,219,235,1);
    }
    .user{
        padding: 0 24px;
    }
    .sk,.fk{
        display: inline-block;
        width:70px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:0px 4px 4px 0px;
        border:1px solid rgba(230,233,240,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
        text-align: center;
        line-height: 36px;
        cursor: pointer;
    }
    .sk{
        border-radius:4px 0px 0px 4px!important;
    }
    .check{

        border:1px solid rgba(51,119,255,1)!important;
        color:rgba(51,119,255,1)!important;
    }
    .cx{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
    }
    .table{
        background: #fff;
        margin-top: 220px;
    }
</style>