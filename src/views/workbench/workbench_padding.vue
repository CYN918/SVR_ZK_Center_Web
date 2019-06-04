<template>
    <div>
        <div class="top_name">
            <span class="top_txt">任务中心/待处理</span>
            <div class="title_left">
                <span>待处理</span>
            </div>
            <div class="tit_btn">
                <img src="../../../public/img/ss.png">
                <input type="text" placeholder="搜素需求ID" v-model="search"/>
                <span class="tit_btn_sc" @click="getSC">发布素材需求</span>
                <span class="tit_btn_yw" @click="getYW">发布业务需求</span>
            </div>
        </div>
        <div class="padding_btn">
            <span :class="{active:this.active==0}" @click="getList">我的待处理</span>
            <span :class="{active:this.active==1}" @click="getDataList">全部待处理</span>
        </div>
        <div class="centNavBox">
            <tab :tableData="tableData" :active="active" ></tab>
            <sc v-if="sc" :id="id"></sc>
            <yw v-if="yw" :id="id"></yw>
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
                sc:false,
                yw:false,
                active:0,
                tableData:[],
                p:10,
                page:1,
                search:'',
                total:0,
                scMessage:[],
                type:'',
                detail:[],
                step:[],
                id:'',

            }
        },
        mounted(){
            this.getList();
        },
        methods:{
            getSC(id){
                this.id = id;
                this.sc=true;
            },
            heidSC(){
                this.sc=false;
            },
            getYW(id){
                this.id=id;
                this.yw=true
            },
            heidYW(){
                this.yw=false
            },

            getList(){
                this.active=0;
                let params ={p:this.p,page:this.page,search:this.search,all:0}
                this.api.demand_await({params}).then((res)=>{

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
            getDataList(){
                this.active=1;
                let params ={p:this.p,page:this.page,search:this.search,all:1};
                this.api.demand_await({params}).then((res)=>{
                    this.tableData = res.data;
                    console.log(res.data)
                    this.total = res.total;
                    for (let i=0;i<this.tableData.length;i++){
                        console.log(this.tableData[i].demand_type)
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
    }
    .top_name{
        height: 173px;
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
        color:rgba(255,255,255,1);
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
        color:rgba(255,255,255,1);
        float: right;
        margin-right: 276px;
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
</style>