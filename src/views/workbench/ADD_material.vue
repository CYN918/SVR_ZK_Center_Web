<template>
    <div class="bg">
            <div class="centNavBox">
                <div class="title">
                    <span>添加素材</span>
                </div>
                <div>
                    <template>
                        <el-table
                                :data="tableData"
                                stripe
                                style="width: 100%">
                            <el-table-column
                                    prop="date"
                                    label="数量"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="需要制作的物料"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="预览图"
                                    label="地址">
                            </el-table-column>
                            <el-table-column
                                    prop="素材ID"
                                    label="地址">
                            </el-table-column>
                            <el-table-column
                                    prop="素材类型"
                                    label="地址">
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
            </div>
    </div>
</template>

<script>
    export default {
        name: "a-d-d_material"
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
</style>