
<template>
<div class='base'>
    <div>
        <span>日期：</span>
         <div class="date">
                <el-date-picker
                    v-model="date"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
        </div>
        <div class='operation'>
            <span class='cx'>查询</span>
            <span class='mun' @mousemove="unfold()" @mouseout="fold()">...
                <div class='tree' v-if="show">
                    <div>导入原始数据</div>
                    <div>导出替换数据</div>
                    <div>批量上传</div>
                    <!-- <div>导入结果数据</div> -->
                    <div @click='jump()'>操作记录</div>
                </div>
            </span>
        </div>
    </div>
    <div style="margin:24px 0">
         <template>
                    <el-table
                            ref="tab"
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            >

                        <el-table-column
                                prop="num"
                                label="序号">
                            <template slot-scope="scope">
                                <span>{{scope.$index+1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="sdkid"
                                label="原始图">
                        </el-table-column>
                        <el-table-column
                                prop="count"
                                label="落地页">
                        </el-table-column>
                         <el-table-column
                                prop="status"
                                label="状态">
                        </el-table-column>
                         <el-table-column
                                prop="count"
                                label="更新时间">
                        </el-table-column>
                         <el-table-column
                                prop="count"
                                label="操作人员">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                               
                        >
                            <template slot-scope="scope">
                                 <el-button  type="text" size="small" v-clipboard:copy="tableData[scope.$index].copy_file_name" v-clipboard:success="onCopy"   v-clipboard:error="onError">复制命名</el-button>
                                <el-button  type="text" size="small" @click='details()'>查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
    </div>
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
</template>

<script>

export default {

components: {},
data() {

return {
        date:'',
        show:false,
        tableData:[{count:"2020-1-10"}],
        p:10,
        page:1,
        total:0,        
        };
},

computed: {},

watch: {},

methods: {
        unfold(){
            this.show=true;
        },
        fold(){
            this.show=false
        },
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
        jump(){
            this.$router.push({
                path:"./record"
            })
        },
        details(){
            this.$router.push({
                path:"./Offline_details"
            })
        },
         onCopy() {
               this.$message.success('复制成功')
        },
        onError() {
            this.$message.error('复制失败')
        },
},

mounted() {

},

}
</script>
<style  scoped>
.base{
    background: #fff;
    padding: 24px;
}
.date{
        margin-right: 12px;
        display: inline-block;
    }
.operation{
    display: inline-block;
    float:right;
} 
.operation span{
     margin-right: 24px;
    display: inline-block;
    width: 68px;
    height: 36px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border: 1px solid rgba(211,219,235,1);
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(61,73,102,1);
    line-height: 36px;
    cursor: pointer;
    text-align: center;
    position: relative;
}   
.cx{
    border: 0!important;
    background: rgba(51,119,255,1)!important;
    color: rgba(255,255,255,1)!important;
}
.tree{
    width: 100px;
    position: absolute;
    top:36px;
    left: -15px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgb(155, 154, 154);
    z-index: 9999
}
.tree>div{
    height: 36px;
    text-align: center;
    line-height: 36px;
    border-bottom: 1px solid #ddd;
}
.tree>div:hover{
    background: rgba(51,119,255,1);
    color: #fff;
}
</style>