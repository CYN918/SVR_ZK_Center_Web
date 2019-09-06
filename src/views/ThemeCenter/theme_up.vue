<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh()">主题库 &nbsp;/</span>
                <span class="new_url"> &nbsp;上传本地主题</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">上传本地主题</span>
            </div>
        </div>
        <div class="themeUp">
            <div class="themeUpLeft">
                <div>
                    <span>主题名称</span>
                    <input type="text" placeholder="给主题起个名字">
                </div>
                <div>
                    <span>主题包</span>
                    <div style="display: inline-block">
                        <div class="upBag">
                            <img src="../../../public/img/upbag.png"/>
                        </div>
                        <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="1"
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "theme_up",
        data(){
            return{}
        },
        methods:{
            fh(){
                this.$router.go(-1)
            },
        },
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height: 98px;
        background: rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
    }
    .themeUp{
        margin-top: 187px;
        background: #FFFFFF;
    }
    .themeUpLeft{
        display: inline-block;
        margin-left: 60px;
        margin-top: 26px;
    }
    .themeUpLeft>div{margin-bottom: 20px}
    .themeUpLeft>div>span{
        text-align: right;
        margin-right: 24px;
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        width: 60px;
    }
    .themeUpLeft>div>input{
        padding-left: 14px;
        width:706px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .upBag{
        display: inline-block;
        width:98px;
        height:98px;
        background:rgba(0,0,0,0.02);
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        text-align: center;
    }
    .upBag img{
        display: inline-block;
        width: 24px;
        height: 24px;
        position: relative;
        top:50%;
        transform: translateY(-50%);
    }

    .upload-demo .el-button {
        width:98px;
        height:98px;
        position: absolute;
        top:87px;
        /*opacity: 0;*/
    }
</style>