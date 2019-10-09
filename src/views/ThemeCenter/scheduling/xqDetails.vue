<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh">排期管理 &nbsp;/&nbsp;</span>
                <span class="log_url">排期详情 &nbsp;/&nbsp;</span>
                <span class="new_url">需求详情 &nbsp;</span>
            </div>
            <div>
                <span class="topName">需求详情</span>
            </div>
        </div>
        <div class="seach">
           <div class="box1">
               <div class="box1_name">
                   <span>待制作</span>
               </div>
               <div class="box1_img">
                   <span class="box1_qd">aaa</span>
                   <img src="../../../../public/img/IMG.png">
                   <div class="box1_BTN">
                       <span>重新上传</span>
                       <span>查看详情</span>
                   </div>
               </div>
               <div class="name">
                   <span>名称</span>
               </div>

               <div class="box1_name">
                   <span>完成品</span>
               </div>
               <div class="box1_img">
                   <span class="box1_qd">aaa</span>
                   <img src="../../../../public/img/IMG.png">
                   <div class="box1_BTN">
                       <span>重新上传</span>
                       <span>查看详情</span>
                   </div>
               </div>
               <div class="name">
                   <span>名称</span>
               </div>
           </div>
            <div class="box2">
                <div>
                    <span class="box2_name">名称</span>
                    <input type="text" class="input1" v-model="name">
                </div>
                <div>
                    <span class="box2_name">类型</span>
                    <select>
                        <option>全部</option>
                    </select>
                </div>
                <div>
                    <span class="box2_name">带制作渠道</span>
                    <select>
                        <option>全部</option>
                    </select>
                </div>
                <div>
                    <span class="box2_name">上架账号</span>
                    <select>
                        <option>全部</option>
                    </select>
                </div>
                <div>
                    <span class="box2_name">需求说明</span>
                    <textarea></textarea>
                </div>
                <div>
                    <span class="box2_name">责任人</span>
                    <select>
                        <option>全部</option>
                    </select>
                </div>
                <div>
                    <span class="box2_name">状态</span>
                    <select>
                        <option>全部</option>
                    </select>
                </div>
                <div>
                    <span class="box2_name">绑定主题</span>
                    <input type="text" class="input2">
                    <span class="sel">从主题库选择</span>
                </div>
                <div class="box2_btn">
                    <span class="gx">更新</span>
                    <span>取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "xq-details",
        data(){
            return{
                name:'',
                status:"",
                type:'',
                channel:'',
                account:"",
                note:'',
                person:"",
                thid:'',
            }
        },
        methods:{
            getADD(){
                this.api.themes_schedule_demand_add().then((res)=>{

                })
            },
        },
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:100px;
        background: rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
    }
    .topName{
        display: inline-block;
        font-size:18px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-left: 24px;
        margin-right: 10px;
        line-height: 45px;
    }
    .new_url{
        color: rgba(61,73,102,1)!important;
    }
    .seach{
        background: #fff;
        border-radius:4px;
        margin-top: 182px;
        margin-bottom: 24px;
    }
    .box1{
        display: inline-block;
        width:257px;
        height:923px;
        background:rgba(255,255,255,1);
    }
    .box1_name span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
        margin: 24px 0 20px 24px;
    }
    .box1_img{
        width:189px;
        height:315px;
        background: #df5000;
        position: relative;
        margin-left: 24px;
    }
    .box1_img img{
        max-width:189px;
        max-height:315px;
        position: relative;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .box1_qd{
        position: absolute;
        left: 0;
        top:0;
        display: inline-block;
        height:24px;
        background:rgba(10,10,10,1);
        opacity:0.81;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(230,233,240,1);
    }
    .box1_BTN span{
        display: block;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(230,233,240,1);
        height: 34px;
        line-height: 34px;
        cursor: pointer;
    }
    .box1_BTN{
        position: absolute;
        bottom: 0;
        width:189px;
        height:68px;
        background:rgba(10,10,10,1);
        opacity:0.81;
        text-align: center;
    }
    .name span{
        display: inline-block;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        margin:9px 0 58px 34px ;
    }
    .box2{
        display: inline-block;
        vertical-align: top;
    }
    .box2>div{
        margin-bottom: 20px;
    }
    .box2_name{
        display: inline-block;
        width: 100px;
        text-align: right;
        height:20px;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 20px;
    }
    .input1{
        width:457px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 10px;
        margin-top: 20px;
    }
    .input2{
        width:347px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    textarea{
        width:452px;
        height:126px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding: 5px;
    }
    .sel{
        width:124px;
        height:36px;
        background:rgba(242,246,252,1);
        border-radius:4px;
        border:1px solid rgba(51,119,255,1);
        margin-left: 20px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        cursor: pointer;
        text-align: center;
        line-height: 36px;
        display: inline-block;
    }
    .box2_btn span{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .gx{
        border: none!important;
        color: #fff!important;
        background:rgba(51,119,255,1)!important;
        margin-left: 125px;
        margin-right: 20px;
    }
</style>