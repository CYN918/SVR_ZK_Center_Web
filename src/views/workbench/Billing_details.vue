<template>
    <div>
        <div class="top_name">
            <span class="top_txt">任务中心/待处理</span>
            <div class="title_left" @click="fh">
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
                    <span class="dc">导出</span>
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
                    <select>
                        <option value="" selected>全部</option>
                        <option value="1">个人</option>
                        <option value="2">公司</option>
                    </select>
                    <span class="btn">查询</span>
                </div>
                <div>
                    <span class="bh" @click="getBH()">批量驳回（{{this.num.length}}）</span>
                    <span class="tg">通过所有非驳回申请</span>
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
                                label="纳税金额" prop="cash_money"
                        >
                        </el-table-column>
                        <el-table-column
                                label="税后金额" prop="cash_money"
                        >
                        </el-table-column>
                        <el-table-column
                                label="账户名" prop="cash_money"
                        >
                        </el-table-column>
                        <el-table-column
                                label="开户银行" prop="bank_name"
                        >
                        </el-table-column>
                        <el-table-column
                                label="开户行" prop="bank_subbranch"
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
                                label="待处理人" prop="cash_money"
                        >
                        </el-table-column>
                        <el-table-column
                                label="状态" prop="check_status_name"
                        >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="props">
                                <el-button type="text">查看详情</el-button>
                                <el-button type="text" @click="getSH(tableData[props.$index].apply_id)">审核通过</el-button>
                                <el-button type="text" @click="getBH(tableData[props.$index].apply_id)">驳回</el-button>
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
        <BH v-if="bh" :num="num" :id="this.$route.query.id" ></BH>
        <QD v-if="sh" :id="this.$route.query.id" :apply_id="apply_id"></QD>
    </div>
</template>

<script>
    import BH from './reject'
    import QD from './workBench_auditor'
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
                num:'',
                bh:false,
                sh:false,
                apply_id:'',
            }
        },
        mounted(){
            this.getData();
        },
        methods:{
            fh(){
                this.$router.go(-1)
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
                let params = {id:this.$route.query.id,p:this.p,page:this.page};
                this.api.demand_apply_detail({params}).then((res)=>{
                   this.tableData = res.data;
                   this.total = res.total;
                   console.log(res);
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
                    ary.push(val[i].apply_id);
                }
                // this.num=ary;
            },
            getBH(data){
                this.bh = true;
                if(data!=undefined){
                    this.num = data;
                }

            },
            heidBH(){
                this.bh = false;
            },
            getSH(data){
                this.sh=true;
                if(data!=undefined){
                    this.apply_id = data;
                }
            },
            heidSH(){
                this.sh=false
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
        margin-left: 69px;
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
        margin-left: 24px;
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
</style>