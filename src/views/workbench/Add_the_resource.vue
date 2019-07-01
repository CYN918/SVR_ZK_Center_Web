<template>
    <div class="bg">
        <div class="centNavBox">
            <div class="title">
                <span class="title_zy">添加资源</span>
                <div class="title_div">
                    <span class="title_div_span">已添加：</span>
                    <span class="title_div_span"></span>
                    <span class="title_div_span">/</span>
                    <span class="title_div_span"></span>
                    <span class="title_div_btn">
                      <span>+</span>
                        增加一行
                    </span>
                </div>
            </div>
            <div class="table_material">
                <div class="content_title">
                    <select>
                        <option selected>素材</option>
                        <option>物料</option>
                    </select>
                    <img class="content_title_img" src="../../../public/img/ADD_bule.png"/>
                    <span class="content_title_span">素材库选择</span>
                    <img class="content_title_img" src="../../../public/img/ADD_bule.png"/>
                    <span class="content_title_span">本地上传</span>
                    <div class="btn_img">
                        <img style="margin-right: 34px" src="../../../public/img/delet.png"/>
                        <img src="../../../public/img/comment.png"/>
                    </div>
                </div>
            </div>

            <div class="Add_btn">
                <span class="Add_btn_ADD" >添加</span>
                <span >取消</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "add_the_resource"
    }
</script>

<style scoped>
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
    }

    .centNavBox{
        width:1106px;
        height:909px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        position: relative;
        left: 50%;
        top:50%;
        transform:translate(-50%,-50%);
        overflow-y: auto;
    }
    .title{
        height: 55px;
        border-bottom: 1px solid #E6E9F0;
    }
    .table_material{
        margin:0 39px;
    }
    .Add_btn{
        width:1106px;
        height:58px;
        background:rgba(247,249,252,1);
        border-radius:0px 0px 4px 4px;
        text-align: right;
        margin-top: 60px;
    }
    .Add_btn span{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        margin-top: 10px;
        margin-right: 24px;
    }
    .Add_btn_ADD{
        background:rgba(51,119,255,1)!important;
        color: rgba(255,255,255,1)!important;
        margin-right: 14px!important;
    }

    .title_zy{
        display: inline-block;
        line-height: 55px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-left: 24px;
    }
    .table_content_right img{
        display: inline-block;
        height: 80px;
        width: 108px;
    }

    .title_div{
        display: inline-block;
        float: right;
        height: 55px;
        margin-right: 24px;
    }
    .title_div_span{
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1);
        line-height: 55px;
    }
    .title_div_btn{
        display: inline-block;
        width:101px;
        height:32px;
        background:rgba(24,144,255,1);
        border-radius:4px;
        line-height: 32px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        margin-left: 16px;
        cursor: pointer;
    }
    select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 26px;
    }
    .content_title{
        margin-top: 24px;
        border-bottom: 1px solid #E6E9F0;
        padding-bottom: 24px;
    }
    .content_title_span{
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-right: 24px;
        cursor: pointer;
    }
    .content_title_img{
        margin-right: 8px;
        cursor: pointer;
    }
    .btn_img{
        display: inline-block;
        float: right;
        margin-top: 6px;
    }
    .btn_img img{
        width:18px;
        cursor: pointer;
    }
</style>