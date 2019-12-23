<template>
    <div class="bg">
        <div class="content">
            <div class="titName">
                <span>结算方详情</span>
                <img src="../../../../public/img/gb.png" @click="heidMassage()">
            </div>
            <div>
                <span class="Name">结算方名称</span>
                <span class="text">{{data.name}}</span>
            </div>
            <!--<div>-->
                <!--<span class="Name">生成对账时间</span>-->
                <!--<span class="text">{{data.tdate}}</span>-->
            <!--</div>-->
            <div>
                <span class="Name">开户名</span>
                <span class="text">{{data.account_name}}</span>
            </div>
            <div>
                <span class="Name">银行账号</span>
                <span class="text">{{data.bank_card_id}}</span>
            </div>
            <div>
                <span class="Name">开户银行</span>
                <span class="text">{{data.bank_name}}</span>
            </div>
            <div>
                <span class="Name">税号</span>
                <span class="text">{{data.tax_id}}</span>
            </div>
            <div>
                <span class="Name">联系人</span>
                <span class="text">{{data.contact}}</span>
            </div>
            <div>
                <span class="Name">对账邮箱</span>
                <span class="text">{{data.email}}</span>
            </div>
            <div>
                <span class="Name">备注</span>
                <span class="text">{{data.note}}</span>
            </div>
            <div>
                <span class="Name" style="vertical-align: top">相关合同</span>
                <div style="display: inline-block">
                    <div style="width: 714px;mxa-height:216px;overflow-y:auto;border: 1px solid #D9D9D9 " class="contract">
                        <template>
                            <el-table
                                    :data="contracts"
                                    style="width: 100%"
                                    :header-cell-style="getRowClass"
                                    :cell-style="cell"
                            >
                                <el-table-column
                                        prop="date"
                                        show-overflow-tooltip
                                >
                                    <template slot-scope="scope">
                                        <div v-for="(item,key) in (contracts[scope.$index])">
                                            <span class="titTableName">文件归档号:</span>
                                            <span class="titTableCon">{{item.archive_id}}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        show-overflow-tooltip
                                >
                                    <template slot-scope="scope">
                                        <div v-for="(item,key) in (contracts[scope.$index])">
                                            <span class="titTableName">合同编号:</span>
                                            <span class="titTableCon">{{item.contract_id}}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        width="100"
                                >
                                    <template slot-scope="scope">
                                        <div v-for="(item,key) in (contracts[scope.$index])">
                                            <span v-if="item.status=='1'" style="color:#39BD65">{{item.status_text}}</span>
                                            <span v-if="item.status=='0'" style="color:#FFA033">{{item.status_text}}</span>
                                            <span v-if="item.status=='2'" style="color:#F05656">{{item.status_text}}</span>
                                            <span v-if="item.status=='3'" style="color:#1F2E4D">{{item.status_text}}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column type="expand">
                                    <template slot-scope="scope">
                                        <div v-for="(data,key) in (contracts[scope.$index])">
                                            <div v-for="da in data.contract_files">
                                                <span style="display: inline-block;width: 50%">{{da.name}}</span>
                                                <a :href="da.url" target="_blank" style="display: inline-block;width: 50%;text-align: right">下载</a>
                                            </div>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </div>
                </div>
            </div>
            <div>
                <span class="Name">已绑定数据来源主体</span>
                <div style="display: inline-block" v-for='(value,key) in this.data.advertisers'>
                    <span class="text">{{value}}</span>
                </div>
            </div>
            <div>
                <span class="Name">附件</span>
                <div style="display: inline-block">
                    <div v-for="item in data.attachs">
                        <span class="text">{{item.name}}</span>
                        <!--<span class="click">查看</span>-->
                        <a class="click" :href="item.url">下载</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "details-settlement",
        props:['name'],
        data(){
            return{
                    data:{},
                contracts:[],
            }
        },
        mounted(){this.getData()},
        methods:{
            heidMassage(){
                this.$parent.heidMassage()
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return ';color:rgba(31,46,77,1);text-align:center;font-size:14px;font-weight:500;font-family:PingFang-SC-Medium;height:0px;padding:0px'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:rgba(61,73,102,1);font-size:14px;font-weight:400;font-family:PingFangSC-Regula;'
            },
            getData(){
                let params={name:this.name,is_receiver:1};
                this.api.settle_settlement_detail({params}).then((res)=>{
                    this.data=res;
                    this.contracts=res.contracts;
                })
            }
        }

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
    .content{
        position: absolute;
        left: 50%;
        top:30%;
        overflow-y:auto ;
        transform: translate(-50%,-50%);
        width:962px;
        height:773px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
    }
    .titName span{
        display: inline-block;
        margin: 24px 0 4px 28px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .titName img{
        width:16px;
        height:16px;
        float: right;
        margin: 24px 28px 0 0 ;
        cursor: pointer;
    }
    .Name{
        display: inline-block;
        width:130px ;
        margin:0  22px 0 47px;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        text-align: right;
    }
    .content>div{
        margin-bottom: 24px;
    }
    .text{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(109,119,139,1);
        line-height:20px;
    }
    .click{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left: 10px;
    }
.titTableName{
    font-size:14px;
    font-family:PingFang-SC-Regular,PingFang-SC;
    font-weight:400;
    color:rgba(31,46,77,0.65);
}
.titTableCon{
    font-size:14px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:#1F2E4D;
}
.contract{
    max-height: 368px;
    overflow-y:auto;
}

</style>