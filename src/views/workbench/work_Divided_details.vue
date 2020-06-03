<template>
   <div>
        <div class="top_name">
            <span class="top_txt" @click='fh(-1)'  v-if='this.$route.query.siid!=undefined'>待处理&nbsp;/&nbsp;</span>
            <span class="top_txt">分成详情</span>
            <div class="title_left">
                <span>分成详情</span>
                <span class='time'>{{this.$route.query.tdate}}</span>
                <span class='zt' :class='{red:this.status==0||this.status==-1}'>({{this.status==0?"待确认":this.status==1?'审核中':this.status==2?'已确认':this.status==-1?'审核不通过':''}})</span>
            </div>
        </div>
        <div class='content'>
            <div>
                <span class='fc_statuc'>设计师ID</span>
                <input type="text" v-model="open_id" placeholder="请输入">
                <span class='fc_statuc'>结算方</span>
                 <el-autocomplete
                    class="inline-input"
                    v-model="state1"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    @select="handleSelect"
                    >
                </el-autocomplete>
                <div class="btn_right">
                    <span class='cx' @click='getDataList()'>查询</span>
                    <span class='cz' @click='cz()'>重置</span>
                    <!-- <span @click='jeqr()' v-if='this.status==0&&this.$route.query.siid==undefined'>确认金额</span> -->
                    <span v-if='this.status==1' @click='setTG()'>审核通过</span>
                    <span v-if='this.status==1' @click='setDataBH()'>审核不通过</span>
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
                                label="设计师ID" prop="open_id"
                                :show-overflow-tooltip="true"
                               >
                        </el-table-column>
                        <el-table-column
                                label="分成金额" prop="final_income"
                                >
                                 <template slot-scope="scope">
                                    <span>{{"￥"+tableData[scope.$index].final_income}}</span>
                                </template>   
                        </el-table-column>
                        <el-table-column
                                label="加成比例" prop="gain_share_rate"
                                >
                                <template slot-scope="scope">
                                    <span>{{tableData[scope.$index].gain_share_rate+'%'}}</span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                sortable
                                label="加成金额" prop="gain_share_income"
                                >
                                 <template slot-scope="scope">
                                    <span>{{"￥"+tableData[scope.$index].gain_share_income}}</span>
                                </template> 
                        </el-table-column>
                         <el-table-column
                                label="结算金额" prop="total_income"
                                >
                                  <template slot-scope="scope">
                                    <span>{{"￥"+tableData[scope.$index].total_income}}</span>
                                </template> 
                        </el-table-column>
                         <el-table-column
                                sortable
                                label="抵消预约金" prop="advance_payment_income"
                                >
                                 <template slot-scope="scope">
                                    <span>{{"￥"+tableData[scope.$index].advance_payment_income}}</span>
                                </template> 
                        </el-table-column>
                          <el-table-column
                                sortable
                                label="付款金额" prop="payment_income"
                                >
                                 <template slot-scope="scope">
                                    <span>{{"￥"+tableData[scope.$index].payment_income}}</span>
                                </template> 
                        </el-table-column>
                          <el-table-column
                                v-if='this.$route.query.status!=0'
                                sortable
                                label="付款时间" prop="updated_at"
                                >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="props">
                                <el-button type="text" @click="ck(tableData[props.$index].open_id,tableData[props.$index].account_name)" >查看详情</el-button>
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
        <div class='bg' v-if='show'>
            <div class='qrbox'>
                    <div class='tit_name'>
                        <span>确认金额</span>
                    </div>
                    <div class='lr'>
                        <span>以当前数据提交至工作台审核分成金额，是否确认？</span>
                    </div>
                    <div class='btns'>
                        <span class='qr' @click='qrMoney()'>确认</span>
                        <span @click='heid()'>取消</span>
                    </div>
            </div>
        </div>
        <div class="bg" v-if='bh'>
            <div class="cont">
                <div class="tit">
                    <span>驳回</span>
                </div>
                <div class="tishi">
                    <textarea placeholder="请输入驳回原因" v-model="note" maxlength="20"></textarea>
                </div>
                <div class="btn">
                    <span class="btn_qd" @click="tj()">确定</span>
                    <span  @click="sq()">取消</span>
                </div>
            </div>
        </div>
        <div class='bg' v-if='tg'>
            <div class='qrbox'>
                    <div class='tit_name'>
                        <span>审核通过</span>
                    </div>
                    <div class='lr'>
                        <span>审核通过后，将会按照分成金额给狮圈用户同步增加对应余额。</span>
                    </div>
                    <div class='btns'>
                        <span class='qr' @click='setData()'>确认</span>
                        <span @click='heidTG()'>取消</span>
                    </div>
            </div>
        </div>
    <load v-if="load"></load>
   </div>
</template>

<script>
import load from '../../components/loading'
export default {
    components:{load},
            data(){
                return{
                    value1:"",
                    p:10,
                    page:1,
                    total:0,
                    tableData:[{time:2020}],
                    show:false,
                    list:[],
                    account_name:'',
                    open_id:"",
                    state1:"",
                    status:'',
                    bh:false,
                    note:"",
                    load:true,
                    tg:false
                }
            },
            created(){
                this.getDataList()
            },
            
            methods:{
                fh(index){
                    this.$router.go(index)
                },
                getDetails(){
                    let params={type:this.$route.query.type,tdate:this.$route.query.tdate}
                    this.api.sharing_data_income_status({params}).then((res)=>{
                        this.status=res.status;
                    })
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
                dr(){
                    this.$router.push({
                        path:"./exports"
                    })
                },
                jeqr(){
                    this.show=true;
                },
                heid(){
                    this.show=false
                },
                heidTG(){this.tg=false},
                setTG(){this.tg=true},
                setDataBH(){
                    this.bh=true
                },
                sq(){
                    this.bh=false;
                    this.note=''
                },
                ck(id,account_name){
                    this.$router.push({
                        path:"./work_Divided_details_money",
                        query:{
                            type:this.$route.query.type,
                            open_id:id,
                            tdate:this.$route.query.tdate,
                            account_name:account_name,
                            siid:this.$route.query.siid
                        }
                    })
                },
                getDataList(){
                    this.load=true
                    let params={type:this.$route.query.type,tdate:this.$route.query.tdate,open_id:this.open_id,account_name:this.account_name,p:this.p,page:this.page}
                    this.api.sharing_data_income_designer({params}).then((res)=>{
                        this.total=res.total;
                        this.tableData=res.data;
                        this.load=false
                        this.getData();
                        this.getDetails()
                    })
                },
                getData(){
                    this.api.designer_settlement_list().then((res)=>{
                        this.restaurants=res;

                    })
                },
                cz(){
                    this.account_name='';
                    this.open_id=''
                },
                qrMoney(){
                    let formData =new FormData;
                    formData.append('type',this.$route.query.type);
                    formData.append('tdate',this.$route.query.tdate);
                    this.api.sharing_data_income_confirm(formData).then((res)=>{
                        if(res!=false){
                            this.getDetails()
                            this.heid()
                        }
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
                    this.account_name=item.open_id
                },
                // setData(check_status){
                //     let formData =new FormData;
                //     formData.append('type',this.$route.query.type);
                //     formData.append('siid',this.$route.query.siid);
                //     formData.append('check_status',check_status);
                //     this.api.sharing_data_income_demand_audit(formData).then((res)=>{
                //         if(res!=false){
                //             this.getDataList();
                //         }
                //     })
                // },
                setData(){
                    let formData =new FormData;
                    formData.append('type',this.$route.query.type)
                    formData.append('id',this.$route.query.siid);
                    formData.append('status',this.$route.query.status);
                    this.api.demand_audit(formData).then((res)=>{
                             if(res!=false){
                             this.getDataList();
                             this. heidTG();
                        }
                    })
                },
                tj(){
                     if(!this.note){
                         this.$message.error('驳回原因不能为空');
                         return
                     }
                    let formData =new FormData;
                    formData.append('type',this.$route.query.type)
                    formData.append('id',this.$route.query.siid);
                    formData.append('status',this.$route.query.status);
                    formData.append('note',this.note);
                    this.api.demand_reject(formData).then((res)=>{
                        if(res!=false){
                             this.getDataList();
                             this.sq()
                         }
                    }) 
                },
            },
            //     tj(){
            //         if(!this.note){
            //             this.$message.error('驳回原因不能为空');
            //             return
            //         }
            //         let formData =new FormData;
            //         formData.append('type',this.$route.query.type);
            //         formData.append('siid',this.$route.query.siid);
            //         formData.append('check_status',2);
            //         formData.append('note',this.note);
            //         this.api.sharing_data_income_demand_audit(formData).then((res)=>{
            //             if(res!=false){
            //                 this.getDataList();
            //                 this.sq()
            //             }
            //         })
            //     },
            // },
             watch:{
                state1:function(val,oldVal){
                    if(val==''){
                        this.account_name=''
                    }
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
    .fc_statuc{
        display: inline-block;
        margin:24px  15px 24px 24px;

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
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
    }
    .qrbox{
        width: 450px;
        height: 200px;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        border-radius: 3px;
        background: #fff;
    }
    .tit_name{
        width: 100%;
        height: 40px;
        border:1px solid #ddd;
    }
    .tit_name span{
        display: inline-block;
        margin-left: 24px;
        line-height: 40px;
        font-size: 14px;
        font-weight: bold;
    }
    .lr{
        margin: 30px 24px 30px 24px;
    }
    .lr span{
        margin-left: 24px;
        font-size: 14px;
    }
    .btns{
        float:right;
    }
    .btns span{
            width: 90px;
            height: 36px;
            display: inline-block;
            border:1px solid #ddd;
            text-align: center;
            line-height: 36px;
            border-radius: 3px;
            margin-right: 24px;
            cursor: pointer;
    }
    .qr{
        background: #3377ff;
        border:0px!important;
        color:#fff;

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
    .zt{
       font-size: 14px!important;
        font-weight: 400!important; 
    }
    .red{
        color: red!important;
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
    .cont{
        position: absolute;
        left: 50%;
        top:30%;
        transform: translate(-50%,-50%);
        width:588px;
        height:380px;
        background:rgba(255,255,255,1);
        border-radius:4px;

    }
    .tit{
        height: 56px;
        border-bottom: 1px solid #ddd;
    }
    .tit>span{
        display: inline-block;
        line-height: 56px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-left: 24px;
    }
    .tishi textarea{
        width:520px;
        height:180px;
        padding: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        resize: none;
        margin: 23px 0 0 23px;
    }
    .tishi span{
        display: inline-block;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-top: 15px;
        margin-left: 24px;
    }
    .btn{
         margin-top: 50px;
         text-align: right;
        margin-bottom: 10px;
     }
    .btn span{
        display: inline-block;
        width:68px;
        height:36px;
        line-height: 36px;
        text-align: center;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-right: 24px;
        cursor: pointer;
    }
    .btn_qd{
        background:rgba(51,119,255,1)!important;
        border: 0!important;
        color:rgba(255,255,255,1)!important;
        margin-right: 14px!important;
    }
</style>