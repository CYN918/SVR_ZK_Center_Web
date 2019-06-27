<template>
    <div class="bg">
        <div class="centNavBox">
            <div class="title">
                <span>查看素材详情</span>
            </div>
            <div class="table_material">
                <div class="content_title">
                    <span style="width: 10%">数量</span>
                    <span style="width: 10%">需要制作的物料</span>
                    <span style="width: 15%">预览图</span>
                    <span style="width: 20%">素材ID</span>
                    <span style="width: 15%">素材类型</span>
                    <span style="width: 30%">操作</span>
                </div>
                <div class="table_content" v-for="(item,index) in this.num">
                    <div class="table_content_left" >
                        <span>{{index+1}}</span>
                        <span>
                                <template>
                                     <el-checkbox-group v-model="checked">
                                        <el-checkbox  :label="index" v-if="item.mfid==undefined">需要</el-checkbox>
                                         <el-checkbox :label="index" v-if="item.mfid!=undefined" disabled="disabled">无需处理</el-checkbox>
                                    </el-checkbox-group>
                                </template>
                            </span>
                    </div>
                    <div  class="table_content_rig">
                        <div class="table_content_right" >
                            <div class="imgs" v-if="item.mfid==undefined">
                                <img :src="item.prev_uri">
                            </div>
                            <span class="id" v-if="item.mfid==undefined">{{item.mid}}</span>
                            <span class="type" v-if="item.mfid==undefined">{{item.type_name}}</span>
                            <div class="click" v-if="item.mfid==undefined">
                                <a :href="item.attach.url" style="text-decoration:none">下载</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="zz">
                <div>
                    <template>
                        <el-checkbox v-model="zzyq">制作要求</el-checkbox>
                    </template>
                </div>
            </div>
            <div class="require_txt">
                <textarea v-model="note" disabled></textarea>
            </div>
            <div class="Add_btn">
                <span @click="heid">取消</span>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        props:['id'],
        name: "a-d-d_material",
        data(){
            return{
                zzyq:false,
                checked:[],
                material:[],
                list:[],
                mfid:[],
                checkList:[],
                note:'',
                Message:[],
                mfinal:[],
                num:[]
            }
        },
        mounted(){
                this.getData();
        },
        methods:{
            heid(){
                this.$parent.heidCK();
            },
            getData(){
                let params ={id:this.id};
                this.api.demand_business_mbind({params}).then((res)=>{
                   this.material=res.material[1];
                    this.mfinal=res.mfinal;
                   this.num = (this.material).concat(this.mfinal);
                })
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
    .title span{
        display: inline-block;
        line-height: 55px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-left: 24px;
    }
    .table_material{
        margin: 0 24px;
    }
    .zz{
        margin: 26px 24px 16px 24px;

    }
    .require_txt{
        margin: 0 24px;
    }
    .require_txt textarea{
        padding: 10px;
        width:1038px;
        height:100px;
        border-radius:4px;
        border:1px solid rgba(230,233,240,1);
        resize:none;
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

    .content_title span{
        display: inline-block;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .table_content{
        width: 100%;
    }
    .table_content span{
        display: inline-block;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .table_content_left{
        width: 20%;
        display: inline-block;
        height: 80px;
    }
    .table_content_left span{
        display: inline-block;
        line-height: 80px!important;
        width: 50%;
    }
    .table_content_rig{
        width: 80%;
        display: inline-block;
    }
    .imgs{
        display: inline-block;
        width: 18.75%;
        text-align: center;
    }
    .table_content_right img{
        display: inline-block;
        height: 80px;
        width: 108px;
    }
    .id{
        width: 25%;
    }
    .type{
        width: 18.75%;
    }
    .click{
        display: inline-block;
        width: 37.5%;
        text-align: center;
    }
    .click span{
        display: inline-block;
        padding: 5px;
        height:26px;
        text-align: center;
        line-height: 26px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-right: 14px;
    }
    .table_content{
        border-radius:4px;
        border:1px solid rgba(230,233,240,1);
        margin-bottom: 10px;
    }
</style>