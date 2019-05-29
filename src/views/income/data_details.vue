<template>
    <div>
        <div class="top_name">
            <span class="top_txt">收益管理/设计师成本管理</span>
            <div class="title_left" @click="fh">
                <img src="../../../public/img/fh.png">
                <span>分成详情</span>
            </div>
        </div>
        <div class="content">
            <div>
                <div class="timesDate">
                    <el-date-picker
                            v-model="time"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd ">
                    </el-date-picker>
                </div>
                <span>素材ID</span>
                <input type="text" placeholder="请输入素材ID"/>
                <span>渠道ID</span>
                <input type="text" placeholder="请输入渠道ID"/>
            </div>
            <div>
                <span>广告位ID</span>
                <input type="text" placeholder="请输入广告位ID"/>
                <span>广告ID</span>
                <input type="text" placeholder="请输入广告ID"/>
                <span>查询</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "data_details",
        data(){
            return{
                time:[],
            }
        },
        methods:{
            fh(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
    .top_name{
        height:112px!important;
        background:rgba(255,255,255,1);
    }
    .title_left img{
        width: 12px;
        margin-left: 24px;
    }
    .title_left span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left: 8px;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
        font-size: 12px!important;
    }
    .content{
        margin-top: 199px!important;
    }
    .timesDate{display: inline-block}
</style>