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
                <span class="up_btn" @click="upImg">上传</span>
                <div class="up_btn_box" v-for="(item,index) in list">
                    <div class="up_btn_box_tit">
                        <span class="name">物料ID:</span>
                        <span class="con">{{item.temple_name}}</span>
                        <span class="name">数量:</span>
                        <span  class="con">{{list.length}}</span>
                        <span class="name">更新时间:</span>
                        <span  class="con">2019-02-08</span>
                        <span class="off_line">下线</span>
                    </div>
                    <div class="up_btn_box_tit">
                        <span class="name">状态:</span>
                        <span  class="con">{{item.status_name}}</span>
                        <span class="name">操作人员:</span>
                        <span  class="con">{{}}</span>
                    </div>
                    <div class="up_img">
                        <div class="up_add">
                            <!--<img class="add_img" src="../../../public/img/add_msg.png" />-->
                            <input type="file" @change="ADDimg(index)"/>
                        </div>
                        <div class="img_list" v-for="(da,ind) in item.images">
                            <img class="img_center" :src="da.url">
                            <img class="del" src="../../../public/img/del.png" style="width: 16px"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg" v-if="up">
            <div class="load_up">
                <div class="load_tit">
                    <span>上传文件</span>
                </div>
                <div>
                    <el-upload
                            class="upload-demo"
                            action="aaaa"
                            multiple
                            :limit="1"
                            :on-exceed="handleExceed"
                            :on-remove="handleRemove"
                            :http-request="beforupload"
                    >
                        <el-button size="small" type="primary">选择</el-button>
                    </el-upload>
                </div>
                <div class="btns">
                    <span class="tj">添加</span>
                    <span @click="heidTH()">取消</span>
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
                up:false,
                list:[],
                width:"",
                height:'',
            }
        },
        mounted(){
            this.getListData()
        },
        methods:{
            fh(){
                this.$router.go(-1);
            },
            upImg(){
                this.up = true
            },
            heidTH(){
                this.up = false
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
            handleRemove(file, fileList) {

            },
            beforupload(file){
                var reader = new FileReader();
                var _this=this;
                reader.readAsDataURL(file.file);
                reader.onload=function(theFile){
                    var image=new Image();
                    image.src=theFile.target.result;
                    image.onload = function() {
                        _this.width = image.width;
                        _this.height = image.height;
                        _this.create(file);
                    };
                };
            },
            create(file){
                let formData = new FormData;
                formData.append('pkg_name',this.$route.query.pkg_name);
                formData.append('file',file.file);
                formData.append('width',this.width);
                formData.append('height',this.height);
                this.api.appad_new(formData).then((res)=>{
                    this.getListData();
                    this.heidTH();
                })
            },
            ADDimg(index,file){
                var reader = new FileReader();
                var _this=this;
                reader.readAsDataURL(file.file);
                reader.onload=function(theFile){
                    var image=new Image();
                    image.src=theFile.target.result;
                    image.onload = function() {
                        _this.width = image.width;
                        _this.height = image.height;
                        _this.up(index,file);
                    };
                };
            },
            up(index,file){
                let formData = new FormData;
                formData.append('temple_name',this.list[index].temple_name);
                formData.append('pkg_name',this.$route.query.pkg_name);
                formData.append('route',this.list[index].route);
                formData.append('file',file.file);
                formData.append('')
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
    height: 100%;
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
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    .up_img{
        overflow-y: auto;
    }
    .up_img,.up_add{
        margin-bottom: 0!important;
    }
    .img_list{
        display: inline-block;
        text-align: center;
        position: relative;
        width: 150px;
        height: 220px;
        margin-right: 50px;
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
        text-align: center;
        margin-top: 30px;
    }
    .btns span{
        display: inline-block;
        width: 80px!important;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        border: 1px solid #c3c3c3;
        color: #9c9c9c;
        margin-right: 30px;
        text-align: center;

    }
    .tj{
        border: 0!important;
        background: #4f4cf1!important;
        color: #fff!important;
    }
    .upload-demo{
        width: 80px!important;

    }
    .upload-demo .el-upload{
        width: 80px!important;
    }
</style>