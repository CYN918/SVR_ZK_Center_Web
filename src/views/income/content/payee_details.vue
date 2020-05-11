<template>
 <div>
      <div class="top_name">
             <span class="top_txt" @click='fh(-1)'>主题收款&nbsp;/&nbsp;数据详情</span>
            <div class="title_left">
                <span>数据详情</span>
                <span class='time'>{{this.$route.query.tdate}}</span>
            </div>
        </div>
         <div class='content'>
            <div>
                <span class='fc_statuc' style="margin:24px 16px 24px 24px " >渠道</span>
                <!-- <el-autocomplete
                v-if='id==""'
                    class="inline-input"
                    v-model="state1"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    @select="handleSelect"
                    >
                </el-autocomplete> -->
                <select>
                    <option value="">全部</option>
                </select>
                <span class='fc_statuc' style="margin:24px 16px 24px 24px ">主题名称</span>
                <input type="text" >
                 <span class='fc_statuc' style="margin:24px 16px 24px 24px ">来点秀名称</span>
                <input type="text" >
                <div class="btn_right">
                    <span class='cx' @click='getDataList()'>查询</span>
                    <span @click='cz()'>重置</span>
                </div>      
            </div>
           <div>
                  <template >
                    <el-table
                            :data="tableData"
                            header-align="center"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            fixed
                            style="width: 100%;color:#000">
                         <el-table-column
                                label="渠道" prop="project_id"
                                :show-overflow-tooltip="true"
                               >
                        </el-table-column>    
                        <el-table-column
                                label="主题名称" prop="open_id"
                                :show-overflow-tooltip="true"
                               >
                        </el-table-column>
                        <el-table-column
                                label="收益金额" prop="buyout_income"
                                >
                        </el-table-column>
                        <el-table-column 
                                label="操作" prop='created_at'
                                width="150"
                                >
                            <template slot-scope="props">
                                <el-button type="text" @click='BJ()'>编辑</el-button>
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
        <div class='bg' v-if="bj">
                <div class='editors'>
                    <div class='titName'>
                        <span>编辑</span>
                    </div>
                    <div>
                        <span class='tit_names'>结算周期</span>
                        <span></span>
                    </div>
                    <div>
                        <span class='tit_names'>渠道</span>
                        <select name="" id="">
                            <option value="">全部</option>
                        </select>
                    </div>
                    <div>
                        <span class='tit_names'>主题名称</span>
                        <input type="text">
                    </div>
                     <div>
                        <span class='tit_names'>收益金额</span>
                        <input type="text">
                    </div>
                    <div class='btns'>
                        <span class='qd'>确定</span>
                        <span @click='heidBj()'>取消</span>
                    </div>
                </div>
        </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
        p:10,
        page:1,
        total:0,
        tableData:[{tdate:2020-10}],
        bj:false 
     }
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
                   
        },
        handleCurrentChange(page) {//页码切换
                    this.page = page;
                    
        },
        heidBj(){
            this.bj=false;
        },
        BJ(){
            this.bj=true
        }
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
    .time{
        display: inline-block;
        padding: 3px 5px;
        background: #ddd;
        border-radius: 3px;
        margin: 0 16px;
        font-size: 14px!important;
        font-weight: 400!important;
        
    }
    .content{
        margin-top: 199px;
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
    .btn_right{
        display: inline-block;
        float:right;
        margin: 14px 24px 10px 0;
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
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 999;
        bottom: 0;
        right: 0;
    }
    .editors{
        position: absolute;
        width: 400px;
        height: 350px;
        transform: translate(-50%,-50%);
        top:50%;
        left:50%;
        border-radius: 5px;
        background: #fff;
    }
    .titName{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #DDD;

    }
    .titName span{
        display: inline-block;
        font-size: 14px;
        margin-left: 24px;
        line-height: 50px;
        font-weight: bold;
    }
    .tit_names{
        display: inline-block;
        width: 90px;
        margin: 24px 15px 0 24px;
    }
    .btns{
        margin: 24px 0 0 0;
    }
    .btns span{
        display: inline-block;
        width: 90px;
        height: 36px;
        border:1px solid #ddd;
        text-align: center;
        cursor: pointer;
        line-height: 36px;
        border-radius: 3px;
        margin-left: 24px;
    }
    .qd{
        background: #3377ff;
        color:#fff;
        border:0!important
    }
</style>
