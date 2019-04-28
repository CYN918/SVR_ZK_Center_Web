<template>
    <div class="centNavBox">
        <div class="title">
            <div class="title_ss">
                <input type="text" placeholder="搜索关键词"/>
                <div>
                    <img src="../../../public/img/ss.png"/>
                </div>

            </div>
            <div class="title_tj" @click="submit">
                <span>提交反馈</span>
            </div>
        </div>
        <div>
            <el-table
                    :data="listData"
                    style="width: 100%"
                    header-align="center"
                    :header-cell-style="getRowClass"
                    :cell-style="cell"
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    border
            >
                <el-table-column
                        prop="user.email"
                        label="用户账号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="user.user_name"
                        label="用户名"
                >
                </el-table-column>
                <el-table-column
                        prop="fd_type"
                        label="问题类型"

                >
                </el-table-column>
                <el-table-column
                        prop="fd_desc"
                        label="问题描述"
                >
                </el-table-column>
                <el-table-column
                        prop="created_at"
                        label="提交时间"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="particulars(scope.row.fd_id)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-if="submitter">
            <div class="tijiao">
                <div class="content">
                    <div class="title_name">
                        <span>意见反馈</span>
                    </div>
                    <div class="selece_type">
                        <span class="txt">问题类型</span>
                        <select v-model="type">
                            <option :value="item.fd_type" v-for="(item,index) in types">{{item.fd_type}}</option>
                        </select>
                    </div>
                    <div class="input_type">
                        <span class="txt txt_top">问题描述</span>
                        <el-input
                                type="textarea"
                                :rows="9"
                                placeholder="请输入内容,最多输入300个字"
                                maxlength="300"
                                v-model="desc">
                        </el-input>
                    </div>
                    <div class="text_name">
                        <span class="txt">上传截图</span>
                        <span class="txt_1">最多可上传3张，单张大小不超过2M</span>
                    </div>
                    <div class="box_uploading">
                        <el-upload class="up"
                                   action="http://ts-designer.idatachain.cn/Api/Upload/uploadFile"
                                   list-type="picture-card"
                                   :on-remove="handleRemove"
                                   accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                                   :show-file-list="true"
                                   :on-success="handleAvatarSuccess"
                                   :before-upload="beforeAvatarUpload"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                    <div class="btn_tj">
                        <span class="tj" @click.once="ADDTj">提交</span>
                        <span class="qx" @click="qx">取消</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "feedback",
        data(){
            return {
                submitter:false,
                types:[],
                dialogImageUrl: '',
                dialogVisible: false,
                type:'',
                desc:'',
                imgurl:'',
                pics:[],
                listData:[
                    {

                    }
                ],
            }
        },
        mounted(){
            this.getList();
        },
        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(242,242,242,1);color:rgba(54,54,54,1);text-align:center;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;'
            },
            getList(){
                this.api.feedback_list().then((res)=>{
                    this.listData = res
                })
            },
            particulars(id){
                this.$router.push({
                    path:'/userinfo/details',
                    query: {
                        fd_id:id
                    },
                })
            },

            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG&&!isPNG) {
                    this.$message.error('上传预览图片只能是 JPG 或PNG格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传预览图片大小不能超过 2MB!');
                }
                return isPNG || isJPG && isLt2M ;
            },
            handleAvatarSuccess(response, file, fileList)
            {
                this.imgurl = response.content.file.url;
                this.pics.push(response.content.file.url) ;
                console.log(this.pics)
            },

            handleRemove(file, fileList)
            {
                this.pics.pop(this.imgurl);
                console.log(this.imageUrl)
            },

            submit(){
                this.submitter = true;
                this.getTypes()
            },
            qx(){
                this.submitter = false;
            },
            getTypes(){
                this.api.feedback_type({}).then((res)=>{
                    this.types = res
                })
            },
            ADDTj(){
                this.api.feedback_add({type:this.type,desc:this.desc,pics:this.pics}).then((res)=>{
                        this.submitter = false;
                })
            },
        }
    }
</script>

<style scoped>
.title{
    margin-bottom: 32px;
}
.title_ss{
    display: inline-block;
}
.title_ss>input{
    width:585px;
    height:48px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(230,230,230,1);
    box-shadow:0px 0px 8px 0px rgba(51,51,51,0.16);
    opacity:0.5;
    border-radius:5px;
    margin-left: 0;
}
.title_ss>div{
    width: 28px;
    height: 28px;
    display: inline-block;
    position: relative;
    right: 40px;
    top:10px;
}

.title_tj{
    float: right;
    text-align: center;
}
.title_tj>span{
    display: block;
    width:140px;
    height:48px;
    line-height: 48px;
    background:rgba(19,159,248,1);
    box-shadow:0px 0px 10px 0px rgba(153,153,153,0.14);
    border-radius:5px;
    color: #FFF;
    cursor: pointer;
    font-size:14px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
}
.tijiao{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    position: fixed;
    z-index: 9;
    top: 65px;
    left: 316px;
    bottom: 0;
    right: 0;
}
.content{
    position: absolute;
    top: 50%;
    left: 44%;
    padding: 30px 80px 0;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background: rgba(255,255,255,1);
    -webkit-box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    overflow-y: auto;
    border-radius: 8px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 33%!important;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.title_name{
    text-align: center;
    margin-bottom: 48px;
}
.title_name>span{
    display: inline-block;
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
}
.selece_type,.input_type,.text_name,.box_uploading{
    margin-left: 30px;
    margin-bottom: 30px;
}
.box_uploading{
    width:100% ;
    overflow: hidden;
    height: 250px;
}
.input_type{
    width: 810px;
}
.input_type>textarea{
    display: inline-block!important;
    width:726px;
    height:194px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(210,210,210,1);
    border-radius:5px;
}
.txt{
    display: inline-block;
    margin-right: 30px;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
}
.txt_top{
    vertical-align:top;
}
.selece_type>select{
    width:339px;
    height:50px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(210,210,210,1);
    border-radius:5px;
}
.txt_1{
    color: #ddd;
}
.btn_tj{
    text-align: center;
    margin-bottom: 50px;
}
.tj,.qx{
    display: inline-block;
    line-height: 40px;
    width:140px;
    height:40px;
    border-radius:5px;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
}
.tj{
    color:rgba(255,255,255,1);
    background:rgba(19,159,248,1);
    margin-right: 40px;
}
.qx{
    color:rgba(51,51,51,1);
    border:1px solid rgba(153,153,153,1);
}
.up{
    width: 726px;
    height: 217px;
    overflow: hidden;
    padding-left: 94px;
}


</style>