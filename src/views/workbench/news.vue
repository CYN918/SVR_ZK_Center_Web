<template>
    <div>
        <div class="top_name">
            <span class="top_txt">TX新闻模板管理</span>
        </div>  
        <div class='screen'>
            <span>模板ID：</span>
            <input type="text">
            <span>模板名称：</span>
            <input type="text">
            <span>尺寸：</span>
            <select name="" id="">
                <option value="">全部</option>
            </select>
            <span>状态：</span>
            <select name="" id="">
                <option value="">全部</option>
            </select>
            <div class='btnsName'>
                <span class='cx'>查询</span>
                <span>重置</span>
                <span @click='addNews("1")'>新增模板</span>
            </div>
        </div>
        <div class='tables'>
            <template>
                    <el-table
                            ref="tab"
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            >
                         <el-table-column
                                prop="count"
                                label="模板ID">
                        </el-table-column>
                         <el-table-column
                                prop="count"
                                label="模板名称">
                        </el-table-column>
                        <el-table-column
                                prop="count"    
                                label="尺寸">
                        </el-table-column>
                         <el-table-column
                                prop="status"
                                label="状态">
                        </el-table-column>
                         <el-table-column
                                prop="status"
                                label="更新时间">
                        </el-table-column>
                         <el-table-column
                                prop="status"
                                label="操作人员">
                        </el-table-column>
                         <el-table-column
                                prop="status"
                                label="操作">
                                <template slot-scope="scope">
                                        <el-button type=text>查看详情</el-button>
                                </template>
                        </el-table-column>
                    </el-table>
            </template>
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
    </div>

</template>

<script>
 export default {
   data () {
     return {
             page:1,
            p:10,
            total:0,
            tableData:[{status:'还行'}],
     }
   },
   methods:{
        getRowClass({row, column, rowIndex}) {
            if (rowIndex === 0) {
                return 'background:#f7f9fc;color:#1F2E4D;font-size:14px;font-weight:bold;height:48px;font-family:PingFang-SC-Regular;padding:20px 0px 20px 14px'
            } 
            else {
                return ''
            }
        },
        cell({row, column, rowIndex, columnIndex}){
                return 'padding:15px 14px;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
        },
        handleSizeChange(p) { // 每页条数切换
             this.p = p;
                
        },
        handleCurrentChange(page) {//页码切换
            this.page = page;
                
        }, 
        addNews(index){
            this.$router.push({
                path:"./news_add",
                query:{
                    num:index
                }
            })
        }
   },
   components: {

   }
 }
</script>

<style scoped>
  .top_name{
        height: 62px;
        border: 0;
    }
 .top_txt{
    margin-left: 24px;
    font-size:18px;
    font-family:PingFang-SC;
    font-weight:500;
    line-height:62px ;
    color:rgba(31,46,77,1);
}
.screen{
    margin-top: 145px;
    background: #fff;
    height: 100px;
}
.screen span{
    margin:0 10px 0 24px;
    font-size: 14px;
    line-height: 100px;
}
.screen input{
    width: 200px;
    height: 32px;
    padding-left: 5px;
    border-radius: 3px;
}
.screen select{
    width: 120px;
    height: 36px;
    border-radius: 3px;
}
.btnsName{
    float: right;
    margin-right: 24px;
}
.btnsName span{
    width:90px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    cursor: pointer;
    font-size: 14px;
    border:1px solid #ddd;
    display: inline-block;
    border-radius: 3px;
    margin-top: 30px;
}
.cx{
    color: #fff;
    background: #3377ff!important;
    border:0!important
}
.tables{
    margin-top: 24px;
    background: #fff;
    padding:24px
}
</style>
