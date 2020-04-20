<template>
 <div>
         <div>
            <div class="top_name">
                <span class="top_txt">TX新闻模板管理&nbsp;/&nbsp;{{this.$route.query.num==1?"新增模板":"编辑模板"}}</span>
                <div class="title_left">
                    <span>{{this.$route.query.num==1?"新增模板":"编辑模板"}}</span>
                </div>
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
.top_name{height: 112px}
.top_txt,.title_left span{
        margin-left: 24px;
}
 
</style>
