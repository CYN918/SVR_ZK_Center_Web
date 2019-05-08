<template>
    <div class="centNavBox">
        <div class="role_Add">
            <span v-if="this.$route.query.role_id !=undefined">当前角色：{{name}}</span>
            <span v-else>添加角色</span>
        </div>
        <div class="marg">
            <div class="role_Add_switch">
                是否启用
                <el-switch
                        v-model="status"
                        active-value="1"
                        inactive-value="0"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                </el-switch>
            </div>
            <div class="role_name">
                <span v-if="this.$route.query.role_id ==undefined">角色名称</span>
                <input type="text" placeholder="最多输入10个字" v-model="name" v-if="this.$route.query.role_id ==undefined"/>
                <div class="role_parent">
                    上级角色
                    <select v-model="parent">
                        <option value="0">无</option>
                        <option v-for="(item,index) in parentList" :value="index+1">{{item.role_name}}</option>
                    </select>
                </div>
            </div>
            <div class="role_message" v-for="(item,index) in list">
                <div class="role_message_1">
                    <span class="dysfunction">{{item.group.group_name}}</span>
                    <div class="role_message_1_1">
                        <template>
                            <el-checkbox-group
                                    v-model="checkedCities1">
                                <el-checkbox v-for="(bq,index2) in item.perm_group" :label="bq.group_key" :key="bq.group_key">{{bq.group_name}}</el-checkbox>
                            </el-checkbox-group>
                        </template>
                    </div>

                </div>
            </div>
            <div class="btn">
                <span class="btn_txt" @click="AddRole()">添加</span>
                <span @click="jumpReturn">取消</span>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "add-role",
        data(){
            return {
                radio:3,
                titleName:'',
                status:'1',
                name:'',
                checkedCities1:[],
                parent:'',
                list:[],
                parentList:[],
            }
        },
        mounted(){
            this.getList();
            console.log(this.$route.query.role_id);
            if(this.$route.query.role_id !=undefined){
                this.roleMessage();
            }
        },
        methods:{
            getList(){
                this.api.perm_group().then((res)=>{
                    this.list = res;
                    this.getParent();
                })
            },
            AddRole(){
                if(this.$route.query.role_id !=undefined){
                    this.api.perm_role_edit({role_id:this.$route.query.role_id,status:this.status,group_key:this.checkedCities1,parent:this.parent}).then((res)=>{
                        this.$router.push({
                            path:'/userinfo/roleManagement'
                        })
                    })
                }else{
                    this.api.perm_role_add({role_name:this.name,role_desc:this.description,group_key:this.checkedCities1,parent:this.parent}).then((res)=>{
                        this.$router.push({
                            path:'/userinfo/roleManagement'
                        })
                    })
                }

            },
            getParent(){
                this.api.role_leader().then((res)=>{
                    this.parentList = res;
                })
            },
            jumpReturn(){
                this.$router.push({
                    path:'/userinfo/roleManagement'
                })
            },
            roleMessage(){
                let params = {role_id:this.$route.query.role_id};
                this.api.perm_role_group({params}).then((res)=>{
                    this.name = res.role.role_name;
                    let dataId = res.permGroup;
                    for(let id in dataId){
                        for(let permid in dataId[id].perm_group){
                            if(dataId[id].perm_group[permid].valid==1){
                                this.checkedCities1.push(dataId[id].perm_group[permid].group_key);
                            }
                        }
                    }
                })
            },
        },
    }
</script>

<style scoped>
.role_Add{
    display: inline-block;
}
.role_Add,.role_name{
    margin-bottom: 30px;
    overflow: hidden;
}
.role_name>input{
    width:400px;
    height:50px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.08);
    border-radius:5px;
    margin-left: 16px!important;
}
.marg{
    margin:0 80px;
}
.role_Add>span{
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
    line-height:36px;
}
.role_name>span{
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
    line-height:36px;
}
.role_message{
    width: 100%;
    height: 120px;
    margin: 20px 20px 20px 0;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.08);
    border-radius:5px;
}
.role_message_1{
    margin-left:50px;
}
.role_message_1>span{
    display: block;
    margin-bottom: 30px;
    line-height: 50px;
    font-size:18px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
}
.el-checkbox{margin-right: 100px}
.btn{
    text-align: center;
    margin-top: 40px;
}
.btn>span{
    display: inline-block;
    width:140px;
    height:40px;
    border: 1px solid #ddd;
    line-height: 40px;
    border-radius: 5px;
    cursor: pointer;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
}

.btn_txt{
    background:rgba(19,159,248,1);
    border: 1px solid transparent;
    margin-right: 40px;
    color:#fff;
}
.role_Add_switch{
    float: right;
}

.role_parent{
    float:right;
    margin-right: 25%;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
}
.role_parent>select{
    width:257px;
    height:50px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(230,230,230,1);
    border-radius:5px;
    margin-left: 16px;
}
</style>