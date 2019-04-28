<template>
    <div class="centNavBox">
        <div class="title_name">
            <span>查看意见详情</span>
        </div>
        <div class="titl_right">
            <div class="message">
                <span class="message_name">用户名:</span>
                <span class="message_box">{{messageData.user.user_name}}</span>
            </div>
            <div class="message">
                <span class="message_name">用户账号:</span>
                <span class="message_box">{{messageData.user.email}}</span>
            </div>
            <div class="message">
                <span class="message_name">问题类型:</span>
                <span class="message_box">{{messageData.fd_type}}</span>
            </div>
            <div class="message">
                <span class="message_name">提交时间:</span>
                <span class="message_box">{{messageData.created_at}}</span>
            </div>
            <div class="message">
                <span class="message_name message_top">问题描述:</span>
                <div class="issue">{{messageData.fd_desc}}</div>
            </div>
            <div class="message">
                <span class="message_name message_top">相关图片:</span>
                <div class="ps" v-for="(item,index) in messageData.fd_pics"><img :src="item"/></div>
            </div>
        </div>
        <div class="btn_bottom" @click="back">
            <span>
                返回
            </span>
        </div>

    </div>
</template>

<script>
    export default {
        name: "details",
        data(){
            return {
                    messageData:{},
            }
        },
        mounted(){
            this.getMessage();
        },
        methods:{
            getMessage(){
                let params = {fd_id:this.$route.query.fd_id};
                this.api.feedback_detail({params}).then((res)=>{
                    this.messageData = res;
                })
            },
            back(){
                this.$router.push({
                    path:'/userinfo/feedback'
                })
            },
        }
    }
</script>

<style scoped>
.title_name>span{
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
    display: block;
}
.titl_right{
    margin-left: 256px;
    margin-top: 42px;
}
.message{
    margin-bottom: 30px;
}
.message_name{
    display: inline-block;
    width: 70px;
    text-align: left;
    margin-right: 20px;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
}
.message_top{
    vertical-align: top;
}
.issue{
    display: inline-block;
    width:1020px;
    height:170px;
    border:1px solid rgba(230,230,230,1);
    border-radius:5px;
    word-wrap :break-word;
    padding: 10px;
}
.ps{
    display: inline-block;
    width: 329px;
    height: 212px;
    border: 1px solid #ddd;
    margin-right: 25px;
}
.ps>img{
    width: 329px;
    height: 212px;
}
.ps:last-child{
    margin-right: 0;
}
.btn_bottom{
    text-align: center;
    margin-top: 100px;
}
.btn_bottom>span{
    display: inline-block;
    width:140px;
    height:48px;
    line-height: 48px;
    background:rgba(19,159,248,1);
    box-shadow:0px 0px 10px 0px rgba(153,153,153,0.14);
    border-radius:5px;
    cursor: pointer;
    font-size:14px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
}
.message_box{
    display: inline-block;
    width: 500px;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
    text-align: left!important;
}
</style>