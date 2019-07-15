<template>
    <div>
        <div class="top_name">
            <span class="top_txt">个人中心/角色管理</span>
            <div class="title_left">
                <span v-if="this.$route.query.role_id !=undefined">角色管理</span>
                <span v-else>添加角色</span>
            </div>
        </div>
        <div class="centNavBox">
            <div class="marg">
                <div class="role_Add_switch">
                    是否启用
                    <el-switch
                            v-model="status"
                            @change=GetSwitch
                            active-value=1
                            inactive-value=0
                            active-color="#3377ff"
                            inactive-color="#e6e9f0">
                    </el-switch>
                </div>
                <div class="role_name">
                    <span v-if="this.$route.query.role_id ==undefined">角色名称</span>
                    <input type="text" placeholder="最多输入10个字" maxlength="10" v-model="name" v-if="this.$route.query.role_id ==undefined"/>
                    <div class="wb" v-if="this.$route.query.role_id ==undefined">
                       <span>是否为外部角色</span>
                        <select v-model="type">
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                    <div class="DQrole_name" v-if="this.$route.query.role_id !=undefined">
                        <span>当前角色:{{this.$route.query.role_name}}</span>

                    </div>
                    <div class="role_parent">
                        上级角色
                        <select v-model="parent">
                            <option value="0">无</option>
                            <option v-for="(item,index) in parentList" :value="item.role_id">{{item.role_name}}</option>
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
    </div>

</template>

<script>
    export default {
        name: "add-role",
        data(){
            return {
                radio:3,
                titleName:'',
                status:"1",
                name:'',
                checkedCities1:[],
                parent:'',
                list:[],
                parentList:[],
                type:0
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
                    this.api.perm_role_add({role_name:this.name,role_desc:this.description,group_key:this.checkedCities1,parent:this.parent,type:this.type}).then((res)=>{
                        this.$router.push({
                            path:'/userinfo/roleManagement'
                        })
                    })
                }

            },
            getParent(){
                this.api.role_leader().then((res)=>{
                    this.parentList = res;
                    console.log(res);
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
                    if(res.role.parent!=null){
                       this.parent = res.role.parent.role_id;
                    }
                    this.status = res.role.status.toString();
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
            GetSwitch(){
                let formData = new FormData;
                formData.append('id',this.$route.query.role_id);
                formData.append('status',this.status);
                this.api.change_role_status(formData).then((res)=>{

                })
            },
        },
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
        background: #FFF;
        margin-top:194px;
    }
.role_Add{
    display: inline-block;
}
.role_Add,.role_name{
    margin-bottom: 30px;
    overflow: hidden;
}
.role_name>input{
    width:394px;
    padding-left: 10px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    margin-left: 24px!important;
}
.wb{
    display: inline-block;
    margin:0 50px;
}
.wb select{
    width:64px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    margin-left: 24px;
}
.marg{
    margin:0 24px;
}
.role_Add>span{
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
    line-height:36px;
}
.role_name span{
    display: inline-block;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1);
    line-height:36px;
}
.role_message{
    width: 100%;
    height: 120px;
    margin: 20px 20px 20px 0;
    background:rgba(255,255,255,1);
    border-radius:5px;
}
.role_message_1>span{
    display: block;
    margin-bottom: 15px;
    line-height: 50px;
    font-size:18px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1);
}
.el-checkbox{margin-right: 100px}
.btn{
    text-align: left;
    margin-top: 40px;
}
.btn>span{
    display: inline-block;
    width:68px;
    text-align: center;
    height:36px;
    border: 1px solid #ddd;
    line-height: 40px;
    border-radius: 5px;
    cursor: pointer;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#000;
}

.btn_txt{
    background:#3377ff;
    border: 1px solid transparent;
    margin-right: 14px;
    color:rgba(255,255,255,1)!important;
}
.role_Add_switch{
    float: right;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1);
    line-height:36px;
}

.role_parent{
    display: inline-block;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1);
    line-height:36px;
}
.role_parent>select{
    width:200px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    margin-left: 24px;
}
.DQrole_name{
    display: inline-block;
    margin:0 50px 0 24px;

}
</style>