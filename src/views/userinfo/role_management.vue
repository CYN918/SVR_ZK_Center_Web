<template>
    <div class="centNavBox">
        <div class="btn">
            <div class="btn_1">
                <span @click="jump">添加角色</span>
            </div>
        </div>
        <div class="box_input" v-if="listShow" >
            <div class="box" v-for="(item,index) in list">
                <div class="box_1">
                    <img src="../../../public/img/user.jpg"/>
                </div>
                <div class="box_2">
                    <p class="box_txt">{{item.role_name}}</p>
                    <p>{{item.created_at}}创建</p>
                </div>
                <div class="box_3">
                    <p class="box_txt">{{item.users_count}}</p>
                    <p>已绑定账号数</p>
                </div>
                <div class="box_4" @click="">
                    <img src="../../../public/img/xiugai.jpg">
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
            // getqx(){
            //     let params = {id:this.id};
            //     this.api.get_role_permission({params}).then((res)=>{
            //         console.log(res);
            //     })
            // }                                                                  //测试代码
        }
    }
</script>

<style scoped>
.btn{
    width: 100%;
    height: 50px;
}
.btn_1{overflow: hidden}
.btn_1>span{
    float: right;
    display: inline-block;
    width:100px ;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #000;
    border-radius: 10px;
    background: #d1d1d1;
    margin-right: 20px;
    cursor: pointer;
    }

.box{
    display: inline-block;
    width: 400px;
    height: 100px;
    border:1px solid #ddd;
    border-radius: 15px;
    box-shadow:0 0 3px 3px #eeeeee;
    margin:0 50px 50px 0;
}

.box_1{
    width:50px ;
    display: inline-block;
    position: relative;
    top:50%;
    transform: translateY(-50%);
    margin: 0 20px;
}
img{
    width: 50px;
}
.box_2{
    display: inline-block;
    margin-right: 30px;
    text-align: center;
    position: relative;
    top:50%;
    transform: translateY(-50%);
}
.box_3{
    display: inline-block;
    text-align: center;
    position: relative;
    top:50%;

    transform: translateY(-50%);
}
p{
    font-size: 12px;
}
.box_4{
    display: inline-block;
    width:20px;
    position: relative;
    top:-20px;
    cursor: pointer;
}
.box_4>img{
    width:20px
}
.box_txt{
    margin-bottom: 15px;
    font-size: 16px;
}
</style>