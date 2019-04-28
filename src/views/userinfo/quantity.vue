<template>
    <div class="centNavBox">
        <div class="title_name">
            <img src="../../../public/img/fh.png" @click="fh"/>
            <span>{{this.$route.query.role_name}}账号列表</span>
        </div>
        <div class="tab">
            <tab :tableData2="tableData2"></tab>
        </div>
    </div>
</template>

<script>
    import tab from './table';
    export default {
        components:{tab},
        name: "quantity",
        data(){
            return {
                tableData2:[]
            }
        },
        mounted(){
            this.getlist()
        },
        methods:{
            getlist(){
                let params = {role_id:this.$route.query.role_id};
                this.api.role_user_list({params}).then((res)=>{
                    this.tableData2 = res;
                    console.log(res)
                })
            },
            fh(){
                this.$router.push({
                    path:'/userinfo/roleManagement'
                })
            },
        },

    }
</script>

<style scoped>
img{
    width: 28px;
    vertical-align: middle;
    cursor: pointer;
}
.title_name{margin-bottom: 40px}
.title_name>span{
    display: inline-block;
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:36px;
    margin-left: 10px;
}
.tab{
    margin:0 35px ;
}
</style>