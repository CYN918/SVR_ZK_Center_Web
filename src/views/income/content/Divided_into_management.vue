<template>
   <div>
        <div class="top_name">
             <span class="top_txt" @click='fh(-1)'>杂志锁屏付款&nbsp;/&nbsp;分成管理</span>
            <div class="title_left">
                <span>分成管理</span>
            </div>
        </div>
        <div class='content'>
            <div>
                 <div class='times'>
                    <el-date-picker
                        class='time_length'
                        v-model="tdate"
                        type="monthrange"
                        range-separator="至"
                        start-placeholder="开始月份"
                        value-format="yyyy-MM"
                        end-placeholder="结束月份">
                    </el-date-picker>
                </div>
                <div class="btn_right">
                    <span class='cx' @click='getDataList()'>查询</span>
                    <span @click='cz()'>重置</span>
                    <span @click='jg()'>价格管理</span>
                    <span @click='sj()'>数据管理</span>
                </div>      
            </div>
           <div>
                 <template>
                    <el-table
                            :data="tableData"
                            header-align="center"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            style="width: 100%;color:#000">
                        <el-table-column
                                label="结算周期" prop="tdate"
                               >
                        </el-table-column>
                        <el-table-column
                                label="付款金额" prop="total_income"
                                >
                                 <template slot-scope="scope">
                                    <span>{{"￥"+tableData[scope.$index].total_income}}</span>
                                </template> 
                        </el-table-column>
                        <el-table-column
                                label="状态" prop="is_confirmed"
                                >
                            <template slot-scope="scope">
                                <span>{{tableData[scope.$index].status==0?'待确认':tableData[scope.$index].status==1?'审核中':tableData[scope.$index].status==2?'已确认':tableData[scope.$index].status==-1?"审核不通过":""}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                sortable
                                label="更新时间" prop="updated_at"
                                >
                        </el-table-column>
                         <el-table-column
                                label="处理人" prop="updator"
                                >
                        </el-table-column>
                        <el-table-column label="操作" width='150'>
                            <template slot-scope="props">
                                <el-button type="text" @click='details(tableData[props.$index].tdate,tableData[props.$index].siid)'>查看详情</el-button>
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
         <load v-if="load"></load>
   </div>
</template>

<script>
import load from '../../../components/loading'
export default {
        components:{load},
            data(){
                return{
                    tdate:[],
                    p:10,
                    page:1,
                    total:0,
                    tableData:[{time:2020}],
                    is_confirmed:"",
                    load:true
                }
            },
            mounted(){
                this.getDataList()
            },
            methods:{
                 fh(index){
                    this.$router.go(index)
                },
                cz(){
                    this.tdate='';
                    this.is_confirmed='';
                },
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
                details(tdate,siid){
                    this.$router.push({
                        path:"./Divided_into_management_details",
                        query:{
                            type:3,
                            tdate:tdate,
                            siid:siid
                        }
                       
                    })
                },
               getDataList(){
                    this.load=true
                    let params={type:3,p:this.p,page:this.page,status:this.status,tdate_start:this.tdate[0],tdate_end:this.tdate[1]}
                    this.api.sharing_data_income_period({params}).then((res)=>{
                        this.total=res.total;
                        this.tableData=res.data; 
                        this.load=false
                    })
                },
                jg(){
                    this.$router.push({
                        path:"./price"
                    })
                },
                sj(){
                    this.$router.push({
                        path:"./data_manage",
                         query:{
                            type:3,
                            
                        }
                    })
                },
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
        font-weight:500;
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
        margin-top: 199px;
    }  
    .times{
        display: inline-block;
        margin: 24px;
    }
    .times .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width:200px!important
    }
    
    .btn_right{
        display: inline-block;
        float:right;
        margin: 24px 24px 0 0;
    }
    .btn_right span{
        display: inline-block;
        cursor: pointer;
        width: 90px;
        height: 36px;
        border: 1px solid #ddd;
        border-radius: 3px;
        line-height: 36px;
        text-align: center;
        margin-left: 24px;
            
    }
    .cx{
        color: #fff!important;
        border:0!important;
        background: #3377ff!important;
    }
    .fc_statuc{
        display: inline-block;
        margin-right: 15px;

    }
    select{
        width: 200px;
        height: 36px;

    }
</style>