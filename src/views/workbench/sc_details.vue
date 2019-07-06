<template>
    <div>
        <div class="bg" @click=" heid()">
            <div class="AddIMG" @click.stop>
                <div class="AddIMG_tit">
                    <span>查看素材需求</span>
                    <img src="../../../public/img/gb.png"  @click=" heid()"/>
                </div>
                <div>
                    <div>
                        <span class="tit_txt">素材类型</span>
                        <span>{{this.list.type_name}}</span>
                    </div>
                    <div >
                        <span class="tit_txt">需求名称</span>
                        <span class="tit_txt_2 ">{{this.list.demand_name}}</span>
                    </div>
                    <div>
                        <span class="tit_txt">优先级</span>
                        <span>{{this.list.priority}}</span>
                    </div>
                    <div>
                        <span class="tit_txt">需求数量</span>
                        <span>{{this.list.num}}</span>
                    </div>
                    <div>
                        <span class="tit_txt">设计规范</span>
                        <span v-if="this.list.design_standard!=null">{{this.list.design_standard.name}}</span>
                    </div>
                    <div>
                        <span class="tit_txt">截止时间</span>
                        <span>{{this.list.endtime}}</span>
                    </div>
                    <div>
                        <span class="tit_txt top">设计要求</span>
                        <span v-if="!this.list.require">无</span>
                        <div v-if="this.list.require!=null" class="text">{{this.list.require}}</div>
                    </div>
                    <div>
                        <span class="tit_txt">附件</span>
                        <span v-if="this.list.attach.name==''">无</span>
                        <span v-if="this.list.attach.name!=''">{{this.list.attach.name}}</span>

                    </div>
                    <div>
                        <span class="tit_txt">风格</span>
                        <span v-if="this.list.ref_url!=''" @click="getIMG" style="color:#3090F0;cursor: pointer ">查看</span>
                        <span v-if="this.list.ref_url==''">不限</span>
                    </div>
                </div>
                <div class="btn">
                    <a>点击下载需求附件</a>
                </div>
            </div>
        </div>
        <div class="bg" style="text-align: center" @click=" heidImg()" v-if="img">
            <div style="max-width: 700px" class="images">
                <img :src="this.list.ref_url" style="width: 70%" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['SCid'],
        name: "work-bench_sc",
        data(){
            return{
                list:{},
                img:false,
            }
        },
        mounted(){
            this. getData()
        },
        methods:{

            heid(){
                this.$parent.heidSC();
            },
            getIMG(){
                this.img = true
            },
            heidImg(){
                this.img = false
            },
            getData(){
                let params ={id:this.SCid};
                this.api.demand_detail({params}).then((res)=>{
                    this.list = res;
                    console.log(res)
                })
            }
        }
    }
</script>

<style scoped>
    .img{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 99;
        bottom: 0;
        right: 0;
    }
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
    }
    .AddIMG{
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        width:840px;
        height:800px;
        background:rgba(255,255,255,1);
        border-radius:4px;
    }
    .AddIMG_tit{
        height: 55px;
        border-bottom: 1px solid #ddd;
    }

    .AddIMG_tit>span{
        display: inline-block;
        text-align: center;
        line-height: 55px;
        margin-left:24px ;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .AddIMG div{
        margin-bottom: 21px;
    }
    .tit_txt{
        display: inline-block;
        width: 100px;
        text-align: right;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
        margin-left: 165px;
    }
    .top{
        vertical-align: top;
    }

    select,input{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 8px;
    }

    .text{
        display: inline-block;
        width:376px;
        height:144px;
        padding: 14px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid #F7F9FC;
        resize:none;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
    }


    .btn{
        text-align: right;
        width:840px;
        height:58px;
        background:rgba(247,249,252,1);
        border-radius:0px 0px 4px 4px;
        margin-bottom: 0!important;
        position:fixed ;
        bottom: 0;
    }
    .btn a{
        display: inline-block;
        text-align: center;
        width:152px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color: rgb(245, 246, 250);
        margin-right: 44px;
        line-height: 36px;
        cursor: pointer;
        margin-top: 10px;
    }
    .AddIMG_tit img{
        float: right;
        margin-right: 24px;
        width: 16px;
        margin-top: 10px;
        cursor: pointer;
    }
    .images{
        position: relative;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
</style>