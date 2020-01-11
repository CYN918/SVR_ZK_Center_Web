
<template>
<div class='base'>
    <div>
        <span>日期：</span>
         <div class="date">
                <el-date-picker
                    v-model="date"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
        </div>
        <div class='operation'>
            <span class='cx'>查询</span>
            <span class='mun' @mousemove="unfold()" @mouseout="fold()">...
                <div class='tree' v-if="show">
                    <div>导入原始数据</div>
                    <div>导出替换数据</div>
                    <div @click='batchUpload()'>批量上传</div>
                    <!-- <div>导入结果数据</div> -->
                    <div @click='jump()'>操作记录</div>
                </div>
            </span>
        </div>
    </div>
    <div style="margin:24px 0">
         <template>
                    <el-table
                            ref="tab"
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            >

                        <el-table-column
                                prop="num"
                                label="序号">
                            <template slot-scope="scope">
                                <span>{{scope.$index+1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="sdkid"
                                label="原始图">
                        </el-table-column>
                        <el-table-column
                                prop="count"
                                label="落地页">
                        </el-table-column>
                         <el-table-column
                                prop="status"
                                label="状态">
                        </el-table-column>
                         <el-table-column
                                prop="count"
                                label="更新时间">
                        </el-table-column>
                         <el-table-column
                                prop="count"
                                label="操作人员">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                               
                        >
                            <template slot-scope="scope">
                                 <el-button  type="text" size="small" v-clipboard:copy="tableData[scope.$index].copy_file_name" v-clipboard:success="onCopy"   v-clipboard:error="onError">复制命名</el-button>
                                <el-button  type="text" size="small" @click='details(scope.$index)'>查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
    </div>
     <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="page"
                            :page-size="p"
                            layout="prev, pager, next,total, jumper"
                            :total="total">
                    </el-pagination>
    </div>
     <div class="bg" v-if="upload">
                <div class="load">
                    <div class="load_tit">
                        <span>批量上传</span>
                    </div>
                    <div class="load_upload">
                        <el-upload
                                class="upload-demo"
                                action="aaaa"
                                multiple
                                :on-exceed="handleExceed"
                                :limit="100"
                                :http-request="beforupload"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                    <div class="table_load">
                        <template>
                            <el-table
                                    :data="tableDataList"
                                    style="width: 100%"
                                    :header-cell-style="getRowClass"
                                    :cell-style="cell"
                                    border>
                                <el-table-column
                                        prop="name"
                                        :show-overflow-tooltip="true"
                                        label="文件名">
                                </el-table-column>

                                <el-table-column
                                        prop="size"
                                        label="分辨率">
                                </el-table-column>
                                <el-table-column
                                        prop="status"
                                        label="状态">
                                    <template slot-scope="scope">
                                        <span v-if="tableDataList[scope.$index].status=='上传中'" class="win">上传中</span>
                                        <span v-if="tableDataList[scope.$index].status=='上传成功'" class="win">上传成功</span>
                                        <span v-if="tableDataList[scope.$index].status=='上传失败'" class="loss">上传失败</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="操作">
                                    <template slot-scope="scope">
                                        <el-button  type="text" size="small" @click="remove(scope.$index)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </div>

                    <div class="btns">
                        <span @click="heidTH()">取消</span>
                    </div>
                </div>
            </div>
</div>
</template>

<script>

export default {

components: {},
data() {

return {
        date:'',
        show:false,
        tableData:[],
        p:10,
        page:1,
        total:0,  
        upload:false,     
        tableDataList:[], 
        };
},

computed: {},

watch: {},

methods: {
        unfold(){
            this.show=true;
        },
        fold(){
            this.show=false
        },
         handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择100 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
        getRowClass({row, column, rowIndex}) {
            if (rowIndex === 0) {
                return 'background:#f7f9fc;color:#1F2E4D;font-size:14px;font-weight:bold;height:48px;font-family:PingFang-SC-Regular;padding:20px 0px 20px 14px'
            } 
            else {
                return ''
            }
        },
        cell({row, column, rowIndex, columnIndex}){
                return 'padding:15px 14px;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
        },
        handleSizeChange(p) { // 每页条数切换
             this.p = p;
                
        },
        handleCurrentChange(page) {//页码切换
            this.page = page;
                
        }, 
        jump(){
            this.$router.push({
                path:"./record"
            })
        },
        details(index){
            this.$router.push({
                path:"./Offline_details",
                query:{
                    data:this.tableData[index]
                },
            })
        },
         onCopy() {
               this.$message.success('复制成功')
        },
        onError() {
            this.$message.error('复制失败')
        },
         batchUpload(){
                this.upload=true;
            },
        beforupload(file){
                var reader = new FileReader();
                var _this=this;
                var obj={};
                reader.readAsDataURL(file.file);
                reader.onload=function(theFile){
                    var image=new Image();
                    image.src=theFile.target.result;
                    image.onload = function() {
                        _this.width = image.width;
                        _this.height = image.height;
                        _this.before(file,obj);
                        obj.size = image.width+'*'+image.height;
                    };
                };
                obj.name = file.file.name;
        },  
        before(file,obj){
                obj.status='上传中';
                this.tableDataList.push(obj);
                let formData = new FormData;
                formData.append('file',file.file);
                formData.append('width',this.width);
                formData.append('height',this.height);
                this.api.replace_bat(formData).then((res)=>{
                    if(!res){
                        obj.status='上传失败';
                        console.log(obj)
                    }else {
                        obj.status='上传成功'
                        console.log(obj)
                    }
                })
        },  
         heidTH(){
                this.upload =false;
                this.fileList=[];
                this.tableDataList=[];
        },  
        remove(index){
                this.tableDataList.splice(index,1);
            },  
},

mounted() {

},

}
</script>
<style  scoped>
.base{
    background: #fff;
    padding: 24px;
}
.date{
        margin-right: 12px;
        display: inline-block;
    }
.operation{
    display: inline-block;
    float:right;
} 
.operation span{
     margin-right: 24px;
    display: inline-block;
    width: 68px;
    height: 36px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border: 1px solid rgba(211,219,235,1);
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(61,73,102,1);
    line-height: 36px;
    cursor: pointer;
    text-align: center;
    position: relative;
}   
.cx{
    border: 0!important;
    background: rgba(51,119,255,1)!important;
    color: rgba(255,255,255,1)!important;
}
.tree{
    width: 100px;
    position: absolute;
    top:36px;
    left: -15px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgb(155, 154, 154);
    z-index: 9999
}
.tree>div{
    height: 36px;
    text-align: center;
    line-height: 36px;
    border-bottom: 1px solid #ddd;
}
.tree>div:hover{
    background: rgba(51,119,255,1);
    color: #fff;
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
     .load{
        border-radius: 10px;
        width: 800px;
        min-height: 270px;
        max-height: 500px;
        position: relative;
        background: #fff;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        overflow-y: auto;
    }
    .load_tit{border-bottom: 1px solid #ddd}
    .load_tit span{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        margin:10px 0 10px 0;
        font-size: 18px;
        font-weight: bold;
    }
    .load_upload ,.load_tit{
        margin:15px 24px 0 24px
    }
    .btns{
        margin-top: 30px;
    }
    .btns span{
        display: inline-block;
        border-radius: 8px;
        width: 80px!important;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        border: 1px solid #c3c3c3;
        color: #9c9c9c;
        margin-right: 30px;
        margin-left: 24px;
        text-align: center;
        margin-bottom: 24px;
    }
    .table_load{
        padding: 24px;
    }
    .win{
        color: #55a532;
    }
    .loss{
        color: red;
    }
    .content_right .block{
        margin-bottom: 0!important;
    }
</style>