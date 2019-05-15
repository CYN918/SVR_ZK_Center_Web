<template>
    <div class="bg">
        <div class="content">
            <div class="tit">
                <span>编辑标签</span>
            </div>
            <div class="AddIMG_bq">
                <div class="AddIMG_bq_boxs">
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
                        <div class="AddIMG_bq_box_top_tit">个性标签:
                            <input type="text" placeholder="创建或搜索个性标签" v-model="tagsName" @input="getTagsList()"/>
                        </div>
                        <div class="AddIMG_bq_box_top_bq AddIMG_bq_box_top_zdy">
                            <span class="CJ" v-if="tagsName!=''" @click="ADDtags()">创建“{{tagsName}}”标签</span>
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
</template>

<script>
    export default {
        props:['message','material','typeSC'],
        name: "tag",
        data(){
            return{
                preset_tags:[],
                self_tags:[],
                preset:[0,1],
                preinstall:[],
                bardian:[],
                tagsName:'',
            }
        },
        mounted(){this. getTagsList()},
        methods:{
            QXtag(){
                this.$parent.YCtag()
            },
            getTagsList(){
                let params = {preset:this.preset,material:this.material,type:this.typeSC,search:this.tagsName,p:50,page:1};
                this.api.tags_search({params}).then((da)=>{
                    console.log(da);
                    this.preset_tags = da.data.preset_tags;
                    this.self_tags = da.data.self_tags;
                    this.getMatterDetails();
                })
            },
            ADDtags(){
                let formData = new FormData;
                formData.append('name',this.tagsName);
                formData.append('preset',0);
                formData.append('material',this.material);
                formData.append('type',this.typeSC);
                this.api.tags_add(formData).then((res)=>{
                    this.tagsName=''
                    this. getTagsList();
                })
            },
            getMatterDetails(){
                let params ={mid:this.message.mid};
                this.api.material_detail({params}).then((res)=>{
                    this.preinstall=res.tags;
                    this.bardian=res.self_tags;
                })
            },
        }

    }
</script>

<style scoped>
.bg{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    position: fixed;
    z-index: 9;
    bottom: 0;
    right: 0;
    }
.content{
    position: absolute;
    left: 50%;
    top:30%;
    transform:translate(-50%,-50%);
    width:775px;
    height:498px;
    background:rgba(255,255,255,1);
    border-radius:5px;
}
.tit{text-align: center;margin: 39px 0 30px 0}
.tit span{
    display: inline-block;
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
}
.title{
    margin: 0 60px;
}
.title_1 span{
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
}

.btn{
    text-align: center;
}
.btn span{
    display: inline-block;
    width:140px;
    height:50px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(153,153,153,1);
    border-radius:5px;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
    line-height: 50px;
    cursor: pointer;
}
.btn_bc{
    border: 0!important;
    background:rgba(19,159,248,1)!important;
    color:rgba(255,255,255,1)!important;
    margin-right: 40px;
}


.AddIMG_bq_boxs{
    width: 740px;
    height: 100%;
    margin: 0 30px;
}
.AddIMG_bq_box_top{
    border-bottom: 1px solid rgba(230,230,230,1);
    overflow-y: auto;
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


.AddIMG_bq_box_top_tit input{
    float: right;
    margin-right: 10px;
    width:91px;
    height:26px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(220,220,220,1);
    border-radius:5px;
    padding-right: 25px;
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
.ADDtag{
    display: inline-block;
    line-height: 26px;
    text-align: center;
    width: 25px;
    height: 26px;
    color: #fff;
    border: 1px solid #cfcfcf;
    float: right;
    background: #d1d1d1;
    position: relative;
    left: 162px;
    top:1px;
    border-radius: 5px;
    cursor: pointer;
}




.AddIMG_bq_box{
    display: inline-block;
    width:395px;
    height:258px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    overflow-y: auto;
}
.AddIMG_bq_box_top{
    border-bottom: 1px solid rgba(230,230,230,1);
}
.AddIMG_bq_box_top_tit{
    margin: 14px 0 14px 14px;
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(143,155,179,1);
}
.AddIMG_bq_box_top_bq,.AddIMG_bq_box_top_zdy{
    margin:0 20px 0px 20px ;

}


.AddIMG_bq_box_top_tit input{
    display: block;
    width:326px;
    height:28px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    margin-top: 10px;
}
.bg_btn{

    margin: 40px 0;
}
.bg_btn span{
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
}
.bg_btn_up{
    border:0!important;
    background:rgba(51,119,255,1)!important;
    color:rgba(255,255,255,1)!important;
    margin-right: 14px;
    margin-left: 133px;
}
.CJ{
    display: inline-block;
    line-height: 26px;
    text-align: center;
    cursor: pointer;
    padding: 3px 5px ;
    background: #d7d7d7;
    font-size: 12px;
    border-radius: 5px;
    margin-bottom: 10px!important;
}

</style>