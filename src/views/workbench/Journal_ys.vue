
<template>
    <div >
       <div class="top_name">
            <span class="top_txt" v-if="this.$route.query.auditType == '2'" @click='fh(-1)'>杂志锁屏推送  /  推送审核内容管理</span>
            <span class="top_txt" v-if="this.$route.query.auditType == '5'" @click='fh(-1)'>杂志锁屏推送审核管理  /  外部审核及锁屏管理</span>
            <span class="top_txts" v-if="this.$route.query.auditType == '2'">推送审核内容管理</span>
            <span class="top_txts" v-if="this.$route.query.auditType == '5'">外部审核及锁屏管理</span>
            <!-- <span class='qdName'>渠道</span>
            <select v-model="channel">
                    <option :value="item.channel" v-for="item in qdLists">{{item.channel}}</option>
            </select> -->
            <span class='qud'>{{this.$route.query.channel}}</span>
            <!-- <span class='userGl' @click="jump()">账号管理</span> -->
            <div class="user" v-if="this.$route.query.auditType == '5'">
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
        <div  v-if="this.$route.query.auditType == '5'">
            <Personalizedaudit v-if="is_receiver == '0'"></Personalizedaudit>
            <Strategyaudit v-if="is_receiver == '1'"></Strategyaudit>
            <Distributionaudit v-if="is_receiver == '2'"></Distributionaudit>
            <Configurationaudit v-if="is_receiver == '3'"></Configurationaudit>
        </div>
        <Journalcontentys v-if="this.$route.query.auditType == '2'"></Journalcontentys>
        
    </div>
</template>

<script>
    import Personalizedaudit from './Personalized_audit'; //个性化内容审核
    import Strategyaudit from './Strategy_audit'; //通用策略审核
    import Distributionaudit from './Distribution_audit'; //分发服务器
    import Configurationaudit from './Configuration_audit'; //测试配置
    import Journalcontentys from './Journal_content_ys'; //
    export default {
        components: {Personalizedaudit,Strategyaudit,Distributionaudit,Configurationaudit,Journalcontentys},
        data() {
            return {
                is_receiver:0,
            };
        },

        methods: {
            switchs(num){
                this.is_receiver=num; 
                this.mJs.scTop(0); 
                localStorage.setItem('tabNum', num);   
            },  
            fh(index){
                this.$router.go(index)
            },  
        },
        created() {

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            if (localStorage.getItem('tabNum')) {
                this.is_receiver = localStorage.getItem('tabNum')
            }
            if(this.$route.query.auditType){
                this.is_receiver=0; 
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
    .qud{
       display: inline-block;
       padding: 5px;
       border:1px solid  rgba(51,119,255,1);
       text-align: center;
       color: rgba(51,119,255,1);
       border-radius: 5px;
       line-height: 1!important;
       margin-left: 10px;
       position: absolute;
       left: 190px;
       top:47px
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