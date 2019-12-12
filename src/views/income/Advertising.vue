<template>
    <div>
        <div class="top_tit">
            <div class="tit_top_url">
                <span class="log_url">收益管理 &nbsp;/&nbsp;</span>
                <span class="log_url">广告结算数据</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">广告结算数据</span>
            </div>
        </div>
        <div class="content_table">
            <div style="margin-bottom: 24px;padding: 0 24px;">
                <el-date-picker
                        v-model="value"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <span  class="ad">数据类型</span>
                <select v-model="is_receiver">
                    <option value="1">收款数据</option>
                    <option value="0">付款数据</option>
                </select>
                <span class="ad">结算方</span>
                <input type="text" placeholder="请输入结算方" v-model="name"/>
                <span class="cx" @click="getDataList">查询</span>
            </div>
            <div>
                <template>
                    <el-table
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                prop="tdate"
                                label="日期"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="结算方"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="advertiser"
                                label="投放公司">
                        </el-table-column>
                        <el-table-column
                                prop="project"
                                label="项目名称"
                                v-if="is_receiver==1"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="scene"
                                label="场景"
                                v-if="is_receiver==0"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="adid"
                                label="广告位ID"
                                 v-if="is_receiver==0"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="pv"
                                label="展示"
                                :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="click"
                                label="点击">
                        </el-table-column> 
                        <el-table-column
                            prop="click_ratio"
                            label="点击率"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="income"
                                label="收益"
                        >
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <div v-if="tableData.length>0" class='summary'>
                <span>汇总</span>
                <span>—</span>
                <span>—</span>
                <span>—</span>
                <span>—</span>
                <span v-if="is_receiver==0">—</span>
                <span>{{exhibition1}}</span>
                <span>{{exhibition2}}</span>
                <span>{{click_ratio}}</span>
                <span>{{exhibition4}}</span>
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
    </div>
</template>

<script>
    export default {
        name: "advertiser",
        data(){
            return{
                value:[],
                name:'',
                tableData:[],
                is_receiver:1,
                p:10,
                page:1,
                total:0,
                exhibition1:'',
                exhibition2:'',
                click_ratio:'',
                exhibition4:'',
            }
        },
        mounted(){
                if(this.$route.query.name){
                    this.value=[this.$route.query.tstart,this.$route.query.tend];
                    this.name=this.$route.query.name;
                    this.is_receiver=this.$route.query.is_receiver;
                }else{
                    var qt = (new Date((new Date()).getTime() - 1*24*60*60*1000)).toLocaleDateString().split('/');
                    if(Number(qt[1])<10){
                        qt[1]=(0).toString()+qt[1]

                    }
                    var next = (new Date()).toLocaleDateString().split('/');
                    if(Number(next[1])<10){
                        next[1]=(0).toString()+next[1]
                    }
                    this.value=[qt.join('-'),next.join('-')];
                }
                this.getDataList()
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
                this.getDataList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getDataList()
            },
            getDataList(){
                let params = {tstart:this.value[0],tend:this.value[1],p:this.p,page:this.page,name:this.name,is_receiver:this.is_receiver}
                this.api.settle_data_search({params}).then((res)=>{
                    this.tableData=res.data;
                    var a1= 0;
                    var a2= 0;
                    var a4= 0;
                    for(var i=0;i<this.tableData.length;i++){
                        a1 += parseInt(res.data[i].pv);
                        a2 += parseInt(res.data[i].click);
                        a4 += parseFloat(res.data[i].income);
                        this.tableData[i].income = parseFloat(this.tableData[i].income / 100).toFixed(2);
                    }
                    this.exhibition1 = parseInt(a1);
                    this.exhibition2 = parseInt(a2);
                    
                    var sratio = 0;
                    if(this.exhibition1 > 0){
                        sratio =  parseFloat(this.exhibition2 / this.exhibition1 * 100).toFixed(2).toString() +'%';
                    }
                    this.click_ratio = sratio + '%';
                    this.exhibition4 = parseFloat(a4 / 100 ).toFixed(2);
                    this.total = res.total;
                    console.log(this.tableData)
                })
            },
           
        },
    }
</script>

<style scoped>
    .top_tit{
        width:100%;
        height:112px;
        background:rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
    }
    .content_table{
        margin-top:200px;
        background:rgba(255,255,255,1);
    }
    .ad{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 0 24px 0 44px;
    }
    select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 28px;
        margin-top: 24px;
    }
    input{
        width:190px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        padding: 0 5px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 28px;
        margin-top: 24px;
    }
    .cx{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
        line-height:36px;
        text-align: center;
        cursor: pointer;
        margin-right: 24px;
    }
    .cz{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(232,234,237,1);
        cursor: pointer;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(31,46,77,1);
        line-height:36px;
        text-align: center;
    }
    .dc{
        display: inline-block;
        width:96px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        cursor: pointer;
        text-align: center;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
        line-height:36px;
        float: right;
        margin: 24px 24px 0 0 ;
    }
    .summary{
        height:48px;
    }
    .summary span{
        display: inline-block;
        background:#f7f9fc;
        color:#1F2E4D;
        font-size:14px;
        font-weight:bold;
        line-height:48px;
        font-family:PingFang-SC-Regular;
        min-width:10%;
        max-width: 11%;
        text-align: center;
    }
</style>