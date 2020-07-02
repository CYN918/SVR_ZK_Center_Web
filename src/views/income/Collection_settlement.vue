<template>
    <div >
        <div class='screening'>
            <span class="tlename">年月筛选</span>
            <div class="date"> 
                <el-date-picker
                    class='time_length'
                    v-model="tdate"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    value-format="yyyy-MM"
                    end-placeholder="结束月份"
                    @change="changeDate">
                </el-date-picker>
            </div>
        </div>
        <div style="margin-top:85px;background:#fff;padding-bottom:30px" class='rePadding'>
            <template>
                <el-table
                ref="tab"
                :data="tableData"
                style="width: 100%"
                :header-cell-style="getRowClass"
                :cell-style="cell">  
                    <el-table-column
                        prop="month"
                        label="年月份">
                    </el-table-column>
                    <el-table-column
                        prop="estimate_amount"
                        label="计提金额">
                    </el-table-column>
                    <el-table-column
                        prop="updated_at"
                        label="更新时间">
                        <template slot-scope="scope">
                            <span>{{tableData[scope.$index].updated_at==''?'--':tableData[scope.$index].updated_at}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="updator"
                        label="操作人员">
                        <template slot-scope="scope">
                            <span>{{tableData[scope.$index].updator==''?'--':tableData[scope.$index].updator}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button  type="text" size="small" @click="details(scope.$index)">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <div class="block" style="margin-bottom:0">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page"
                    :page-sizes="[50, 100, 150, 200]"
                    :page-size="p"
                    layout="total, sizes, prev, pager, next, jumper"
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
                tdate:'',
                tableData:[],
                page:1,
                p:50,
                total:0,
                load:false,
            };
        },
        methods: {
            getRowClass({row, column, rowIndex}) {
                if (rowIndex === 0) {
                    return 'background:#f7f9fc;color:#1F2E4D;font-size:14px;font-weight:bold;height:48px;font-family:PingFang-SC-Regular;text-align: center;'
                } 
                else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align: center;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.page = 1;
                this.getData();
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getData();   
            },  
            handleSelectionChange(val) {
                this.value= val;
            },  
                    
            details(index){
                this.$router.push({
                    path:"./add_nb_detail",
                    query:{
                        is_receiver:1,
                        tdate:this.tableData[index].month,
                    }
                })
            },
            getData(){
                this.load = true;
                let params={p:this.p,page:this.page,is_receiver:1,start_month:this.tdate[0],end_month:this.tdate[1]}
                this.api.settle_estimate_list({params}).then((res)=>{
                    this.tableData=res.data;
                    this.total=res.total;
                    this.load = false;
                    this.mJs.scTop(0);
                })
            },
            changeDate(){
                this.getData();
            }
                    
        },

        created() {

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.getData();
        },

    }
</script>
<style  scoped>
    input{
        width: 150px;
        border-radius: 3px;
        height: 35px!important;
        padding-left: 3px!important;
        border: 1px solid rgba(211,219,235,1)!important;
        margin-left: 20px;
    }
    .tlename{
        margin-left: 20px;
    }
    .qdName{
        display: inline-block;
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(50,50,50,1);
        margin-left: 40px
    }
    select{
        margin-left: 20px;
        width: 200px;
        height: 36px;
        border-radius: 5px;
    }
    .userGl{
        float: right;
        display: inline-block;
        height: 36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
        width: 144px;
        background: rgba(242,246,252,1);
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(61,73,102,1);
        margin: 10px 20% 0 0 
    }
    .screening{
        position: relative;
        width: 100%;
        height: 60px;
        top:75px;
        background: #fff;
    }
    .date{
        margin:10px 12px 0 24px;
        display: inline-block;
    }
    .btn_sx{
        display: inline-block;
        float:right;
        margin: 0px 80px 0 0; 
    }
    .cx{
        display: inline-block;
        height: 36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
        width: 68px;
        background: rgba(51,119,255,1);
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255,255,255,1);
        margin-right: 20px;
    }
    .cz,.dc{
        display: inline-block;
        height: 36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
            width: 144px;
        background: rgba(242,246,252,1);
        border: 1px solid rgba(211,219,235,1);
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(61,73,102,1);
    }
    .dc{
        width: 68px!important;
        margin-left: 20px
    }
    .bg{
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
    }
    .content{
        width: 400px;
        min-height:180px;
        position: absolute;
        top:30%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 2px;
    }
    .con_tit{
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #ddd;
    }
    .con_tit span{
        display: inline;
        margin-left: 24px;
        display: inline-block;
        line-height: 40px;
        font-size: 18px;
        font-weight: 500;
    }
    .sel{
        margin: 20px 0;
    }
    .sel select{
        width: 200px;
        height: 36px;
        margin-left: 24px;
        border-radius: 5px;
    }
    .sel_1{
        margin: 30px 0 0px 24px;
    }
    .aaa{
        display: block!important;
        margin: 0 0 15px 0 !important
    }
    .bb span{
        vertical-align: top;
    }
    .bb textarea{
        padding: 5px
    }
    .sel_btn{
        width: 100%;
        height: 50px;
        text-align: right;
    }
   .sel_btn span{
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
        margin-top: 7px
   }
   .sel_btn_qd{
        border: 0!important;
        background: rgba(51,119,255,1)!important;
        color: rgb(110, 83, 83)!important;
   }
   .qud{
       display: inline-block;
       padding: 5px;
       border:1px solid  rgba(51,119,255,1);
       text-align: center;
       color: rgba(51,119,255,1);
       border-radius: 5px;
       line-height: 1!important;
       margin-left: 10px;
       position: absolute;
       left: 173px;
       top:47px
   }
   
   
</style>