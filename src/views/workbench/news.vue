<template>
    <div>
        <div class="top_name">
            <span class="top_txt">TX新闻模板管理</span>
        </div>  
        <div>
            <span>模板ID：</span>
            <input type="text">
            <span>模板名称：</span>
            <input type="text">
            <span>尺寸：</span>
            <input type="text">
            <span>状态：</span>
            <input type="text">
        </div>
    </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   components: {

   }
 }
</script>

<style scoped>
  .top_name{
        height: 62px;
        border: 0;
    }
 .top_txt{
    margin-left: 24px;
    font-size:18px;
    font-family:PingFang-SC;
    font-weight:500;
    line-height:62px ;
    color:rgba(31,46,77,1);
}
</style>
