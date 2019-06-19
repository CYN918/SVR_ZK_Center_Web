<template>
    <div>
        <ADD v-if="ADD_material" :scMessage="scMessage" :id="id" :num="num" :ind="index" @listData="SCmessageData"></ADD>
        <uplodWl v-if='up' :id="id" :num="num" :ind="index" :scMessage="wlMessage"></uplodWl>
        <BDadd v-if="BD" :scMessage="scMessage" @dataList="dataList" :index="index"></BDadd>
        <AddWL v-if="wl" @dataMessage="dataMessage" :index="index" ></AddWL>
        <scwl v-if="scwl" @DMessage="DMessage" :index="index" ></scwl>
        <sct v-if="set" @listenToChildEvent="listenToChildEvent" :da="da" :index="index"></sct>
        <QD v-if="sh" :id="id"></QD>
        <BH v-if="bh" :dbid="dbid"></BH>
        <ywxq v-if="yw" :YWid="YWid"></ywxq>
        <scxq v-if="sc" :SCid="SCid"></scxq>
        <CK v-if='ck' :id="CkID"></CK>

        <div class="problem">
            <template>
                <el-table
                        :data="tableData"
                        header-align="center"
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
                        :row-key="row_key"
                        :expand-row-keys="Keys"
                        style="width: 100%;color:#000">
                    <el-table-column
                            label="需求类型" prop="demand_type"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            label="需求ID" prop="did"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            label="当前流程" prop="status_name"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            label="状态" prop="status"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            label="当前流转人员" prop="creator"
                            width="220">
                    </el-table-column>
                    <el-table-column
                            label="截止时间" prop="endtime"
                            width="200">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="props">
                            <el-button v-if="tableData[props.$index].status_name=='素材准备'" @click="getYW(tableData[props.$index].bdid)">查看需求</el-button>
                            <el-button v-if="tableData[props.$index].status_name=='上传物料'" @click="getYWSC(tableData[props.$index].bdid)">查看素材</el-button>
                            <el-button v-if="tableData[props.$index].status_name=='发布审核'||tableData[props.$index].status_name=='活动发布'" @click="getSC(tableData[props.$index].mdid)">查看需求</el-button>
                            <el-button v-if="tableData[props.$index].status_name=='物料审核'||tableData[props.$index].status_name=='测试验收'">查看物料</el-button>
                            <el-button @click="release(tableData[props.$index].did,tableData[props.$index].demand_type)" v-if="tableData[props.$index].status_name=='需求发布'">发布需求</el-button>
                            <el-button v-if="tableData[props.$index].status_name=='素材审核'">查看活动</el-button>
                            <el-button v-if="tableData[props.$index].status_name=='素材入库'">查看素材</el-button>
                            <el-button  @click="AddMaterial(props.$index)" v-if="tableData[props.$index].status_name=='素材准备'">添加素材</el-button>
                            <el-button   @click="AddWl(props.$index)" v-if="tableData[props.$index].status_name=='上传物料'">上传物料</el-button>
                            <el-button  @click="getSH(props.$index)" v-if="tableData[props.$index].status_name=='测试验收'">测试通过</el-button>
                            <el-button  @click="getSH(props.$index)" v-if="tableData[props.$index].status_name=='物料审核'||tableData[props.$index].status_name=='发布审核'">审核通过</el-button>
                            <el-button  v-if="tableData[props.$index].status_name=='完成入库'">查看投放结果</el-button>
                            <el-button  @click="getBH(props.$index)" v-if="tableData[props.$index].status_name!='完成投放'&&tableData[props.$index].status_name!='需求发布'&&tableData[props.$index].status_name!='提现审核'&&tableData[props.$index].status_name!='签字审核'&&tableData[props.$index].status_name!='结算汇款'&&tableData[props.$index].status_name!='补充签字'&&tableData[props.$index].status_name!='素材入库'">驳回</el-button>
                            <el-button   v-if="tableData[props.$index].status_name=='完成入库'">查看投放结果</el-button>
                            <el-button  @click="withdraw(tableData[props.$index].did)" v-if="tableData[props.$index].status_name=='提现审核'||tableData[props.$index].status_name=='签字审核'||tableData[props.$index].status_name=='结算汇款'||tableData[props.$index].status_name=='补充签字'">查看详情</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column type="expand" label="查看完整流程" width="200">
                        <template slot-scope="props">
                            <div>
                                <div class="step_box" v-for="(item,index) in tableData[props.$index].audit_process">
                                    <div class="step_wwc" v-if="item.did==undefined&&item.msg!='已驳回'&&tableData[props.$index].status!=item.status">{{item.status}}</div>
                                    <div class="step_dq" v-if="item.did==undefined&&item.msg!='已驳回'&&tableData[props.$index].status==item.status">{{item.status}}</div>
                                    <div class="step_bh" v-if="item.msg=='已驳回'">X</div>
                                    <div class="step" v-if="item.did!=undefined&&item.msg!='已驳回'">√</div>
                                    <div class="bor" v-if="item.isfinish==0"></div>
                                    <div class="step_tit" :class="{active:item.did==undefined&&tableData[props.$index].status!=item.status}">{{item.status_name}}</div>
                                    <div class="step_time" >{{item.updated_at}}</div>
                                    <div class="step_contnet" v-if="item.creator!=''||tableData[props.$index].status==item.status">
                                        <span class="step_txt">状态</span>
                                        <span>{{item.msg}}</span>
                                        <span v-if="tableData[props.$index].status==item.status">待处理</span>
                                    </div>
                                    <div class="step_contnet" v-if="item.creator!=''||tableData[props.$index].status==item.status">
                                        <span class="step_txt" v-if="item.status==1">来源</span>
                                        <span class="step_txt" v-if="item.status!=1">处理人</span>
                                        <span>{{item.creator}}</span>
                                    </div>
                                    <div class="step_contnet" v-if="item.creator!=''||tableData[props.$index].status==item.status">
                                        <span class="step_txt" v-if="index=='0'">需求内容</span>
                                        <span class="step_txt" v-if="index!='0'">处理结果</span>
                                        <span class="dj" @click="check(tableData[props.$index].demand_type,tableData[props.$index].did,item.status)">查看详情</span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>

    </div>
</template>

<script>
    import scxq from './sc_details'
    import ywxq from './yw_details'
    import BH from './reject'
    import QD from './workBench_auditor'
    import AddWL from './AddWl'
    import BDadd from './native_upload'
    import sct from './selectMaterial'
    import ADD from './ADD_material'
    import uplodWl from './uploadWL'
    import CK from './CKmaterial'
    import scwl from './wuliao'
    export default {
        components:{QD,BH,ADD,sct,BDadd,AddWL,ywxq,scxq,CK,uplodWl,scwl},
        props:['tableData','active'],
        name: "workbench-table",
        data(){
            return {
                sh:false,
                userData:'',
                bh:false,
                dbid:'',
                id:'',
                ADD_material:false,
                wl:false,
                set:false,
                BD:false,
                yw:false,
                sc:false,
                scMessage:[],
                wlMessage:[],
                num:'',
                rolesList:[],
                YWid:'',
                SCid:'',
                index:'',
                da:[],
                ck:false,
                CkID:'',
                up:false,
                scwl:false,
                Keys:[],

            }
        },

        mounted(){
            this.getData();
            // this.Keys.push(this.tableData[0].did);
        },
        methods:{
            row_key(row){
                // return row.did;
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(255,255,255,1);color:#1f2e4d;margin:0 24px;font-size:14px;font-weight:Medium;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'margin:0 24px;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            getSH(index){
                this.sh=true;
                this.id=this.tableData[index].did;
            },
            getWl(index){
                if(index!=undefined){
                    this.index=index;
                }
                this.wl = true;
            },
            HeidWl(){
                this.wl = false;
            },
            Getscwl(index){
                if(index!=undefined){
                    this.index=index;
                }
                this.scwl=true;
            },
            heidSCwl(){
                this.scwl=false;
            },
            AddMaterial(index){
                this.ADD_material =true;
                this.id = this.tableData[index].did;
                this.num = this.tableData[index].num;
            },
            AddWl(index){
                this.up = true;
                this.id = this.tableData[index].did;
                this.num = this.tableData[index].num;
                console.log(this.num);
            },
            heidAddWl(){
                this.up = false;
            },
            heidAddMaterial(){
                this.ADD_material = false;
            },
            getSet(index,data){
                if(data!=undefined){
                    this.da = data;
                    this.index = index;
                }

                this.set = true;
            },
            SCmessageData(a){
                this.scMessage=[];
                console.log(this.scMessage)
            },
            SCsc(){
                this.set = false;
            },
            getBD(index){
                if(index!=undefined){
                    this.index = index;
                }
                this.BD = true;
            },
            heidBD(){
                this.BD = false
            },
            getBH(){
                this.bh = true
            },
            heidBH(){
                this.bh = false
            },
            heidSH(){
                this.sh=false
            },
            getYW(id){
                this.yw = true;
                this.YWid = id;
            },
            heidYW(){
                this.yw = false
            },
            getSC(id){
                this.sc = true;
                this.SCid = id;
            },
            heidSC(){
                this.sc = false;
            },
            getBH(index){
                this.bh = true;
                this.dbid=this.tableData[index].did;
                console.log(this.dbid[0][0])

            },
            heidBH(){
                this.bh = false
            },
            withdraw(id){
                this.$router.push({
                    query:{
                        id:id,
                    },
                    path:'/workbench/Billing_details'
                })
            },
            getData(){
                console.log(this.tableData);
                let params = {
                    email:localStorage.getItem('userAd'),
                };
                this.api.get_account({params}).then((datas)=>{
                    this.userData = datas;
                    var rolesList=[];
                    for(let i=0;i<this.userData.roles.length;i++){
                        rolesList.push(this.userData.roles[i].role_name);
                    }
                    this.rolesList=rolesList;
                });
            },
            listenToChildEvent(a,index){
                this.scMessage[index] = a;
                this.index = index;
                console.log(this.scMessage)
            },
            dataList(b,index){
               this.scMessage[index] =b;
                console.log(this.scMessage[index])
            },
            dataMessage(data,index){
                this.scMessage[index] = data;
                console.log(index);
                console.log(this.scMessage[index])
            },
            DMessage(data,index){
                this.wlMessage[index] = data;
                console.log(index);
                console.log(this.wlMessage[index])
            },
            release(id,type){
                if(type=='demand_business'){
                    this.$parent.getSC(id);
                }else {
                    this.$parent.getYW(id);
                }
            },
            check(type,id,status){
                if(type=='业务需求'){
                    if(status ==1){
                        this.getYW(id);
                    }
                }
                if(type=='素材需求'){
                    if(status ==1){
                        this. getSC(id);
                    }
                }

            },
            getYWSC(id){
                this.ck=true;
                this.CkID= id;
            },
            heidCK(){
                this.ck=false;
            }
        },
        watch:{
            scMessage:function (oldval) {
                console.log(oldval)
            }
        }
    }
</script>

<style scoped>
.step_box{
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}

.step,.step_bh,.step_dq,.step_wwc{
    width:32px;
    height:32px;
    background:rgba(51,119,255,0.2);
    line-height: 32px;
    text-align: center;
    color: #2E5BFF;
    border-radius: 50%;
    margin-bottom: 12px;
    display: inline-block;
}
.step_wwc{
    line-height: 30px!important;
}
.step_bh{
    background:#E4393C!important;
    color: #fff!important;
}
.step_dq{
    background:rgba(51,119,255,1)!important;
    color: #fff!important;
}
.step_wwc{
    background: transparent!important;
    border:2px solid rgb(178, 188, 191);
    color: rgba(178, 188, 191,1)!important;
}
.step_tit{
    width:96px;
    height:22px;
    font-size:14px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:#3377ff;
}
.step_time{
    width:130px;
    height:22px;
    font-size:12px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(143,155,179,1);
    margin-bottom: 10px;
}
.step_contnet{
    margin-bottom: 10px;
}
.step_txt{
    display: inline-block;
    width:56px;
    height:22px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(143,155,179,1);
    margin-right: 16px;
}
    .dj{
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#3377ff;
        cursor: pointer;
    }
    .active{
        color: #8f9bb3!important;
        background: transparent!important;
    }
    .bor{
        border: 0.5px solid #e6e9e0;
        width: 204px;
        display: inline-block;
        margin: 0 18px;
    }
</style>