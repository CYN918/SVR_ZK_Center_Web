<template>
    <div class="bg">
        <div class="content">
            <div class="tit_name">
                <span>从素材库选择素材</span>
            </div>
            <div class="Search">
                <img src="../../../public/img/ss.png" />
                <input type="text" placeholder="搜索标签或ID" v-model="search" @input="getList()"/>
                <div class="Search_select">
                    <span class="Search_select_tit">素材类型：</span>
                    <select v-model="type" @change="getList()">
                        <option v-for="item in scType" :value="item.type">{{item.name}}</option>
                    </select>
                </div>
            </div>
            <div class="contentImg">
                <div class="label">
                    <span class="label_txt">预置标签:</span>
                    <span v-for="(item,index) in preset_tags" class="labelName">{{item.name}}</span>
                </div>
                <div>
                    <span class="label_txt">个性标签:</span>
                    <span v-for="(item,index) in self_tags" class="labelName">{{item.name}}</span>
                </div>
                <div class="box">
                    <div class="boxImg" v-for="(DL,index) in IMGList">

                        <div class="boxCheck">
                            <!--<el-radio v-model="checked" :label="index" @change="getID(index)"></el-radio>-->
                            <template>
                                <el-checkbox-group v-model="checked">
                                    <el-checkbox :label="index" ></el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </div>

                        <img :src="DL.prev_uri"/>
                        <div class="boxImg_right">
                            <div class="boxImg_right_1">
                                <div>
                                    <span class="boxImg_text">素材ID:</span>
                                    <span class="boxImg_content">{{DL.mid}}</span>
                                </div>
                                <div>
                                    <span class="boxImg_text">尺寸:</span>
                                    <span class="boxImg_content"></span>
                                </div>
                                <div>
                                    <span class="boxImg_text">素材状态:</span>
                                    <span class="boxImg_content">{{DL.status==1201?'禁用':'启用'}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="select_btn">
                <span class="select_btn_left" @click="messageID">确定</span>
                <span @click="YCset">取消</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['typesLisck', 'imgIndex','da','index'],
        name: "select_material",
        data(){
            return {
                checked:[],
                radioSize:'',
                pageSize: 10,
                total: 0,
                currentPage: 1,
                preset_tags:[],
                self_tags:[],
                IMGList:[],
                search:'',
                scType:'',
                type:'',
                scMessagelist:[],
                scMessageOld:[],
                scMessageNew:[],
                oldData:{
                    index:'',
                    data:[],
                }

            }
        },
        mounted() {
            this.getList();
            console.log(this.da)
        },
        methods:{
            // getID(index){
            //     this.scMessage =  this.IMGList[index].mid;
            // },
            YCset(){this.$parent.SCsc()},
            messageID(){
                    for(let i=0;i<this.checked.length;i++) {
                        this.scMessagelist.push(this.IMGList[this.checked[i]]);
                        console.log(this.scMessagelist[0].mid);
                }
                    this.$emit('listenToChildEvent',this.scMessagelist,this.index);
                    this.$parent.SCsc();
                    this.$parent.AddMaterial()
            },
            // messageID(){
            //     if(this.da.length!=0){
            //         for(let j=0;j<this.da.length;j++){
            //             this.scMessageOld.push(this.da[j]);
            //         }
            //         for(let i=0;i<this.checked.length;i++) {
            //             this.scMessageNew.push(this.IMGList[this.checked[i]]);
            //         }
            //         this.scMessagelist=this.scMessageOld.concat(this.scMessageNew);
            //     }else {
            //         for(let i=0;i<this.checked.length;i++) {
            //             this.scMessagelist.push(this.IMGList[this.checked[i]]);
            //         }
            //     }
            //     this.$emit('listenToChildEvent', this.scMessagelist,true);
            //     this.$parent.SCsc();
            // },
            getList(){
                let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search};
                this.api.material_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    this.total=res.total;
                    this.getTagsList();
                    this.getType()
                })
            },

            getType(){
                let params={material:1};
                this.api.config_material_type({params}).then((res)=>{
                    this.scType=res;
                })
            },
            getTagsList(){
                let params = {preset:this.preset,material:1,type:this.type,search:this.search};
                this.api.tags_search({params}).then((da)=>{
                    this.preset_tags = da.data.tags;
                    this.self_tags = da.data.self_tags
                })
            },
            handleSizeChange1() { // 每页条数切换
                this.pageSize = pageSize;
                console.log(this.pagesize);
                this.getList()
            },
            handleCurrentChange1(currentPage) {//页码切换
                console.log(currentPage);
                this.currentPage = currentPage;
                this.getList()
            },
        },
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
        width:1416px;
        height:912px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        top:-122px;
        left: 50%;
        transform: translateX(-50%);
        overflow-y: auto;
    }
    .tit_name{
        height: 55px;
        border: 1px solid #E6E9F0;
    }
    .tit_name span{
        display: inline-block;
        line-height: 55px;
        margin-left: 24px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
    }
    .Search_select{
        display: inline-block;
        margin-right: 30px;
    }
    .Search_select_tit{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 16px;
    }
    .Search_select>select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .top_name>span{
        display: inline-block;
        line-height: 50px;
    }
    .Search{
        margin-left: 0!important;
        margin-bottom: 34px;
    }
    .Search img{
        width: 28px;
        position: relative;
        left: 40px;
        top: 10px;
        cursor: pointer;
    }
    .Search input{
        width:404px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-left: 0;
        margin-top: 29px;
    }
    .label{
        margin-left: 0!important;
    }
    .labelName{
        display: inline-block;
        width:78px;
        height:38px;
        background:rgba(255,255,255,1);
        border-radius:5px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 18px;
        text-align: center;
        line-height: 38px;
        cursor: pointer;
    }
    .label_txt{
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(143,155,179,1);
        margin-right: 16px;
    }
    .contentImg{
        margin: 0 26px;
    }
    .active{
        background:rgba(255,255,255,1);
        border:1px solid rgba(19,159,248,1);
    }

    .box_select input{
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 18px;
        margin-left: 0!important;
    }
    .boxImg{
        display: inline-block;
        width:408px;
        height:141px;
        background:rgba(245,247,250,1);
        border-radius:4px;
        border:1px solid rgba(51,119,255,1);
        /*padding: 18px 0 18px 30px;*/
        box-shadow:0px 0px 10px 0px rgba(153,153,153,0.14);
        margin: 0 15px 20px 0!important;
    }
    .boxImg:nth-child(2n){
        margin: 0 15px 20px 0!important;
    }
    .boxImg:nth-child(3n){
        margin: 0 0 20px 0!important;
    }
    .boxImg img{
        width:99px;
        height:149px;
        margin-right: 24px;
    }
    .boxImg_right_1{
        margin-top: 23px;
    }
    .boxImg_right{
        display: inline-block;
        vertical-align: top;
    }
    .boxImg_right_1 img{
        width: 28px;
        height: 28px;
        margin-left: 15px;
        margin-right: 0;
    }
    .boxImg_right_1,.boxImg_right_2{
        display: inline-block;
        vertical-align: top;
    }
    .boxImg_text{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(143,155,179,1);
        margin-bottom: 15px;
        text-align: left;
    }
    .boxImg_content{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-bottom: 15px;
    }
    .boxImg_right_1 .boxImg_text{
        width: 70px;
        margin-right: 11px;
    }
    .boxImg_right_2 .boxImg_text{
        width: 100px;
        margin-right: 12px;
    }
    .ck{
        color:rgba(19,159,248,1);
        cursor: pointer;
    }
    .box_box{
        display:inline-block;
        background:rgba(255,255,255,1);
        border:1px solid rgba(230,230,230,1);
        border-radius:14px;
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        padding: 5px 10px;
        margin-right: 12px;
        margin-bottom: 8px;
    }
    .box_box:nth-child(2n){
        margin-right: 0;
    }
    .boxImg_xz{
        display: inline-block;
        width: 170px;
        max-height: 80px;
        overflow: hidden;
    }
    .boxImg_bq{
        vertical-align: top;
    }
    .dowload{
        display: inline-block;
        width:66px;
        height:28px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(153,153,153,1);
        border-radius:14px;
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(54,54,54,1);
        text-align: center;
        line-height: 28px;
        margin-left: 20px;
    }
    .bjImg{
        width: 20px!important;
        height: 20px!important;
        position: relative;
        margin-right: 0!important;
        right: -20px;
        top: -180px;
    }
    .select_btn{
        text-align: right;
        margin-right: 26px;
    }
    .select_btn span{
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
        cursor: pointer;
        text-align: center;
    }
    .select_btn_left{
        border: 0!important;
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
        margin-right: 20px;
    }
    .boxCheck{
        display: inline-block;
        margin-right: 20px;
        vertical-align: top;
        margin-top: 60px;
    }
</style>