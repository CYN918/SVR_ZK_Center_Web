<template>
    <div class="bg">
        <div class="content">
            <div class="tit">
                <span>编辑标签</span>
            </div>
            <div class="title">
                <div class="title_1">
                    <span>选择标签：</span>
                </div>
               <div class="box">
                   <div class="AddIMG_bq_box_top">
                       <div class="AddIMG_bq_box_top_tit">预置标签:</div>
                       <div class="AddIMG_bq_box_top_bq">
                           <span class="bq">aaaaaa</span>
                       </div>
                   </div>
                   <div class="AddIMG_bq_box_bottom">
                       <div class="AddIMG_bq_box_top_tit">预置标签:<input type="text" placeholder="请输入标签"/></div>
                       <div class="AddIMG_bq_box_top_zdy">
                           <span class="bq">aaaaaa</span>
                       </div>
                   </div>
               </div>
            </div>
            <div class="btn">
                <span class="btn_bc">保存</span>
                <span @click="QXtag">取消</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tag",
        data(){
            return{}
        },
        mounted(){},
        methods:{
            QXtag(){
                this.$parent.YCtag()
            }
        }

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
.content{
    position: absolute;
    left: 50%;
    top:30%;
    transform:translate(-50%,-50%);
    width:775px;
    height:498px;
    background:rgba(255,255,255,1);
    border-radius:5px;
}
.tit{text-align: center;margin: 39px 0 30px 0}
.tit span{
    display: inline-block;
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
}
.title{
    margin: 0 60px;
}
.title_1 span{
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
}
.box{
    margin: 21px 0 41px 0;
    width: 655px;
    height: 240px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(230,230,230,1);
    border-radius:5px;
}
.AddIMG_bq_box_top{
    border-bottom: 1px solid rgba(230,230,230,1);
}
.AddIMG_bq_box_top_tit{
    margin: 17px 0 15px 17px;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
}
.AddIMG_bq_box_top_bq,.AddIMG_bq_box_top_zdy{
    margin:0 20px 0px 20px ;
}
.bq{
    display: inline-block;
    padding: 5px 10px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(153,153,153,1);
    border-radius:5px;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
    margin-right: 17px;
    margin-bottom: 10px!important;
}
.AddIMG_bq_box_top_zdy{
    width: 638px;
    height: 80px;
    overflow-y: auto;
}
.AddIMG_bq_box_top_tit input{
    float: right;
    margin-right: 10px;
    width:91px;
    height:26px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(220,220,220,1);
    border-radius:5px;
}
.btn{
    text-align: center;
}
.btn span{
    display: inline-block;
    width:140px;
    height:50px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(153,153,153,1);
    border-radius:5px;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
    line-height: 50px;
    cursor: pointer;
}
.btn_bc{
    border: 0!important;
    background:rgba(19,159,248,1)!important;
    color:rgba(255,255,255,1)!important;
    margin-right: 40px;
}
</style>