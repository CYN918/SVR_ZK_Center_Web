<template>
    <div>
        <div class="bg">
            <div class="AddIMG">
                <div class="AddIMG_tit">
                    <span>添加素材</span>
                </div>
                <div class="AddIMG_content">
                    <div class="AddIMG_content_left">
                        <div>
                            <span>素材预览图</span>
                        </div>
                        <div class="AddIMG_box">
                            <img />
                        </div>
                        <div>
                            <span></span>
                        </div>
                        <div>
                            <span>上传预览图</span>
                        </div>
                        <div class="AddIMG_box">
                            <img/>
                        </div>
                    </div>
                    <div class="AddIMG_content_right">
                        <div class="AddIMG_input">
                            <span class="tit">附件:</span>
                            <!--<span class="AddIMG_input_box">上传</span>-->
                            <!--<input type="file" />-->
                            <div class="AddIMG_input_box">
                                <el-upload
                                        class="upload-demo"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :on-change="handleChange"
                                        :file-list="fileList">
                                    <el-button size="small" type="primary">上传</el-button>
                                </el-upload>
                            </div>
                            <img src="../../../public/img/msg.png" @click="showHint"/>
                        </div>
                        <div class="AddIMG_sc">
                            <span class="tit">绑定素材:</span>
                            <input type="text" placeholder="请输入素材ID"/>
                            <span class="AddIMG_sc_btn" @click="XSset">从素材库选择</span>
                            <input type="checkbox" class="AddIMG_sc_cjeckbox"/><span>与素材库内已有素材无关</span>
                            <p>若由素材库内文件处理后上传，必须填写对应的素材ID，仅可填写一个</p>
                        </div>
                        <div class="AddIMG_zp">
                            <span class="tit">绑定设计师作品:</span>
                            <input type="text" class="AddIMG_zp_text"/>
                            <input type="checkbox" class="AddIMG_sc_cjeckbox"/>
                            <span>与设计师无关</span>
                            <p>由设计师站获得的素材，必须填写对应的作品ID</p>
                        </div>
                        <div class="AddIMG_select">
                            <span class="tit">素材类型:</span>
                            <select>
                                <option>广告图</option>
                            </select>
                        </div>
                        <div class="AddIMG_switch">
                            <span  class="tit">是否启用:</span>
                            <el-switch
                                        v-model="value2"
                                        active-color="#409EFF"
                                        inactive-color="#ff4949">
                            </el-switch>
                        </div>
                        <div class="AddIMG_yl">
                            <span class="tit">尺寸:</span>
                            <span class="AddIMG_yl_size"></span>
                            <!--<div class="AddIMG_yl_upload"><span>上传预览图</span></div>-->
                            <!--<input type="file"/>-->
                            <div class="AddIMG_yl_upload">
                                <el-upload
                                        class="upload-demo"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :on-change="handleChange"
                                        :file-list="fileList">
                                    <el-button size="small" type="primary">上传预览图</el-button>
                                </el-upload>
                            </div>
                        </div>
                        <div class="AddIMG_bq">
                            <span class="tit">选择标签:</span>
                            <div class="AddIMG_bq_box">
                                <div class="AddIMG_bq_box_top">
                                    <div class="AddIMG_bq_box_top_tit">预置标签:</div>
                                    <div class="AddIMG_bq_box_top_bq">
                                        <span class="bq">aaaaaa</span>
                                    </div>
                                </div>
                                <div class="AddIMG_bq_box_bottom">
                                    <div class="AddIMG_bq_box_top_tit">预置标签:<input type="text" placeholder="请输入标签"/></div>
                                    <div class="AddIMG_bq_box_top_zdy">
                                        <span class="bq">aaaaaa</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg_btn">
                    <span class="bg_btn_up">上传</span>
                    <span @click="heidSc">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "content_component",
        data(){
            return {
                               value2:true
            }
        },
        mounted(){},
        methods:{
            heidSc(){
                this.$parent.heidSc()
            },
            showHint(){
                this.$parent.ShowHint()
            },
            XSset(){
                this.$parent.XSset()
            },
        }
    }
</script>

<style scoped>
input{
    margin-left: 0;
    width: 226px;
}

.bg{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    position: fixed;
    z-index: 9;
    bottom: 0;
    right: 0;
}
.AddIMG{
    position: absolute;
    left: 50%;
    top:15px;
    transform: translateX(-50%);
    width:1177px;
    min-height:903px;
    background:rgba(255,255,255,1);
    border-radius:5px;
}
.AddIMG_tit{
    text-align: center;
    margin: 20px 0;

}
.AddIMG_tit span{
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
}
.AddIMG_content_right{
    display: inline-block;
}
.AddIMG_content_left{
    margin-left: 60px;
    display: inline-block;
    margin-right: 85px;
    vertical-align: top;
}
.AddIMG_content_left span,.AddIMG_content_right span{
    display: inline-block;
    margin-bottom: 20px;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
}
.AddIMG_content_right span{
    margin-bottom: 0px;
}
.AddIMG_box{
    width:141px;
    height:252px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(238,238,238,1);
    border-radius:5px;
    margin-left: 45px;

}
.AddIMG_input,.AddIMG_sc,.AddIMG_zp,.AddIMG_select,.AddIMG_switch,.AddIMG_yl{
    margin-bottom: 30px;
}
.AddIMG_input input{
    width:140px;
    height:50px;
    margin-left: 0;
    position: relative;
    left: -140px;
    padding: 0;
    opacity:0;
    top:-14px;
}
.AddIMG_input img{
    margin-left: 16px;
    vertical-align: middle;
    cursor: pointer;
}
.AddIMG_input_box{

    display: inline-block;
    width:140px;
    height:50px;
    background:rgba(19,159,248,1);
    border-radius:5px;
    text-align: center;
    line-height: 50px;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
}
.tit{
    display: inline-block;
    width:117px;
    margin-right: 16px;
    vertical-align: top;
}
.AddIMG_sc_cjeckbox{
    width: 14px;
    height: 14px;
    margin-right: 11px;
}
.AddIMG_sc_btn{
    display: inline-block;
    margin-left: 20px;
    margin-right: 21px;
    width:140px;
    height:50px;
    background:rgba(19,159,248,.1);
    border-radius:5px;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(19,159,248,1);
    text-align: center;
    line-height: 50px;
}
.AddIMG_sc p,.AddIMG_zp p ,.AddIMG_yl p,.AddIMG_input p{
    margin:10px 0 0 133px;
    padding: 0;
    font-size:12px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
}
.AddIMG_zp_text{
    margin-right: 21px;
}
.AddIMG_select select{
    width:242px;
    height:50px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(230,230,230,1);
    border-radius:5px;
}
.AddIMG_yl_size{
    display: inline-block;
    width: 226px;
    height: 50px;
    padding-left: 10px;
    border:1px solid rgba(230,230,230,1);
    border-radius:5px;
}
.AddIMG_yl input{
    width:125px;
    height:50px;
    position: relative;
    left: -140px;
    top:-35px;
    opacity: 0;
}
.AddIMG_yl_upload{
    display: inline-block;
    width:140px;
    height:50px;
    background:rgba(19,159,248,.1);
    border-radius:5px;
    text-align: center;
    vertical-align: top;
    margin-left: 20px;
}
.AddIMG_yl_upload>span{
    display: inline-block;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(19,159,248,1);
    line-height: 50px;
}
.AddIMG_bq_box{
    display: inline-block;
    width:655px;
    height:240px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(230,230,230,1);
    border-radius:5px;
}
.AddIMG_bq_box_top{
    border-bottom: 1px solid rgba(230,230,230,1);
}
.AddIMG_bq_box_top_tit{
    margin: 17px 0 15px 17px;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
}
.AddIMG_bq_box_top_bq,.AddIMG_bq_box_top_zdy{
    margin:0 20px 0px 20px ;
}
.bq{
    display: inline-block;
    padding: 5px 10px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(153,153,153,1);
    border-radius:5px;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
    margin-right: 17px;
    margin-bottom: 10px!important;
}
.AddIMG_bq_box_top_zdy{
    width: 638px;
    height: 80px;
    overflow-y: auto;
}
.AddIMG_bq_box_top_tit input{
    float: right;
    margin-right: 10px;
    width:91px;
    height:26px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(220,220,220,1);
    border-radius:5px;
}
.bg_btn{
    text-align: center;
    margin: 40px 0;
}
.bg_btn span{
    display: inline-block;

    width:140px;
    height:50px;
    border:1px solid rgba(153,153,153,1);
    border-radius:5px;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
    line-height: 50px;
}
.bg_btn_up{
    border:0!important;
    background:rgba(19,159,248,1);
    color:rgba(255,255,255,1)!important;
    margin-right: 40px;
}
</style>