<template>
    <div>
        <div class="top_name">
            <span class="top_txt">个人中心/流程管理</span>
            <div class="title_left">
                <span>流程管理</span>
            </div>
        </div>
        <div class="centNavBox">
            <div class="center">
                <span>业务需求流程</span>
            </div>
            <div class="yw_select">
                <span>业务类型</span>
                <select>
                    <option v-for="(item,index) in YWtypeList" :value="item.type">{{item.name}}</option>
                </select>
            </div>
        </div>

        <div class="centNavBox_2">
            <div class="center">
                <span>素材需求流程</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "process",
        data(){
            return{
                YWtypeList:[],
                SCtypeList:[],
            }
        },
        mounted(){
            this.getYWtype();

        },
        methods:{
            getYWtype(){
                let params ={material:0}
                this.api.config_material_type({params}).then((res)=>{
                    this.YWtypeList = res;
                    this.getSCtype();
                })
            },
            getSCtype(){
                let params ={material:1}
                this.api.config_material_type({params}).then((res)=>{
                    this.SCtypeList = res
                })
            }
        }
    }
</script>

<style scoped>
    .centNavBox,.centNavBox_2{
        width: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #FFF;
        margin-top:194px;
    }
    .centNavBox_2{margin-top:24px!important;}
    .top_name{
        height: 109px;
        z-index: 999999;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
    }
    .title_left>span{
        display: inline-block;
        margin-left: 24px;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
    }
    .center{
        height: 56px;
        border-bottom: 1px solid #E6E9F0;
    }
    .center span{
        display: inline-block;
        text-align: center;
        line-height: 56px;
        margin-left: 24px;
        font-size:16px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .yw_select{
        margin-top: 23px;
    }
    .yw_select span{
        display: inline-block;
        text-align: center;
        margin:0 24px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .yw_select select{
        width:192px;
        height:36px;
        padding-left: 8px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
</style>