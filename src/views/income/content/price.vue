<template>
 <div>
     <div class="top_name">
            <span class="top_txt" @click='fh(-2)'>杂志锁屏付款&nbsp;/</span>
            <span class="top_txt" @click='fh(-1)' style="margin-left:0">&nbsp;分成管理&nbsp;/</span>
            <span class="top_txt" style="margin-left:0">&nbsp;价格管理</span>
            <div class="title_left">
                <span>价格管理</span>
            </div>
        </div>
        <div class='content'>
            <div class='btns'>
                <span class='bj' v-if="set==false" @click="BJ()">编辑</span>
                <span @click='log()'>修改记录</span>
            </div>
            <div class='tit_box'>
                <span>默认数据有效率</span>
                <input type="text" v-model="data.complete" :disabled='set==false'>
            </div>
             <div class='tit_box' v-for="(item,index) in data.sharing">
                <span>素材类型</span>
                <select disabled v-model="data.sharing[index].type">
                    <option value="ad_picture" >广告图</option>
                    <option value="ad_template" >广告模板</option>
                    <option value="sls_dynamic" >杂志锁屏-动效</option>
                    <option value="sls_picture" >杂志锁屏-壁纸</option>
                </select>
                <span>分成价格(元)</span> 
                <input type="text" v-model="data.sharing[index].sharing_price"  :disabled='set==false'>
                 <span>分成方式</span>
                <select v-model="data.sharing[index].sharing_type"  :disabled='set==false'>
                    <option value="ecpm">千次曝光计费</option>
                    <option value="ecpc">点击计费</option>
                </select>
            </div>
            
            <div class='button'  v-if='set==true'>
                <span class="bc" @click="changeData()">保存</span>
                <span @click='qx()'>取消</span>
            </div>
        </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
            data:{},
            set:false
     }
   },
   mounted(){
       this.DataDateils()
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
       DataDateils(){
           this.api.analysis_config_sharing().then((res)=>{
               this.data=res
           })
       },
       changeData(){
           let formData = new FormData;
           formData.append('complete',  this.data.complete)
           formData.append('sharing', JSON.stringify(this.data.sharing))
           this.api.analysis_config_sharing_update(formData).then((res)=>{
               if(res!=false){
                   this.set=false;
                   this.DataDateils()
               }
           })
       },
       BJ(){
            this.set=true;
       },
       qx(){
           this.set=false;
            this.DataDateils()
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
    .btns{
        width: 100%;
        text-align: right;
    }
    .btns span{
        width: 90px;
        height: 36px;
        text-align: center;
        border:1px solid #ddd;
        border-radius: 3px;
        line-height: 36px;
        margin: 24px 24px 40px 0;
        display: inline-block;
        cursor: pointer;
    }
    .bj{
        background: #3377ff;
        color:#fff;
        border:0!important
    }
   
    .tit_box span{
        display: inline-block;
        margin:0 16px 30px 24px;

    }
    .tit_box input{
        width: 190px;
        height: 32px;
        padding-left: 10px;
        border-radius: 3px;
    }
    .tit_box select{
        width:200px;
        height: 36px;
        border-radius: 3px;
    }
    .button span{
        display: inline-block;
        width: 90px;
        height: 36px;
        border-radius: 3px;
        line-height: 36px;
        text-align: center;
        border:1px solid #ddd;
        margin-left: 24px;
        margin-bottom: 50px;
        cursor: pointer;
    }
    .bc{
        background: #3377ff;
        border:0!important;
        color:#fff;
    }
    
</style>

