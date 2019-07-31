<template>
    <div>
        <div class="top_name">
            <span class="top_txt">收益管理/设计师成本管理</span>
            <div class="title_left" @click="fh">
                <img src="../../../public/img/fh.png">
                <span>设计师成本管理</span>
                <span class="ck">查看记录</span>
            </div>
        </div>
        <div class="content">
            <div class="wb">
                <span>素材默认外部完成度</span>
                <input type="text"/>
            </div>
            <div class="select_tab">
                <span>素材类型</span>
                <select>
                    <option>广告图</option>
                </select>
                <span>分成价格(元)</span>
                <input type="number"/>
                <span>结算方式</span>
                <select>
                    <option>ECPC</option>
                </select>
            </div>
            <div class="select_tab">
                <span>素材类型</span>
                <select>
                    <option>广告图</option>
                </select>
                <span>分成价格(元)</span>
                <input type="number"/>
                <span>结算方式</span>
                <select>
                    <option>ECPC</option>
                </select>
            </div>
            <div class="select_tab">
                <span>素材类型</span>
                <select>
                    <option>广告图</option>
                </select>
                <span>分成价格(元)</span>
                <input type="number"/>
                <span>结算方式</span>
                <select>
                    <option>ECPC</option>
                </select>
            </div>
            <div class="select_tab">
                <span>素材类型</span>
                <select>
                    <option>广告图</option>
                </select>
                <span>分成价格(元)</span>
                <input type="number"/>
                <span>结算方式</span>
                <select>
                    <option>ECPC</option>
                </select>
            </div>
            <div class="select_tab">
                <span class="updata">更新</span>
            </div>
        </div>

        <!--<div class="block">-->
            <!--<el-pagination-->
                    <!--@size-change="handleSizeChange"-->
                    <!--@current-change="handleCurrentChange"-->
                    <!--:current-page="page"-->
                    <!--:page-sizes="[10, 20, 30, 40]"-->
                    <!--:page-size="p"-->
                    <!--layout="total, sizes, prev, pager, next, jumper"-->
                    <!--:total="total">-->
            <!--</el-pagination>-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        name: "data_details",
        data(){
            return{
                time:[],
                tableData:[],
                p:10,
                page:1,
                total:0
            }
        },
        methods:{
            fh(){
                this.$router.go(-1)
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(247,249,252,1);color:rgba(31,46,77,1);text-align:center;font-size:14px;font-weight:500;font-family:PingFang-SC-Medium;height:56px'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:rgba(61,73,102,1);font-size:14px;font-weight:400;font-family:PingFangSC-Regula;'
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
            },
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
        margin-top:200px;
        padding: 0 24px;
        background:rgba(255,255,255,1);
    }
    .content span{
        display: inline-block;
        margin-right: 24px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .content input{
        margin-right: 44px;
        width:190px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .ck{
        display: inline-block;
        float: right;
        margin-right: 300px;
        width:96px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        text-align:center;
        line-height: 36px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
        cursor: pointer;
    }
    .wb{
        padding: 0 12px;
    }
    .wb span{
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .wb input{
        width:112px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding: 0 8px;
        margin-top: 24px;
        margin-bottom: 44px;
    }
    .select_tab{
        margin-bottom: 24px;
        padding: 0 12px;
    }
    .select_tab span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(143,155,179,1);
        margin-right: 24px;
    }
    .select_tab input{
        width:184px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        padding: 0 8px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 44px;
    }
    .select_tab select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 54px;
    }
    .updata{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        text-align: center;
        cursor: pointer;
        color:rgba(255,255,255,1)!important;
        line-height:36px;
    }
</style>