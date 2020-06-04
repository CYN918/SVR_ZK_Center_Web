
<template>
<div >
       <div class="top_name">
                <span class="top_txt"> 杂志锁屏物料预审</span>
                <span class="top_txts">杂志锁屏物料预审</span>
               
               
                <!-- <span class='qdName'>渠道</span>
                <select v-model="channel">
                        <option :value="item.channel" v-for="item in qdLists">{{item.channel}}</option>
                </select> -->
                <!-- <span class='qud'>{{channel.channel}}</span> -->
                <!-- <span class='userGl' @click="jump()">账号管理</span> -->
                <div class="user">
                    <div class="sk" :class="{check:is_receiver==0}" @click="switchs(0)">
                        个性化内容审核
                    </div>
                    <div class="fk" :class="{check:is_receiver==1}" @click="switchs(1)">
                        通用策略审核
                    </div>
                    <div class="fk" :class="{check:is_receiver==2}" @click="switchs(2)">
                        分发服务器
                    </div>
                    <div class="fk" :class="{check:is_receiver==3}" @click="switchs(3)">
                        测试配置
                    </div>
                </div>
        </div>
        <Externalpretrialgx v-if="is_receiver == '0'"></Externalpretrialgx>
        <Externalpretrialstrategy v-if="is_receiver == '1'"></Externalpretrialstrategy>
        <Distributionaudit v-if="is_receiver == '2'"></Distributionaudit>
        <Configurationaudit v-if="is_receiver == '3'"></Configurationaudit>
        
        
</div>
</template>

<script>
import Externalpretrialgx from './External_pre_trial_gx'; //个性化内容审核
import Externalpretrialstrategy from './External_pre_trial_strategy'; //通用策略审核
import Distributionaudit from './Distribution_audit'; //分发服务器
import Configurationaudit from './Configuration_audit'; //测试配置

export default {

components: {Externalpretrialgx,Externalpretrialstrategy,Distributionaudit,Configurationaudit},
data() {

return {
        is_receiver:0,
};
},

methods: {
    switchs(num){
        this.is_receiver=num;    
        localStorage.setItem('tabNum', num) 
    },
            
},

created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    if (localStorage.getItem('tabNum')) {
        console.log(1)
        this.is_receiver = localStorage.getItem('tabNum')
    }
   
},

}
</script>
<style  scoped>
  .top_name{
        height: 115px;
        border: 0;
    }
.top_txts{
    margin-left: 24px;
    font-size: 18px;
    font-family: PingFang-SC;
    font-weight: 500;
    line-height: 30px;
    color: rgba(31,46,77,1);
    display: block;
    margin-top: 10px;
}
    .top_txt{
        cursor: pointer; margin-left: 24px;
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153,153,153,1);
        line-height: 20px!important;
        margin-top: 15px
    }
    .sk,.fk{
        display: inline-block;
        width:125px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
        text-align: center;
        cursor: pointer;
    }
    .check{
        border-bottom:3px solid rgba(51,119,255,1);
        padding-bottom: 8px;
    }
    .user{
        padding: 0 24px;
        margin-top: 8px;
    }
   
</style>