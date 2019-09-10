<template>
    <div>
        <div class="top_name">
            <div class="tit_top_url">
                <span class="log_url">广告源列表 &nbsp;/&nbsp;</span>
                <span class="log_url">广告源详情&nbsp;/&nbsp;</span>
                <span class="log_ur">广告详情</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">广告详情</span>
            </div>
        </div>
        <div class="content_table">
            <div style="margin: 0 24px">
                <div>
                    <span style="margin-top: 24px">落地页MD5：</span>
                    <span class="content_api"></span>
                    <span >获取内容时间：</span>
                    <span class="content_api"></span>
                </div>
                <div>
                    <span>广告名称：</span>
                    <span class="content_api"></span>
                    <span>包名：</span>
                    <span class="content_api"></span>
                </div>
                <div>
                    <span>数据访问量：</span>
                    <span class="content_api"></span>
                    <span>实现方式：</span>
                    <span class="content_api"></span>
                </div>
                <div>
                    <span>sdkID：</span>
                    <span class="content_api"></span>
                    <span>来源：</span>
                    <span class="content_api"></span>
                </div>
                <div>
                    <span>落地页：</span>
                    <span></span>
                </div>
                <div>
                    <span>原始图：</span>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ad_particulars"
    }
</script>

<style scoped>
    .top_name{
        height: 98px;
    }
    .log_ur{
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .content_table{
        margin-top:186px;
        background: #fff;
        min-height: 730px;
    }
    .content_table span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        margin-right: 15px;
        width: 100px;
        margin-bottom: 15px;
    }
    .content_api{
        color:rgba(31,46,77,0.65)!important;
        width: 250px!important;
        margin-right: 185px!important;
    }
</style>