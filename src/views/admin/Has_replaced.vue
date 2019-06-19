<template>
    <div class="content_right">
        <div class="titel_table">
            <span>已替换</span>
        </div>
        <div>
            <template>
                <div class="block">
                    <el-date-picker
                            v-model="times"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                    <span class="cx" @click="getDataList()">查询</span>
                </div>
            </template>
        </div>
        <div>
            <template>
                <el-table
                        :data="tableData2"
                        style="width: 100%"
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
                        border>
                    <el-table-column
                            prop="url"
                            label="待替换资源图片"
                    >
                        <template slot-scope="scope">
                            <img :src="scope.row.url" min-width="70" height="70" />
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="url"
                            label="新资源图片"
                    >
                        <template slot-scope="scope">
                            <img :src="scope.row.new_url" min-width="70" height="70" />
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="url_md5"
                            label="待替换资源URL的MD5"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="adid"
                            label="广告ID">
                    </el-table-column>
                    <el-table-column
                            prop="sdk_id"
                            label="SDK ID">
                    </el-table-column>
                    <el-table-column
                            prop="src"
                            label="来源">
                    </el-table-column>
                    <el-table-column
                            prop="tdate"
                            label="更新时间">
                    </el-table-column>
                    <el-table-column
                            prop="model"
                            label="实现方式">
                    </el-table-column>
                    <el-table-column
                            prop="pv"
                            label="访问量">
                    </el-table-column>
                    <el-table-column
                            prop="pv"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button @click="getRemove(tableData2[scope.$index].url_md5)" type="text" >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div class="bg" v-if="remove">
            <div class="del">
                <div class="tit">
                    <span>删除</span>
                </div>
                <div class="move">
                    <span>是否确认删除？</span>
                </div>
                <div class="btn">
                    <span class="sc" @click="delelt()">删除</span>
                    <span @click="heidRemove">取消</span>
                </div>
            </div>
        </div>
        <div class="block_fy">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page"
                    :page-size="p"
                    layout="prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "has_replaced",
        data(){
            return{
                tableData2:[],
                times:[],
                remove:false,
                start_date:'',
                end_date:'',
                md5:'',
                p:10,
                page:1,
                total:0
            }
        },

        mounted(){
            this.getDataList()
        },
        methods:{
                getRowClass({row, column, rowIndex, columnIndex}) {
                    if (rowIndex === 0) {
                        return 'background:rgb(246, 245, 245,1);color:rgba(30,30,30,1);text-align:center;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
                    } else {
                        return ''
                    }
                    },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:#000;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            getDataList(){
                let params={start_date:this.times[0],end_date:this.times[1],p:10,page:1};
                this.api.replace_had_list({params}).then((res)=>{
                    this.total = res.total;
                    this.tableData2 = res.data
                })
            },
            delelt(){
                    let formData =new FormData;
                    formData.append('url_md5',this.md5);
                    this.api.replace_del(formData).then((res)=>{
                        this.heidRemove();
                        this.getDataList();
                    })
            },
            getRemove(id){
                this.md5=id;
                this.remove=true
            },
            heidRemove(){
                this.remove=false
            },
            handleSizeChange(p){
                    this.p = p;
                    this. getDataList()
            },
            handleCurrentChange(page){
                    this.page = page;
                    this. getDataList()
            }
        },

    }
</script>

<style scoped>
    .content_right{
        width: 100%;
        padding: 24px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #fff;
    }
    .titel_table{
        width: 100%;
        height: 36px;
        margin: 30px 0;
    }
    .titel_table>span{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        font-weight: bold;
        font-size: 18px;
    }
    .title_top{
        margin-top: 60px;
    }
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 999;
    }
    .content{
        background: #fff;
        width: 600px;
        height: 350px;
        padding: 24px;
        border-radius: 10px;
        margin-top: 20%;
        margin-left: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
    }
    .del{
        background: #fff;
        width: 400px;
        height: 150px;
        padding: 24px;
        border-radius: 10px;
        margin-top: 20%;
        margin-left: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
    }
    .tit{
        border-bottom: 1px solid #ddd;
    }
    .tit span{
        display:inline-block;
        height: 36px;
        line-height: 36px;
        font-size: 18px;
        font-weight: bold;
    }
    .move{
        width: 100%;
        margin-top: 20px;
    }
    .move span{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        font-size: 16px;
        font-weight: bold;
    }
    .btn{
        margin-top: 20px;
        text-align: center;
    }
    .btn span{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        width: 80px;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid #dfdfdf;
        text-align: center;
    }
    .sc{
        color: #f5f6fa!important;
        background: #4f4cf1 !important;
        border: 0!important;
        margin-right: 40px;
    }
    .upload{
        margin-top: 20px;
        width: 100px;
    }
    .cx{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        width: 80px;
        cursor: pointer;
        border-radius: 5px;
        color: #f5f6fa;
        background: #4f4cf1 ;
        border: 0;
        text-align: center;
        margin:20px 0 20px 24px ;
    }
    .block_fy{
        text-align: right;
        margin-top: 30px;
    }
</style>