<template>
    <div>
        <div class="top_name">
            <span class="inner">|</span>
            <span class="top_txt">投放库/面包屑</span>
        </div>
        <div class="content">
            <div class="con_select">
                <span style="margin-left: 0">投放库名称</span>
                <input type="text" placeholder="请输入投放库名称" v-model="search"/>
                <span>投放库类型</span>
                <select v-model="put_type">
                    <option>aaa</option>
                </select>
                <span>广告位类型</span>
                <select v-model="pos_type">
                    <option value="" selected>全部</option>
                    <option v-for="item in oddList" :value="item.pos_type">{{item.pos_type}}</option>
                </select>
                <span class="cx" @click="getDataList">查询</span>
                <span class="addTF"  @click="jump()">新建投放库</span>
            </div>
            <div style="margin: 0 24px 0 24px">
                <template>
                    <el-table
                            :data="tableData"
                            :header-cell-style="getRowClass"
                            style="width: 100%">
                        <el-table-column
                                prop="id"
                                label="投放库ID"
                                >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="投放库名称"
                                >
                        </el-table-column>
                        <el-table-column
                                prop="ad_type"
                                label="投放库类型">
                        </el-table-column>
                        <el-table-column
                                prop="pos_type"
                                label="广告位类型"
                               >
                        </el-table-column>
                        <el-table-column
                                prop="size"
                                label="素材尺寸"
                                >
                        </el-table-column>
                        <el-table-column
                                prop="ad_type"
                                label="广告类型">
                        </el-table-column>
                        <el-table-column
                                prop="channel_type"
                                label="渠道类型"
                               >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="状态"
                               >
                        </el-table-column>
                        <el-table-column
                                prop="updated_at"
                                label="更新时间">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small"  @click="look(scope.$index)">查看详情</el-button>
                                <el-button type="text" size="small"  @click="delData(scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange1"
                        @current-change="handleCurrentChange1"
                        :current-page.sync="page"
                        :page-size="p"
                        layout="prev, pager, next,total, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "library",
        data(){
            return{
                tableData:[],
                p:20,
                page:1,
                total:0,
                search:'',
                put_type:'',
                pos_type:'',
                oddList:[],
            }
        },
        mounted(){this.getOddList()},
        methods:{
            getRowClass({row, column, rowIndex}) {
                if (rowIndex === 0) {
                    return 'background:#f7f9fc;color:#8F9BB3;font-size:14px;font-weight:Medium;height:48px;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
            jump(){
                this.$router.push({
                    path:'/admin/add_library'
                })
            },
            look(index){

                this.$router.push({
                    path:'/admin/details_library',
                    query:{
                        id:this.tableData[index].id
                    }
                })
            },

            getOddList(){
                this.api.config_position_type({}).then((res)=>{
                    this.oddList=res;
                    this.getDataList()
                })
            },
            getDataList(){
                let params = {search:this.search,put_type:this.put_type,pos_type:this.pos_type,p:this.p,page:this.page};
                this.api.putlib_search({params}).then((res)=>{
                    this.tableData = res.data;
                    this.total = res.total;
                    console.log(res)

                })
            },
            delData(index){
                let formData = new FormData;
                formData.append('id',this.tableData[index].id);
                this.api.putlib_del(formData).then((res)=>{
                    this.getDataList();
                })
            },
            handleSizeChange1(page){
                this.page=page;
                this.getDataList()
            },
            handleCurrentChange1(p){
                this.p=p;
                this.getDataList()
            },
        },
    }
</script>

<style scoped>
.con_select{
    margin:0 0 24px 24px;
}
.con_select span{
    display: inline-block;
    margin-left: 24px;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1);
    margin-right: 24px;
}
.con_select input{
    width:195px;
    height:36px;
    padding-left: 5px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    margin-top: 24px;
}
.con_select select{
    width:200px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
}
.cx{
    display: inline-block;
    width:68px;
    height:36px;
    background:rgba(51,119,255,1);
    border-radius:4px;
    line-height: 36px;
    text-align: center;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1)!important;
    cursor: pointer;
}
.addTF{
    display: inline-block;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    width:110px;
    height:36px;
    background:rgba(51,119,255,1);
    border-radius:4px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1)!important;
    float: right;
    margin-right: 24px;
    margin-top: 24px;

}
</style>