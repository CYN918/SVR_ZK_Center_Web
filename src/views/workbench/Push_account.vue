<template>
 <div>
    <div>
        <div class="top_name">
            <span class="top_txt">杂志锁屏推送审核管理&nbsp;/&nbsp; 账号管理</span>
            <div class="title_left">
                <span> 账号管理</span>
            </div>
            <span class='right_btn'>添加外部账号</span>
        </div>
        <div class='title'>
            <div>
                <span class='headline'>关键词：</span>
                <input type="text">
                <span class='headline'>渠道：</span>
                <select >
                    <option value="">全部</option>
                </select>
                <span class='right_btn cx'>查询</span>
            </div>
            <template>
                    <el-table
                            ref="tab"
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            >
                         <el-table-column
                                prop="tid"
                                label="序号">
                        </el-table-column>
                         <el-table-column
                                prop="name"
                                label="账号">
                        </el-table-column>
                        <el-table-column
                                prop="count"    
                                label="渠道">
                                <template slot-scope="scope">
                                    <span ></span>
                                </template>
                        </el-table-column>
                         <el-table-column
                                prop="status"
                                label="操作">
                                <template slot-scope="scope">
                                    <el-button type='text' >编辑</el-button>
                                    <el-button type='text' >删除</el-button>
                                </template>
                        </el-table-column>
                    </el-table>
            </template>
            <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="page"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="10"
                            layout="sizes, prev, pager, next"
                            :total="total">
                    </el-pagination>
            </div>
        </div>
    </div>
     <div class='bg' v-if='show'>
        <div class='addBox'>
            <div class='tit_name'>
                <span>{{this.num==0?"新建推送库":'编辑推送库'}}</span>
            </div>
            <div>
                <span class='name'>推送库名称：</span>
                <input type="text">
            </div>
            <div>
                <span class='name'>渠道：</span>
                <select >
                    <option value="">全部</option>
                </select>
            </div>
            <div>
                <span class='name'>功能：</span>
                <select >
                    <option value="">全部</option>
                </select>
            </div>
            <div class='btn_anme'>
                <span>确认</span>
                <span @click='heidPopup()'>取消</span>
            </div>
        </div>
    </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
            tableData:[],
            p:10,
            page:1,
            total:0
     }
   },
   methods:{
       getDate(){},
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
        getSize(){
            this.api.template_config_size().then((res)=>{
                this.sizeList=res
            })
        },
        handleSizeChange(p) { // 每页条数切换
             this.p = p;
             this.getDate()   
        },
   },
   components: {

   }
 }
</script>

<style scoped>

    .top_name{height: 112px}
    .top_txt,.title_left span{
        margin-left: 24px;
    }
    .title{
        margin-top: 145px;
        background: #fff;
        padding: 24px;
    }
    .right_btn{
        float:right;
        margin-right: 20%;
         display: inline-block;
        cursor: pointer;
        text-align: center;
        width:100px;
        height: 36px;
        line-height: 36px;
        background: #3377ff;
        color:#FFF;
        border-radius: 3px;
        margin-left: 24px;
        font-size: 14px;
        margin-top: -30px;
    }
    .cx{
        margin-top: 0!important;
        width: 90px!important;
        margin-right: auto!important;
    }
    .title{
        margin-top: 196px;
        padding: 24px;
    }
    .headline{
        display: inline-block;
        font-size: 14px;

    }
    input{
        width: 195px;
        padding-left: 5px;
        height: 32px;
        margin-right: 30px;
        border-radius: 3px;
    }
    select{
        width: 200px;
        height: 36px;
        border-radius: 3px;
        margin-bottom: 40px;
    }
    .bg{
         position: fixed;
        top: 65px;
        bottom: 0;
        right: 0;
        z-index: 999;
        background: rgba(0,0,0,.3);
        width: 100%;
        height: 100%;
    }
    .addBox{
        width: 360px;
        height: 280px;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        border-radius: 5px;
        background: #fff;
    }
</style>
