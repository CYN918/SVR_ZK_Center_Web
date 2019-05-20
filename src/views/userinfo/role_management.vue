<template>
    <div>
        <div class="top_name">
            <span class="top_txt">个人中心/可管理账号</span>
            <div class="title_left">
                <span>可管理账号</span>
            </div>
        </div>
        <div class="centNavBox">
            <div class="box_input">
                <div class="btn" @click="jump">
                    <span>+ 添加角色</span>
                </div>
                <div class="box" v-for="(item,index) in list" v-if="listShow">
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
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[30, 40, 50, 60]"
                        :page-size="p"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                </el-pagination>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "role_management",
        data(){
            return {
                listShow:false,
                list:[],
                id:9,
                p:30,
                page:1,
                total:0
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
                    if(this.list!=''){
                        this.listShow=true
                    }
                })
            },
            enter(a){
                this.$router.push({
                    path:'/userinfo/AddRole',
                    query:{
                        role_id: this.list[a].id,
                        role_name:this.list[a].role_name

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
            handleSizeChange(p){
                this.p = p
            },
            handleCurrentChange(page){
                this.page =page
            },
        }
    }
</script>

<style scoped>
    .top_name{
        height: 109px;
        z-index: 999999;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
    }
    .title_left>span{
        display: inline-block;
        margin-left: 24px;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
    }
    .centNavBox{
        width: 100%;
        padding: 24px 0 24px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin-top:194px;
    }
.btn{
    display: inline-block;
    text-align: center;
    width:523px;
    height:128px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    vertical-align: top;
    margin: 0 24px 24px 0;
    cursor: pointer;
}

    .btn>span{
    display: inline-block;
    border-radius:5px;
    text-align: center;
    line-height:128px;
    margin-right: 20px;
    cursor: pointer;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(61,73,102,1);
    }

.box{
    display: inline-block;
    width:523px;
    height:128px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    margin: 0 24px 20px 0;

}
.box:nth-child(3){
    margin: 0 0 20px 0!important;
}
.box:nth-child(3n){
    margin: 0 0 20px 0!important;
}
.box_input{
    position: relative;
    top:0;
    left: 0;
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
    top: -39px;
    right: -37px;
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
    cursor: pointer;
}
</style>