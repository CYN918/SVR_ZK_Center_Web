<template>
    <div class="content_right">
        <div class="titel_table">
            <span>待替换</span>
        </div>
        <div>
            <template>
                <div class="block">
                    <el-date-picker
                            v-model="time"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                    <span class="cx" @click="getList()">查询</span>
                </div>
            </template>
        </div>
        <div>
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        :header-cell-style="getRowClass"
                        border>
                    <el-table-column
                            prop="url"
                            label="URL"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="url_md5"
                            label="MD5"
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
                            label="记录时期">
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
                            label="操作">
                        <template slot-scope="scope">
                            <el-button @click="getAdd(scope.row)" type="text" size="small">替换</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div class="titel_table title_top">
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
                        border>
                    <el-table-column
                            prop="url"
                            label="URL"
                           >
                    </el-table-column>
                    <el-table-column
                            prop="url_md5"
                            label="MD5"
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
                            label="记录时期">
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
                            label="访问量">
                        <template slot-scope="scope">
                            <el-button @click="getRemove(scope.$index)" type="text" >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div class="bg" v-if="Add" @click="heidAdd()">
            <div class="content" @click.stop>
                <div class="tit">
                    <span>资源替换</span>
                </div>
                <div class="upload">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :http-request="upload"
                            :limit="1"
                            :on-exceed="handleExceed"
                            >
                        <el-button size="small" type="primary">上传</el-button>
                    </el-upload>
                </div>
            </div>
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
                    <span class="sc">删除</span>
                    <span @click="heidRemove">取消</span>
                </div>
            </div>
            </div>
    </div>
</template>

<script>
    export default {
        name: "replace",
        data(){
            return{
                tableData:[{MD5:2222,tdate:"dsds"},{MD5:2222,tdate:"dsds"}],
                tableData2:[{MD5:2222,tdate:"dsds"},],
                Add:false,
                remove:false,
                start_date:'',
                end_date:'',
                time:[],
                times:[],
            }
        },
        mounted(){
            this.getList();
        },
        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgb(246, 245, 245,1);color:rgba(30,30,30,1);text-align:center;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件`);
            },
            upload(file){
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    console.log(res)
                })
            },
            getList(){
                let params={start_date:this.time[0],end_date:this.time[1]}
                this.api.replace_pending_list({params}).then((res)=>{
                    this.tableData = res;
                    this.getDataList()
                })
            },
            getDataList(){
                let params={start_date:this.times[0],end_date:this.times[1]}
                this.api.replace_had_list({params}).then((res)=>{
                    this.tableData2= res
                })
            },
            getAdd(){
                this.Add = true;
            },
            heidAdd(){
                this.Add=false;
            },
            getRemove(){
                this.remove=true
            },
            heidRemove(){
                this.remove=false
            },
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
</style>