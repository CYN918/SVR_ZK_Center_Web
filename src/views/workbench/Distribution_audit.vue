<template>
    <div >
        <div style="background:#fff;margin-top:190px;" class='rePadding'>
            <template>
                <el-table
                    ref="tab"
                    :data="tableData"
                    style="width: 100%"
                    :header-cell-style="getRowClass"
                    :cell-style="cell"
                    >
                    <el-table-column
                        prop="server_addr"
                        label="服务器地址">
                            <template slot-scope="scope">
                                <span>{{tableData[scope.$index].server_addr==''?'--':tableData[scope.$index].server_addr}}</span>
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
        <loading v-if='load'></loading>
    </div>
</template>

<script>
import loading from '../../components/loading'

export default {

components: {loading},
data() {

return {
       tableData:[],
        page:1,
        p:10,
        total:0,
        load:true,
};
},

methods: {
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
                this.getData()
                
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getData()
            },   
             
           
           getData(){
               let params={
                   p:this.p,
                   page:this.page,
                }
               this.api.ctrlapi_dispatch_servers({params}).then((res)=>{
                   this.tableData=res.data;
                   this.total=res.total;
                   this.load = false;
                //    this.$previewRefresh()
               })
           },
            
},

created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    //  this.getChannel();
     this.getData()
},

}
</script>
<style  scoped>

</style>