<template>
    <div class="centNavBox">
        <div class="role_Add">
            <span>添加角色</span>
        </div>
        <div class="role_Add_switch">
            是否启用角色
            <el-switch
                    v-model="status"
                    active-value="1"
                    inactive-value="0"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
            </el-switch>
        </div>
        <div class="role_name">
            <span>角色名称：</span>
            <input type="text" placeholder="最多输入10个字" v-model="name"/>
            <div class="role_parent">
                上级角色：
                <select v-for="item in parentList" v-model="parent">
                    <option>无</option>
                    <option value="item">{{item}}</option>
                </select>
            </div>
        </div>
        <div class="role_message" v-for="(item,index) in list">
            <div class="role_message_1">
                <span>{{item.group.group_name}}</span>
                <div class="role_message_1_1">
                    <template>
                        <el-checkbox-group
                                v-model="checkedCities1">
                            <el-checkbox v-for="(bq,index2) in item.perm_group" :label="bq.group_name" :key="bq.group_name">{{bq.group_name}}</el-checkbox>
                        </el-checkbox-group>
                    </template>
                </div>
            </div>
        </div>
        <div class="btn">
            <span class="btn_txt" @click="AddRole()">添加</span>
            <span>取消</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "add-role",
        data(){
            return {
                status:'1',
                name:'',
                description:'dsdsfsdf',
                checkedCities1:[],
                parent:'',
                list:[],
                parentList:[],
            }
        },
        mounted(){
            this.getList();
            this.getParent()
        },
        methods:{
            getList(){
                this.api.perm_group().then((res)=>{
                    this.list = res;
                    console.log(res)
                })
            },
            AddRole(){
                this.api.perm_role_add({role_name:this.name,role_desc:this.description,group_key:this.checkedCities1,parent:this.parent}).then((res)=>{
                    this.$router.push({
                        path:'/userinfo/roleManagement'
                    })
                })
            },
            getParent(){
                this.api.role_leader().then((res)=>{
                    this.parentList = res;
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

}
.role_Add>span{
    font-size: 18px;
    font-weight: bold;
}
.role_name>span{
    margin-right: 15px;
    font-size: 16px;
}
.role_message{
    width: 100%;
    height: 120px;
    margin: 20px 20px 20px 0;
    background: #e2e2e2;
    border-radius: 8px;
}
.role_message_1{
    margin-left:50px;
}
.role_message_1>span{
    display: block;
    line-height: 50px;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}
.btn{
    text-align: center;
}
.btn>span{
    display: inline-block;
    width: 150px;
    height: 40px;
    border: 1px solid #ddd;
    line-height: 40px;
    border-radius: 5px;
    cursor: pointer;
}
.btn_txt{
    background: aquamarine;
    border: 1px solid transparent;
    margin-right: 100px;
    color:#fff;
}
.role_Add_switch{
    width: 200px;
    float: right;
}
.role_parent{
    float:right;
    margin-right: 45%;
}
</style>