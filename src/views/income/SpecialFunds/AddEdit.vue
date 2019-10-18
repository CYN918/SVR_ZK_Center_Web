<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh()">特殊款项管理 &nbsp;/</span>
                <span class="new_url">&nbsp;添加特殊款项</span>
            </div>
        </div>
        <div class="content">
            <div>
                <span class="TitName">结算方</span>
                <span class="text">{{list.name}}</span>
                <span class="click">查看结算方信息</span>
            </div>
            <div>
                <span  class="TitName">支出金额</span>
                <span class="text">{{list.amount}}</span>
            </div>
            <div>
                <span  class="TitName">状态</span>
                <select v-model="status">
                    <option value="0">待确定</option>
                    <option value="1">已支出</option>
                    <option value="-1">已作废</option>
                </select>
            </div>
            <div>
                <span  class="TitName">备注</span>
                <span class="text">{{list.note}}</span>
            </div>
            <div>
                <span  class="TitName">附件</span>
                <div style="display: inline-block">
                    <div v-for="item in list.attachs">
                        <span  class="text">{{item.name}}</span>
                        <span class="click">查看</span>
                        <a class="click" :href="item.url">下载</a>
                    </div>
                </div>
            </div>
            <div>
                <span class="bc" @click="bc()">保存</span>
                <span class="boxBtn">返回</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "change",
        data(){
            return{
                list:{},
                status:'',
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            fh(){
                this.$router.go(-1)
            },
            getData(){
                let params={smid:this.$route.query.smid};
                this.api.settle_special_detail({params}).then((res)=>{
                    this.list=res;
                    this.status=this.list.status;
                })
            },
            bc(){
                let formData=new FormData;
                formData.append('smid',this.this.$route.query.smid);
                formData.append('status',this.status);
                this.api.settle_special_edit(formData).then((res)=>{

                })
            },
        },
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:62px;
        border-top: 1px solid #ededed;
        background: white;
        -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
        position: fixed;
        left: 256px;
        top: 63px;
        z-index: 99;
    }
    .new_url{color: rgba(61,73,102,1)!important;}
    .content{
        margin-top: 142px;
        background: #fff;
        min-height: 760px;
    }
    .TitName{
        width:116px;
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 26px 21px 0 56px;
        text-align: right;
    }
    .text{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(109,119,139,1);
    }
    .click{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left: 12px;
        cursor: pointer;
    }
    .boxBtn{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        margin:27px 0 0 20px;
    }
    .title_left span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-top: 15px;
        cursor: pointer;
    }
    .title_left img{
        width:12px;
        height:12px;
        margin-right: 9px;
        margin-left: 24px;
    }
   .bc{
       display: inline-block;
       width:68px;
       height:36px;
       background:rgba(51,119,255,1);
       border-radius:4px;
       line-height: 36px;
       text-align: center;
       cursor: pointer;
       margin-left: 140px;
       color: #fff!important;
   }

    select{
        width:467px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
</style>