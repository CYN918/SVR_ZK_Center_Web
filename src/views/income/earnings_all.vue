<template>
    <div>
        <div class="top_name">
            <span class="top_txt">收益中心\收益总览</span>
            <div class="title_left">
                <span>收益总览</span>
            </div>
            <div>

            </div>
        </div>
        <div class="content"></div>
    </div>
</template>

<script>
    export default {
        name: "earnings_all"
    }
</script>

<style scoped>
.top_name{
    height:170px!important;
    background:rgba(255,255,255,1);
}
.title_left span{
    display: inline-block;
    font-size:20px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(50,50,50,1);
    margin-left: 24px;
}
.top_txt{
    display: inline-block;
    margin-left: 24px;
}
</style>