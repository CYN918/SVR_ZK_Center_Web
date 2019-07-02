<template>
    <div class="bg">
        <div class="centNavBox">
            <div class="title">
                <span class="title_zy">添加资源</span>
                <div class="title_div">
                    <span class="title_div_span">已添加：</span>
                    <span class="title_div_span">{{this.scMessage.length}}</span>
                    <span class="title_div_span">/</span>
                    <span class="title_div_span">{{num}}</span>
                    <span class="title_div_btn" @click="ADDline">
                      <span>+</span>
                        增加一行
                    </span>
                </div>
            </div>
            <div class="table_material">
                <div class="content_title" v-for="(item,index) in list">
                    <div>
                        <select v-model="item.type">
                            <option value="0" >素材</option>
                            <option value="1">物料</option>
                        </select>
                        <div v-if="item.type==0" style="display: inline-block">
                            <img class="content_title_img" src="../../../public/img/ADD_bule.png"/>
                            <span class="content_title_span" @click="handleClick(index,item.type)" >素材库选择</span>
                            <img class="content_title_img" src="../../../public/img/ADD_bule.png"/>
                            <span class="content_title_span" @click="getBD(index)">本地上传</span>
                        </div>
                        <div v-if="item.type==1" style="display: inline-block">
                            <img class="content_title_img" src="../../../public/img/ADD_bule.png"/>
                            <span class="content_title_span" @click="getWl(index)">物料库选择</span>
                        </div>
                        <div class="btn_img">
                            <img style="margin-right: 34px" src="../../../public/img/delet.png" @click="delLine(index)"/>
                            <img v-if="item.type==0" src="../../../public/img/comment.png" @click="importText(index)"/>
                        </div>
                    </div>
                    <div v-if="item.type==0" class="img_box">
                        <div class="ADD_img" v-for="(da,index2) in scMessage[index]">
                            <img class="ADD_img_del" src="../../../public/img/del.png">
                            <img  class="ADD_img_img" :src="da.prev_uri"/>
                            <span>{{da.prev_uri}}</span>
                        </div>
                    </div>
                    <div v-if="item.type==1" >
                        <div class="ADD_img" v-for="(da,index2) in scMessage[index]">
                            <img class="ADD_img_del" src="../../../public/img/del.png">
                            <img  class="ADD_img_img" :src="da.prev_uri"/>
                            <span>{{da.prev_uri}}</span>
                        </div>
                    </div>
                    <div v-if="item.text&&item.type==0"  style="width: 100%;margin-top: 20px">
                        <textarea placeholder="请输入您的备注（限50字）" maxlength="50" style="padding: 8px;width: 100%;resize:none;"></textarea>
                    </div>
                </div>
            </div>

            <div class="Add_btn">
                <span class="Add_btn_ADD" >添加</span>
                <span @click="heid">取消</span>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page"
                            :page-sizes="[3, 6, 9, 12]"
                            :page-size="p"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="list.length">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['scMessage','id','num','ind','type'],
        name: "add_the_resource",
        data(){
            return{
                list:[],
                page:3,
                p:1,
            }
        },
        mounted(){
           if(this.scMessage.length!=0){
               for(var i =0;i<this.scMessage.length;i++){
                   this.list.push({type:'',text:false})
               }

           }

        },
        methods:{
            ADDline(){
                this.list.push({type:'',text:false})
            },
            delLine(index){
                this.list.splice(index,1)
                console.log(this.list)
            },
            importText(index){

                        this.list[index].text = true



            },
            handleSizeChange(p){
                this.p = p;
            },
            handleCurrentChange(page){
                this.page = page
            },
            heid(){
                this.$parent.heidAddMaterial();
                this.$emit('listData',0);
            },
            handleClick(index,type){
                this.$parent.getSet(index,type);
                this.$parent.heidAddMaterial();
            },
            getBD(index){
                this.$parent.getBD(index);
                this.$parent.heidAddMaterial();
            },
            getWl(index){
                this.$parent.getWl(index);
                this.$parent.heidAddMaterial();
            },
        },
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
        width:1042px;
        height:80px;
        background:rgba(247,249,252,1);
        border-radius:0px 0px 4px 4px;
        margin-top: 60px;
        padding-left: 40px;
        padding-right: 24px;
        position: fixed;
        bottom: 0;
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
    .img_box{
        height: 130px;
        width: 1028px;
        overflow-x:auto;
    }
    .ADD_img{
        display: inline-block;
        width: 108px;
        height: 110px;
        margin-right: 48px;
    }
    .ADD_img_img{
        display: inline-block;
        width: 108px;
        height: 80px;
    }
    .ADD_img_del{
        position: relative;
        width:16px;
        height:16px;
        right: -100px;
        top: 10px;
    }
    .ADD_img span{
        display:inline-block;
        width: 80px;
        overflow: hidden;
    }
    .block{
        display: inline-block;
        float: right;
        margin-bottom: 0!important;
    }
</style>