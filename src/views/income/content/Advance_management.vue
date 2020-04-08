<template>
   <div>
        <div class="top_name">
            <div class="title_left">
                <span>预付金管理</span>
            </div>
        </div>
        <div class='content'>
            <div>
                <span class='fc_statuc'>项目ID：</span>
                <input type="text">
                <span class='fc_statuc' >设计师ID：</span>
                <input type="text">
                <span class='fc_statuc' >结算方</span>
                <select v-model="account_name">
                    <option v-for="item in list" :value="item.name">{{item.name}}</option>
                </select>
                <div class="btn_right">
                    <span class='cx' @click='listData()'>查询</span>
                    <span @click='cz()'>重置</span>
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
                                label="项目ID" prop=""
                                :show-overflow-tooltip="true"
                               >
                        </el-table-column>
                        <el-table-column
                                label="设计师ID" prop=""
                                :show-overflow-tooltip="true"
                                >
                        </el-table-column>
                        <el-table-column
                                label="初始预约金" prop=""
                                >
                        </el-table-column>
                        <el-table-column
                                label="预约金余额" prop=""
                                 :show-overflow-tooltip="true"
                                >
                        </el-table-column>
                        <el-table-column label="更新时间" prop="">
                            
                        </el-table-column>
                         <el-table-column label="操作" prop="">
                             <template slot-scope="props">
                                <el-button type="text"  @click='jump()'>查看详情</el-button>
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
</template>

<script>
export default {
    props:['type'],
            data(){
                return{
                    tdate: '',
                    p:10,
                    page:1,
                    total:0,
                    tableData:[{time:2020}],
                    list:[],
                    account_name:""
                }
            },
            mounted(){
                this.listData()
            },
            methods:{
                cz(){
                    this.tdate=''
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
                    this.listData()
                },
                handleCurrentChange(page) {//页码切换
                    this.page = page;
                    this.listData()
                },
               
                listData(){
                    this.getData()
                },
                getData(){
                    let params={is_receiver:1};
                    this.api.settle_settlement({params}).then((res)=>{
                        this.list=res;
                    })
                },
                jump(){
                    this.$router.push({
                        path:"./Advance_details"
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
        font-weight:500;
        color:rgba(50,50,50,1);
        margin-left: 24px;
        text-align: right;
        margin-top:30px
    }
    .content{
        margin-top: 173px;
    }  
    .times{
        display: inline-block;
        margin: 24px;
    }
    .times .el-input__inner{
        width:300px!important
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
     select{
        width: 200px;
        height: 36px;

    }
    input{
        width: 190px;
        height: 30px;
        padding-left: 10px;
    }
   .fc_statuc{
        display: inline-block;
        margin:24px 16px 24px 24px
    }
</style>