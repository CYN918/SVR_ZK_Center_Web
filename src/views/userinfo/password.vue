<template>
    <div class="centNavBox">
        <div class="title_left">
            <span>基本信息</span>
        </div>
        <div class="center">
            <div class="message">
                <span class="fs">初始密码</span>
                <input type="password" v-if="show_1" v-model="input1"/>
                <input type="text" v-if="show" v-model="input1"/>
                <div class="imgs_1">
                    <img src="../../../public/img/icon.png" @click="heid"/>
                </div>

            </div>
            <div class="message">
                <span>新密码</span>
                <input type="password" v-if="show_1" v-model="input2"/>
                <input type="text" v-if="show" v-model="input2"/>
            </div>
            <div class="message">
                <span>确认信密码</span>
                <input type="password" v-if="show_1" v-model="input3"/>
                <input type="text" v-if="show" v-model="input3"/>
            </div>
        </div>
        <div class="btn">
            <span class="btn_txt" @click="edit_account_password">修改</span>
            <span>取消</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "password",
        data(){
            return{
                show:false,
                show_1:true,
                input1:'',
                input2:'',
                input3:'',
            }
        },
        methods:{
            heid(){
                this.show = !(this.show);
                this.show_1 = !(this.show_1)
            },
            edit_account_password(){

                if(!this.input1){
                    this.$message('旧密码不能为空！');
                    return
                }
                if(!this.input2){
                    this.$message('新密码不能为空！');
                    return
                }
                if(!this.input3){
                    this.$message('重复密码不能为空');
                    return
                }
                if(this.input2!=this.input3){
                    this.$message('两次输入不一致');
                    return
                }
                let params = {
                    email:localStorage.getItem('userAd'),
                    password_old:this.input1,
                    password:this.input2,
                    password_confirmation:this.input3,
                };
                this.api.edit_account_password(params);
            }
        }
    }
</script>

<style scoped>
.center{margin-bottom: 70px}
.btn{text-align: center;margin-bottom: 440px}
.btn>span{
    display: inline-block;
    width:140px;
    height:40px;
    line-height:40px;
    border:1px solid #ddd;
    border-radius: 5px;
    margin-left: 50px;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
}
.message{margin-bottom: 20px}
.message>span{
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
    line-height:36px;
    margin-right: 19px;
}
.message>input{
    margin-left: 0;
    width:320px;
    height:50px;
    border:1px solid rgba(230,230,230,1);
    border-radius:5px;
}
.btn_txt{
    margin-left: 0;
    margin-right: 40px;
    background:rgba(19,159,248,1);
    color: #fff;
}
.fs{
    margin-left: 40px;
}
.title_left{
    margin-bottom: 100px;
}
.imgs_1{
    display: inline-block;
    width: 28px;
    height: 28px;
    margin-left: 15px;
    border: 1px dashed #ddd;
    vertical-align: middle;
}
img{
    width: 28px;
}
.title_left>span{
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
    line-height:36px;
}
</style>