<template>
    <div >
        <div class="top_name">
            <span class="inner">|</span>
            <span class="top_txt">设计规范库</span>
        </div>
        <div class="content">
            <div class="ss">
                <img src="../../../public/img/ss.png"/>
                <input type="text" placeholder="搜索关键字或ID" v-model="search" @input="getTableList()"/>
                <span @click="upload">上传</span>
            </div>
            <div class="table_content">
                <template>
                    <el-table
                            :data="tableData"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="name"
                                label="文件名"
                              >
                        </el-table-column>
                        <el-table-column
                                prop="type"
                                label="类型"
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
                                <el-button type="text" size="small" @click="AnewUpload(tableData[scope.$index].id)">重新上传</el-button>
                                <a :href=" tableData[scope.$index].attach_url">下载</a>
                                <el-button type="text" size="small" @click="delData(scope.$index)">删除</el-button>
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
        <div class="bg" v-if="updataList">
            <div class="con">
                <div class="tit_sm">
                    <span>上传文件</span>
                    <img src="../../../public/img/yc.png" @click="heid"/>
                </div>
                <div class="tit_txt">
                    <span>附件</span>
                    <div class="up">
                        <el-upload
                                class="upload-demo"
                                action="123"
                                :http-request="updata"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                multiple
                                :limit="1"
                                :on-exceed="handleExceed"
                        >
                            <el-button size="small" type="primary">上传</el-button>
                        </el-upload>
                    </div>
                </div>
                <div class="gfName">
                    <span>规范名称</span>
                    <input type="text" placeholder="请输入名称" v-model="name"/>
                </div>
                <div class="select_btn">
                    <span>选择分类</span>
                    <select v-model="type">
                        <option v-for="(item,index) in TypeDataList" :value="item.type">{{item.name}}</option>
                    </select>
                    <select v-model="pos_type" v-if="type!='sls_dynamic'&&type!='sls_picture'">
                        <option v-for="(item,index) in oddType" :value="item.pos_type">{{item.pos_type}}</option>
                    </select>
                </div>
                <div class="upload_btn">
                    <span class="upload_btn_qd" @click="addData">确定</span>
                    <span @click="heid">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "material-img",
        data(){
            return{
                tableData:[],
                page:1,
                p:10,
                total:0,
                file:{},
                oddType:[],
                updataList:false,
                TypeDataList:[],
                type:'',
                name:null,
                pos_type:'',
                attach:{
                    name:'',
                    size:'',
                    url:'',
                    ext:'',
                    md5:'',
                },
                index:'',
                url:'',
                search:'',
                id:''
            }
        },
        mounted(){
            this.getTableList();
        },
        methods:{
            getRowClass({row, column, rowIndex}) {
                if (rowIndex === 0) {
                    return 'background:#f7f9fc;color:#8F9BB3;text-align:center;font-size:14px;font-weight:Medium;height:48px;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            handleSizeChange1(p) { // 每页条数切换
                this.p = p;
                console.log(this.p);
                this.getTableList();
            },
            handleCurrentChange1(page) {//页码切换
                // console.log(p);
                this.page = page;
                this.getTableList();
            },
            getTableList(){
                let params ={p:this.p,page:this.page,search:this.search};
                this.api.standard_standards({params}).then((res)=>{
                    this.tableData = res.data;
                    this.total=res.total;
                    console.log(res)
                })
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            updata(file){
                console.log(file.file);
                this.file=file.file;
                let formData = new FormData;
                formData.append('file',this.file);
                 this.api.file_upload(formData).then((res)=>{
                     this.attach.name = res.name;
                     this.attach.size = res.size;
                     this.attach.md5 = res.md5;
                     this.attach.url = res.url;
                     this.attach.ext = res.ext;

                     console.log(res);

                 })
            },
            advertisingType(){
                this.api.config_position_type().then((res)=>{
                    this.oddType = res;
                    console.log(res)
                })
            },
            dataTypeList(){
                let params = {material:1};
                this.api.config_material_type({params}).then((res)=>{
                    console.log(res);
                    this.TypeDataList = res
                })
            },
            xz(index){
                this.url = this.tableData[index].attach_url;
                alert(this.url);
            },
            upload(){
                this.updataList=true;
                this.advertisingType();
                this.dataTypeList();
            },
            heid(){
                this.updataList=false;
            },
            AnewUpload(id){
                this.id = id
                this.updataList=true;
                this.advertisingType();
                this.dataTypeList();

            },
            setUpload(){
                if(!this.type){
                    this.$message('类型不能为空')
                }
                if(!this.pos_type){
                    this.$message('广告位不能为空')
                }
                if(!this.attach){
                    this.$message('请上传文件')
                }
                let formData = new FormData;
                formData.append('type',this.type);
                formData.append('pos_type',this.pos_type);
                formData.append('name',this.name);
                formData.append('attach',JSON.stringify(this.attach));
                formData.append('id',this.id);
                this.api.standar_edit(formData).then((res)=>{
                    console.log(res);
                    this.id='';
                    this.getTableList()
                })
            },
            addData(){
                if(this.id!=''){
                    this.setUpload();
                }else{
                    if(!this.type){
                        this.$message('类型不能为空')
                    }
                    if(!this.pos_type){
                        this.$message('广告位不能为空')
                    }
                    if(!this.name){
                        this.$message('规范名称不能为空')
                    }
                    if(!this.attach){
                        this.$message('请上传文件')
                    }
                    let formData = new FormData;
                    formData.append('type',this.type);
                    formData.append('pos_type',this.pos_type);
                    formData.append('attach',JSON.stringify(this.attach));
                    formData.append('name',this.name);
                    this.api.standard_add(formData).then((res)=>{
                       this.heid();
                        this.getTableList()
                    })
                }

            },
            delData(index){
                let formData = new FormData;
                formData.append('id',this.tableData[index].id);
                this.api.standard_del(formData).then((res)=>{
                    this.getTableList()
                })
            }
        },
    }
</script>

<style scoped>
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9999;
        bottom: 0;
        right: 0;
    }
    .con{
        position: absolute;
        width:560px;
        height:365px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        top:30%;
        left: 50%;
        transform: translate(-50%,-50%);
        overflow-y: auto;
    }
    .ss img{
        width: 26px;
        height: 26px;
        cursor: pointer;
        position: relative;
        right: -30px;
        top: 8px;
    }
    .ss{
        margin-bottom: 24px;
    }
    .ss input{
        width:374px;
        height:36px;
        padding-left: 30px;
        background:rgba(255,255,255,1);
        border-radius:4px 0px 0px 4px;
        border:1px solid rgba(211,219,235,1);
        margin-top: 24px;
    }
    .ss span{
        float: right;
        display: inline-block;
        width:88px;
        height:36px;
        background:rgba(242,246,252,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(61,73,102,1);
        text-align: center;
        line-height: 36px;
        margin-right: 24px;
        margin-top: 24px;
        cursor: pointer;
    }
    .table_content{
        padding: 0 24px;
    }
    .tit_sm{
        height: 56px;
        border-bottom: 1px solid #E6E9F0;
    }
    .tit_sm span{
        display: inline-block;
        text-align: center;
        line-height: 56px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-left: 24px;
    }
    .tit_sm img{
        width:16px;
        height:16px;
        position: relative;
        right: -430px;
        cursor: pointer;
    }
    .tit_txt{
        margin-top: 23px;
    }
    .tit_txt span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-left: 52px;
        vertical-align: top;
    }
    .up{
        display: inline-block;
        margin-left: 24px;
    }
    .select_btn, .gfName{
        margin-top: 30px;
    }
    .select_btn span,.gfName span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-left: 24px;
    }
    .select_btn select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-left: 24px;
    }
    .upload_btn{
        width:560px;
        text-align: right;
        position: fixed;
        bottom:24px;

    }
    .upload_btn span{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        line-height: 36px;
        text-align: center;
        margin-right: 24px;
        cursor: pointer;
    }
    .upload_btn_qd{
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
        margin-right: 14px!important;
    }
    .gfName input{
        width: 192px;
        height: 36px;
        padding-left: 8px;
        background: rgba(255,255,255,1);
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
        margin-left: 24px;
    }
    a{
        color: #3377ff;
        text-decoration:none;
        margin: 0 10px;
    }
</style>