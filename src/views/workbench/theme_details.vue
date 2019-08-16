<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh()">官方物料投放库 &nbsp;/</span>
                <span class="new_url"> &nbsp;投放库详情</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">投放库详情</span>
            </div>
        </div>
        <div class="content_table">
            <div class="content_table_tit">
               <span>内容详情</span>
            </div>
            <div class="content_table_tit1">
                <div>
                    <span class="name">包名:</span>
                    <span>{{this.$route.query.pkg_name}}</span>
                </div>
                <div>
                    <span class="name">请求量:</span>
                    <span>{{this.$route.query.fill}}</span>
                </div>

            </div>
            <div class="content_table_tit2">
                <!--<div>-->
                    <!--<span class="name">获取内容时间:</span>-->
                    <!--<span>2019-07-8</span>-->
                <!--</div>-->
                <div>
                    <span class="name">展示量:</span>
                    <span>{{this.$route.query.req}}</span>
                </div>
            </div>
            <div class="line_border"></div>
            <div>
                <span class="list_tit">物料列表</span>
                <span class="up_btn" @click="create()">新增</span>
                <div class="up_btn_box" v-for="(item,index) in list">
                    <div class="up_btn_box_tit">
                        <span class="name">物料ID:</span>
                        <span class="con">{{item.temple_name}}</span>
                        <span class="name">数量:</span>
                        <span  class="con">{{list[index].images.length}}</span>
                        <span class="name">更新时间:</span>
                        <span  class="con">{{item.updated_at}}</span>
                        <span class="off_line" @click="oFFline(index,0)" v-if="item.status==1">下线</span>
                        <span class="off_line" @click="oFFline(index,1)" v-if="item.status==0">上线</span>
                    </div>
                    <div class="up_btn_box_tit">
                        <span class="name">状态:</span>
                        <span  class="con">{{item.status_name}}</span>
                        <span class="name">操作人员:</span>
                        <span  class="con">{{item.updator}}</span>
                    </div>
                    <div class="up_img">
                        <div class="up_add" @click="show(index)">
                            <input type="text"/>
                        </div>
                        <div v-for="(da,ind) in item.images" style="display: inline-block; margin-right: 50px;">
                            <div class="img_list">
                                <img class="img_center" :src="da.url">
                                <img class="del" src="../../../public/img/del.png" style="width: 16px;opacity: 0" />
                            </div>
                            <div style="margin-top: 10px;text-align: center">
                                <span >{{da.width}}*{{da.height}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="bg" v-if="up">-->
            <!--<div class="load_up">-->
                <!--<div class="load_tit">-->
                    <!--<span>新增文件</span>-->
                <!--</div>-->
                <!--<div>-->
                    <!--<el-upload-->
                            <!--class="upload-demo"-->
                            <!--action="aaaa"-->
                            <!--multiple-->
                            <!--:limit="1"-->
                            <!--:on-exceed="handleExceed"-->
                            <!--:on-remove="handleRemove"-->
                            <!--:http-request="beforupload"-->
                            <!--:before-upload="beforeAvatarUpload"-->
                    <!--&gt;-->
                        <!--<el-button size="small" type="primary">选择</el-button>-->
                    <!--</el-upload>-->
                <!--</div>-->
                <!--<div class="btns">-->
                    <!--&lt;!&ndash;<span class="tj">添加</span>&ndash;&gt;-->
                    <!--<span @click="heidTH()">取消</span>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <div class="bg" v-if="uploadImg">
            <div class="load_up">
                <div class="load_tit">
                    <span>上传文件</span>
                </div>
                <div>
                    <el-upload
                            class="upload-demo"
                            drag
                            action="aaaa"
                            :limit="5"
                            :on-exceed="handleExceeds"
                            :on-remove="handleRemove"
                            :http-request="ADDimg"
                            :before-upload="beforeAvatarUpload"
                            :file-list="fileList"
                            multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>

                    </el-upload>
                    <!--<el-upload-->
                            <!--class="upload-demo"-->
                            <!--action="aaaa"-->
                            <!--multiple-->
                            <!--:limit="5"-->
                            <!--:on-exceed="handleExceeds"-->
                            <!--:on-remove="handleRemove"-->
                            <!--:http-request="ADDimg"-->
                            <!--:before-upload="beforeAvatarUpload"-->
                            <!--:file-list="fileList"-->
                    <!--&gt;-->
                        <!--<el-button size="small" type="primary">选择</el-button>-->
                    <!--</el-upload>-->
                </div>
                <div class="btns">
                    <span class="tj" @click="heidADD()">确定</span>
                    <span @click="heidADD()">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "theme_details",
        data(){
            return{
                list:[],
                width:"",
                height:'',
                uploadImg:false,
                index:'',
                fileList:[],
            }
        },
        mounted(){
            this.getListData()
        },
        methods:{
            fh(){
                this.$router.go(-1);
            },

            show(index){
                this.uploadImg = true;
                this.index=index;
            },
            heidADD(){
                this.uploadImg = false;
                this.fileList=[];
            },
            getListData(){
                let params = {pkg_name:this.$route.query.pkg_name};
                this.api.appad_pkg({params}).then((res)=>{
                    this.list=res;
                })
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleExceeds(files, fileList) {
                this.$message.warning(`当前限制选择5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleRemove(file, fileList) {

            },
            // beforupload(file){
            //     var reader = new FileReader();
            //     var _this=this;
            //     reader.readAsDataURL(file.file);
            //     reader.onload=function(theFile){
            //         var image=new Image();
            //         image.src=theFile.target.result;
            //         image.onload = function() {
            //             _this.width = image.width;
            //             _this.height = image.height;
            //             _this.create(file);
            //         };
            //     };
            // },
            create(){
                let formData = new FormData;
                formData.append('pkg_name',this.$route.query.pkg_name);
                // formData.append('file',file.file);
                // formData.append('width',this.width);
                // formData.append('height',this.height);
                this.api.appad_new(formData).then((res)=>{
                    this.getListData();
                    this.heidTH();
                })
            },
            ADDimg(file){
                console.log(file);
                var reader = new FileReader();
                var _this=this;
                reader.readAsDataURL(file.file);
                reader.onload=function(theFile){
                    var image=new Image();
                    image.src=theFile.target.result;
                    image.onload = function() {
                        _this.width = image.width;
                        _this.height = image.height;
                        _this.ups(file);
                    };
                };
            },
            ups(file){
                console.log(file);
                let formData = new FormData;
                formData.append('temple_name',this.list[this.index].temple_name);
                formData.append('pkg_name',this.$route.query.pkg_name);
                formData.append('route',this.list[this.index].route);
                formData.append('file',file.file);
                formData.append('width',this.width);
                formData.append('height',this.height);
                this.api.appad_add(formData).then((res)=>{
                    if(!res){
                        this.fileList.push(file.file)
                    }
                    this.getListData();
                })
            },
            oFFline(index,num){
                let formData = new FormData;
                formData.append('temple_name',this.list[index].temple_name);
                formData.append('pkg_name',this.$route.query.pkg_name);
                formData.append('route',this.list[index].route);
                formData.append('valid',num);
                this.api.appad_online(formData).then((res)=>{
                    this.getListData();
                })
            },
            // del(index,ind){
            //     let formData = new FormData;
            //     formData.append('temple_name',this.list[index].temple_name);
            //     formData.append('pkg_name',this.$route.query.pkg_name);
            //     formData.append('route',this.list[index].route);
            //     formData.append('width',this.list[index].images[ind].width);
            //     formData.append('height',this.list[index].images[ind].height);
            //     this.api.appad_del(formData).then((res)=>{
            //         this.getListData();
            //     })
            // },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';

                if (!isJPG) {
                    this.$message.error('只支持JPG格式!');
                }
                return  isJPG ;
            },
        },
    }
</script>

<style scoped>
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 999;
    }
.top{
    width: 100%;
    height: 112px;
    background: rgba(255,255,255,1);
    position: fixed;
    left: 256px;
    top: 64px;
    z-index: 99;
}
.content_table{
    margin-top:200px;
    padding: 0 24px;
    background:rgba(255,255,255,1);
    min-height: 900px;
}
.content_table_tit{
    margin-bottom: 15px;
}
    .content_table_tit span,.list_tit{
        display: inline-block;
        margin-top: 24px;
        font-family: "Microsoft YaHei";
        font-size: 16px;
        font-weight: bold;
    }
    .content_table_tit1{
        margin-right: 200px;
    }
    .content_table_tit1,.content_table_tit2{
        display: inline-block;
    }
    .content_table_tit1 .name{
        display: inline-block;
        width: 60px;
        text-align: right;
        margin-right: 20px;
    }
    .content_table_tit2 .name,.up_btn_box .name{
        display: inline-block;
        text-align: left;
        margin-right: 20px;
    }
    .content_table_tit1 div, .content_table_tit2 div{
     margin-bottom: 20px;
    }
    .line_border{
        border-bottom: 1px solid #ddd;
    }
    .up_btn{
        display: inline-block;
        border-radius: 5px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        font-size: 14px!important;
        font-weight: normal!important;
        background:#4f4cf1;
        color: #fff;
        cursor: pointer;
        width: 80px;
        float: right;
        margin-top: 15px!important;
        margin-right: 40px;
    }
    .up_btn_box{
        border: 1px solid #ddd;
        margin-top: 24px;
        padding: 20px 40px;
    }
    .up_btn_box_tit{
        margin-bottom: 24px;
    }
    .off_line{
        display: inline-block;
        width: 80px;
        text-align: center;
        height: 36px;
        line-height: 36px;
        border-radius: 5px;
        cursor: pointer;
        border: 1px solid #ddd;
        float: right;
        font-size: 14px;
    }
    .up_btn_box .name{
        width: 70px;
    }
    .con{
        display: inline-block;
        margin-right: 50px;
        width: 200px;
    }
    .up_add{
        display: inline-block;
        width: 150px;
        height: 220px;
        background: #ddd;
        text-align: center;
        background-image: url("../../../public/img/add_msg.png");
        background-repeat:no-repeat;
        background-position:center;
        margin-right: 50px;
        position: relative;
        cursor: pointer;
    }
    /*.add_img{*/
        /*display: inline-block;*/
        /*position: relative;*/
        /*top:50%;*/
        /*transform: translateY(-50%);*/
    /*}*/
    .up_add input{
        position: absolute;
        top:0;
        left: 0;
        width: 100%!important;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    }
    /*.up_add  .el-upload {*/
        /*width: 100%!important;*/
        /*height: 100%;*/
    /*}*/
    /*.up_img{*/
        /*overflow-y: auto;*/
    /*}*/
    /*.up_img,.up_add{*/
        /*margin-bottom: 0!important;*/
    /*}*/
    .up_add{
        vertical-align: top;
    }
    .img_list{
        display: inline-block;
        text-align: center;
        position: relative;
        width: 150px;
        height: 220px;
        border: 1px solid #ddd;
    }
    .del{
       position: absolute;
        top:0;
        right: 0;
    }
    .img_center{
       position: relative;
        top:50%;
        transform: translateY(-50%);
        max-width: 150px;
        max-height: 220px;
    }
    .load_up{
        border-radius: 10px;
        width: 500px;
        min-height: 270px;
        position: relative;
        background: #fff;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
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
    .load_up div{
        margin:15px 24px 0 24px
    }
    .text_tit span{
        display: inline-block;
        margin-right: 15px;
        font-size: 16px;
        color: #666666;
        width: 80px;
    }
    .text_tit input{
        width: 200px;
        height: 36px;
        padding:0 8px ;
        margin-right: 15px;
    }
    .btns{
        text-align: right;
        width: 100%;
        margin-top: 30px;
        margin-bottom: 24px;
        margin-left: 0!important;
    }
    .btns span{
        display: inline-block;
        width: 80px!important;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        border: 1px solid #c3c3c3;
        color: #9c9c9c;
        margin-right: 70px;
        text-align: center;
        border-radius: 5px;
        margin-bottom: 15px;

    }
    .tj{
        margin-right:24px!important;
        border: 0!important;
        background: #4f4cf1!important;
        color: #fff!important;
    }
    .upload-demo{
        text-align: center;

    }
    .upload-demo .el-upload{
        width: 80px!important;
    }
</style>