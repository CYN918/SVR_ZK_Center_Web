<template>
    <div>
        <ADD v-if="ADD_material" :scMessage="scMessage" :id="id" :num="num"></ADD>
        <BDadd v-if="BD" :scMessage="scMessage" @listen="listen"></BDadd>
        <AddWL v-if="wl" :scMessage="scMessage"></AddWL>
        <sct v-if="set" @listenToChildEvent="listenToChildEvent" ></sct>
        <QD v-if="sh" :id="id"></QD>
        <BH v-if="bh" :dbid="dbid"></BH>

        <div class="problem">
            <template>
                <el-table
                        :data="tableData"
                        header-align="center"
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
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
                            label="状态" prop="reject_name"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            label="当前流转人员" prop="status"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            label="截止时间" prop="endtime"
                            width="200">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="props">
                            <el-button v-if="tableData[props.$index].status_name=='上传物料'">查看需求</el-button>
                            <el-button v-if="tableData[props.$index].status_name!='上传物料'">查看物料</el-button>
                            <el-button  @click="AddMaterial(props.$index)">添加素材</el-button>
                            <el-button  @click="getSH(props.$index)" v-if="tableData[props.$index].status_name=='上传物料'">上传物料</el-button>
                            <el-button  @click="getSH(props.$index)" v-if="tableData[props.$index].status_name=='测试通过'">测试通过</el-button>
                            <el-button  @click="getSH(props.$index)" v-if="tableData[props.$index].status_name!='完成入库'">审核通过</el-button>
                            <el-button  @click="getSH(props.$index)" v-if="tableData[props.$index].status_name=='完成入库'">查看投放结果</el-button>
                            <el-button  @click="getBH(props.$index)" v-if="tableData[props.$index].status_name!='完成入库'">驳回</el-button>
                            <el-button  @click="remove(props.$index)" v-if="rolesList.indexOf('admin')!=-1">删除</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column type="expand" label="查看完整流程" width="200">
                        <template slot-scope="props">
                            <div>
                                <div class="step_box" v-for="(item,index2) in tableData[props.$index].audit_process" >

                                    <div class="step" v-if="tableData[props.$index].currentStatus == tableData[props.$index].audit_process[index2].status">{{tableData[props.$index].audit_process[index2].status}}</div>

                                    <div class="step" v-else-if="tableData[props.$index].SubData[index2] && tableData[props.$index].SubData[index2].msg == '已驳回'">X</div>
                                    <div class="step" v-else-if="tableData[props.$index].currentStatus < tableData[props.$index].audit_process[index2].status">{{tableData[props.$index].audit_process[index2].status}}</div>
                                    <div class="step" v-else>√</div>
                                    <div class="step_tit">{{item.status_name}}</div>
                                    <div class="step_time" v-if="tableData[props.$index].SubData[index2]">{{item.created_at}}</div>
                                    <div class="step_contnet" v-if="tableData[props.$index].SubData[index2]">
                                        <span class="step_txt">状态</span>
                                        <span >{{tableData[props.$index].SubData[index2] && tableData[props.$index].SubData[index2].msg}}</span>
                                    </div>
                                    <div class="step_contnet" v-if="tableData[props.$index].SubData[index2]">
                                        <span class="step_txt" v-if="index2=='0'">来源</span>
                                        <span class="step_txt" v-if="index2!='0'">处理人</span>
                                        <span>{{tableData[props.$index].SubData[index2] && tableData[props.$index].SubData[index2].creator}}</span>
                                    </div>
                                    <div class="step_contnet" v-if="tableData[props.$index].SubData[index2]">
                                        <span class="step_txt" v-if="index2=='0'">需求内容</span>
                                        <span class="step_txt" v-if="index2!='0'">处理结果</span>
                                        <span>查看详情</span>
                                    </div>
                                </div>

                            </div>
                            <!--<div v-else>-->
                                <!--<div class="step_box" v-for="(item,index2) in tableData[props.$index].audit_logs">-->
                                    <!--<div class="step" >√</div>-->
                                    <!--<div class="step_tit">{{item.note}}</div>-->
                                    <!--<div class="step_time">{{item.created_at}}</div>-->
                                    <!--<div class="step_contnet">-->
                                        <!--<span class="step_txt">状态</span>-->
                                        <!--<span>{{item.status}}</span>-->
                                    <!--</div>-->
                                    <!--<div class="step_contnet">-->
                                        <!--<span class="step_txt" v-if="index2=='0'">来源</span>-->
                                        <!--<span class="step_txt" v-if="index2!='0'">处理人</span>-->
                                        <!--<span>{{item.creator}}</span>-->
                                    <!--</div>-->
                                    <!--<div class="step_contnet">-->
                                        <!--<span class="step_txt" v-if="index2=='0'">需求内容</span>-->
                                        <!--<span class="step_txt" v-if="index2!='0'">处理结果</span>-->
                                        <!--<span>点击查看</span>-->
                                    <!--</div>-->
                                <!--</div>-->
                                <!--<div class="step_box_2">-->
                                    <!--<div class="step">{{tableData[props.$index].audit_logs.length+1}}</div>-->
                                    <!--<div class="step_tit">{{tableData[props.$index].audit_process[tableData[props.$index].audit_logs.length].note}}</div>-->
                                    <!--<div class="step_time">{{tableData[props.$index].audit_process[tableData[props.$index].audit_logs.length].created_at}}</div>-->
                                    <!--<div class="step_contnet">-->
                                        <!--<span class="step_txt">状态</span>-->
                                        <!--<span>{{tableData[props.$index].audit_process[tableData[props.$index].audit_logs.length].status}}</span>-->
                                    <!--</div>-->
                                    <!--<div class="step_contnet">-->
                                        <!--<span class="step_txt">处理人</span>-->
                                        <!--<span>{{tableData[props.$index].audit_process[tableData[props.$index].audit_logs.length].creator}}</span>-->
                                    <!--</div>-->
                                    <!--<div class="step_contnet">-->
                                        <!--<span class="step_txt">处理结果</span>-->
                                        <!--<span >{{tableData[props.$index].audit_process[tableData[props.$index].audit_logs.length].msg}}</span>-->
                                    <!--</div>-->
                                <!--</div>-->
                                <!--<div class="step_box_3" v-for="(da,index3) in tableData[props.$index].audit_process.slice(tableData[props.$index].audit_logs.length+1)">-->
                                    <!--<div class="step" >{{tableData[props.$index].audit_logs.length+2+index3}}</div>-->
                                    <!--<div class="step_tit">{{da.note}}</div>-->
                                    <!--<div class="step_time">{{da.created_at}}</div>-->
                                    <!--<div class="step_contnet">-->
                                    <!--<span class="step_txt">状态</span>-->
                                    <!--<span>{{da.status}}</span>-->
                                    <!--</div>-->
                                    <!--<div class="step_contnet">-->
                                    <!--<span class="step_txt">处理人</span>-->
                                    <!--<span>{{da.creator}}</span>-->
                                    <!--</div>-->
                                    <!--<div class="step_contnet">-->
                                    <!--<span class="step_txt">处理结果</span>-->
                                    <!--<span >{{da.msg}}</span>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>

    </div>
</template>

<script>
    import BH from './reject'
    import QD from './workBench_auditor'
    import AddWL from './AddWl'
    import BDadd from './native_upload'
    import sct from './selectMaterial'
    import ADD from './ADD_material'
    export default {
        components:{QD,BH,ADD,sct,BDadd,AddWL},
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
                scMessage:[],
                num:'',
                rolesList:[],
            }
        },

        mounted(){
            this.getData();
            var msg =[];
            for(let i=0;i<this.tableData.length;i++){
                for (let j=0;j<this.tableData[i].audit_logs.length;j++){
                    msg.push(this.tableData[i].audit_logs[j].msg);
                }
            };
            this.msgList=msg;

        },
        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(255,255,255,1);color:rgba(30,30,30,1);text-align:center;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:#000;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            getSH(index){
                this.sh=true;
                this.id=this.tableData[index].did;
            },
            getWl(){
                this.wl = true;
            },
            HeidWl(){
                this.wl = false;
            },
            AddMaterial(index){
                this.ADD_material =true;
                this.id = this.tableData[index].did;
                this.num = this.tableData[index].num;
            },
            heidAddMaterial(){
                this.ADD_material = false;
                this.scMessage=''
            },
            getSet(){
                this.set = true;
            },
            SCsc(){
                this.set = false;
            },
            getBD(){
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
            getBH(index){
                this.bh = true;
                this.dbid=this.tableData[index].did;
                console.log(this.dbid)

            },
            heidBH(){
                this.bh = false
            },

            getData(){
                let params = {
                    email:localStorage.getItem('userAd'),
                };
                this.api.get_account({params}).then((datas)=>{
                    this.userData = datas;
                    console.log(datas.roles)
                    var rolesList=[];
                    for(let i=0;i<this.userData.roles.length;i++){
                        rolesList.push(this.userData.roles[i].role_name);
                    }
                    this.rolesList=rolesList;
                });
            },
            listenToChildEvent(a){
                this.scMessage = a;
                if(this.scMessage=='ad_picture'){}
                console.log(this.scMessage)
            },
            listen(b){
                this.scMessage=b;
                console.log(this.scMessage)
            },
        }
    }
</script>

<style scoped>
.step_box,.step_box_2,.step_box_3{
    display: inline-block;
    margin-right: 100px;
    vertical-align: top;
}
.step_box_3{
    vertical-align: top;
}
.step{
    width:32px;
    height:32px;
    background:rgba(51,119,255,0.2);
    line-height: 32px;
    text-align: center;
    color: #2E5BFF;
    border-radius: 50%;
    margin-bottom: 12px;
}
.step_tit{
    width:96px;
    height:22px;
    font-size:16px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(61,73,102,1);
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
</style>