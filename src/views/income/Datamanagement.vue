<template>
    <div>
        <div class="top">
            <div class="top_tit">
                <span>计提数管理</span>
            </div>
            <div class="user">
                <div style="float:left;">
                    <div class="sk" :class="{check:is_receiver==1}" @click="switchs(1)">
                        收款结算
                    </div>
                    <div class="fk" :class="{check:is_receiver==0}" @click="switchs(0)">
                        付款结算
                    </div>
                </div>
                <div style="float:right;margin-right: 300px;">
                    <span class="cx" @click="add()">新增计提数据</span>
                </div>
            </div>
        </div>
        <CollectionSettlement v-if="is_receiver==1"></CollectionSettlement>
        <PaymentSettlement v-if="is_receiver==0"></PaymentSettlement>
        <div class="bg" v-if="tc">
            <div class='content'>
                <div class='con_tit'>
                    <span>新增计提数据</span>
                </div>
                <div class='sel'>
                    <span class='qdName'>年月份：</span>
                    <el-date-picker
                        v-model="tdate"
                        type="month"
                        format="yyyy-MM"
                        value-format="yyyy-MM"
                        placeholder="选择月">
                    </el-date-picker>
                </div>
                <div class='sel_btn'>
                    <el-button type="primary" :loading="loadSure" @click='ADDlist()' style="margin-left:15px;">确定</el-button>
                    <el-button @click='qx()' style="margin-right:15px;">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CollectionSettlement from './Collection_settlement' //收款结算
    import PaymentSettlement from './Payment_settlement' //付款结算
    export default {
        components: {CollectionSettlement,PaymentSettlement},
        name: "administration",
        data(){
            return{
                is_receiver:1,
                tc:false,
                loadSure:false,
                tdate:'',
            }
        },
        mounted(){
            if (localStorage.getItem('tabNum')) {
                this.is_receiver = localStorage.getItem('tabNum')
            }
        },
        methods:{
            switchs(num){
                this.is_receiver=num;
                this.mJs.scTop(0);
                localStorage.setItem('tabNum', num); 
            },
            add(){
                this.tc = true;
            },
            qx(){
                this.tc = false;
            },
            ADDlist(){
                console.log(this.tdate)
                this.loadSure = true;
                this.$router.push({
                    path:"./add_nb",
                    query:{
                        tdate:this.tdate,
                    }
                })
            }
        },
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:120px;
        border-top: 1px solid #ededed;
        background: white;
        -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
        position: fixed;
        left: 256px;
        top: 63px;
        z-index: 99;
    }
    .top_tit span{
        display: inline-block;
        font-size:18px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin:19px 0 20px 24px;
    }
    .seach{
        display: inline-block;
        margin:0px 24px;
        position:relative;
    }
    .seach img{
        width: 24px;
        height: 24px;
        position: absolute;
        left: 3px;
        top:8px;
    }
    .seach input{
        width:170px;
        height:32px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        padding-left: 30px;
        border:1px solid rgba(211,219,235,1);
    }
    .user{
        padding: 0 24px;
    }
    .sk,.fk{
        display: inline-block;
        width:70px;
        height:51px;
        background:rgba(255,255,255,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
        text-align: center;
        line-height: 51px;
        cursor: pointer;
    }
    .fk{
        margin-left: 25px;
    }
    .check{
        border-bottom:3px solid rgba(51,119,255,1)!important;
        color:rgba(51,119,255,1)!important;
    }
    .cx{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:100px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
    }
    .table{
        background: #fff;
        margin-top: 220px;
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
        height:200px;
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
        margin-top: 20px;
    }
    .sel_btn span{
        margin-right: 50px;
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
        margin-right: 20px!important;
        border: 0!important;
        background: rgba(51,119,255,1)!important;
        color: rgba(255,255,255,1)!important;
    }
    select{
        margin-left: 20px;
        width: 200px;
        height: 36px;
        border-radius: 5px;
    }
    .qdName{
        margin-left: 15px;
    }
</style>