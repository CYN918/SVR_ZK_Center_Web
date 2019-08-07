<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh()">官方物料投放库 &nbsp;/</span>
                <span class="new_url"> &nbsp;投放库详情</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">投放库详情</span>
            </div>
        </div>
        <div class="content_table">
            <div class="content_table_tit">
               <span>内容详情</span>
            </div>
            <div>
                <span>包名:</span>
                <span></span>
                <span>获取内容时间:</span>
                <span></span>
            </div>
            <div>
                <span>请求量:</span>
                <span></span>
                <span>展示量:</span>
                <span></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "theme_details",
        data(){
            return{}
        },
        methods:{
            fh(){
                this.$router.go(-1);
            },
        },
    }
</script>

<style scoped>
.top{
    width: 100%;
    height: 112px;
    background: rgba(255,255,255,1);
    position: fixed;
    left: 256px;
    top: 64px;
    z-index: 99;
}
.content_table{
    margin-top:200px;
    padding: 0 24px;
    background:rgba(255,255,255,1);
    width: 100%;
    height: 100%;
}
.content_table_tit{
    margin-bottom: 15px;
}
    .content_table_tit span{
        display: inline-block;
        margin-top: 24px;
        font-family: "Microsoft YaHei";
        font-size: 16px;
        font-weight: bold;
    }
</style>