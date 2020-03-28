<template>
    <div>
        <div>
             <div class="top_name">
                <span class="top_txt" >待处理&nbsp;/&nbsp;入库确认&nbsp;/&nbsp;查看详情</span>
                <div class="title_left">
                    <img src="img/fh.png" alt=""  @click='fh(-1)'>
                    <span @click='fh(-1)'>查看详情</span>
                </div>
            </div>
        </div>
        <div class='content_right'>
               <div class='top'>
                   <div class="titN">
                       <span>素材信息</span>
                   </div>
                   <div>
                       <span class='tits'>项目名称</span>
                       <span class='cons'>易烊千玺Q版形象素材征集</span>
                       <span  class='tits_2'>项目ID</span>
                       <span></span>
                   </div>
                    <div>
                       <span class='tits'>设计师昵称</span>
                       <span class='cons'>易烊千玺Q版形象素材征集</span>
                       <span  class='tits_2'>待入库数量</span>
                       <span></span>
                   </div>
                    <div>
                       <span class='tits'>入库类型</span>
                       <span class='cons'>易烊千玺Q版形象素材征集</span>
                       <span  class='tits_2'>相关需求</span>
                       <span></span>
                   </div>
                    <div>
                       <span class='tits'>审批人</span>
                       <span class='cons'>易烊千玺Q版形象素材征集</span>
                       <span  class='tits_2'>素材类型</span>
                       <span></span>
                   </div>
                    <div>
                       <span class='tits'>审批时间</span>
                       <span class='cons'>易烊千玺Q版形象素材征集</span>
                       <span  class='tits_2'>需求发起人</span>
                       <span></span>
                   </div>
                    <div>
                       <span class='tits'>备注</span>
                       <span class='cons'>易烊千玺Q版形象素材征集</span>
                       <span  class='tits_2'>需求发起时间</span>
                       <span></span>
                   </div>
               </div>
               <div class='fj'>
                    <div class="titN">
                       <span>附件</span>
                   </div>
                   <div class='imgName'>
                        <img src="" alt="">
                        <span></span>
                         <img class='xz' src="img/btn.png" alt="">
                   </div>
               </div>
               <div class='uploads'>
                     <div class="titN">
                       <span>添加入库素材</span>
                   </div>
               </div>
               <div class='foot'>
                    <span>添加入库</span>
                    <span class='NEXT'>返回</span>
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
    .top_txt,.title_left {
        margin-left: 24px;
    }
    .title_left span{
        margin-left: 10px;
        cursor: pointer;
    }
    .top_txt{
        cursor: pointer;
    }
     .content_right{
        width: 48%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin-top: 200px;
        margin-left: 26%;
       
    }
    .top{
        width:100%;
        height:348px;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 12px 0px rgba(0,0,0,0.06);
    }
    .tits,.tits_2{
        width: 90px;
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(107,119,140,1);
        margin:24px 0px 0 24px; 
    }
    .cons{
        display: inline-block;
        width: 316px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(23,43,77,1);
        overflow: hidden;
    }
    .titN span{
        display: inline-block;
        margin:24px 0 0 24px;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(23,43,77,1);
    }
    .fj{
        width:100%;
        height:126px;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 12px 0px rgba(0,0,0,0.06);
        margin-top:16px
    }
    .imgName{
        margin:16px 23px 0 24px
    }
    .imgName img{
        display: inline-block;
        width:38px;
        height:39px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(9,30,66,0.08);
        margin-right: 17px;
    }
    .xz{
        float: right;
    }
    .uploads{
        height:284px;
        width: 100%;
        margin-top:16px;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 12px 0px rgba(0,0,0,0.06);
        border-radius:4px;
    }
    .foot{
         width: 100%;
         height:56px;
        margin-top:16px;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 12px 0px rgba(0,0,0,0.06);
    }
    .foot span{
        display: inline-block;
        width:88px;
        height:32px;
        background:rgba(0,82,204,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        cursor: pointer;
        line-height: 32px;
        float: right;
        border-radius: 3px;
        margin-top:12px;
        margin-right:24px;
        
    }
    .NEXT{
        width:60px!important;
        height:32px!important;
        border:1px solid rgba(165,173,186,1)!important;
        color:rgba(107,119,140,1)!important;
        background:transparent!important
    }
</style>