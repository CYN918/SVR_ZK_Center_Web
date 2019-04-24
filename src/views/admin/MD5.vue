<template>
    <div>
        <div class="top" @click="uploadData">
            <span>上传</span>
        </div>
        <div class="centNavBox">
            <template>
                <el-table
                        :data="tableData"
                        header-align="center"
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="fid"
                            label="序号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="md5"
                            label="MD5值"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="created_at"
                            label="上传时间">
                    </el-table-column>
                    <el-table-column
                            prop="creator"
                            label="操作账号">
                    </el-table-column>
                    <el-table-column
                            prop="ee"
                            label="附件下载">
                        <template slot-scope="scope">
                           <a class="iconfont" :href="downloadLink(scope.$index)">&#xe61a;</a>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="del(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
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
        <div class="tcvBox" v-if="show">
            <div class="box">
                <div class="box_1">
                   <span>上传壁纸</span>
                </div>
                <div class="box_2">
                    <span class="text">附件</span>
                    <el-upload
                            class="upload-demo"
                            :limit="1"
                            :on-success="handleAvatarSuccess"
                            action="http://ts-i.idatachain.cn//api/file/upload"
                            :on-exceed="handleExceed"
                            :before-upload="beforeAvatarUpload"
                            accept="application/x-zip-compressed"
                            :on-remove="handleRemove"
                         >
                        <el-button size="small" type="primary">上传物料包</el-button>
                    </el-upload>
                </div>
                <div class="MD">
                    <span class="MD_name">MD5</span>
                    <span class="box_3">{{MD5}}</span>
                </div>
                <div class="btn_1">
                    <span class="btn_y" @click="uploading">确定</span>
                    <span class="btn_n" @click="qx()">取消</span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import '../../assets/icon/iconfont.css';
    export default {
        name: "m-d5",
        data(){
            return {
                file:{},
                tableData:[],
                show:false,
                MD5:'',
                name:'',
                size:'',
                url:'',
                ext:'',
                total:0,
                page:1,
                p:10,
            }
        },
        mounted(){
            this.msgData()
        },
        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:#ddd;color:#000;text-align:center;font-size:9px;font-weight:500;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;'
            },
            uploadData(){
                this.show = true;
            },
            qx(){
                this.show = false;
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeAvatarUpload(file) {
                this.file = file;

                console.log(this.file)
                const isJPG = file.type === 'application/x-zip-compressed';
                if (!isJPG) {
                    this.$message.error('只支持ZIP格式!');
                }
                return isJPG;
            },
            handleRemove(file, fileList) {
                this.file = '';
            },
            handleAvatarSuccess(response, file, fileList) {
               this.MD5 = response.data.md5;
               this.url = response.data.url;
               this.name = response.data.name;
               this.ext = response.data.ext;
               this.size = response.data.size;
            },
            warning(a){
                if(a.code!=0){
                    return this.$message.error(res.msg);
                }
            },
            uploading(){
                if(!this.file){
                    this.$message.error('请上传文件，文件不能为空！');
                    return
                }
                let params = {name:this.name,size:this.size,ext:this.ext,url:this.url,md5:this.MD5};
                this.api.lockwallpaper_add({params}).then((res)=>{
                    this.show = false;
                    this.warning(res);
                    this.msgData();
                },error => {
                        console.log(error)
                });

            },
            msgData(){
                let params = {p:this.p,page:this.page};
                this.api.lockwallpaper_list({params}).then((res)=>{
                    this.tableData = res.data;
                    this.total =res.total;
                   res.last_page=this.p  ;
                    res.per_page=this.page;
                })
            },
            downloadLink(a){
               return this.tableData[a].url;
            },
            del(b){
                let params = {id:this.tableData[b].fid};
                this.api.lockwallpaper_del({params}).then((res)=>{
                    this.msgData();
                })
            },
            handleSizeChange1() { // 每页条数切换
                this.p = p;
                this. msgData()
            },
            handleCurrentChange1(page) {//页码切换
                console.log(page);
                this.page = page;
                this. msgData()
            },
        },
    }
</script>

<style scoped>
.centNavBox{
    position: relative;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 3px 0px rgba(0, 0, 0, 0.06);
    margin-bottom: 0 !important;
    height: 60px;
    font-size:14px;
    line-height:60px ;
    color:rgba(0,0,0,1) !important;
}
.top{
    text-align: right;
    margin-bottom: 20px;
}
.top>span{
    display: inline-block;
    width: 200px;
    height: 60px;
    line-height: 60px;
    background: #ff7a8c;
    border-radius: 30px;
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
}
.tcvBox{
    position: fixed;
    top: 65px;
    left: 316px;
    bottom: 0;
    right: 0;
    z-index: 99;
    background: rgba(0,0,0,.3);
    width: 100%;
    height: 100%;
}
.box{
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 30px 113px 0;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background: rgba(255,255,255,1);
    -webkit-box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    overflow-y: auto;
    max-height: 80%;
}
.box_1{
    margin-bottom: 30px;
    text-align: center;
}
.box_1>span{
    display: inline-block;
   font-weight: bold;
    font-size: 20px;
}
.text{
    vertical-align: top;
    display: inline-block;
    line-height: 30px;
}
.btn_1{
    margin: 50px 0;

}
.btn_y,.btn_n{
    display: inline-block;
    text-align: center;
    width: 150px;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    border-radius: 8px;
}
.btn_y{
    background: #2ad5cd;
    margin-right: 50px;
    color: #fff;
    margin: 0 auto!important;
}
.btn_n{
    border: 1px solid #ddd;
    margin-left: 82px;
}
.upload-demo{
    display: inline-block;
    margin-left: 20px;
}
.box_2>span{
    display: inline-block;
    width:50px;
    text-align: left;
}
.box_3{
    display: inline-block;
    width: 310px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ddd;
    margin-left: 20px;
    padding-left: 5px;
}
.MD{
    margin-top: 30px;
    text-align: center;
}
.MD_name{
    display: inline-block;
    width: 50px;
    text-align:left;
    height: 30px;
    line-height: 30px;
    vertical-align: top;
}
.block{
    margin-top: 50px;
    text-align: right;
}
</style>