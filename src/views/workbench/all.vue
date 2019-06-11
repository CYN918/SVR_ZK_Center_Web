<template>
    <div>
        <div class="top_name">
            <span class="top_txt">任务中心/全部</span>
            <div class="title_left">
            </div>
            <div class="tit_btn">
                <div class="tit_btn_top">
                    <span>所处流程</span>
                    <select v-model="status">
                        <option value=1>1</option>
                        <option value=2>2</option>
                        <option value=3>3</option>
                        <option value=4>4</option>
                        <option value=5>5</option>
                        <option value=6>6</option>
                    </select>
                    <span>需求类型</span>
                    <select class="types" v-model="demand_type">
                        <option value="demand_business">业务需求</option>
                        <option value="demand_material">素材需求</option>
                    </select>
                    <span>需求ID</span>
                    <input type="text" placeholder="请输入需求ID" v-model="search"/>
                </div>
                <div class="tit_btn_bom">
                    <div class="block">
                        <el-date-picker
                                v-model="value"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd ">
                        </el-date-picker>
                    </div>
                    <span>状态</span>
                    <select v-model="reject">
                        <option value=null>全部</option>
                        <option value=1>驳回</option>
                        <option value=0>已处理</option>
                    </select>
                    <span>流转人员</span>
                    <input type="text" placeholder="请输入流转人员" v-model="processor"/>
                    <span class="cx" @click="cx">查询</span>
                    <span class="tit_btn_sc" @click="getSC">发布素材需求</span>
                    <span class="tit_btn_yw" @click="getYW">发布业务需求</span>
                </div>
            </div>
        </div>
        <div class="centNavBox">
            <tab :tableData="tableData" ></tab>
            <sc v-if="sc"></sc>
            <yw v-if="yw"></yw>

        </div>

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
</template>

<script>

    import tab from './workbenchTable'
    import sc from './workBench_sc'
    import yw from './workBench_yw'
    export default {
        components:{tab,sc,yw},
        name: "workbench_padding",
        data(){
            return{
                processor:'',
                reject:'',
                status:'',
                demand_type:'',
                sc:false,
                yw:false,
                sh:false,
                active:0,
                tableData:[],
                p:10,
                page:1,
                search:'',
                total:0,
                ADD_material:true,
                set:false,
                scMessage:[],
                BD:false,
                type:'',
                wl:false,
                bh:false,
                value:[],
                start_time:'',
                end_time:'',
            }
        },
        mounted(){
            this.getDataList();
        },
        methods:{
            getSC(){
                this.sc=true;
            },
            cx(){
                this.getDataList();

            },
            heidSC(){
                this.sc=false;
            },
            getYW(){
                this.yw=true
            },
            heidYW(){
                this.yw=false
            },

            getDataList(){
                let params ={p:this.p,page:this.page,search:this.search,status:this.status,demand_type:this.demand_type,start_time:this.value[0],end_time:this.value[1],reject:this.reject,processor:this.processor}
                this.api.demand_search({params}).then((res)=>{
                    console.log(res)

                    this.tableData = res.data;
                    this.total = res.total;
                    for (let i=0;i<this.tableData.length;i++){
                        if(this.tableData[i].demand_type=='demand_business'){
                            this.tableData[i].demand_type='业务需求'
                        }else if(this.tableData[i].demand_type=='demand_material'){
                            this.tableData[i].demand_type='素材需求'
                        }else {
                            this.tableData[i].demand_type='设计师结算'
                        }
                    }
                })
            },
            listenToChildEvent(a){
                this.scMessage = a;
                console.log(this.scMessage)
            },
            listen(b){
                this.scMessage=b;
                console.log(this.scMessage)
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getDataList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getDataList()
            },
        }
    }
</script>

<style scoped>
    .centNavBox{
        width: 100%;
        padding: 24px 0 24px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #FFF;
        margin-top: 270px;
    }
    .top_name{
        height: 185px;
        width: 100%;

    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
    }
    .title_left>span{
        display: inline-block;
        margin-left: 24px;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
    }
    .tit_btn{
        margin-top: 24px;
    }
    .tit_btn>input{
        width:374px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 30px;
    }
    .tit_btn>img{
        position: relative;
        left: 35px;
        top: 10px;
    }
    .tit_btn_yw{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        width:146px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
        float: right;
        margin-right: 24px;
        cursor: pointer;
    }
    .tit_btn_sc{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        width:146px;
        height:36px;
        background:rgba(57,189,101,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
        float: right;
        margin-right: 257px!important;
        cursor: pointer;
    }
    .padding_btn{
        margin-top: 258px;
    }
    .padding_btn span{
        display: inline-block;
        width:120px;
        height:36px;
        line-height: 36px;
        text-align: center;
        background:rgba(255,255,255,1);
        border-radius:0px 0px 0px 4px;
        border:1px solid rgba(211,219,235,1);
        font-size:16px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
        cursor: pointer;
    }
    .active{
        width:120px;
        height:36px;
        background:rgba(51,119,255,1)!important;
        border-radius:4px 0px 0px 0px;
        border:1px solid rgba(51,119,255,1)!important;
        font-size:16px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
    }
    .tit_btn_top{
        margin: 24px;
    }
    .tit_btn_top span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
    }
    .tit_btn_top select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 87px;
    }
    .types{
        margin-right: 48px!important;
    }
    .tit_btn_top input,.tit_btn_bom input{
        width:190px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .block{
        display: inline-block;
        margin-right: 77px;
    }
    .tit_btn_bom{
        margin: 0 24px;
    }
    .tit_btn_bom span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
    }
    .tit_btn_bom select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 34px;
    }
    .cx{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
        margin-left: 20px;
    }
</style>