
<template>
    <div >
       <div class="top_name">
            <span class="top_txts">高定内容时段控制</span>
            <div class="user">
                <div class="sk" :class="{check:is_receiver==0}" @click="switchs(0)">
                    配置界面
                </div>
                <div class="fk" :class="{check:is_receiver==1}" @click="switchs(1)">
                    按时间查看
                </div>
            </div>        
        </div>
        <div>
            <Protypedetails v-if="is_receiver == '0' && channel" :channel="channel" :channelList="channelList"></Protypedetails>
            <Protypetimedetails v-if="is_receiver == '1' && channel" :channel="channel" :channelList="channelList"></Protypetimedetails>
        </div>
        
    </div>
</template>

<script>
    import Protypedetails from './Pro_type_details'; //配置界面
    import Protypetimedetails from './Pro_type_time_details'; //按时间查看界面
    export default {
        components: {Protypedetails,Protypetimedetails},
        data() {
            return {
                is_receiver:0,
                channel:'',
                channelList:[],
            };
        },

        methods: {
            switchs(num){
                this.is_receiver=num; 
                this.mJs.scTop(0); 
                localStorage.setItem('tabNum', num);   
            },
            getType(){
                this.api.superwallpaper_channel().then((res)=>{
                    if(res.length != 0){
                        this.channel = res[4].channel;
                        this.channelList = res;
                    }    
                })
            },
            init(){
                this.api.superwallpaper_channel().then((res)=>{
                    if(res.length != 0){
                        this.channelList = res;
                    }    
                })
            }
        },
        created() {
            
            

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            // if (localStorage.getItem('tabNum')) {
            //     this.is_receiver = localStorage.getItem('tabNum')
            // } 
            this.getType();
        },
        
        watch: {
            $route(){
                if(this.$route.query.channel){
                    this.channel = this.$route.query.channel;
                    this.init();
                }else{
                    this.getType();
                }
            },
        }
    }
</script>
<style  scoped>
    .top_name{
        height: 90px;
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
        margin-top: 20px;
    }
   
</style>