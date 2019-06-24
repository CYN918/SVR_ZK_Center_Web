<template>
    <div class="bg">
        <div class="content">
            <div class="box_img">
                <div>
                    <span>广告位示意图</span>
                </div>
                <img :src="url"/>
            </div>
            <div class="content_txt">
                <div class="title_txt">
                    <span>发布业务需求</span>
                </div>
                <div>
                    <span class="tit_txt">业务类型</span>
                    <select v-model="type">
                        <option value="" disabled selected>请选择</option>
                        <option v-for="(item,index) in YWtypeList" :value="item.type">{{item.name}}</option>
                    </select>
                    <span class="tit_txt right" v-if="this.type!='f_sls_lockscreen'">广告位类型</span>
                    <select v-model="typeIndex" @change="getTypeURL" v-if="this.type!='f_sls_lockscreen'" >
                        <option value="" disabled selected style="color: #8b9bb3">请选择</option>
                        <option v-for="(item,index) in typeList" :value="index">{{item.pos_type}}</option>
                    </select>
                </div>
                <div>
                    <span class="tit_txt">需求名称</span>
                    <input type="text" class="xqName" placeholder="请填写需求名称" v-model="demand_name"/>
                </div>
                <div>
                    <span class="tit_txt">尺寸</span>
                    <input class="num" type="text" placeholder="请输入尺寸，用*链接" v-model="size" v-if="switcher"/>
                    <select v-model="size" v-if="switcher==false" @change="cut()">
                        <option value="" disabled selected style="color: #8b9bb3">请选择</option>
                        <option value=" ">自定义</option>
                        <option v-for="(item,index) in sizeList" :value="item.size">{{item.size}}</option>
                    </select>
                    <span class="tit_txt right">优先级</span>
                    <select v-model="priority">
                        <option value="" disabled selected style="color: #8b9bb3">请选择</option>
                        <option value="高">高</option>
                        <option value="中">中</option>
                        <option value="低">低</option>
                    </select>
                </div>
                <div>
                    <span class="tit_txt">需求数量</span>
                    <input type="text" class="num" v-model="num" placeholder="请输入需求数量"/>
                    <span class="tit_txt right">实现方式</span>
                    <select v-model="model">
                        <option value="" disabled selected style="color: #8b9bb3">请选择</option>
                        <option value="无">无</option>
                        <option value="H5">H5</option>
                        <option value="脚本">脚本</option>
                    </select>
                </div>
                <div>
                    <span class="tit_txt" v-if="this.type!='f_sls_lockscreen'">投放链接</span>
                    <input type="text" class="link" v-model="link" v-if="this.type!='f_sls_lockscreen'" placeholder="用于填写直客广告投放链接，非必填"/>
                </div>
                <div v-if="this.type!='f_sls_lockscreen'">
                    <span class="tit_txt">投放库</span>
                    <span class="tfk">{{libraryName}}</span><span class="xz" @click="getlIBRARY">选择</span>
                </div>
                <div class="times">
                    <span class="tit_txt">截止时间</span>
                    <el-date-picker
                            v-model="endtime"
                            type="datetime"
                            placeholder="选择日期时间"
                            default-time="24:00:00"
                            format="yyyy 年 MM 月 dd 日 H 时 m 分 s 秒"
                            value-format="yyyy-MM-dd HH:mm:ss"
                    >
                    </el-date-picker>
                </div>
                <div class="gg">
                    <span class="tit_txt">广告要求</span>
                    <textarea maxlength="300" v-model="requirement" placeholder="请补充本次需求相关详细描述
例：xxx渠道的应用分发模板"></textarea>
                </div>
                <div class="btn">
                    <span class="btn_fb" @click="AddYw">发布</span>
                    <span @click="heid">取消</span>
                </div>
            </div>
        </div>
        <put v-if="putList" @listenToChildEvent="listenToChildEvent"></put>
    </div>

</template>

<script>
    import put from '../admin/Put_library'
    export default {
        props:['YWid'],
        components:{put},
        name: "work-bench_yw",
        data(){
            return {
                sizeList:[],
                typeList:[],
                YWtypeList:[],
                num:null,
                priority:'',
                type:'',
                endtime:'',
                typeIndex:'',
                pos_type:'',
                size:'',
                model:"",
                link:'',
                requirement:'',
                url:'img/1.jpg',
                putList:false,
                libraryName:'',
                switcher:false,
                libraryID:'',
                demand_name:'',
            }
        },
        mounted(){
            this.getSize();
        },
        methods:{
            AddYw(){
                // if(this.YWid!=undefined){
                //     if(!this.type){
                //         this.$message.error('类型不能为空')
                //     }
                //     if(!this.priority){
                //         this.$message.error('优先级不能为空')
                //     }
                //     if(!this.num){
                //         this.$message.error('需求数量不能为空')
                //     }
                //     if(!this.pos_type){
                //         this.$message.error('广告位类型不能为空')
                //     }
                //     if(!this.endtime){
                //         this.$message.error('截止时间不能为空')
                //     }
                //     if(!this.requirement){
                //         this.$message.error('设计要求不能为空')
                //     }
                //     if(!this.size){
                //         this.$message.error('尺寸不能为空')
                //     }
                //     if(!this.model){
                //         this.$message.error('实现方式不能为空')
                //     }
                //     if(!this.type!='f_sls_lockscreen'&&!this.libraryName){
                //         this.$message.error('投放库不能为空')
                //     }
                //     let formData=new FormData;
                //     formData.append('libraryName',this.libraryName);
                //     formData.append('type',this.type);
                //     formData.append('num',this.num);
                //     formData.append('priority',this.priority);
                //     formData.append('endtime',this.endtime);
                //     formData.append('pos_type',this.pos_type);
                //     formData.append('size',this.size);
                //     formData.append('model',this.model);
                //     formData.append('link',this.link);
                //     formData.append('requirement',this.requirement);
                //     this.api.demand_business_edit(formData).then((res)=>{
                //
                //     })
                // }else{
                    if(!this.type){
                        this.$message.error('类型不能为空')
                        return
                    }
                    if(!this.priority){
                        this.$message.error('优先级不能为空')
                        return
                    }
                    if(!this.num){
                        this.$message.error('需求数量不能为空')
                        return
                    }
                    if(this.type!='f_sls_lockscreen'&&!this.pos_type){
                        this.$message.error('广告位类型不能为空')
                        return
                    }
                    if(!this.endtime){
                        this.$message.error('截止时间不能为空')
                        return
                    }
                    if(!this.demand_name){
                        this.$message.error('需求名称不能为空')
                        return
                    }
                if(!this.requirement){
                    this.$message.error('设计要求不能为空')
                    return
                }
                    if(!this.size){
                        this.$message.error('尺寸不能为空')
                        return
                    }
                    if(!this.model){
                        this.$message.error('实现方式不能为空')
                        return
                    }
                    if(this.type!='f_sls_lockscreen'&&!this.libraryName){
                        this.$message.error('投放库不能为空')
                        return
                    }
                    let formData=new FormData;
                    formData.append('put_lib',this.libraryID);
                    formData.append('type',this.type);
                    formData.append('num',this.num);
                    formData.append('priority',this.priority);
                    formData.append('endtime',this.endtime);
                    formData.append('pos_type',this.pos_type);
                    formData.append('size',this.size);
                    formData.append('model',this.model);
                    formData.append('link',this.link);
                    formData.append('requirement',this.requirement);
                    formData.append('pos_view_url',this.url);
                    formData.append('demand_name',this.demand_name);
                    this.api.demand_business_add(formData).then((res)=>{

                    })
                // }

            },
            heid(){
                this.$parent.heidYW()
            },
            getSize(){
                this.api.config_size().then((res)=>{
                    this.sizeList =res;
                    this.getTypes();
                })
            },
            getTypeURL(){
                this.api.config_position_type().then((res)=> {
                    this.pos_type = res[this.typeIndex].pos_type;
                    console.log(this.pos_type)
                    this.url = res[this.typeIndex].view_url;
                })
            },
            getTypes(){
                this.api.config_position_type().then((res)=>{
                    this.typeList = res;
                    this.getYWtype()
                })
            },
            getYWtype(){
                let params ={material:0}
                this.api.config_material_type({params}).then((res)=>{
                    this.YWtypeList = res
                })
            },
            cut(){
                if(this.size==' '){
                    this.switcher=true
                }

            },
            getlIBRARY(){
                this.putList=true;
            },
            heidLibrary(){
                this.putList=false;
            },
            listenToChildEvent(name,id){
                this.libraryName = name;
                this.libraryID = id
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
        top:40%;
        transform: translate(-50%,-50%);
        border-radius:4px;
        text-align: center;
        background: rgba(0,0,0,0);
    }
    .title_txt{
        height: 56px;
        border-bottom: 1px solid #e2e2e2;
        text-align: left;
    }
    .title_txt>span{
        display: inline-block;
        text-align: center;
        line-height: 56px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .tfk{
        display: inline-block;
        line-height: 36px;
        width:422px;
        overflow: hidden;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 8px;
    }
    .xz{
        vertical-align: top;
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1)!important;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left:20px;
    }
    .box_img{
        width:256px;
        height:441px;
        background:rgba(247,249,252,1);
        border-radius:4px;
        margin-right: 24px;
        display: inline-block;
        vertical-align: top;
        padding: 0 20px 20px 20px;
        text-align: center;
    }
    .content_txt{
        width:708px;
        height:800px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        display: inline-block;
    }
    .content_txt div{
        margin-bottom: 24px;
        text-align: left;
        margin-left: 20px;
    }
    .box_img div{
        height: 53px;
        text-align: center;
    }
    .box_img span{
        display: inline-block;
        line-height: 53px;
        font-size:16px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .box_img img{
        width:256px;
        height:388px;
    }
    .times>.tit_txt{
        margin-right:0px!important;
    }
    .gg>.tit_txt{
        vertical-align: top;
    }
    .tit_txt{
        display: inline-block;
        width: 70px;
        text-align: right;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
    }
    .num{
        width:192px!important;
    }
    .xqName{
        width:190px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 10px;
    }
    select,.num{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 8px;
    }
    .right{
        margin-left: 20px;
    }
    .link{
        width:503px;
        padding-left: 8px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    textarea{
        padding: 14px;
        width:486px;
        height:144px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        resize:none;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
    }
    .btn{
        width:708px;
        height:58px;
        background:rgba(247,249,252,1);
        border-radius:0px 0px 4px 4px;
        margin-left: 0!important;
        margin-bottom: 0!important;
        position: relative;
        bottom: 0px;
        text-align: right!important;
    }
    .btn span{
        display: inline-block;
        text-align: center;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-right: 44px;
        line-height: 36px;
        cursor: pointer;
        margin-top: 10px;
    }
    .btn_fb{
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
        margin-right: 14px!important;
    }
</style>