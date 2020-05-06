<template>
    <div>
        <div class="top_name">
            <span class="top_txt">设计师结算 / 查看用户提现明细</span>
            <div class="title_left" @click="fh()">
                <img src="../../../public/img/fh.png">
                <span>返回</span>
            </div>
        </div>
        <div class="content">
            <div>
                <div class="timesDate">
                    <el-date-picker
                            v-model="time"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd ">
                    </el-date-picker>
                    <span>用户ID</span>
                    <input type="text" placeholder="输入用户ID"/>
                    <span>用户昵称</span>
                    <input type="text" placeholder="输入用户昵称"/>
                    <span class="dc" @click="derive()" v-if='emails.indexOf(user)!=-1'>导出</span>
                </div>
                <div class="seach">
                    <span>提现金额</span>
                    <input type="text" placeholder="单位：元"/>
                    <span class="or">至</span>
                    <input type="text" placeholder="单位：元"/>
                    <span class="mRight">账号主体</span>
                    <select>
                        <option value="" selected>全部</option>
                        <option value="1">个人</option>
                        <option value="2">公司</option>
                    </select>
                    <span class="zt">状态</span>
                    <select >
                        <option value="" selected>全部</option>
                        <option value="0">待审核</option>
                        <option value="1">审核通过</option>
                        <option value="2">审核驳回</option>
                    </select>
                    <span class="btn" @click='getData()'>查询</span>
                </div>
                <div>
                    <span class="bh" @click="getBH()" v-if='emails.indexOf(user)!=-1'>批量驳回（{{this.openIDList.length}}）</span>
                    <span class="tg" @click="verified()" v-if='emails.indexOf(user)!=-1&&status==1'>一键通过待审核内容</span>
                </div>
            </div>
            <div>
                <template>
                    <el-table
                            :data="tableData"
                            header-align="center"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            @selection-change="handleSelectionChange"
                            style="width: 100%;color:#000">
                        <el-table-column
                                type="selection"
                               :selectable='checkSelect'
                        >
                        </el-table-column>
                        <el-table-column
                                label="用户昵称" prop="account_name"
                        >
                        </el-table-column>
                        <el-table-column
                                label="用户类别" prop="contributor_type"
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
                                label="账户名" prop="account_name"
                        >
                        </el-table-column>
                        <el-table-column
                                label="开户银行" prop="bank_name"
                        >
                        </el-table-column>
                        <el-table-column
                                label="开户支行" prop="bank_subbranch"
                        >
                        </el-table-column>
                        <el-table-column
                                label="银行账号" prop="bank_card_id"
                        >
                        </el-table-column>
                        <el-table-column
                                label="身份证号码" prop="express_id"
                        >
                        </el-table-column>
                        <el-table-column
                                label="状态" prop="check_status_name"
                        >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="props">
                                <el-button type="text" @click="xq(tableData[props.$index].open_id)">查看详情</el-button>
                                <el-button type="text" v-if="tableData[props.$index].check_status=='0'&&status==1&&emails.indexOf(user)!=-1" @click="getSH(tableData[props.$index].open_id)">审核通过</el-button>
                                <el-button type="text" v-if="tableData[props.$index].check_status=='0'&&status==1&&emails.indexOf(user)!=-1" @click="getBH(tableData[props.$index].open_id)">驳回</el-button>
                                <el-button type="text" v-if="tableData[props.$index].check_status=='-1'&&status==1" @click="DismissTheReason(tableData[props.$index])">查看驳回原因</el-button>
                                <el-button type="text" v-if="status==3&&tableData[props.$index].check_status!='0'&&tableData[props.$index].check_status!='-3'&&emails.indexOf(user)!=-1" @click="getSH(tableData[props.$index].open_id)">更新为已汇款</el-button>
                                <el-button type="text" v-if="status==3&&tableData[props.$index].check_status!='0'&&tableData[props.$index].check_status!='-3'&&emails.indexOf(user)!=-1" @click="getBH(tableData[props.$index].open_id)">驳回</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </div>
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
        <div class='bg' v-if='yy'>
            <div class='down'>
                <div class="tit">
                    <span>驳回</span>
                    <img src="../../../public/img/gb.png" @click='heidYy()'/>
                </div>
                <div v-for='item in reject'> 
                    <div class='tabs'> 
                        <span class='tits'>处理人</span>
                        <span class='cons'>
                             {{item.creator}}   
                        </span>
                    </div>
                    <div class='tabs'>
                        <span  class='tits'>
                            处理时间
                        </span>
                        <span class='cons'>
                            {{item.updated_at}}
                        </span>
                    </div>
                    <div class='tabs'>
                        <span  class='tits'>
                            驳回原因
                        </span>
                        <span class='cons'>
                            {{item.note}}
                        </span>
                    </div>
                </div>
                
            </div>
        </div>
        <BH v-if="bh"  :id="this.$route.query.id" :open_id="openIDList" :status='this.$route.query.status'></BH>
        <QD v-if="sh" :id="this.$route.query.id" :open_id="shOpenId"  :status='this.$route.query.status'></QD>
    </div>
</template>
<script>
    import BH from './reject'
    import QD from './workBench_auditor'
    import dc from '../../api/commonality'
    export default {
        components:{BH,QD},
        name: "billing_details",
        data(){
            return{
                tableData:[],
                p:10,
                page:1,
                total:0,
                time:[],
                bh:false,
                sh:false, 
                open_id:'',
                openIDList:[],
                shOpenId:[],
                status:'',
                check_status:'',
                emails:[],
                user:'',
                reject:[],
                yy:false,


            }
        },
        created(){
            this.status=this.$route.query.status;
            this.emails=this.$route.query.emails;
            this.user=localStorage.getItem('userAd');
        },
        mounted(){
            this.getData();

        },
        methods:{
            fh(){
                this.$router.go(-1)
            },
           checkSelect(row){
               if(row.check_status==0){
                   return true
               }else{
                   return false
               }
              
           },
           DismissTheReason(data){
               var arr=[];
               for(var i=0;i<data.audit_logs.length;i++){
                   if(data.audit_logs[i].check_status==-1){
                       arr.push(data.audit_logs[i])
                   }
               }
               this.reject=arr

               console.log(this.reject)
               this.yy=true;
           },
           heidYy(){
               this.yy=false
               this.reject=[]
           },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:#f7f9fc;color:#8F9BB3;text-align:center;font-size:14px;font-weight:Medium;height:48px;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            getData(){
                let params = {id:this.$route.query.id,p:this.p,page:this.page,all:this.$route.query.status==1?1:0};
                this.api.demand_apply_detail({params}).then((res)=>{
                    this.tableData = res.data;
                    this.check_status = res.data.check_status
                    for(var i = 0;i<this.tableData.length;i++){
                        if(this.tableData[i].contributor_type==1){
                            this.tableData[i].contributor_type='个人'
                        }else{
                            this.tableData[i].contributor_type='公司'
                        }
                    }
                    this.total = res.total;
                })
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getData()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getData()
            },
            handleSelectionChange(val){
                var ary =[];
                for(let i = 0;i<val.length;i++){
                    ary.push(val[i].open_id);
                }
               this.openIDList = ary;
            },
            getBH(data){
                if(data!=undefined){
                    var Arr = [];
                    Arr.push(data);
                    this.openIDList= Arr;
                }
                if(this.openIDList.length==0){
                    this.$message.error('请选择至少一个数据');
                    return
                }
                this.bh = true;
                },
            heidBH(){
                this.bh = false;
            },
            verified(){
                for(var i =0;i<this.tableData.length;i++){
                    if(this.tableData[i].check_status==0){
                        this.shOpenId.push(this.tableData[i].open_id);
                         this.sh=true;
                    }else{
                        this.$message.error('没有待审核数据')
                    }
                }
               
            },
            getSH(data){
                this.sh=true;
                if(data!=undefined){
                    var openID = [];
                    openID.push(data);
                    this.shOpenId=openID;

                }
            },
            derive(){
                let url = '/demand/apply/export?all='+this.$route.query.status+'&id='+this.$route.query.id+'&check_status='+this.check_status;
                dc.downloadImg(url);
            },
            heidSH(){
                this.sh=false
            },
            xq(open_id){
                this.$router.push({
                    query:{
                        id:this.$route.query.id,
                        open_id:open_id
                    },
                    path:'./user_details',
                })
            },
        }
    }
</script>

<style scoped>
    .top_name{
        height:112px!important;
        background:rgba(255,255,255,1);
    }
    .title_left{cursor: pointer}
    .title_left img{
        width: 12px;
        margin-left: 24px;
    }
    .mRight{
        margin-left: 122px;
    }
    .title_left span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left: 8px;
    }
    .zt{
        margin-left: 32px;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
        font-size: 12px!important;
    }
    .content{
        margin-top: 199px!important;
    }
    .timesDate{
        margin:24px 0 28px 24px!important;
    }
    .timesDate span{
        margin-top: 24px;
    }
    .seach span,.timesDate span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
    }
    .seach{
        margin:0 0 16px  24px;
    }

    .el-range-editor.el-input__inner{
        margin-right: 44px;
    }
    .seach input{
        width:86px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .seach select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 44px;
    }
    .or{
        width: 34px!important;
        text-align: center!important;
        margin-right: 0!important;
    }
    .timesDate input{
        width:190px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 44px;
    }
    .btn{
        width:68px;
        height:36px;
        line-height: 36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
        text-align: center;
        cursor: pointer;
        position: static!important;
    }
    .dc{
        float: right;
        width:110px;
        height:36px;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        margin: 24px 24px 0 0!important;
        background:rgba(143,155,179,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
    }
    .bh,.tg{
        display: inline-block;
        width:111px;
        height:36px;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin:24px 0 24px 24px;
    }
    .tg{
        width:166px!important;
    }
    .bg{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    position: fixed;
    z-index: 9;
    bottom: 0;
    right: 0;
}
    .down{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 500px;
        min-height: 300px;
        background: #fff;
        border-radius: 5px;
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
.tabs{
    border:1px solid #ddd;
    margin: 0 24px;
    padding: 0 15px;
    height: 50px;
}
.tabs span{
    display: inline-block;
}
.tits{
    width: 30%;
    line-height: 50px;
    border-right: 1px solid #ddd;
}
.cons{
    width: 68%;
}
</style>