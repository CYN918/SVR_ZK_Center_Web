<template>

    <div class="centNavBox">
            <div class="title">
                <span>可管理账号</span>
            </div>
            <div class="box_input">
                <div class="box" v-for="(item,index1) in list">
                    <div class="box_1">
                        <img src="../../../public/img/user.png"/>
                    </div>
                    <div class="box_2">
                        <p class="box_txt">{{item.role_name}}</p>
                        <p>{{item.created_at}}创建</p>
                    </div>
                    <div class="box_3">
                        <p class="box_txt box_num">{{item.users.length}}</p>
                        <p>已绑定账号数</p>
                    </div>
                    <div class="box_4" @click="details(index1)">
                        <img src="../../../public/img/mesg.png">
                    </div>
                </div>
            </div>
            <div class="box_input_2">
                <input type="text" placeholder="输入用户名或邮箱快速查询"/>
                <span class="btn">查询</span>
                <span class="btn_2" @click="add">添加账号</span>
            </div>
            <div class="box_input_3">
                <div class="name" v-for="(item,index) in list" @click="aaa(index)"><span>{{item.role_name}}</span></div>
            </div>
            <tab :tableData2="tableData2" :management="management"></tab>
            <div class="detail" v-if="show">
                <div class="detail_1">
                    <div class="detail_1_1">
                        <span>{{name}}权限详情</span>
                    </div>
                    <el-table
                            :header-cell-style="getRowClass"
                            :data="tableData"
                            border
                            style="width: 100%;color: black;">
                        <el-table-column
                                prop="group_name"
                                label="权限名称"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="note"
                                label="权限说明">
                        </el-table-column>
                    </el-table>
                    <div class="detail_1_2" @click="shut">
                        <img src="../../../public/img/gb.png"/>
                    </div>
                </div>
            </div>
            <div class="detail" v-if="management">
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
                        <option :value="item.role_name" v-for="(item,index) in selectData">{{item.role_name}}</option>
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
        </div>
</template>

<script>
    import tab from './table';
    export default {
        components:{tab},
        name: "account",
        data(){
            return{
                tableData:[
                    {
                        group_name:'',
                        note:''
                    }
                ],
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
                management:false,
                show:false,
                tableData2:[
                    {
                        user_id:'',
                        created_at:'',
                        email:'',
                        status:'1',
                        user_name:'',
                        updated_at:'',
                    }
                ]
            }
        },
        mounted(){
            this.getList();
        },
        methods:{

            details(c){
                this.show=true;
                this.api.role_user().then((res)=>{
                   this.role_id= res[c].role_id;
                   this.name=res[c].role_name;
                   this.role();
                })
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(246,246,246,1);color:#000;text-align:center;font-size:9px;font-weight:500;height:48px;'
                } else {
                    return ''
                }
            },
            inner(){
                this.listTab=false;
                this.isActive=1;
            },
            external(){
                this.listTab=true;
                this.isActive=2;
            },
                shut(){
                this.show=false
            },
            add(){
                this.management=true;
                this.getuserDATA();
            },
            qx(){
                this.management=false;
            },
            getList(){
                this.api.role_user().then((res)=>{
                    this.list = res;
                    this.tableData2 = res[0].users;
                    console.log(res)
                })
            },
            aaa(a){
                this.api.role_user().then((res)=>{
                    this.tableData2 = res[a].users;
                })
            },
            role(){
                let params = {role_id:this.role_id};
                this.api.perm_userperm({params}).then((res)=>{
                    this.tableData = res;
                    console.log(res)
                })
            },
            tj(){
                if(this.isActive=1){
                    this.addUSER()
                }else{
                    this.addWbUser();
                }
            },
            addUSER(){
                this.api.add_account({name:this.name,email:this.email,password:this.password,password_confirmation:this.password_confirmation,roles:this.roles}).then((res)=>{
                    console.log(res)
                })
            },
            addWbUser(){
                this.api.add_external_account({name:this.name,email:this.email,password:this.password,password_confirmation:this.password_confirmation,roles:this.roles,company:this.company,phone:this.phone}).then((res)=>{
                    console.log(res)
                })
            },
            getuserDATA(){
                this.api.api_get_roles().then((res)=>{
                       this.selectData = res
                })
            },
            getEmilUSER(){
                let params = {};
                this.api.get_account({params}).then((res)=>{

                })
            },
        }
    }
</script>

<style scoped>
.title{
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    margin-bottom: 40px;
}
.box_input{
    margin-left: 75px;
    margin-bottom: 40px;
}
.box{
    display: inline-block;
    width:484px;
    height:130px;
    margin-right: 24px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.08);
    border-radius:5px;
}
.box:nth-child(3n){
    margin-right: 0;
}
.txt_right{
    padding-right: 9px;
}
.box_1{
    width:80px ;
    display: inline-block;
    position: relative;
    top:50%;
    transform: translateY(-50%);
    margin: 0 20px;
}
.box_2{
    display: inline-block;
    margin-right: 30px;
    text-align: center;
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
p{
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
}
.box_txt{
    margin-bottom: 15px;
    font-size:18px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
}
input{
    margin-right: 40px;
    margin-left: 0px;
    width:435px;
    height:50px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.08);
    border-radius:5px;
}
.btn,.btn_2{
    display: inline-block;
    width:140px;
    height:48px;
    background:rgba(19,159,248,1);
    border-radius:5px;
    text-align: center;
    line-height: 48px;
    cursor: pointer;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
}
.btn_2{
   margin-left: 60px;
}
.box_input_2{
    margin-bottom: 100px;
    margin-left: 75px;
}
.name{
    width:100px;
    height:40px;
    background:rgba(19,159,248,0.1);
    box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.14);
    border-radius:5px 5px 0px 0px;
    display: inline-block;
    text-align: center;
}
.name>span{
    display: inline-block;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:#139FF8;line-height: 40px;

}
.box_num{
    font-size:24px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    text-decoration:underline;
    color:rgba(19,159,248,1);
}
.box_4{
    display: inline-block;
    width: 0;
    height: 0;
    position: relative;
    top: -40px;
    right: -8px;
    cursor: pointer;
    border:20px solid;
    border-color:#139FF8 #139FF8 transparent transparent ;
    border-radius: 5px;
}
.box_4>img{
    width:20px;
    position: relative;
    top: -18px;
}
.detail{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    position: fixed;
    z-index: 9;
    top: 65px;
    left: 316px;
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