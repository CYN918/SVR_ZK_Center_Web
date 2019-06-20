<template>
    <div>
        <div class="titl">
            <div style="margin:24px 0 20px 24px">
                <span style="color: #1890ff ">资源替换投放库管理</span>
                <span style="color: #b3b3b3">&nbsp;/&nbsp;基础详情页</span>
            </div>
            <div>
                <span class="titl_name">基础详情页</span>
            </div>
        </div>
        <div class="content_right">
            <div class="content_right_top">
                <div class="content_right_tit">
                    <span>广告详情</span>
                </div>
                <div>
                    <span>广告ID:</span>
                    <span class="con">{{this.$route.query.id}}</span>
                    <span>获取内容时间:</span>
                    <span class="con">{{time}}</span>
                    <div class="updataLoad">
                        <el-upload
                                class="upload-demo"
                                action="aaaa"
                                multiple
                                :limit="1"
                                :http-request="upload"
                               >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                </div>
                <div>
                    <span>落地页:</span>
                    <a :href="preview_url">{{preview_url}}</a>
                </div>
                <div>
                    <span>原始图:</span>
                    <div style="display: inline-block">
                        <div v-for="item in imgs"><a :href="item.url">{{item.url}}</a></div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <span>替换列表</span>
                </div>
                <template>
                    <el-table
                            :data="tableData2"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            border>
                        <el-table-column
                                prop="url"
                                label="序号"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="url_md5"
                                label="文件名"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="adid"
                                label="尺寸">
                        </el-table-column>
                        <el-table-column
                                prop="src"
                                label="操作人员">
                        </el-table-column>
                        <el-table-column
                                prop="pv"
                                label="操作">
                            <template slot-scope="scope">
                                <a class="iconfont" :href="downloadLink(scope.$index)">&#xe61a;</a>
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
                        <span>取消</span>
                    </div>
                </div>
            </div>
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
                total:0,
                time:'',
                preview_url:'',
                imgs:[],
                new_url_md5:'',
                new_url:'',
                tableData:[],
                sjSize:''
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
            upload(file){
                    let formData =new FormData;
                    formData.append('file',file.file);
                   this.api.file_upload(formData).then((res)=>{
                       this.new_url= res.url;
                       this.new_url_md5=res.md5;
                       var image = new Image();
                       var _this=this;
                       image.onload=function(){
                           var width = image.width;
                           var height = image.height;
                           _this.sjSize = (width+"*"+height)
                       };
                       image.src= res.url;
                       let formData = new FormData;
                       formData.append('size',this.sjSize);
                       formData.append('new_url',this.new_url);
                       formData.append('new_url_md5',this.new_url_md5);
                       formData.append('original_res',  JSON.stringify(this.tableData.original_res));
                       formData.append('adids',this.$route.query.id);
                       formData.append('sdk_id',this.tableData.sdk_id);
                       formData.append('src',this.tableData.src);
                       formData.append('tdate',this.tableData.tdate);
                       formData.append('model',this.tableData.model);
                       formData.append('pv',this.tableData.pv);
                       formData.append('preview_url',this.tableData.preview_url);
                        this.api.replace_add(formData).then((res)=>{

                        })
                   })
            },
            getDataList(){
                this.api.replace_pending_list().then((res)=>{
                    for(var i=0;i<res.length;i++){
                        if(res[i].adid==this.$route.query.id){
                            this.tableData=res[i];
                            this.time = res[i].tdate;
                            this.preview_url = res[i].preview_url;
                            this.imgs = res[i].original_res;
                            this.tableData2=res[i].new_res;
                        }

                    }
                })

            },
            downloadLink(a){
                return this.tableData2[a].url;
            },
            delelt(){
                    let formData =new FormData;
                    formData.append('url_md5',this.md5);
                    this.api.replace_del(formData).then((res)=>{
                        this.getDataList();
                    })
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
        margin-top: 200px;
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
    .titl{
        width: 100%;
        height: 100px;
        border-top: 3px solid #ededed;
        background: #fff;
        -webkit-box-shadow: 0 0 6px 0 rgba(0,0,0,.04);
        box-shadow: 0 0 6px 0 rgba(0,0,0,.04);
        position: fixed;
        left: 316px;
        top: 63px;
        z-index: 99;
    }
    .titl_name{
        font-size: 20px;
        font-weight: bold;
        font-family: "Microsoft YaHei";
        margin-left: 24px;
    }
    .content_right_tit span{
        display: inline-block;
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 18px;
    }
    .content_right_top{
        margin-bottom: 30px;
        border-bottom: 1px solid #DDD;
    }
    .content_right_top div{
        margin-bottom: 15px;
    }
    .content_right_top span{
        display: inline-block;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        margin-right: 15px;
    }
    .con{
        margin-right: 200px!important;
    }
    .updataLoad{
        display: inline-block;
        float: right;
        width: 80px;
    }
</style>