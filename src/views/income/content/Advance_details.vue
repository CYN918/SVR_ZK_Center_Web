<template>
   <div>
        <div class="top_name">
             <span class="top_txt" @click='fh(-1)'>预付金管理&nbsp;/&nbsp;</span>
              <span class="top_txt">查看详情</span>
            <div class="title_left">
                <span>查看详情</span>
                <span class='time'>项目ID:{{this.$route.query.project_id}}</span>
                <span class='time'>设计师ID：{{this.$route.query.open_id}}</span>
                <span class='time'>开户名：{{this.$route.query.account_name}}</span>
            </div>
        </div>
        <div class='content'>
            <div>
                <span class='tit_name'>初始预约金：</span>
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
                                label="消耗预约金" prop="project_id"
                               >
                        </el-table-column>
                        <el-table-column
                                label="预约金余额" prop="material_name"
                                >
                        </el-table-column>
                        <el-table-column
                                label="消耗原因" prop="account_name"
                                >
                        </el-table-column>
                        <el-table-column
                                sortable
                                label="更新时间" prop="theme_name"
                                >
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
            data(){
                return{
                    p:10,
                    page:1,
                    total:0,
                    tableData:[{time:2020}],
                   
                }
            },
            mounted(){
                this.getDataList()
            },
            methods:{
                fh(index){
                    this.$router.go(index)
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
               
                getDataList(){
                    let params={open_id:this.$route.query.open_id,porject_id:this.$route.query.porject,account_name:this.$route.query.account_name,p:this.p,page:this.page}
                    this.api.ds_advance_payment_detail({params}).then((res)=>{
                        this.total=res.total;
                        this.tableData=res.data;
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
        margin:0 0 24px 24px;

            
    }
    .cx{
        color: #fff!important;
        border:0!important;
        background: #3377ff!important;
    }
    .tit_name{
        display: inline-block;
        font-size: 14px;
        font-weight: bold;
        margin: 24px;
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
    .time{
        display: inline-block;
        padding: 3px 5px;
        background: #ddd;
        border-radius: 3px;
        margin: 0 16px;
        font-size: 14px!important;
        font-weight: 400!important;
        
    }
</style>