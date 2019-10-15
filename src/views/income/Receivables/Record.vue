<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url">收款结算 &nbsp;/</span>
                <span class="log_url" >收款结算详情 &nbsp;/</span>
                <span class="log_url" >变更记录 &nbsp;/</span>
                <span class="new_url">&nbsp;变更记录详情</span>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "record"
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:62px;
        border-top: 1px solid #ededed;
        background: white;
        -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
        position: fixed;
        left: 256px;
        top: 63px;
        z-index: 99;
    }
    .new_url{color: rgba(61,73,102,1)!important;}
</style>