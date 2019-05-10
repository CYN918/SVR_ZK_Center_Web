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
                            <img :src="scUrl"/>
                        </div>
                        <div class="AddIMG_box_txt">
                            <span>{{bind_mid}}</span>
                        </div>
                        <div>
                            <span>上传预览图</span>
                        </div>
                        <div class="AddIMG_box">
                            <img :src="prev_uri"/>
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
                                        :limit="1"
                                        :on-exceed="handleExceed"
                                        :on-remove="handleRemove"
                                        :http-request="uploadF"
                                        action="111"
                                        >
                                    <el-button size="small" type="primary">上传</el-button>
                                </el-upload>
                            </div>
                            <img src="../../../public/img/msg.png" @click="showHint"/>
                        </div>
                        <div class="AddIMG_sc">
                            <span class="tit">绑定素材:</span>
                            <input type="text" placeholder="请输入素材ID" v-model="bind_mid"/>
                            <span class="AddIMG_sc_btn" @click="XSset" :class="{AddIMG_sc_btn_jy:(this.message.mid!=undefined)}">从素材库选择</span>
                            <input type="checkbox" class="AddIMG_sc_cjeckbox"/><span>与素材库内已有素材无关</span>
                            <p>若由素材库内文件处理后上传，必须填写对应的素材ID，仅可填写一个</p>
                        </div>
                        <div class="AddIMG_zp">
                            <span class="tit">绑定设计师作品:</span>
                            <input type="text" class="AddIMG_zp_text" v-model="bind_workid"/>
                            <input type="checkbox" class="AddIMG_sc_cjeckbox"/>
                            <span>与设计师无关</span>
                            <p>由设计师站获得的素材，必须填写对应的作品ID</p>
                        </div>
                        <div class="AddIMG_select">
                            <span class="tit">素材类型:</span>
                            <select v-model="type">
                                <option :value="item.type" v-for="item in scType">{{item.name}}</option>
                            </select>
                        </div>
                        <div class="AddIMG_switch" v-if="sw">
                            <span  class="tit">是否启用:</span>
                            <el-switch
                                        v-model="value2"
                                        active-color="#409EFF"
                                        inactive-color="#ff4949">
                            </el-switch>
                        </div>
                        <div class="AddIMG_yl">
                            <span class="tit">尺寸:</span>
                            <span class="AddIMG_yl_size" v-model="sjSize">{{sjSize}}</span>
                            <!--<div class="AddIMG_yl_upload"><span>上传预览图</span></div>-->
                            <!--<input type="file"/>-->
                            <div class="AddIMG_yl_upload">
                                <el-upload
                                        :limit="1"
                                        :on-exceed="handleExceed"
                                        :http-request="uploadFile"
                                        :on-remove="Remove"
                                        class="upload-demo"
                                        action="111"
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
                                        <!--<span class="bq" v-for="(item,index) in preset_tags">{{item.name}}</span>-->
                                        <template>
                                            <el-checkbox-group
                                                    v-model="preinstall">
                                                <el-checkbox v-for="(item,index) in preset_tags" :label="item.name" >{{item.name}}</el-checkbox>
                                            </el-checkbox-group>
                                        </template>
                                    </div>
                                </div>
                                <div class="AddIMG_bq_box_bottom">
                                    <div class="AddIMG_bq_box_top_tit">个性标签:<input type="text" placeholder="请输入标签"/></div>
                                    <div class="AddIMG_bq_box_top_bq">
                                        <template>
                                            <el-checkbox-group
                                                    v-model="bardian">
                                                <el-checkbox v-for="(item,index) in self_tags" :label="item.name">{{item.name}}</el-checkbox>
                                            </el-checkbox-group>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg_btn">
                    <span class="bg_btn_up" @click="AddMatter">上传</span>
                    <span @click="heidSc">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['message','bindMid','hqUrl','material'],
        name: "content_component",
        data(){
            return {
                preinstall:[],
                bardian:[],
                value2:true,
                fileList:[],
                prev_uri:'',
                attach:{
                    name:'',
                    url:'',
                    size:'',
                    ext:'',
                    md5:''
                },
                bind_mid:'',
                bind_workid:'',
                self_tags:[],
                tags:[],
                sjSize:'',
                preset:[0,1],
                preset_tags:[],
                type:'',
                sw:false,
                size:'',
                scUrl:'',
                scType:'',
        }
        },
        mounted(){
            this.getTagsList();
            console.log(this.bindMid);
            console.log(this.url);
            if(this.message.mid!=undefined){
                this.getMatterDetails();
            }
            if(this.bindMid!=undefined){
                this.bind_mid=this.bindMid;
                this.scUrl=this.hqUrl;
            }

        },
        methods:{

            heidSc(){
                this.$parent.heidSc()
            },
            showHint(){
                this.$parent.ShowHint()
            },
            XSset(){
                if(this.message.mid!=undefined){
                    return
                }
                this.$parent.XSset()
            },
            uploadF(file){
               let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    this.attach.name = res.name;
                    this.attach.size = res.size;
                    this.attach.ext = res.ext;
                    this.attach.md5 = res.md5;
                    this.attach.url = res.url;
                })
            },
            getType(){
                let params={material:this.material}
                this.api.config_material_type({params}).then((res)=>{
                    this.scType=res;
                })
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleRemove(file, fileList) {
                this.file = '';
            },
            Remove(file, fileList) {
                this.file = '';
            },
            uploadFile(file){
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    this.prev_uri = res.url
                    this.sjSize = res.size;
                })
            },
            getTagsList(){
                let params = {preset:this.preset};
                this.api.tags_search({params}).then((da)=>{
                    console.log(da);
                    this.preset_tags = da.data.preset_tags;
                    this.self_tags = da.data.self_tags;
                    this. getType();
                })
            },
            AddMatter(){
                let formData = new FormData;
                formData.append('type',this.type);
                formData.append('status',(this.value2==true?1:0));
                formData.append('prev_uri',this.prev_uri);
                formData.append('attach',JSON.stringify(this.attach));
                formData.append('tags',this.preinstall);
                formData.append('self_tags',this.bardian);
                formData.append('bind_mid',this.bind_mid)
                formData.append('bind_workid',this.bind_workid)
                formData.append('size',this.sjSize)
                this.api.material_add(formData).then((res)=>{

                }).catch(this.$message(message))
            },
            getMatterDetails(){
                let params ={mid:this.message.mid};
                this.api.material_detail({params}).then((res)=>{
                    this.sw=true;
                    this.prev_uri=res.prev_uri;
                    this.preinstall=res.tags;
                    this.bardian=res.self_tags;
                    this.sjSize=res.size;
                    this.type=res.type;
                    if(res.status==1201){
                        this.value2=false;
                    }else{
                        this.value2=true;
                    }
                    console.log(this.preinstall)
                })
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
.AddIMG_content_left img{
    width: 100%;
    height: 100%;
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
.AddIMG_box_txt{
    margin-left: 45px;
    width:141px;
    text-align: center;
    margin-top: 19px;
}
.AddIMG_box_txt span{
    display: inline-block;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
    background:rgba(0,153,255,.1);
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
.AddIMG_sc_btn_jy{
    background:rgba(153,153,153,1)!important;
    color:rgba(255,255,255,1)!important;
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