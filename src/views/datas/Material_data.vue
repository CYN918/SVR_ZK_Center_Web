<template>
    <div>
        <div class="top_tit">
            <div class="tit_top_url">
                <span class="log_url">行为数据 &nbsp;/&nbsp;</span>
                <span class="new_url">物料数据</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">物料数据</span>
            </div>
        </div>
        <div class="content_table">
            <div class="nav">
                <el-date-picker
                        v-model="tdate"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd "
                        value-format="yyyy-MM-dd ">
                </el-date-picker>
                <span class="name">素材ID</span>
                <input type='text' v-model="mfid"/>
                <span class="name">素材类型</span>
                <select v-model="type">
                    <option>全部</option>
                </select>
                <span class="name">广告ID</span>
                <input type='text' v-model="ad_id"/>
                <span class="dc">导出数据</span>
            </div>
            <div class="nav nav_left">
                <span class="name name_left">项目名称</span>
                <input type="text" v-model="ad_name"/>
                <span class="name">广告主</span>
                <input type="text" v-model="admaster"/>
                <span class="name">广告名称</span>
                <input type="text" v-model="project"/>
                <span class="name">渠道ID</span>
                <input type="text" v-model="channel_id"/>
            </div>
            <div class="nav nav_left">
                <span class="name name_left">业务场景</span>
                <select v-model="scene">
                    <option>全部</option>
                </select>
                <span class="name">广告位类型</span>
                <select v-model="ad_space_type">
                    <option>全部</option>
                </select>
                <span class="name">广告位ID</span>
                <input type="text" v-model="ad_space_id"/>
                <span class="name">投放环境</span>
                <select v-model="put_env">
                    <option>全部</option>
                </select>
                <span class="inquire">查询</span>
                <span class="reset">重置</span>
            </div>
            <div>
                <template>
                    <el-table
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="日期"
                               >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="物料ID"
                                >
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="物料类型">
                        </el-table-column>
                        <el-table-column
                                prop="date"
                                label="广告ID"
                               >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="广告名称"
                                :show-overflow-tooltip="true"
                               >
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="广告主">
                        </el-table-column> <el-table-column
                            prop="date"
                            label="项目名称"
                            :show-overflow-tooltip="true"
                           >
                    </el-table-column>
                        <el-table-column
                                prop="name"
                                label="渠道ID"
                                >
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="业务类型">
                        </el-table-column>
                        <el-table-column
                            prop="date"
                            label="广告位类型"
                           >
                    </el-table-column>
                        <el-table-column
                                prop="name"
                                label="投放环境"
                                >
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="展示量">
                        </el-table-column> <el-table-column
                            prop="date"
                            label="点击量"
                           >
                    </el-table-column>
                        <el-table-column
                                prop="name"
                                label="点击率"
                                >
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="已出流水">
                        </el-table-column> <el-table-column
                            prop="date"
                            label="ECPM"
                           >
                    </el-table-column>
                        <el-table-column
                                prop="name"
                                label="ECPC"
                               >
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button @click="CkwL(tableData[scope.$index].mfid)">
                                    查看素材
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </div>
    </div>

</template>

<script>

    export default {

        name: "material_data",
        data(){
            return{
                tdate:'',
                tableData:[{name:'aaa'}],
                mfid:"",
                type:"",
                ad_id:"",
                ad_name:'',
                admaster:"",
                project:"",
                channel_id:'',
                scene:'',
                ad_space_type:'',
                ad_space_id:'',
                put_env:'',
                page:'',
                p:'',
            }
        },
        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(247,249,252,1);color:#1f2e4d;margin:0 24px;font-size:14px;font-weight:500;font-family:PingFang-SC-Medium;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'margin:0 24px;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            CkwL(id){
                this.$router.push({
                    path:"./Material_related",
                    query:{
                        mfid:id
                    }
                })
            },
            dataList(){
                let params = {tstart:this.tdate[0],tend:this.tdate[1],mfid:this.mfid,type:this.type,ad_id:this.ad_id,ad_name:this.ad_name,
                    admaster:this.admaster,project:this.project,channel_id:this.channel_id,scene:this.scene,ad_space_type:this.ad_space_type,
                    ad_space_id:this.ad_space_id,put_env:this.put_env,page:this.page,p:this.p};
                this.api.report_mfinal({params}).then((res)=>{

                })
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
        background:rgba(255,255,255,1);
    }
    input{
        width:190px;
        height:26px;
        padding: 5px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-left: 20px;
        margin-top: 24px;
    }
    select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-left: 20px;
    }
    .name{
        display: inline-block;
        width:70px;
        height:20px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        line-height:20px;
        text-align: right;
        margin-left: 45px;
    }
    .nav{
        margin:0 24px;
    }
    .nav_left{
        margin-left: 17px!important;
    }
    .name_left{
        margin-left: 0!important;
    }
    .dc{
        display: inline-block;
        float: right;
        width:96px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        text-align: center;
        line-height: 36px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-top: 24px;
        cursor: pointer;
    }
    .reset,.inquire{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(232,234,237,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(31,46,77,1);
        text-align: center;
        line-height: 36px;
        cursor: pointer;
    }
    .inquire{
        margin: 0 24px 24px 24px;
        border: 0!important;
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
    }
</style>