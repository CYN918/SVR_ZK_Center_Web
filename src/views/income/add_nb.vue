<template>
    <div class="template">
       <div class="top_name">   
            <span class="top_txt" @click='fh(-1)' v-if="this.$route.query.type == 'add_jt'&&this.$route.query.is_receiver == 1">计提数据管理   /   收款计提数据详情   /   添加计提数据</span><div style="width:0;height:0;"><br/></div>
            <span class="top_txts" style="width: 113px;display: inline-block;" v-if="this.$route.query.type == 'add_jt'&&this.$route.query.is_receiver == 1">添加计提数据</span>
            <span class="top_txt" @click='fh(-1)' v-if="this.$route.query.type == 'add_jt'&&this.$route.query.is_receiver == 0">计提数据管理   /   付款计提数据详情   /   添加计提数据</span><div style="width:0;height:0;"><br/></div>
            <span class="top_txts" style="width: 113px;display: inline-block;" v-if="this.$route.query.type == 'add_jt'&&this.$route.query.is_receiver == 0">添加计提数据</span>
            <span class="top_txt" @click='fh(-1)'  v-if="this.$route.query.type != 'add_jt'">计提数据管理  / 新增计提数据</span><div style="width:0;height:0;"><br/></div>
            <span class="top_txts" style="width: 113px;display: inline-block;"  v-if="this.$route.query.type != 'add_jt'">新增计提数据</span>
            <span class='qud1'>{{this.$route.query.tdate}}</span>
        </div>
        <div class='screening'>
            <span class="tlename">结算时间段：</span>
            <div class="date">
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
            <span class="tlename">结算单ID：</span>   
            <el-input v-model="settle_id" placeholder="请输入内容"></el-input>
            <span class="tlename">结算单名称：</span>   
            <el-input v-model="settle_name" placeholder="请输入内容"></el-input>
            <div class="btn_right">
                <span class='cx' @click='getData()'>查询</span>
                <span @click='cz()'>重置</span>
                <span @click='jump()' class="add" style="position: relative;">添加至计提数据</span>
            </div>   
        </div>
        <div style="margin-top:85px;background:#fff;padding-bottom:30px" class='rePadding'>
            <template>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    :header-cell-style="getRowClass"
                    :cell-style="cell"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column> 
                    <el-table-column
                        prop="id"
                        label="结算单ID">
                    </el-table-column>
                    <el-table-column
                        prop="demand_name"
                        :show-overflow-tooltip="true"
                        label="结算单名称"> 
                        <template slot-scope="scope">
                            <span>{{tableData[scope.$index].check.check1.statement}}</span>
                        </template>   
                    </el-table-column>
                    <el-table-column 
                        prop="status"
                        :show-overflow-tooltip="true"   
                        label="结算时间段">
                        <template slot-scope="scope">
                            <span>{{(tableData[scope.$index].check.check1.tstart).split('-').join('/')}}至</span>
                            <span>{{(tableData[scope.$index].check.check1.tend).split('-').join('/')}}</span>
                        </template>      
                    </el-table-column>
                    <el-table-column
                        prop="check.expect_amount"
                        label="预计结算金额">
                        <template slot-scope="scope">
                            <span v-if="tableData[scope.$index].check.check2">{{(tableData[scope.$index].check.check2.expect_amount).toLocaleString("zh-Hans-CN",{style:'currency',currency:'CNY'})}}</span>
                        </template>
                    </el-table-column>  
                    <el-table-column
                        prop="check.real_amount"
                        label="实际结算金额">
                        <template slot-scope="scope">
                            <span v-if="tableData[scope.$index].check.check3">{{(tableData[scope.$index].check.check3.real_amount).toLocaleString("zh-Hans-CN",{style:'currency',currency:'CNY'})}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="remit.receive_amount"
                        label="实际到账金额"
                        v-if="this.$route.query.is_receiver == 1">
                        <template slot-scope="scope" v-if="tableData[scope.$index].remit!=null">
                            <span :class="{red:tableData[scope.$index].remit.receive_amount!=tableData[scope.$index].check.check2.real_amount}">{{(tableData[scope.$index].remit.receive_amount).toLocaleString("zh-Hans-CN",{style:'currency',currency:'CNY'})}}</span>
                        </template>
                    </el-table-column> 
                    <el-table-column
                        prop="remit.receive_amount"
                        label="实际出账金额"
                        v-if="this.$route.query.is_receiver == 0">
                        <template slot-scope="scope" v-if="tableData[scope.$index].remit!=null">
                            <span :class="{red:tableData[scope.$index].remit.receive_amount!=tableData[scope.$index].check.check2.real_amount}">{{(tableData[scope.$index].remit.receive_amount).toLocaleString("zh-Hans-CN",{style:'currency',currency:'CNY'})}}</span>
                        </template>
                    </el-table-column>      
                </el-table>
            </template>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page"
                    :page-sizes="[10, 50, 100, 200]"
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
                p:10,
                total:0,
                settle_id:'',
                load:true,
                settle_name:'',
                multipleSelection:[],
                settle_ids:[],
            }
        },
        methods: {
            cz(){
                this.tdate = '';
                this.id = '';
                this.statement = '';
            },
            jump(){
                if(this.multipleSelection.length == 0){
                    this.$message({
                        message: '请勾选计提数据',
                        type: 'warning'
                    });
                    return false
                }
                let formData =new FormData;
                formData.append('is_receiver',this.$route.query.is_receiver);
                formData.append('month',this.$route.query.tdate);
                formData.append('settle_ids',JSON.stringify(this.settle_ids));
                this.api.settle_estimate_add(formData).then((res)=>{
                    if(res != false){
                        this.getData();
                        this.$message({
                            message: res,
                            type: 'success'
                        });
                    } 
                })

            },
            fh(index){
                this.$router.go(index)
            },
            getRowClass({row, column, rowIndex}) {
                if (rowIndex === 0) {
                    return 'background:#f7f9fc;color:#1F2E4D;font-size:14px;font-weight:bold;height:48px;font-family:PingFang-SC-Regular;'
                } 
                else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
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
                this.multipleSelection = val;
                let arr = [];
                this.multipleSelection.forEach(element => {
                    arr.push(element.id)
                });
                this.settle_ids = this.unique(arr)
            },
            unique(arr){
                for(var i=0; i<arr.length; i++){
                    for(var j=i+1; j<arr.length; j++){
                        if(arr[i]==arr[j]){         //第一个等同于第二个，splice方法删除第二个
                            arr.splice(j,1);
                            j--;
                        }
                    }
                }
                return arr;
            }, 
            getData(){
                this.load = true;
                let params={
                    p:this.p,
                    page:this.page,
                    is_receiver:this.$route.query.is_receiver,
                    start_month:this.tdate[0],
                    end_month:this.tdate[1],
                    settle_id:this.settle_id,
                    settle_name:this.settle_name,
                } 
                this.api.settle_estimate_settle_list({params}).then((res)=>{
                    this.tableData=res.data;
                    this.total=res.total;
                    this.load = false;
                    this.mJs.scTop(0);
                })
            },
            changeDate(){

            }
                    
        },

        created() {
        

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.getData()
        },

    }
</script>
<style  scoped>
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
       
    }
    .compile{
        position: absolute;
        top:50%;
        left:50%;
        width:550px;
        min-height: 200px;
        max-height: 800px;
        overflow-y: auto;
        background: #fff;
        transform: translate(-50%,-50%);
        border-radius: 5px;
    }
    .ts{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
    }
    .ts span{
        font-size: 14px;
        font-weight: bold;
        margin-left: 24px;
        display: inline-block;
        line-height: 50px;

    }
    .regulation{
        padding: 0 24px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
    }
    .el-input{
        width: 180px;
    }
    .regulation>div{
        margin-bottom: 16px;
    }
    .titName{
        display: inline-block;
        width:140px;
        text-align: right;
    }
    .btn_right{
        display: inline-block;
        float:right;
        padding-top: 10px;
        padding-right: 15px;
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
  .top_name{
        height: 100px;
        border: 0;
    }
.top_txts{
    margin-left: 24px;
    font-size: 18px;
    font-family: PingFang-SC;
    font-weight: 500;
    line-height: 30px;
    color: rgba(31,46,77,1);
    display: block;
    margin-top: 10px;
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
    margin-top: -10px!important
}
.screening{
    position: relative;
    width: 100%;
    height: 60px;
   top:75px;
    background: #fff
}
.date{
        margin:10px 12px 0 24px;
        display: inline-block;
    }
    .btn_sx{
        display: inline-block;
        float:right;
        margin: 10px 20% 0 0 
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
        max-height:400px;
        position: absolute;
        top:30%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 10px;
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
       text-align: left;
       margin-top: 35px;
       border-top: 1px solid #ddd;
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
    color: rgba(255,255,255,1)!important;
    margin-left: 40px;
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
   .qud1{
       display: inline-block;
       padding: 5px;
       border:1px solid  rgba(51,119,255,1);
       text-align: center;
       color: rgba(51,119,255,1);
       border-radius: 5px;
       line-height: 1!important;
       margin-left: 10px;
       position: absolute;
       left: 170px;
       top:47px
   }
    .top_txt{
        cursor: pointer; margin-left: 24px;
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153,153,153,1);
        line-height: 20px!important;
        margin-top: 15px
    }
    .select{
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
        margin: 10px 20% 0 0;
    }
    .boxT{
        display: block;
        width: 100%;
        height: 100%;  
    }
    .boxT > input{
        display: none;
        width: 80px;
        height: 25px;
    }
    .template >>> .el-textarea{
        width: 100%;
    }
    .template >>> select{
        margin-left: 0px;
    }
    .template >>> .el-button--primary{
        background: #155BD4;
    }
    .add{
        width: 120px!important;
    }
    .tlename{
        margin-left: 20px;
    }
    .red{
        color: red;
    }
   
</style>