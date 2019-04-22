<template>

    <div class="centNavBox">
            <div class="title">
                <span>可管理账号</span>
            </div>
            <div class="box_input">
                <div class="box" v-for="(item,index1) in list">
                    <div class="box_1">
                        <img src="../../../public/img/user.jpg"/>
                    </div>
                    <div class="box_2">
                        <p class="box_txt">{{item.role_name}}</p>
                        <p>{{item.created_at}}创建</p>
                    </div>
                    <div class="box_3">
                        <p class="box_txt">{{item.users.length}}</p>
                        <p>已绑定账号数</p>
                    </div>
                    <div class="box_4" @click="details(index1)">
                        <img src="../../../public/img/timg.jpg">
                    </div>
                </div>
            </div>
            <div class="box_input_2">
                <input type="text" placeholder="输入用户名或邮箱快速查询"/>
                <span class="btn">查询</span>
                <span class="btn_2" @click="add">添加账号</span>
            </div>
            <div class="box_input_3">
                <div class="name" v-for="(item,index) in list" @click="aaa(index)">{{item.role_name}}</div>
            </div>
            <tab :tableData2="tableData2"></tab>
            <div class="detail" v-if="show">
                <div class="detail_1">
                    <div class="detail_1_1">
                        <span>{{name}}权限详情</span>
                    </div>
                    <el-table
                            :header-cell-style="getRowClass"
                            :data="tableData"
                            border
                            style="width: 75%;color: black;margin: 20px 0 0 200px">
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
                        <img src="../../../public/img/X.jpg"/>
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
                    <span>所属角色：</span>
                    <select>
                        <option></option>
                    </select>
                    <span class="btn_1_3">查看权限</span>
                </div>
                <div class="detail_1_1_4">
                    <span>用户名:</span>
                    <input type="text"/>
                </div>
                <div class="detail_1_1_5">
                    <span>邮箱:</span>
                    <input type="text"/>
                </div>
                <div class="detail_1_1_6">
                    <span>初始密码:</span>
                    <input type="text"/>
                </div>
                <div class="detail_1_1_7" v-if="listTab">
                    <span>公司名称:</span>
                    <input type="text"/>
                </div>
                <div class="detail_1_1_8" v-if="listTab">
                    <span>联系电话:</span>
                    <input type="text"/>
                </div>
                <div class="operate">
                    <span class="btn_txt_1">添加</span>
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
                isActive:1,
                listTab:false,
                list:[],
                role_id:'',
                name:'',
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
                    return 'background:#afa;color:#000;text-align:center;font-size:9px;font-weight:500;'
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
            }
        }
    }
</script>

<style scoped>
.title{
    text-align: center;
    font-size: 18px;
    margin-bottom: 50px;
}
.box_input{

}
.box{
    display: inline-block;
    width: 400px;
    height: 100px;
    border:1px solid #ddd;
    border-radius: 15px;
    box-shadow:0 0 3px 3px #eeeeee;
    margin:0 30px 80px 0;
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
.box_txt{
    margin-bottom: 15px;
    font-size: 16px;
}
input{
    margin-right: 30px;
}
.btn,.btn_2{
    display: inline-block;
    width: 120px;
    height: 35px;
    border-radius: 8px;
    border: 1px solid #000;
    background: #ddd;
    text-align: center;
    line-height: 35px;
    cursor: pointer;
}
.btn_2{
    float: right;
    margin-right: 100px;
}
.box_input_2{
    margin-bottom: 100px;
}
.name{
    width: 100px;
    height: 50px;
    background: #75ba42;
    text-align: center;
    border-radius: 15px 15px 0 0 ;
    display: inline-block;
}
.box_4{
    display: inline-block;
    width:20px;
    position: relative;
    right: -20px;
    top:-20px;
    cursor: pointer;
}
.box_4>img{
    width:20px
}
.detail{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    background: rgba(0,0,0,0.3);
}
.detail_1{
    width: 95%;
    height: 90%;
    background: #fff;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
}
.detail_1_1{
    text-align: center;
    padding: 40px 0;
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
}
.detail input{
    margin-left:20px;
}
.detail div{
    margin-bottom:30px ;
}
.detail span{
    display: inline-block;
    width: 100px;
    text-align: right;
    margin-right: 20px
}
.detail select{
    width: 165px;
    height: 35px;
    margin-right: 20px;
}
.btn_1_1{
    margin-left: 110px;
}
.btn_1_1,.btn_1_2{
    width: 155px!important;
    margin-right: 0 !important;
    height: 35px;
    line-height: 35px;
    border: 1px solid #000;
    text-align: center!important;
    cursor: pointer;
}
.btn_1_3{
    display: inline-block;
    width: 120px;
    height: 35px;
    border: 1px solid #ddd;
    border-radius: 8px;
    line-height: 35px;
   text-align: center!important;
    margin-left: 20px;
    cursor: pointer;
}
.detail_1_1_1{text-align: left;}
.detail_1_1_1>span{
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    line-height: 80px;
    margin-left: 25%;
}
.active{
    background: #ddd;
}
.btn_txt_1,.btn_txt_2{
    display: inline-block;
    width: 150px!important;
    height: 35px;
    line-height: 35px;
    cursor: pointer;
    text-align: center!important;
    border-radius: 8px;
}
.btn_txt_1{
    background: aquamarine;
    color: #fff;
    margin:0 100px!important;
}
.btn_txt_2{
    border: 1px solid #000;
}
</style>