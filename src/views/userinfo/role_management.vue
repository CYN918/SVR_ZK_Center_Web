<template>
    <div class="centNavBox">
        <div class="btn">
            <div class="btn_title">
                <span>可管理账号</span>
            </div>
            <div class="btn_1">
                <span @click="jump">添加角色</span>
            </div>
        </div>
        <div class="box_input" v-if="listShow" >
            <div class="box" v-for="(item,index) in list">
                <div class="box_1">
                    <img src="../../../public/img/user.png"/>
                </div>
                <div class="box_2">
                    <p class="box_txt">{{item.role_name}}</p>
                    <p class="masg">{{item.created_at}}创建</p>
                </div>
                <div class="box_3">
                    <p class="box_txt box_num" @click="nums(index)">{{item.users_count}}</p>
                    <p class="masg">已绑定账号数</p>
                </div>
                <div class="box_4" @click="enter(index)">
                    <img src="../../../public/img/xiugai.png">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "role_management",
        data(){
            return {
                listShow:true,
                list:[],
                id:9,
            }
        },
        mounted(){
            this.getRole();
        },
        methods:{
            jump(){
                this.$router.push({
                    path:'/userinfo/AddRole'
                })
            },
            getRole(){
                this.api.get_roles().then((res)=>{
                    this.list = res;
                    console.log(res)
                })
            },
            enter(a){
                this.$router.push({
                    path:'/userinfo/AddRole',
                    query:{
                        role_id: this.list[a].id
                    }
                })
            },
            nums(index){
                this.$router.push({
                    path:'/userinfo/quantuty',
                    query:{
                        role_id: this.list[index].id,
                        role_name:this.list[index].role_name,
                    }
                })
            },
        }
    }
</script>

<style scoped>

.btn{
    width: 100%;
    height: 50px;
    margin-bottom: 41px;
}
.btn_1{
    float: right;
    display: inline-block;
    width:140px;
    height:48px;
    margin-right: 100px;
}
.btn_1>span{
    display: inline-block;
    width:140px;
    height:48px;
    background:rgba(19,159,248,1);
    border-radius:5px;
    text-align: center;
    line-height:48px;
    margin-right: 20px;
    cursor: pointer;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    }

.box{
    display: inline-block;
    width:484px;
    height:130px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.08);
    border-radius:5px;
    margin: 0 24px 20px 0;
}
.box:nth-child(3n){
    margin: 0 0 20px 0!important;
}
.box_input{
    margin-left:35px;
}
.box_1{
    width:80px ;
    display: inline-block;
    position: relative;
    top:50%;
    transform: translateY(-50%);
    margin: 0 20px 0 30px;
}
img{
    width: 80px;
}
.box_2{
    display: inline-block;
    margin-right: 30px;
    position: relative;
    top:33%;
    transform: translateY(-50%);
}
.box_3{
    display: inline-block;
    text-align: center;
    position: relative;
    top:33%;
    transform: translateY(-50%);
}
.btn_title{display: inline-block}
.btn_title>span{
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:36px;
}
p{
    font-size: 12px;
}
.box_4{
    display: inline-block;
    width: 0;
    height: 0;
    position: relative;
    top: -84px;
    right: -444px;
    cursor: pointer;
    border:20px solid;
    border-color:#139FF8 #139FF8 transparent transparent ;
    border-radius: 5px;
}
.box_4>img{
    width:20px;
    position: relative;
    top:-18px;

}
.box_txt{
    margin-bottom: 15px;
    font-size:18px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
}
.masg{
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
}
.box_num{
    text-decoration:underline;
    color:rgba(19,159,248,1);
}
</style>