<template>
  <div>
       <div class="top_name">
            <span class="top_txt">广告收款结算 /</span>
            <span class="top_txt">项目管理/</span>
            <span class="top_txt">项目详情</span>
            <div class="title_left">
                <span>项目详情</span>
                <span class='bj'>编辑</span>
            </div>
        </div>
        <div class='select_box'>
            <div class='select_tit'>
                <span>必要信息</span>
            </div>
            <div class='select_bh'>
                <span>企业微信审批编号:</span>
                <span></span>
            </div>
            <div class='select_name'>
                <span>项目名称：</span>
                <span>结算主体：</span>
            </div>
            <div>
                <input type="text">
                <input type="text">
            </div>
            <div class='select_name'>
                <span>合作公司：</span>
                <span>上线时间：</span>
            </div>
            <div>
                 <input type="text">
                 <el-date-picker
                    v-model="value1"
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker>
            </div>
            <div class='select_name' >
                <span>广告类型：</span>
                <span>一级分类</span>
                <span>二级分类</span>
                <span>三级分类</span>
            </div>
            <div>
                <select name="" id="">
                    <option value=""></option>
                </select>
                 <select name="" id="">
                    <option value=""></option>
                </select>
                 <select name="" id="">
                    <option value=""></option>
                </select>
            </div>
        </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
     .top_name{
        height:112px!important;
        background:rgba(255,255,255,1);
    }
    .title_left span{
        display: inline-block;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
        margin-left: 24px;
        text-align: right;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
    }
    .bj{
        display: inline-block;
        width: 90px;
        height: 36px;
        text-align: center!important;
        line-height: 36px!important;
        background: #3377ff;
        color: #fff!important;
        border-radius: 3px;
        float: right;
        font-size: 14px!important;
        font-weight: 400!important;
        margin: 0px 20% 0 0!important;
        cursor: pointer;
    }
    .select_box{
        width: 100%;
        background: #fff;
        min-height: 671px;
        margin-top:195px ;
    }
    .select_tit{
        width: 100%;
        height: 48px;
        border-bottom: 1px solid #ddd;
    }
    .select_tit span{
        display: inline-block;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:22px;
        color:rgba(50,50,51,1);
        margin-left: 24px;
        line-height: 48px;
    }
    .select_bh{
        margin-top: 24px;
        padding-left: 24px;
    }
    .select_bh span{
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:22px;
        color:rgba(50,50,51,1);
    }
    .select_name{
        margin: 24px 0 8px 24px;
    }
    .select_name{
        display: inline-block;
        width:70px;
        height:20px;
        font-size:14px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:20px;
        color:rgba(50,50,51,1);
    }
</style>