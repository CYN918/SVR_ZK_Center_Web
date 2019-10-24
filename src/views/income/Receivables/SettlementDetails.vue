<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="jump()">收款结算 &nbsp;/</span>
                <span class="log_url" @click="jumps()">&nbsp;收款结算方管理 &nbsp;/</span>
                <span class="new_url">&nbsp;结算方详情</span>
            </div>
            <div class="title_left">
                <span>结算方详情</span>
            </div>
        </div>
        <div class="tableBox">
            <div>
                <span class="tableBox_name">结算方名称</span>
                <span class="tableBox_Obtain">{{list.name}}</span>
            </div>
            <div>
                <span class="tableBox_name">生成对账时间</span>
                <span class="tableBox_Obtain">{{list.tdate}}</span>
            </div>
            <div>
                <span class="tableBox_name">开户名</span>
                <span class="tableBox_Obtain">{{list.account_name}}</span>
            </div>
            <div>
                <span class="tableBox_name">银行账号</span>
                <span class="tableBox_Obtain">{{list.bank_card_id}}</span>
            </div>
            <div>
                <span class="tableBox_name">开户银行</span>
                <span class="tableBox_Obtain">{{list.bank_name}}</span>
            </div>
            <div>
                <span class="tableBox_name">税号</span>
                <span class="tableBox_Obtain">{{list.tax_id}}</span>
            </div>
            <div>
                <span class="tableBox_name">联系人</span>
                <span class="tableBox_Obtain">{{list.contact}}</span>
            </div>
            <div>
                <span class="tableBox_name">联系电话</span>
                <span class="tableBox_Obtain">{{list.phone}}</span>
            </div>
            <div>
                <span class="tableBox_name">备注</span>
                <span class="tableBox_Obtain">{{list.note}}</span>
            </div>
            <div>
                <span class="tableBox_name">相关合同</span>
                <div style="display: inline-block">
                    <div v-for="item in list.contracts">
                        <div v-for="da in item">
                            <div v-for="data in da.contract_files">
                                <span class="textName">{{data.name}}</span>
                                <span class="ck">查看</span>
                                <a class="xz" :href="data.url">下载</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <span class="tableBox_name">已绑定数据来源主体</span>
                <div style="display: inline-block">
                    <span class="textName"></span>
                </div>
            </div>
            <div>
                <span class="tableBox_name">附件</span>
                <div style="display: inline-block">
                    <div v-for="item in list.attachs">
                            <span class="textName">{{item.name}}</span>
                            <span class="ck">查看</span>
                            <a class="xz" :href="item.url">下载</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "settlement-details",
        data(){
            return{
                list:{},
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            jump(){
                this.$router.push({
                    path:"./Administration"
                })
            },
            jumps(){
                this.$router.push({
                    path:"./ReceiverManagement"
                })
            },
            fh(num){
                this.$router.go(num)
            },
            getData(){
                let params={name:this.$route.query.name,is_receiver:1};
                this.api.settle_settlement_detail({params}).then((res)=>{
                    this.list=res;
                })
            },

        },
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:98px;
        border-top: 1px solid #ededed;
        background: white;
        -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
        position: fixed;
        left: 256px;
        top: 63px;
        z-index: 99;
    }
    .new_url{color: rgba(61,73,102,1)!important;}

    .title_left span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-left: 24px;
        margin-top: 15px;
        cursor: pointer;
    }
    .tableBox{
        margin-top: 182px;
        background: #fff;
        padding-top:32px ;
    }
    .tableBox_name{
        display: inline-block;
        width:126px;
        height:20px;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        text-align: right;
        margin:0 22px 24px 25px;
    }
    .tableBox_Obtain{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(109,119,139,1);
    }
    .xz,.ck{
        display: inline-block;
        margin-left: 12px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        cursor: pointer;
    }
    .textName{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
</style>