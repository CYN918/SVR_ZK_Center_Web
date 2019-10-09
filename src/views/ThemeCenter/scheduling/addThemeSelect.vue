<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh">排期管理 &nbsp;/&nbsp;</span>
                <span class="log_url">主题排期详情 &nbsp;/&nbsp;</span>
                <span class="new_url">添加需求卡片 &nbsp;</span>
            </div>
            <div>
                <span class="topName">添加需求卡片</span>
            </div>
            <div style="margin:12px 0 0 24px">
                <div class="scope1">1</div>
                <div  class="scope2">2</div>
                <span class="selectName">从主题库选择</span>
                <span class="name">制作渠道</span>
                <select>
                    <option>请选择</option>
                </select>
                <span class="name">制作渠道</span>
                <select>
                    <option>请选择</option>
                </select>
                <span class="name">制作渠道</span>
                <select>
                    <option>请选择</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "add-theme-select"
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:147px;
        background: rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
    }
    .topName{
        display: inline-block;
        font-size:18px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-left: 24px;
        margin-right: 10px;
        line-height: 45px;
    }
    .new_url{
        color: rgba(61,73,102,1)!important;
    }
    .scope1,.scope2{
        display: inline-block;
        width:20px;
        height:20px;
        border-radius:10px;
        border:1px solid rgba(204,204,204,1);
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(204,204,204,1);
        text-align: center;
        line-height: 20px;
    }
    .scope1{
        color:rgba(255,255,255,1)!important;
        background:rgba(51,119,255,1)!important;
        border: none!important;
        margin-right: 14px;
    }
    .selectName{
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
        margin-left: 14px;
        margin-right: 43px;
    }
    .name{
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(0 0 0 1);
        margin-right: 14px;
    }
    select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 24px;
    }
</style>