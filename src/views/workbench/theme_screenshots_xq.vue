<template>
    <div>
         <div>
            <div class="top_name">
                <span class="top_txt">官方物料投放库&nbsp;/&nbsp;截图物料审核</span>
                <span class="top_txt">截图物料审核&nbsp;/</span>
                <span class="top_txt">物料审核详情</span>
                <div class="title_left">
                    <span>物料审核详情</span>
                </div>
            </div>
        </div>
        <div class='content'>
                <div style="margin:0 24px">
                    <span class='titleName'>最终效果图</span>
                    <span class='addBtn'>提交物料</span>
                </div>
                <div class='border_box'>
                    <div>
                        <div class='boxs'>
                            <div>
                                <img src="" alt="">
                            </div>
                            <span style="display:block;margin-bottom:10px">大图</span>
                            <span>尺寸:</span>
                        </div>
                        <div class='boxs'>
                            <div>
                                <img src="" alt="">
                            </div>
                            <span style="display:block;margin-bottom:10px">小图</span>
                            <span>尺寸:</span>
                        </div>
                        <div class='boxs'>
                            <div>
                                <img src="" alt="">
                            </div>
                            <span style="display:block;margin-bottom:10px">组图1</span>
                            <span>尺寸:</span>
                        </div>
                        <div class='boxs'>
                            <div>
                                <img src="" alt="">
                            </div>
                            <span style="display:block;margin-bottom:10px">组图2</span>
                            <span>尺寸:</span>
                        </div>
                        <div class='boxs'>
                            <div>
                                <img src="" alt="">
                            </div>
                            <span style="display:block;margin-bottom:10px">组图3</span>
                            <span>尺寸:</span>
                        </div>
                        <div class='set'>
                            <span>小图：</span>
                            <select name="" id="">
                                <option value="">组图1</option>
                                <option value="">组图2</option>
                                <option value="">组图3</option>
                            </select>
                        </div>
                        <div class='int'>
                            <div >
                                <span class="names">标题：</span>
                                <span></span>
                                <input type="text" placeholder="最少6字最多24字" minlength="6" maxlength="24">
                            </div>
                            <div>
                                <span class="names">摘要(选填)：</span>
                                <span></span>
                                <input type="text" placeholder="最少6字最多24字" minlength="6" maxlength="24">
                            </div>
                        </div>
                    </div>
                </div>
                 <hr style="margin:0 24px;color:#ddd">
                <div>
                    <div class='titleName'>
                        <span>效果调整</span>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
     .top_name{height: 112px}
      .top_txt,.title_left span{
        margin-left: 24px;
    }
     .content{
        margin-top: 200px;
        padding: 40px 0 ;
    }
    .titleName{
        display: inline-block;
        font-size: 16px;
        color:#000;
        font-weight: bold;
    }
    .addBtn{
        float: right;
         display: inline-block;
        text-align: center;
        cursor: pointer;
        width: 120px;
        height: 36px;
        line-height: 40px;
        border-radius: 3px;
        color: #fff;
        background: #3377ff;
        font-size: 14px;
        margin-right: 24px
    }
    .border_box{
        text-align: center;
        margin:30px 0 ;
    }
    .boxs{
        display: inline-block;
        margin:0 30px 30px 0 ;
    }
    .boxs>div{
        width: 155px;
        height: 220px;
        border:1px solid #ddd;
        margin-bottom: 10px;
    }
    .boxs>div>span{
        font-size: 14px;
    }
    .set,.int{
        text-align: left!important;
        margin-bottom:30px
    }
    .set>span{
        font-size: 14px;
        margin:0  15px 0 23%;
         display: inline-block;
        width:90px;
        text-align: right

    }
    .int>div{
        margin-bottom:15px 
    }
    .names{
        display: inline-block;
        width:90px;
        margin: 0 15px 15px 23%;
        font-size: 14px;
        color: #000;
        text-align: right
    }
    select{
        width: 200px;
        height: 36px;
    }
    input{
        min-width:500px;
        padding-left: 10px;
        height: 36px;
    }
</style>