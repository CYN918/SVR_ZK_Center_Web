<template>
    <div class="detail">
        <div class="detail_1">
            <div class="detail_1_1_1">
                <span v-if="this.userMessage==undefined">添加账号</span>
                <span v-if="this.userMessage!=undefined">编辑账号</span>
            </div>
            <div class="detail_1_1_3">
                <span class="txt txt_right">所属角色</span>
                <select v-model="roles" v-if="this.userMessage==undefined">
                    <option value="wb">外部角色</option>
                </select>
                <select v-model="roles" v-if="this.userMessage!=undefined">
                    <option :value="item.id" v-for="(item,index) in selectData">{{item.role_name}}</option>
                </select>
                <span class="btn_1_3">查看权限</span>
            </div>
            <div class="detail_1_1_4">
                <span  class="txt">用户名</span>
                <input type="text" v-model="name"/>
            </div>
            <div class="detail_1_1_5">
                <span  class="txt">邮箱账号</span>
                <input type="text" v-model="email"/>
            </div>
            <div class="detail_1_1_6" v-if="this.userMessage==undefined">
                <span  class="txt">初始密码</span>
                <input type="text" v-model="password"/>
            </div>
            <div class="detail_1_1_6" v-if="this.userMessage==undefined">
                <span  class="txt">再次输入密码</span>
                <input type="text" v-model="password_confirmation"/>
            </div>
            <div class="detail_1_1_7" v-if="this.userMessage==undefined">
                <span  class="txt">公司名称</span>
                <input type="text" v-model="company"/>
            </div>
            <div class="detail_1_1_8" v-if="this.userMessage==undefined">
                <span  class="txt">联系电话</span>
                <input type="text" v-model="phone"/>
            </div>
            <div class="operate">
                <span class="btn_txt_1" @click="tj" :class="{active:name==''||email==''||password==''||password_confirmation==''||company==''||phone==''}" v-if="this.userMessage==undefined">添加</span>
                <span class="btn_txt_1" @click="tj" :class="{active:name==''||email==''}" v-if="this.userMessage!=undefined">添加</span>
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
                rolesList:[],
                company:'',
                password:'',
                phone:'',
                password_confirmation:'',
            }
        },
        mounted(){
                if(this.userMessage!=undefined){
                    this.roles = this.userMessage.roles;
                    this.email = this.userMessage.email;
                    this.password = this.userMessage.password;
                    this.password_confirmation = this.userMessage.password_confirmation;
                    this.company = this.userMessage.company;
                    this.phone = this.userMessage.phone;
                }
            this.getuserDATA();
        },
        methods:{
            getuserDATA(){
                // this.api.api_get_roles({}).then((res)=>{
                //     this.selectData = res;
                //     console.log(res)
                // })
                let params = {search:'',p:10,page:1};
                this.api.role_roles({params}).then((res)=>{
                    console.log(res);
                    this.total = res.total;
                    this.selectData = res.data;
                    console.log(this.selectData)

                })
            },
            tj(){
                if(this.userMessage!=undefined){
                    this.setUser();
                }else{
                    this.addWbUser()
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
                if(!this.name){
                    this.$message('姓名不能为空')
                }
                if(!this.email){
                    this.$message('姓名不能为空')
                }
                if(!this.password){
                    this.$message('密码不能为空')
                }if(!this.password_confirmation){
                    this.$message('确认密码不能为空')
                }
                if(this.password_confirmation!=this.password){
                    this.$message('两次密码不相同')
                }
                if(!this.company){
                    this.$message('公司不能为空')
                }
                if(!this.phone){
                    this.$message('电话不能为空')
                }

                this.api.account_external_add({name:this.name,email:this.email,password:this.password,password_confirmation:this.password_confirmation,roles_id:this.roles,company:this.company,phone:this.phone,contact_email:this.email}).then((res)=>{
                })
            },
            setUser(){
                if(!this.name){
                    this.$message('姓名不能为空')
                }
                if(!this.email){
                    this.$message('姓名不能为空')
                }
                if(!this.password){
                    this.$message('密码不能为空')
                }if(!this.password_confirmation){
                    this.$message('确认密码不能为空')
                }
                if(this.password_confirmation!=this.password){
                    this.$message('两次密码不相同')
                }
                if(!this.company){
                    this.$message('公司不能为空')
                }
                if(!this.phone){
                    this.$message('电话不能为空')
                }

                this.api.edit_account({name:this.name,email:this.email,roles_id:this.roles}).then((res)=>{
                    console.log(res)
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
        z-index: 99999999;
        top: 65px;
        left: 220px;
        bottom: 0;
        right: 0;
    }
    .detail_1{
        position: absolute;
        top: 50%;
        left: 44%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        -webkit-box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
        box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
        overflow: hidden;
        overflow-y: auto;
        width:584px;
        background:rgba(255,255,255,1);
        border-radius:4px;;
        text-align: center;
        z-index: 9999999;
    }

    .detail_1_2>img{
        width: 30px;
        position: absolute;
        top: -28px;
        right: -65px;
    }
    .detail input{
        margin-left:24px;
        width:404px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .detail div{
        margin-bottom:24px ;
    }
    .txt{
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        display: inline-block;
        width: 90px;
        text-align: right;
        margin-left: 10px;
    }
    .detail select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 24px;
        margin-left:24px;
    }

    .btn_1_3{
        display: inline-block;
        width:96px;
        height:36px;
        text-align: center;
        background:rgba(242,246,252,1);
        border-radius:4px;
        border:1px solid rgba(51,119,255,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1);
        line-height: 36px;
        cursor: pointer;
    }
    .detail_1_1_1{
        text-align: left;
        height: 55px;
        border-bottom: 1px solid #E6E9F0;
    }
    .detail_1_1_1>span{
        display: inline-block;
        line-height: 55px;
        margin-left: 20px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .operate{
        text-align: left;
        margin-left: 116px;
    }
    .btn_txt_1{
        display: inline-block;
        width:68px;
        height:36px;
        text-align: center;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height: 36px;
        margin-right: 14px;
        cursor: pointer;
    }
    .active{
        background: rgb(202, 206, 199)!important;
        color: rgb(33, 33, 33)!important;
    }
    .btn_txt_2{
        display: inline-block;
        width:68px;
        height:36px;
        text-align: center;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        line-height: 36px;
        cursor: pointer;
    }
    .detail_1_1_3,.detail_1_1_4,.detail_1_1_5,.detail_1_1_6,.detail_1_1_7,.detail_1_1_8{
        text-align: left;
    }
</style>