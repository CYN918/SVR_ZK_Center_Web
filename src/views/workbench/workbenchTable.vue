<template>
    <div>
        <QD v-if="sh"></QD>
        <template>
            <el-table
                    :data="tableData"
                    header-align="center"
                    :header-cell-style="getRowClass"
                    :cell-style="cell"
                    style="width: 100%;color:#000">
                <el-table-column
                        label="需求类型" prop="type">
                </el-table-column>
                <el-table-column
                        label="需求ID" prop="bdid">
                </el-table-column>
                <el-table-column
                        label="当前流程" prop="status">
                </el-table-column>
                <el-table-column
                        label="状态" prop="status">
                </el-table-column>
                <el-table-column
                        label="当前流转人员" prop="status">
                </el-table-column>
                <el-table-column
                        label="截止时间" prop="endtime">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="props">
                        <el-button @click="handleCheck(props.row)">查看需求</el-button>
                        <el-button  @click="getSH(props.$index)">审核通过</el-button>
                        <el-button  @click="handleCheck(props.row)">驳回</el-button>
                    </template>
                </el-table-column>
                    <el-table-column type="expand" label="查看完整流程">
                        <template slot-scope="props">
                            <div>
                                <div class="step_box">
                                    <div class="step">√</div>
                                    <div class="step_tit">素材需求发布</div>
                                    <div class="step_time">2019-1-52</div>
                                    <div class="step_contnet">
                                        <span class="step_txt">状态</span>
                                        <span>状态</span>
                                    </div>
                                    <div class="step_contnet">
                                        <span class="step_txt">来源</span>
                                        <span>来源</span>
                                    </div>
                                    <div class="step_contnet">
                                        <span class="step_txt">需求内容</span>
                                        <span >点击查看</span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
    import QD from './workBench_auditor'
    export default {
        components:{QD},
        props:['tableData'],
        name: "workbench-table",
        data(){
            return {
                sh:false,
            }
        },
        mounted(){
            console.log();
        },
        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(255,255,255,1);color:rgba(30,30,30,1);text-align:center;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:#000;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            getSH(a){
                this.sh=true
            },
            heidSH(){
                this.sh=false
            },
        }
    }
</script>

<style scoped>
.step_box{
    display: inline-block;
}
.step{
    width:32px;
    height:32px;
    background:rgba(51,119,255,0.2);
    line-height: 32px;
    text-align: center;
    color: #2E5BFF;
    border-radius: 50%;
    margin-bottom: 12px;
}
.step_tit{
    width:96px;
    height:22px;
    font-size:16px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(61,73,102,1);
}
.step_time{
    width:130px;
    height:22px;
    font-size:12px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(143,155,179,1);
    margin-bottom: 10px;
}
.step_contnet{
    margin-bottom: 10px;
}
.step_txt{
    display: inline-block;
    width:56px;
    height:22px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(143,155,179,1);
    margin-right: 16px;
}
</style>