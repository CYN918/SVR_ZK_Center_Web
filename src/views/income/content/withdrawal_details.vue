<template>
 <div>
      <div class="top_name">
             <span class="top_txt" @click="fh(-1)">狮圈儿提现记录&nbsp;/&nbsp;</span>
            <span style="margin-left:auto" class="top_txt">提现申请详情</span>
            <div class="title_left">
                <span>提现申请详情</span>
            </div>
        </div>
    <div class='content'>
        <div class='boxs'>
            <div>
                <span>用户ID：</span>
                <input type="text" placeholder="请输入" v-model="open_id">
                <span>用户昵称：</span>
                <input type="text" placeholder="请输入" v-model="account_name">
                <span>用户类别：</span>
                <select v-model="contributor_type">
                    <option value="">全部</option>
                    <option value="1">个人</option>
                    <option value="2">企业</option>
                </select>
                 <span>状态：</span>
                <select v-model="check_status">
                    <option value="">全部</option>
                    <option value="0">待审核</option>
                    <option value="1">待汇款</option>
                    <option value="2">已汇款</option>
                    <option value="-1">审核驳回</option>
                    <option value="-3">结算驳回</option>
                </select>
                <div class='btns_name'>
                    <span class='cx' @click='getData()'>查询</span>
                    <span @click='cz()'>重置</span>
                </div>
            </div>
            <div style="margin-top:24px">
                  <template>
                    <el-table
                            :data="tableData"
                            header-align="center"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            style="width: 100%;color:#000">
                        <el-table-column
                                label="用户ID" prop="open_id"
                               >
                        </el-table-column>
                        <el-table-column
                                label="用户昵称" prop="account_name"
                                >
                        </el-table-column>
                        <el-table-column
                                label="用户类别" prop="contributor_type"
                                >
                                <template slot-scope="scope">
                                        <span>{{tableData[scope.$index].contributor_type==1?'个人':'企业'}}</span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                label="提现次数" prop="apply_num"
                                >
                        </el-table-column>
                         <el-table-column
                                label="提现金额" prop="cash_money"
                                >
                        </el-table-column>
                         <el-table-column
                                label="纳税金额" prop="tax_money"
                                >
                        </el-table-column>
                         <el-table-column
                                label="税后金额" prop="after_tax_money"
                                >
                        </el-table-column>
                         <el-table-column
                                label="状态" prop="check_status_name"
                                >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="props">
                                <el-button type="text"  @click='CK(tableData[props.$index])'>查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="p"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                 </div>
            </div>
        </div>
    </div>
    <loading v-if='load'></loading>
 </div>
</template>

<script>
import loading from '../../../components/loading'
 export default {
     components:{loading},
   data () {
     return {
            tableData:[{tdate:'aaaa'}],
            p:10,
            page:1,
            total:0,
            open_id:"",
            account_name:"",
            contributor_type:"",
            check_status:"",
            load:true
     }
   },
   mounted(){
       this.getData()
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
        cz(){
            this.open_id=''
            this.account_name=''
            this.contributor_type=''
            this.check_status=''
        },
        handleSizeChange(p) { // 每页条数切换
            this.p = p;
            this.getData()
        },
        handleCurrentChange(page) {//页码切换
            this.page = page;
            this.getData()
        },
        getData(){
            this.load=true
            let params={p:this.p,page:this.page,open_id:this.open_id,account_name:this.account_name,contributor_type:this.contributor_type,check_status:this.check_status,id:this.$route.query.id,all:'1'}
            this.api.record_apply_details({params}).then((res)=>{
                this.total=res.total;
                this.tableData=res.data;
                this.load=false
            })
        },
        CK(data){
            this.$router.push({
                path:"./userDetails",
                query:{
                    open_id:data.open_id,
                    id:this.$route.query.id,
                    account_name:data.account_name
                }
            })
        },
        fh(index){
            this.$router.go(index)
        }
    },
 }
</script>

<style scoped>
   .top_name{
         height:112px!important;
        background:rgba(255,255,255,1);
    }
    .title_left span{
        display: inline-block;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:bold;
        color:rgba(50,50,50,1);
        margin-left: 24px;
        text-align: right;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
        cursor: pointer;
    }
    .content{
        margin-top: 200px;
        background: #fff;
    }
    .boxs{padding: 24px;}
    input{
        width: 195px;
        height: 32px;
        padding-left: 5px;
        border-radius: 3px;
        margin-right: 16px;
    }
    select{
        width: 200px;
        height: 36px;
        border-radius: 3px;
        margin-right: 16px;
    }
    .btns_name{
        display: inline-block;
        float:right;
    }
    .btns_name span{
        display: inline-block;
        width: 90px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        border-radius: 3px;
        border: 1px solid #ddd;
        cursor: pointer;
        margin-left: 24px;
    }
    .cx{
        background: #3377ff;
        color: #fff;
        border:0!important
    }
</style>
