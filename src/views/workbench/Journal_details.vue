
<template>
<div>
    <div class="top_name">
            <div class="tit_top_url">
                <span class="log_url" @click="fh(-1)">杂志锁屏物料预审 &nbsp;/&nbsp;</span>
                <span class="log_ur">物料详情</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">物料详情</span>
            </div>
    </div>
    <div class='details'>
        <div>
            <div class='details_left'>
                <img src="" alt=""/>
            </div>
            <div class='details_right'>
                <div>
                    <span class='details_name'>状态</span>
                    <span></span>
                </div>
                 <div>
                    <span class='details_name'>更新时间</span>
                    <span></span>
                </div>
                 <div>
                    <span class='details_name'>操作人员</span>
                    <span></span>
                </div>
                 <div>
                    <span class='details_name'>原因</span>
                    <span></span>
                </div>
            </div>
        </div>
        <div >
            <div style="margin: 0 40px 60px 40px">
                <div class='details_tit'>
                    <span class='details_name'>落地页</span>
                    <span class='details_num'>共10个</span>
                </div>
                
                <div class='details_box'>
                    <div class='details_url'>dsjklajfdlsjfld;sjfldsjfkljdslfjdsklfhdkshfkds</div>
                </div>
            </div>
        </div>
        <div style="margin: 0 40px 60px 40px">
            <div class='details_tit'>
                    <span class='details_name'>杂志锁屏</span>
                    <span class='details_num'>共10个</span>
            </div>
            <div class='img_box'>
                <div class='img_url'>
                    <img />
                </div>
            </div>
        </div>
        <div style="margin:0 40px">
            <span class='sh'>审核</span>
            <span class='qx'>取消</span>
        </div>
    </div>
</div>
</template>

<script>

export default {

components: {},
data() {

return {

};
},

methods: {
    fh(index){
        this.$router.go(index)
    },
},

created() {

},

mounted() {

},

}
</script>
<style  scoped>
.top_name{
        height: 98px;
    }
.log_ur{
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .details{
        margin-top: 185px;
        background: #fff
    }
    .details_left{
        margin: 40px 100px 60px 40px;
        display: inline-block;
        width: 200px;
        height: 300px;
        background: #ddd;
        position: relative;
    }
    .details_left img{
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%)
        
    }
    .details_right{
        display: inline-block;
        position: relative;
        vertical-align: top;
        margin-top: 40px
    }
    .details_right>div{
        height: 50px;
    } 
    .details_name{
        display: inline-block;
        font-family: 'Courier New', Courier, monospace;
        font-size: 18px;
        font-weight: 500;
        color: #000;
    }
    .details_num{
        display: inline-block;
         font-size: 12px;
        font-weight: 500;
        color: ddd;
        font-family: 'Courier New', Courier, monospace;
    }
    .details_box{
        width: 100%;
        height: 150%;
        overflow-y: auto;
    }
    .details_url{
        height: 30px;
        width: 100%;
        line-height: 30px;
        border-bottom: 1px solid #ddd;
    }
    .details_tit{
        width: 100%;
        height: 50px;
        border-bottom: 3px solid #ddd
    }
    .img_box{
        width: 100%;
        height: 150px;
        overflow-x: auto;
        margin-top: 15px;
        border-bottom: 1px solid #ddd;
    }
    .img_url{
        width: 80px;
        height: 120px;
        background: #ddd;
        margin-right:40px; 
    }
    .sh,.qx{
        display: inline-block;
        cursor: pointer;
        margin-right: 24px;
        width: 68px;
        height: 36px;
        background: rgba(255,255,255,1);
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(61,73,102,1);
        line-height: 36px;
        cursor: pointer;
        text-align: center;
        margin-top: 7px;
        margin-bottom: 50px;
    }
    .sh{
           border: 0!important;
    background: rgba(51,119,255,1)!important;
    color: rgba(255,255,255,1)!important;
    }
</style>