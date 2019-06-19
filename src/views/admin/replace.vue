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
                            label="操作">
                        <template slot-scope="scope">
                            <el-button @click="getAdd(tableData[scope.$index])" type="text" size="small">替换</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div class="bg" v-if="Add" >
            <div class="content" >
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
                        <el-button size="small" type="primary">上传资源</el-button>
                    </el-upload>
                </div>
                <div class="box_content">
                    <div>
                        <span>新资源URL</span>
                        <input type="text" disabled v-model="new_url"/>
                        <span>待替换资源URL</span>
                        <input type="text" disabled v-model="datalist.url"/>
                    </div>
                    <div>
                        <span>待替换资源MD5</span>
                        <input type="text" disabled v-model="datalist.url_md5"/>
                        <span>广告ID</span>
                        <input type="text" disabled v-model="datalist.adid"/>
                    </div>
                    <div>
                        <span>实现方式</span>
                        <input type="text" disabled v-model="datalist.model"/>
                        <span>SDK ID</span>
                        <input type="text" disabled v-model="datalist.sdk_id"/>
                    </div>

                    <div>
                        <span>来源</span>
                        <input type="text" disabled v-model="datalist.src"/>
                        <span>更新时间</span>
                        <input type="text" disabled v-model="datalist.tdate"/>
                    </div>
                    <div>
                        <span>访问量</span>
                        <input type="text" disabled v-model="datalist.pv"/>
                        <div class="btn">
                            <span class="th" @click="add()">替换</span>
                            <span @click="heidAdd()">取消</span>
                        </div>
                    </div>

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
                Add:false,
                start_date:'',
                end_date:'',
                time:[],
                datalist:{},
                new_url:'',
                new_url_md5:'',
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
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:#000;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件`);
            },
            upload(file){
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                   this.new_url=res.url;
                   this.new_url_md5=res.md5;
                })
            },
            getList(){
                let params={start_date:this.time[0],end_date:this.time[1]}
                this.api.replace_pending_list({params}).then((res)=>{
                    this.tableData = res;
                })
            },
            getAdd(data){
                this.Add = true;
                this.datalist = data;
                console.log(this.datalist);
            },
            heidAdd(){
                this.Add=false;
                this.datalist = "";
            },
            add(){
                if(!this.new_url){
                    this.$message.error('请上传文件')
                }
                let formData = new FormData;
                formData.append('url',this.datalist.url);
                formData.append('url_md5',this.datalist.url_md5);
                formData.append('new_url',this.new_url);
                formData.append('adid',this.datalist.adid);
                formData.append('sdk_id',this.datalist.sdk_id);
                formData.append('src',this.datalist.src);
                formData.append('tdate',this.datalist.tdate);
                formData.append('model',this.datalist.model);
                formData.append('pv',this.datalist.pv);
                this.api.replace_add(formData).then((res)=>{
                    this.heidAdd();
                    this.getList()
                })
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
    width: 890px;
    height: 500px;
    padding: 24px;
    border-radius: 10px;
    margin-top: 30%;
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
    text-align: center!important;
}
.th{
    color: #f5f6fa!important;
    background: #4f4cf1!important;
    border: 0!important;
    margin-right: 40px!important;
}
.box_content div{
    margin-top: 20px;
}
.box_content span{
    display: inline-block;
    width: 150px;
    text-align: right;
    font-size: 16px;
    margin-right: 15px;
    line-height: 36px;
}
.box_content input{
    width: 200px;
    height: 36px;
    padding-left: 10px;
}
.upload-demo{
    display: inline-block;
    margin-top: 20px;
    width: 150px;
    margin-left: 165px;
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