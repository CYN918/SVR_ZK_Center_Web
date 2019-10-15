<template>
    <div class="bg">
        <div class="content">
            <div class="titName">
                <span>结算方详情</span>
                <img src="../../../../public/img/gb.png" @click="heidMassage()">
            </div>
            <div>
                <span class="Name">结算方名称</span>
                <span class="text"></span>
            </div>
            <div>
                <span class="Name">生成对账时间</span>
                <span class="text">ssssssss</span>
            </div>
            <div>
                <span class="Name">开户名</span>
                <span class="text"></span>
            </div>
            <div>
                <span class="Name">银行账号</span>
                <span class="text"></span>
            </div>
            <div>
                <span class="Name">开户银行</span>
                <span class="text"></span>
            </div>
            <div>
                <span class="Name">税号</span>
                <span class="text"></span>
            </div>
            <div>
                <span class="Name">联系人</span>
                <span class="text"></span>
            </div>
            <div>
                <span class="Name">联系电话</span>
                <span class="text"></span>
            </div>
            <div>
                <span class="Name">备注</span>
                <span class="text"></span>
            </div>
            <div>
                <span class="Name">相关合同</span>
                <div style="display: inline-block">
                    <div>
                        <span class="text"></span>
                        <span class="click">查看</span>
                        <span class="click">下载</span>
                    </div>
                </div>


            </div>
            <div>
                <span class="Name">已绑定数据来源主体</span>
                <div style="display: inline-block">
                    <span class="text"></span>
                </div>

            </div>
            <div>
                <span class="Name">已绑定数据来源主体</span>
                <div  style="display: inline-block">
                    <div>
                        <span class="text"></span>
                        <span class="click">查看</span>
                        <span class="click">下载</span>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "details-settlement",
        data(){
            return{

            }
        },
        methods:{
            heidMassage(){
                this.$parent.heidMassage()
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
        transform: translate(-50%,-50%);
        width:876px;
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
</style>