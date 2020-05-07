<template>
 <div>
      <div class="top_name">
            <span class="top_txt" @click="fh(-2)">狮圈儿提现记录&nbsp;/&nbsp;</span>
            <span style="margin-left:auto" class="top_txt" @click="fh(-1)">提现申请详情&nbsp;/&nbsp;</span>
            <span style="margin-left:auto" class="top_txt">用户提现详情</span>
            <div class="title_left">
                <span>用户提现详情</span>
                <a>{{this.$route.query.open_id}}</a>
                <a>{{this.$route.query.account_name}}</a>
            </div>
        </div>
    <div class='content'>
        <div class='boxs'>
            <div >
                  <template>
                    <el-table
                            :data="tableData"
                            header-align="center"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            style="width: 100%;color:#000">
                        <el-table-column
                                label="提现单ID" prop="tdate"
                               >
                        </el-table-column>
                        <el-table-column
                                label="提现金额" prop="total_income"
                                >
                        </el-table-column>
                        <el-table-column
                                label="申请提现时间" prop="buyout_income"
                                >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="props">
                                <el-button type="text"  @click='CK()'>查看详情</el-button>
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
    <div class='bg' v-if="xq">
        <div class='cont'>
            <div class='tit'>
                    <span>提现详情</span>
                    <img src="/img/gb.png" @click="heid()"/>
            </div> 
            <div style="margin:24px">
                <div>
                     <span class='titName'>提现单ID</span>
                     <span></span>
                </div>
                <div>
                     <span class='titName'>提现用户ID</span>
                     <span></span>
                </div>
                 <div>
                     <span class='titName'>用户昵称</span>
                     <span></span>
                </div>
                 <div>
                     <span class='titName'>提现金额</span>
                     <span></span>
                </div>
                 <div>
                     <span class='titName'>用户类别</span>
                     <span></span>
                </div>
                 <div>
                     <span class='titName'>收款账户名</span>
                     <span></span>
                </div>
                 <div>
                     <span class='titName'>信用代码</span>
                     <span></span>
                </div>
                 <div>
                     <span class='titName'>银行账号</span>
                     <span></span>
                </div>
                 <div>
                     <span class='titName'>开户银行</span>
                     <span></span>
                </div>
                 <div>
                     <span class='titName'>开户支行</span>
                     <span></span>
                </div>
                 <div>
                     <span class='titName'>银行预留手机号</span>
                     <span></span>
                </div>
                 <div>
                     <span class='titName'>状态</span>
                     <span></span>
                </div>
                 <div>
                     <span class='titName'>驳回原因</span>
                     <span></span>
                </div>
                 <div>
                     <span class='titName'>申请时间</span>
                     <span></span>
                </div>
                 <div>
                     <span class='titName'>处理时间</span>
                     <span></span>
                </div>
            </div>  
        </div>
    </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
            tableData:[{tdate:'aaaa'}],
            p:10,
            page:1,
            total:0,
            xq:false,
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
        handleSizeChange(p) { // 每页条数切换
            this.p = p;
            this.getData()
        },
        handleCurrentChange(page) {//页码切换
            this.page = page;
            this.getData()
        },
        getData(){
            let params={id:this.$route.query.id,open_id:this.$route.query.open_id,p:this.p,page:this.page}
            this.api.record_applay_designer_details({params}).then((res)=>{
                this.total=res.total
                this.tableData=res.data
            })
        },
        fh(index){
            this.$router.go(index)
        },
        CK(){
            this.xq=true;
        },
        heid(){
            this.xq=false
        },
    },
 }
</script>

<style scoped>
.bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
       
    }
    .cont{
        width: 700px;
        min-height: 600px;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        border-radius: 3px;
        background: #fff;
    }
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
    .tit{
        height: 56px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 24px;
    }
    .tit>span{
        display: inline-block;
        line-height: 56px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-left: 24px;
    }
    .tit>img{
        display: inline-block;
        margin-top: 20px;
        width:16px;
        height:16px;
        float: right;
        margin-right: 24px;
        cursor: pointer;
    }
    .titName{
        display: inline-block;
        width: 120px;
        margin-bottom: 16px;
        text-align: right;
        font-size: 14px;
        margin-right: 16px;
    }
    .title_left a{
        display: inline-block;
        padding: 3px 5px;
        background: #ddd;
        border-radius: 3px;
        margin-left: 24px;
    }
</style>
