<template>
 <div>
     <div class="top_name">
        <div class="title_left">
            <span>狮圈儿提现记录</span>
        </div>
    </div>
    <div class='content'>
        <div class='boxs'>
            <div>
                <span>提现时间：</span>
              
                <el-date-picker
                    v-model="tdate"
                    type="datetimerange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <span>提现申请ID：</span>
                <input type="text" placeholder="请输入" v-model="id">
                <span>状态：</span>
                <select v-model="status">
                    <option value="">全部</option>
                    <option value="0">审核中</option>
                    <option value="1">完成审核</option>
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
                                label="提现申请ID" prop="did"
                               >
                        </el-table-column>
                        <el-table-column
                                label="提现周期" prop="total_income"
                                >
                                <template slot-scope="scope">
                                    <span>{{tableData[scope.$index].starttime+'-'+tableData[scope.$index].endtime}}</span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                label="提现金额" prop="apply_money"
                                >
                        </el-table-column>
                        <el-table-column
                                label="汇款金额" prop="payment_money"
                                >
                        </el-table-column>
                         <el-table-column
                                label="状态" prop="status_name"
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
            tdate:[],
            tableData:[{tdate:'aaaa'}],
            p:10,
            page:1,
            total:0,
            status:'',
            id:'',
            start_time:"",
            end_time:"",
            load:true
     }
   },
   mounted(){
       var qt = (new Date((new Date()).getTime() - 1*24*60*60*1000)).toLocaleDateString().split('/');
                    if(Number(qt[1])<10){
                        qt[1]=(0).toString()+qt[1]

                    }
                    var next = (new Date()).toLocaleDateString().split('/');
                    if(Number(next[1])<10){
                        next[1]=(0).toString()+next[1]
                    }
                    this.tdate=[qt.join('-'),next.join('-')];
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
            this.status=''
            this.id='',
            this.tdate=[];
            this.start_time='',
            this.end_time=''
        },
        getData(){
            
            if(this.tdate.length>0){
                this.load=true
                this.start_time=this.tdate[0]
                this.end_time=this.tdate[1]
            }
            let params={p:this.p,page:this.page,status:this.status,id:this.id,start_time:this.start_time,end_time:this.end_time}
            this.api.record_apply_demand({params}).then((res)=>{
                this.total=res.total;
                this.tableData=res.data;
                this.load=false
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
        CK(data){
            this.$router.push({
                path:"./withdrawal_details",
                query:{
                    id:data.did,
                    status:data.status
                }
            })
        },
    },
 }
</script>

<style scoped>
    .top_name{
        height:90px!important;
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
        margin-top:30px
    }
    .content{
        margin-top: 173px;
        background: #fff;
    }
    .boxs{padding: 24px;}
    .el-date-editor{
        margin-right: 16px;
    }
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
