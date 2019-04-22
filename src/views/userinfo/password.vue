<template>
    <div class="centNavBox">
        <div class="center">
            <div class="message">
                <span>初始密码</span>
                <input type="password" v-if="show_1" v-model="input1"/>
                <input type="text" v-if="show" v-model="input1"/>
                <i @click="heid">hs</i>
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
.btn{text-align: center;margin-top: 100px}
.btn>span{
    display: inline-block;
    width: 120px;
    height: 35px;
    line-height: 35px;
    border:1px solid #ddd;
    border-radius: 8px;
    margin-left: 50px;
}
.btn_txt{
    margin-left: 0;
    margin-right: 50px;
    background: #57a314;
    color: #fff;
}
</style>