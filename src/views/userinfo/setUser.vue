<template>
    <div class="detail">
        <div class="detail_1">
            <div class="detail_1_1_1">
                <span>编辑账号</span>
            </div>
            <div class="detail_1_1_3">
                <span class="txt txt_right">所属角色</span>
                <select v-model="roles" v-if="type==1">
                    <option value="wb">外部角色</option>
                </select>
                <select v-model="roles" v-if="type==0">
                    <option :value="item.role_id" v-for="(item,index) in selectData">{{item.role_name}}</option>
                </select>
                <span class="btn_1_3">查看权限</span>
            </div>
            <div class="detail_1_1_4">
                <span  class="txt">用户名</span>
                <input type="text" v-model="name"/>
            </div>
            <div class="detail_1_1_7" v-if="type==1">
                <span  class="txt">公司名称</span>
                <input type="text" v-model="company"/>
            </div>
            <div class="detail_1_1_8" v-if="type==1">
                <span  class="txt">联系电话</span>
                <input type="text" v-model="phone"/>
            </div>
            <div class="operate">
                <span class="btn_txt_1" @click="tj" >添加</span>
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
                type:'',
                user_id:'',
            }
        },
        mounted(){
            this.roles = this.userMessage.roles;
            this.name = this.userMessage.name;
            this.company = this.userMessage.company;
            this.phone = this.userMessage.phone;
            this.type=this.userMessage.type;
            this.user_id = this.userMessage.user_id;
            this.getuserDATA();
        },
        methods:{
            getuserDATA(){
                let params = {search:'',p:100,page:1};
                this.api.role_roles({params}).then((res)=>{
                    console.log(res);
                    this.total = res.total;
                    this.selectData = res.data;
                    console.log(this.selectData)

                })
            },
            tj(){
               if(this.type==0){
                   this. setUser()
               }else{
                   this.setWbUser()
               }
            },
            qx(){
                this.$parent.qx()
            },

            setWbUser(){

                if(!this.email){
                    this.$message('姓名不能为空')
                }
                if(!this.company){
                    this.$message('公司不能为空')
                }
                if(!this.phone){
                    this.$message('电话不能为空')
                }
                this.api.account_edit({name:this.name,role_id:this.roles,company:this.company,phone:this.phone,email:this.email,user_id:this.user_id}).then((res)=>{
                })
            },
            setUser(){
                if(!this.roles){
                    this.$message('角色不能为空')
                }
                if(!this.email){
                    this.$message('姓名不能为空')
                }
                this.api.account_edit({name:this.name,role_id:this.roles,company:this.company,phone:this.phone,email:this.email,user_id:this.user_id}).then((res)=>{
                    console.log(res)
                })
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
        z-index: 99999;
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