<template>
    <div class="bg">
        <div class="centNavBox">
            <div class="title">
                <span>查看资源</span>
                <div class="zy_type">
                    <span @click="ADDsc()" :class="{active:SC==true}">添加素材</span>
                    <span @click="ADDwl()" :class="{active:WL==true}">添加物料</span>
                </div>
                <div class="num">
                    <span>待制作数量：{{this.numAll}}</span>
                    <span></span>
                </div>
            </div>
            <div class="table_material" v-for="(item,index) in this.listSc" v-if="SC==true">
                <div class="table_material_tit">
                    <el-checkbox v-model="value"></el-checkbox>
                    <span style="display: inline-block;margin: 0 26px 0 18px">{{item.line_num}}</span>
                    <span class="table_material_tit_sc">素材</span>
                    <span class="download">下载({{item.bind.length}})</span>
                </div>
                <div class="img_box">
                    <div v-for="(da,index2) in item.bind" class="ADD_img">
                        <img :src="da.prev_uri" class="ADD_img_img"/>
                        <span>{{da.prev_uri}}</span>
                    </div>
                </div>
               <div>

               </div>

            </div>
            <div class="table_material" v-for="(item,index) in this.listWl" v-if="WL==true">
                <div class="table_material_tit">
                    <el-checkbox v-model="value"></el-checkbox>
                    <span style="display: inline-block;margin: 0 26px 0 18px">{{item.line_num}}</span>
                    <span class="table_material_tit_sc">物料</span>
                    <span class="download">下载({{item.bind.length}})</span>
                </div>
                <div class="img_box">
                    <div v-for="(da1,index3) in item.bind" class="ADD_img">
                        <img :src="da1.prev_uri" class="ADD_img_img"/>
                        <span>{{da1.prev_uri}}</span>
                    </div>
                </div>
                <div>

                </div>

            </div>
            <div class="Add_btn">
                <div class="checkSelect">
                    <el-checkbox v-model="value">全选</el-checkbox>
                </div>
                <span class="ALLdownload">下载()</span>
                <span @click="heid">取消</span>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page"
                            :page-sizes="[2, 4, 6, 8]"
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
        props:['id'],
        name: "a-d-d_material",
        data(){
            return{
                SC:true,
                WL:false,
                value:false,
                material:1,
                page:1,
                p:2,
                listSc:[],
                listWl:[],
                total:0,
                numAll:0,

            }
        },
        mounted(){
                this.getData();
        },
        methods:{
            heid(){
                this.$parent.heidCK();
            },
            getData(){
                if(this.SC==true){
                    this.material=1
                }else{
                    this.material=0
                }
                let params ={id:this.id,material:this.material,p:this.p,page:this.page};
                this.api.demand_business_bind_list({params}).then((res)=>{
                  if(this.SC==true){
                      this.listSc=res.data.material;
                      this.total=res.total;
                      this.numAll=res.total;
                  }else{
                      this.listWl=res.data.mfinal;
                      this.total=res.total;
                  }

                })
            },
            ADDsc(){
                this.SC = true;
                this.WL = false;
                this.getData()
            },
            ADDwl(){
                this.SC = false;
                this.WL = true;
                this.getData()
            },
            handleSizeChange(p){
                this.p = p;
                this.getData();
            },
            handleCurrentChange(page){
                this.page = page;
                this.getData();
            },
        },

    }
</script>

<style scoped>
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
    }

    .centNavBox{
        width:1106px;
        height:750px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        position: relative;
        left: 50%;
        top:50%;
        transform:translate(-50%,-50%);
        overflow-y: auto;
    }
    .title{
        height: 55px;
        border-bottom: 1px solid #E6E9F0;

    }
    .title>span{
        display: inline-block;
        line-height: 55px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-left: 24px;
    }
    .table_material{
        margin: 20px 24px 0 24px;
        width:1058px;
        height:261px;
        background:rgba(245,247,250,1);
        border-radius:4px;
        border:1px solid rgba(230,233,240,1);
    }

    .table_material_tit{
        height: 71px;
        margin: 0 35px;
    }
    .table_material_tit_sc{
        display: inline-block;
        font-size:16px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
        line-height: 71px;
    }
    .Add_btn{
        width:1106px;
        height:58px;
        background:rgba(247,249,252,1);
        border-radius:0px 0px 4px 4px;
        position: absolute;
        bottom: 0;

    }
    .Add_btn span{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        margin-top:12px;
        margin-right: 24px;
    }
    .ALLdownload{
        width:104px!important;
        height:36px!important;
        background:rgba(51,119,255,1)!important;
        border-radius:4px!important;
        color:rgba(255,255,255,1)!important;
        margin-left: 11px;

    }
    .zy_type{
        display: inline-block;
        margin-left: 50px;
        height: 56px;
    }
    .zy_type span{
        display: inline-block;
        width:60px;
        height: 50px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        line-height: 55px;
        cursor: pointer;
        margin-right: 57px;
    }
    .active{
        color:rgba(51,119,255,1)!important;
        border-bottom: 3px solid rgba(51,119,255,1)!important;
    }
    .num{
        display: inline-block;
        float: right;
        margin-right: 24px;
    }
    .num span{
        line-height: 55px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1);
    }
    .download{
        float: right;
        display: inline-block;
        width:105px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height: 36px;
        text-align: center;
        margin-top: 17px;
        cursor: pointer;
    }
    .img_box{
        height: 130px;
        width: 1028px;
        overflow-x:auto;
        margin-left: 15px;
    }
    .ADD_img{
        display: inline-block;
        width: 108px;
        height: 110px;
        margin-right: 48px;
    }
    .ADD_img_img{
        display: inline-block;
        width: 108px;
        height: 80px;
    }

    .ADD_img span{
        display:inline-block;
        width: 80px;
        overflow: hidden;
    }
    .block{
        display: inline-block;
        float: right;
        margin-bottom: 0!important;
        margin-top: 10px;
        margin-right: 24px;
    }
    .block .el-pagination{
        margin-top: 0!important;
    }
    .checkSelect{
        display: inline-block;
        margin-left: 54px;
    }
</style>