<template>
    <div class="template">
        <div class="top_name">
            <span class="top_txt"></span><div style="width:0;height:0;"><br/></div>
            <span class="top_txts" style="width: 113px;display: inline-block;">壁纸资源审核</span>
            <div class="user">
                <div class="sk" :class="{check:is_receiver==0}" @click="switchs(0)">
                    首屏资源审核
                </div>
                <div class="fk" :class="{check:is_receiver==1}" @click="switchs(1)">
                    画报资源审核
                </div>
            </div>
        </div> 
        
        
        <externalLocakScreenSp v-if="is_receiver == 0"></externalLocakScreenSp> 
        <externalLocakScreenHb v-if="is_receiver == 1"></externalLocakScreenHb>  
        
    </div>
</template>

<script>
    import externalLocakScreenSp from './external_locakScreen_sp';
    import externalLocakScreenHb from './external_locakScreen_hb';
    export default {
        components: {externalLocakScreenSp,externalLocakScreenHb},
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
            
               
        },
        created() {
            
            
        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            if (localStorage.getItem('tabNum')) {
                this.is_receiver = localStorage.getItem('tabNum')
            }  
        },
    }
</script>
<style  scoped>
    .top_name{
        height: 112px;
        border: 0;
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
    select{
        margin-left: 20px;
        width: 200px;
        height: 36px;
        border-radius: 5px;
    }
    .userGl{
        float: right;
        display: inline-block;
        height: 36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
        width: 144px;
        background: rgba(242,246,252,1);
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(61,73,102,1);
        margin-top: -10px!important
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
       left: 173px;
       top:47px
    }
    .qud1{
       display: inline-block;
       padding: 5px;
       border:1px solid  rgba(51,119,255,1);
       text-align: center;
       color: rgba(51,119,255,1);
       border-radius: 5px;
       line-height: 1!important;
       margin-left: 10px;
       position: absolute;
       left: 270px;
       top:47px
    }
    .template >>> .el-textarea{
        width: 100%;
    }
    .template >>> select{
        margin-left: 0px;
    }
    .template >>> .el-button--primary{
        background: #155BD4;
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
        margin-top: 22px;
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
        max-height:400px;
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
        margin: 20px 0px 20px 24px;
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
       margin-top: 35px;
       border-top: 1px solid #ddd;
    }
    .sel_btn span{
        margin-right: 24px;
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
        border: 0!important;
        background: rgba(51,119,255,1)!important;
        color: rgba(255,255,255,1)!important;
        margin-left: 40px;
    }
    .select{
        float: right;
        display: inline-block;
        height: 36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
        width: 144px;
        background: rgba(242,246,252,1);
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(61,73,102,1);
        margin: 10px 20% 0 0;
    }
   
</style>