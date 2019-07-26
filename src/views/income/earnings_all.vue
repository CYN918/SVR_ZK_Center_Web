<template>
    <div>
        <div class="top_tit">
            <div class="tit_top_url">
                <span class="log_url">收益数据 &nbsp;/&nbsp;</span>
                <span class="new_url">收益总览</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">收益总览</span>
            </div>
        </div>
        <div class="content_table">
           <div>
               <select>
                   <option selected>本月</option>
               </select>
           </div>
            <div id="across">

            </div>
        </div>
        <div class="content_table2">
            <div class="content_table2_top">
                <span>预估流水</span>
                <span>已出流水</span>
                <span>渠道成本</span>
                <span>设计师成本</span>
                <div class="right_top">
                    <span>今日</span>
                    <span>本周</span>
                    <span>本月</span>
                    <span>全年</span>
                    <el-date-picker
                            v-model="value"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd ">
                    </el-date-picker>
                </div>
            </div>
            <div style="display: inline-block">
                <div style="display: inline-block;margin-top: 20px">
                    <span class="btn_qs" :class="{checked:chenck==0}" @click="tendency">变化趋势</span>
                    <span class="btn_wd" :class="{checked:chenck==1}" @click="dimensionality">广告维度</span>
                </div>
                <div id="histogram">

                </div>
            </div>
            <div style="display: inline-block;width: 41%">
                <div>
                    <span>TOP5占比</span>
                </div>
                <div id="pie">

                </div>
            </div>
        </div>
        <div class="content_table3">
            <div>
                <span>渠道数据</span>
                <span>广告数据</span>
                <div>
                    <el-date-picker
                            v-model="value"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd ">
                    </el-date-picker>
                    <span>更多</span>
                    <span>导出</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import canvas from '../../api/commonality'
    export default {
        name: "earnings_all",
        data(){
            return{
                IDname:"across",
                value:'',
                chenck:'0',
            }
        },
        mounted(){
            this.chart();
            this.histogramLine();
            this.pieImg()
        },
        methods:{
            chart(){
               canvas.transverseLine();
            },
            histogramLine(){
                canvas.cavansLine()
            },
            pieImg(){
                canvas.pie()
            },
            tendency(){
                this.chenck=0;
            },
            dimensionality(){
                this.chenck=1;
            },
        },
    }
</script>

<style scoped>
    .top_tit{
        width:100%;
        height:112px;
        background:rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
    }
    .content_table{
        margin-top:200px;
        padding: 0 24px;
        background:rgba(255,255,255,1);
    }
    .content_table2,.content_table3{
        margin-top: 24px;
        padding: 0 24px;
        background:rgba(255,255,255,1);
    }
    select{
        margin:28px 0 24px 0;
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    #across{
        width:100%;
        height:396px;
        background:rgba(247,249,252,1);
    }
    .content_table2_top{
        border-bottom:2px solid rgb(243, 244, 246);
        height: 50px;
    }
    .content_table2_top span{
        display: inline-block;
        cursor: pointer;
        padding: 10px;
        font-size:16px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(121,130,148,1);
        line-height:24px;
        margin-top: 5px;
    }
    .right_top{
        display: inline-block;
        float: right;
    }
    #histogram{
        height: 285px;
        width: 844px;
    }
    #pie{
        width: 100%;
        height: 285px;
    }
    .btn_qs,.btn_wd{
        display: inline-block;
        width:96px;
        height:32px;
        color:rgba(121,130,148,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        background:rgba(255,255,255,1);
        border-radius:4px 0px 0px 4px;
        border:1px solid rgba(210,213,219,1);
        line-height: 32px;
        text-align: center;
        cursor: pointer;
    }
    .checked{
        border:1px solid rgba(51,119,255,1)!important;
        color:rgba(51,119,255,1)!important;
    }
</style>