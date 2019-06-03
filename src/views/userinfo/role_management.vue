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
                    <span><img src="../../../public/img/add_msg.png" style="width: 12px;margin-right: 14px">添加角色</span>
                </div>
                <div class="box" v-for="(item,index) in list">
                    <div class="box_1">
                        <img src="../../../public/img/user.png"/>
                    </div>
                    <div class="box_2">
                        <p class="box_txt">{{item.role_name}}</p>
                        <p class="masg">{{item.created_at}}创建</p>
                    </div>
                    <div class="box_3">
                        <p class="box_txt box_num" @click="nums(index)">{{item.user_count}}</p>
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
                        :total="total">
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
                id:null,
                p:30,
                page:1,
                total:0,
                search:''
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
                let params = {search:this.search,p:this.p,page:this.page};
                this.api.role_roles({params}).then((res)=>{
                    console.log(res);
                    this.list = res.data;
                    // if(this.list!=''){
                    //     this.listShow=true
                    // }
                })
            },
            enter(a){
                this.$router.push({
                    path:'/userinfo/AddRole',
                    query:{
                        role_id: this.list[a].role_id,
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
    width:519px;
    height:124px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    vertical-align: top;
    margin: 0 24px 24px 0;
    cursor: pointer;
    border: 2px dotted #d3dbeb;
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
    position: relative;
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
    color:#1f2e4d;
    line-height:36px;
}
p{
    font-size: 12px;
}
.box_4{
    display: inline-block;
    width: 0;
    height: 0;
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    border:20px solid;
    border-color:#3377ff #3377ff transparent transparent ;
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
    color:#1f2e4d;
}
.masg{
    font-size:14px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:#8f9bb3;
}
.box_num{
    text-decoration:underline;
    color:#3377ff;
    cursor: pointer;
}
</style>