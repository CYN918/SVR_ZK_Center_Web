<template>
    <div class="detail">
        <div class="detail_1">
            <div class="detail_1_1_1">
                <span>添加账号</span>
            </div>
            <div class="detail_1_1_2">
                <span class="btn_1_1" @click="inner" :class="{active:isActive==1}">内部账号</span>
                <span class="btn_1_2" @click="external" :class="{active:isActive==2}">外部账号</span>
            </div>
            <div class="detail_1_1_3">
                <span class="txt txt_right">所属角色</span>
                <select v-model="roles">
                    <option :value="item.id" v-for="(item,index) in selectData">{{item.role_name}}</option>
                </select>
                <span class="btn_1_3">查看权限</span>
            </div>
            <div class="detail_1_1_4">
                <span  class="txt">用户名</span>
                <input type="text" v-model="name"/>
            </div>
            <div class="detail_1_1_5">
                <span  class="txt">邮箱</span>
                <input type="text" v-model="email"/>
            </div>
            <div class="detail_1_1_6">
                <span  class="txt">初始密码</span>
                <input type="text" v-model="password"/>
            </div>
            <div class="detail_1_1_6">
                <span  class="txt">确认密码</span>
                <input type="text" v-model="password_confirmation"/>
            </div>
            <div class="detail_1_1_7" v-if="listTab">
                <span  class="txt">公司名称</span>
                <input type="text" v-model="company"/>
            </div>
            <div class="detail_1_1_8" v-if="listTab">
                <span  class="txt">联系电话</span>
                <input type="text" v-model="phone"/>
            </div>
            <div class="operate">
                <span class="btn_txt_1" @click="tj">添加</span>
                <span class="btn_txt_2" @click="qx">取消</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['userMessage'],
        name: "a-d-duser",
        data(){
            return {
                selectData:[],
                isActive:1,
                listTab:false,
                list:[],
                role_id:'',
                name:'',
                email:'',
                roles:'',
                company:'',
                password:'',
                phone:'',
                password_confirmation:'',
            }
        },
        mounted(){
                this.getuserDATA();

                if(this.userMessage!=undefined){
                    this.roles = this.userMessage.roles;
                    this.email = this.userMessage.email;
                    this.password = this.userMessage.password;
                    this.password_confirmation = this.userMessage.password_confirmation;
                    if(this.isActive==2){
                        this.company = this.userMessage.company;
                        this.phone = this.userMessage.phone;
                    }
                }

        },
        methods:{
            tj(){
                if(this.isActive==1){
                    this.addUSER()
                }else{
                    this.addWbUser();
                }
            },
            qx(){
                this.$parent.qx()
            },
            addUSER(){
                this.api.add_account({name:this.name,email:this.email,password:this.password,password_confirmation:this.password_confirmation,roles:this.roles}).then((res)=>{
                    console.log(res)
                })
            },
            addWbUser(){
                this.api.account_external_add({name:this.name,email:this.email,password:this.password,password_confirmation:this.password_confirmation,roles_id:this.roles,company:this.company,phone:this.phone}).then((res)=>{
                    console.log(res)
                })
            },
            getuserDATA(){
                this.api.api_get_roles().then((res)=>{
                    this.selectData = res
                })
            },
            inner(){
                if(this.userMessage!=undefined){

                    if(this.userMessage.type==0){
                        this.listTab=false;
                        this.isActive=1;
                    }else{
                        this.listTab=true;
                        this.isActive=2;
                    }
                }else {
                    this.listTab=false;
                    this.isActive=1;
                }
            },
            external(){
                if(this.userMessage!=undefined){
                    if(this.userMessage.type==1){
                        this.listTab=true;
                        this.isActive=2;

                    }else{
                            this.listTab=false;
                            this.isActive=1;
                         }
                }else{this.listTab=true;
                       this.isActive=2;
                      }

            },
        },
    }
</script>

<style scoped>
    .detail{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        top: 65px;
        left: 220px;
        bottom: 0;
        right: 0;
    }
    .detail_1{
        position: absolute;
        top: 50%;
        left: 44%;
        padding: 30px 60px 0;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        background: rgba(255,255,255,1);
        -webkit-box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
        box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
        overflow: hidden;
        overflow-y: auto;
        border-radius: 8px;
        width: 862px;
        height: 673px;
        text-align: center;
    }
    .detail_1_1{
        text-align: center;
        /*padding: 40px 0;*/
    }
    .detail_1_2{
        width: 30px;
        position: absolute;
        right: 80px;
        top:40px;
        cursor: pointer;
    }

    .detail_1_2>img{
        width: 30px;
        position: absolute;
        top: -28px;
        right: -65px;
    }
    .detail input{
        margin-left:30px;
        width:320px;
        height:50px;
        border:1px solid rgba(230,230,230,1);
        border-radius:5px;
    }
    .detail div{
        margin-bottom:30px ;
    }
    .txt{
        font-size:16px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(54,54,54,1);
        display: inline-block;
        width: 90px;
        text-align: right;
    }
    .detail select{
        width:170px;
        height:50px;
        border:1px solid rgba(230,230,230,1);
        border-radius:5px;
        margin-left: 26px;
    }
    .btn_1_1,.btn_1_2{
        display: inline-block;
        width:210px;
        height:40px;
        border:1px solid rgba(19,159,248,1);
        border-radius:5px 0px 0px 5px;
        cursor: pointer;
        font-size:16px!important;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(19,159,248,1)!important;
        text-align: center;
        line-height: 40px;
    }
    .btn_1_2{
        border-radius:0px 5px 5px 0px;
    }
    .btn_1_3{
        display: inline-block;
        width: 158px;
        height: 50px;
        border: 1px solid rgba(19,159,248,1);
        border-radius: 5px;
        text-align: center!important;
        margin-left: 10px;
        line-height: 50px;
        font-size: 16px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(19,159,248,1);
        margin-right: 42px;
        cursor: pointer;
    }
    .detail_1_1_1{text-align: center;}
    .detail_1_1_1>span{
        display: inline-block;
        font-size:20px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(54,54,54,1);
    }
    .active{
        background:rgba(19,159,248,0.1);;
    }
    .btn_txt_1{
        display: inline-block;
        width:140px;
        height:40px;
        background:rgba(19,159,248,1);
        border-radius:5px;
        font-size:16px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height: 40px;
        margin-right: 40px;
    }
    .btn_txt_2{
        display: inline-block;
        width:140px;
        height:40px;
        border:1px solid rgba(153,153,153,1);
        border-radius:5px;
        font-size:16px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height: 40px;
    }

</style>