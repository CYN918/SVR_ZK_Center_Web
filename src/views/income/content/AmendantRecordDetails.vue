<template>
 <div>
     <div class="top_name">
            <span class="top_txt" @click='fh(-4)'>素材付款&nbsp;/</span>
            <span class="top_txt" style="margin-left:0" @click='fh(-3)'>&nbsp;分成管理&nbsp;/</span>
            <span class="top_txt" style="margin-left:0" @click='fh(-2)'>&nbsp;价格管理&nbsp;/</span>
            <span class="top_txt" style="margin-left:0" @click='fh(-1)'>&nbsp;修改记录&nbsp;/</span>
            <span class="top_txt" style="margin-left:0">&nbsp;查看详情</span>
            <div class="title_left">
                <span>查看详情</span>
            </div>
        </div>
        <div class='content'>
            <div class='tit_box'>
                <span style="margin-top:24px">处理人</span>
                <span>{{list.creator}}</span>
                <span>更新时间</span>
                <span>{{list.created_at}}</span>
                <span class='before'>变更前</span>
                <span class='after'>变更后</span>
            </div>
            <div class='box_left'>
                <div class='tit_box'>
                    <span>默认数据有效率</span>
                    <input type="text" disabled v-model="list.complete" :class='{xg:list.complete!=list2.complete}'>
                </div>
                <div class='tit_box' v-for='(item,index) in list.sharing'>
                    <span>素材类型</span>
                    <select disabled v-model="list.sharing[index].type">
                        <option value="ad_picture" >广告图</option>
                        <option value="ad_template" >广告模板</option>
                        <option value="sls_dynamic" >场景锁屏-动效</option>
                        <option value="sls_picture" >场景锁屏-壁纸</option>
                    </select>
                    <span>分成价格(元)</span>
                    <input type="text" disabled v-model="list.sharing[index].sharing_price" :class='{xg:list.sharing[index].sharing_price!=list2.sharing[index].sharing_price}'>
                    <span>分成方式</span>
                    <select  v-model="list.sharing[index].sharing_type" :class='{xg:list.sharing[index].sharing_type!=list2.sharing[index].sharing_type}'>
                        <option value="ecpm">ecpm</option>
                        <option value="ecpc">ecpc</option>
                    </select>
                </div>
            </div>
            
           <div class='box_right'>
                <div class='tit_box'>
                    <span>默认数据有效率</span>
                    <input type="text" disabled v-model="list2.complete" :class='{gh:list.complete!=list2.complete}'>
                </div>
                <div class='tit_box'  v-for='(item,index) in list2.sharing' >
                    <span>分成价格(元)</span>
                    <input type="text" disabled v-model="list2.sharing[index].sharing_price" :class='{gh:list.sharing[index].sharing_price!=list2.sharing[index].sharing_price}'>
                    <span>分成方式</span>
                    <select  disabled v-model="list2.sharing[index].sharing_type"  :class='{gh:list.sharing[index].sharing_type!=list2.sharing[index].sharing_type}'>
                        <option value="ecpm">ecpm</option>
                        <option value="ecpc">ecpc</option>
                    </select>
                </div>
               
                </div>
            </div>
        </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         list:{},
         list2:{}
     }
   },
   mounted(){
       this.getData()
   },
   methods:{
       log(){
           this.$router.push({
               path:"./AmendantRecord"
           })
       },
       fh(index){
           this.$router.go(index)
       },
       getData(){
           let params={log_id:this.$route.query.log_id}
           this.api.analysis_config_sharing_operate_logs_detail({params}).then((res)=>{
               this.list=res[1];
               this.list2=res[0]
               
           })
       },
   },

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
        cursor: pointer;
        
    }
    .content{
        margin-top: 199px;
        background: #fff;
    }  
    .tit_box{
        margin-bottom: 40px;
    }
   
    .tit_box span{
        display: inline-block;
        margin:0 16px 0px 24px;

    }
    .tit_box input{
        width: 140px;
        height: 32px;
        padding-left: 10px;
        border-radius: 3px;
    }
    .tit_box select{
        width:150px;
        height: 36px;
        border-radius: 3px;
    }
   
    .before,.after{
        padding: 3px 5px;
        border:1px solid #000;
        color:#000;
        font-weight: bold;
    }
    .before{
        background: #F0FAF2;
        color:#2DA641
    }
    .after{
        background: #FFEBEB;
        color:#D40000
    }
    .box_left,.box_right{
        display: inline-block;
    }
    .box_right{
        padding-left: 40px;
        margin-left: 40px;
        border-left: 1px solid #ddd;
    }
    .xg{background: #F0FAF2; color:#2DA641}
    .gh{
        background: #FFEBEB;
        color: #D40000;
    }
   
</style>
