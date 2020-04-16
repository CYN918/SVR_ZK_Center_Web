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
                <input type="text" v-model="porject_id">
                <span class='fc_statuc' v-if='state1==""'>设计师ID：</span>
                <input type="text" v-model="id" v-if='state1==""'  @change="sJsID()">
                <span class='fc_statuc'  v-if='id==""'>结算方</span>
                    <el-autocomplete
                        v-if='id==""'
                        class="inline-input"
                        v-model="state1"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        @select="handleSelect"
                        >
                    </el-autocomplete>
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
                                label="项目ID" prop="project_id"
                                :show-overflow-tooltip="true"
                               >
                        </el-table-column>
                        <el-table-column
                                label="设计师ID" prop="open_id"
                                :show-overflow-tooltip="true"
                                >
                        </el-table-column>
                        <el-table-column
                                label="初始预约金" prop="advance_payment"
                                >
                        </el-table-column>
                        <el-table-column
                                label="预约金余额" prop="advance_payment_left"
                                 :show-overflow-tooltip="true"
                                >
                        </el-table-column>
                        <el-table-column label="更新时间" prop="updated_at">
                            
                        </el-table-column>
                         <el-table-column label="操作" prop="">
                             <template slot-scope="props">
                                <el-button type="text"  @click='jump(tableData[props.$index].project_id,tableData[props.$index].open_id,tableData[props.$index].account_name,tableData[props.$index].advance_payment,tableData[props.$index].advance_payment_left)'>查看详情</el-button>
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
                    
                    p:10,
                    page:1,
                    total:0,
                    tableData:[{time:2020}],
                    list:[],
                    porject_id:"",
                    open_id:"",
                    state1:"",
                    restaurants: [],
                    id:"",
                }
            },
            mounted(){
                this.listData()
            },
            methods:{
                cz(){
                    this.id="";
                    this.porject_id="";
                    this.open_id="";
                    this.state1='';
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
                    let params={open_id:this.open_id,porject_id:this.porject,account_name:this.account_name,p:this.p,page:this.page};
                    this.api.ds_advance_payment_list({params}).then((res)=>{
                        this.tableData=res.data;
                        this.total=res.total;
                         this.getData();
                         this.getDlist();
                    })
                },
                 getData(){
                    let params={is_receiver:1};
                    this.api.settle_settlement({params}).then((res)=>{
                        this.list=res;
                    })
                },
                 getDlist(){
                    this.api.designer_settlement_list().then((res)=>{
                        this.restaurants=res;


                    })
                },
                 querySearch(queryString, cb) {
                    for(var i =0;i<this.restaurants.length;i++){
                        if(this.restaurants[i].contribute_type==1){
                            this.restaurants[i].value=this.restaurants[i].name+this.restaurants[i].id_card
                        }
                        if(this.restaurants[i].contribute_type==2){
                            this.restaurants[i].value=this.restaurants[i].company_name+this.restaurants[i].code
                        }
                    }
                    var results = queryString ? this.restaurants.filter(this.createFilter(queryString)) : this.restaurants;
                    cb(results);
                },
                createFilter(queryString) {
                    return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                    };
                },
                handleSelect(item) {
                    this.open_id=item.open_id
                },
                 sJsID(){
                    this.open_id=this.id;
                },
                jump(porject_id,open_id,data,money,ye){
                    this.$router.push({
                        path:"./Advance_details",
                        query:{
                            porject_id:porject_id,
                            open_id:open_id,
                            account_name:data,
                            money:money,
                            ye:ye
                        }
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