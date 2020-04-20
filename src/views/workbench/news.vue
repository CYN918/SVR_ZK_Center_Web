<template>
    <div>
        <div class="top_name">
            <span class="top_txt">TX新闻模板管理</span>
        </div>  
        <div class='screen'>
            <span>模板ID：</span>
            <input type="text">
            <span>模板名称：</span>
            <input type="text">
            <span>尺寸：</span>
            <select name="" id="">
                <option value="">全部</option>
            </select>
            <span>状态：</span>
            <select name="" id="">
                <option value="">全部</option>
            </select>
            <div>
                <span>查询</span>
                <span>重置</span>
                <span>新增模板</span>
            </div>
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
.screen{
    margin-top: 145px;
    background: #fff;
    height: 100px;
}
.screen span{
    margin:0 10px 0 24px;
    font-size: 14px;
    line-height: 100px;
}
.screen input{
    width: 200px;
    height: 32px;
    padding-left: 5px;
    border-radius: 3px;
}
.screen select{
    width: 120px;
    height: 36px;
    border-radius: 3px;
}
</style>
