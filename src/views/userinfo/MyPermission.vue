<template>
    <div class="centNavBox">
        <div class="content">
            <div class="tab_title">
                <div class="tab_title_1">
                    <div class="tab_title_1_1">
                        <img src="../../../public/img/user.jpg"/>
                    </div>
                    <div class="tab_title_1_2">
                        <p class="text_message">{{user.role_name}}</p>
                        <p >{{permission}}</p>
                    </div>
                </div>
                <div class="tab_title_1_2">
                    <p class="text_message">创建时间</p>
                    <p >{{time}}</p>
                </div>
                <div class="tab_title_1_3">
                    <p class="text_message">状态</p>
                    <p>{{state}}</p>
                </div>
            </div>
            <div class="particulars"><span>权限详情</span></div>
            <el-table
                    :data="tableData2"
                    height="250"
                    header-align="center"
                    :header-cell-style="getRowClass"
                    border
                    style="width: 80%;color:#000;margin: 30px 120px">
                <el-table-column
                        prop="group_name"
                        label="权限名称"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="note"
                        label="权限说明">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-permission",
        data() {
            return {
                name: '产品经理',
                permission: '负责产品跟进把控',
                time: '2019/4/17',
                state: '开启',
                tableData2: [],
                user:{},
            }
        },
        mounted(){
            this.getUser();
            this.getUserMessgae()
        },
        methods: {
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:#c90a5b;color:#fff;text-align:center;font-size:9px;font-weight:500;'
                } else {
                    return ''
                }
            },
            getUser(){
                this.api.perm_userperm().then((res)=>{
                    this.tableData2 = res
                })
            },
            getUserMessgae(){
                let params = {email:localStorage.getItem('userAd')}
                this.api.get_account({params}).then((res)=>{
                    this.user = res.roles[0]
                    console.log(res.roles)
                })
            }
        }
    }
</script>

<style scoped>
.content{
    border:1px solid #ddd;
    border-radius: 20px;
    margin: 20px;
}
.tab_title{
    margin: 0 30px;
    border-bottom: 1px solid #1e1e1e;
}
.tab_title_1{
    width: 300px;
    margin: 10px 50px 10px 0;
    border-right: 1px solid #ddd;
    display: inline-block;
}
.tab_title_1_1{
    display: inline-block;
    width: 70px;
    margin-right: 20px;
}
img{
    width: 70px;
}
.tab_title_1_2,.tab_title_1_3{
    display: inline-block;
    height: 100%;
    position: relative;
    top:50%;
    transform: translateY(-30%);
}
.tab_title_1_2{
    margin-right: 80px;
}
.text_message{
    margin-bottom: 10px;
}
.particulars{
    text-align: center;
    margin: 30px 0;
}
.particulars>span{
    font-size: 18px;
}
</style>