<template>
    <div>
        <div class="top_name">
            <span class="top_txt">投放库 / 杂志锁屏推送管理</span>
            <div class="tit_name">
                <span>杂志锁屏推送管理</span>
            </div>
            <div class="search_criteria">
                <div class="date">
                    <el-date-picker
                            v-model="date"
                            @change="getData()"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="num">
                    <span>数量:</span>
                    <span>{{this.total}}</span>
                    <span class="dated" v-if="new Date(this.date)<=new Date(new Date().getTime() - 24*60*60*1000)">(已过期)</span>
                </div>
                <div class="action_btn">
                    <span class="manage" @click="jumps()" v-if="!(new Date(this.date)<new Date(new Date().getTime() - 24*60*60*1000))">管理</span>
                    <span class="select" @click="getWl" v-if="!(new Date(this.date)<new Date(new Date().getTime() - 24*60*60*1000))">
                        <img src="../../../public/img/add.png" style="width: 16px;display: inline-block;position: relative;top:50%;transform: translateY(-90%);margin-right: 10px">
                        从物料库选择
                    </span>
                </div>
            </div>
        </div>
        <div class="box" v-if="this.dataList.length>0">
            <div class="box_img" v-for="item in this.dataList">
                <div class="left_img">
                    <img :src="item.prev_uri">
                </div>
                <div class="right_txt">
                    <div>
                        <span class="right_txt_name">物料ID</span>
                        <span class="right_txt_content">{{item.mfid}}</span>
                    </div>
                    <div class="img_size">
                        <span class="right_txt_name">尺寸</span>
                        <span class="right_txt_content">{{item.size}}</span>
                    </div>
                    <div>
                        <span class="right_txt_name">文件</span>
                        <span class="right_txt_content" v-if="(item.attach.size/1024).toFixed(0)>=1&&(item.attach.size/1024/1024).toFixed(0)<1">{{(item.attach.size/1024).toFixed(0)}}kb</span>
                        <span class="right_txt_content" v-if="(item.attach.size/1024/1024).toFixed(1)>=1&&(item.attach.size/1024/1024/1024).toFixed(1)<1">{{(item.attach.size/1024/1024).toFixed(1)}}MB</span>
                        <span class="right_txt_content" v-if="(item.attach.size/1024/1024/1024).toFixed(2)>=1">{{(item.attach.size/1024/1024/1024).toFixed(2)}}GB</span>
                        <a :href="item.attach.url">下载</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="null_content" v-if="this.dataList.length==0">
            <img src="../../../public/img/null.png">
            <span class="prompt_message">无相关资源，若有疑问，请联系管理人员</span>
        </div>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="prev, pager, next,total, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <ADDWL v-if="ADDwl" @listenToChildEvent="listenToChildEvent" :date="date"></ADDWL>
    </div>
</template>

<script>
    import ADDWL from './Jounrnal_select'
    export default {
        components:{ADDWL},
        name: "journal_of_push",
        data(){
            return{
                date:(new Date()).toLocaleDateString().split('/').join('-'),
                ADDwl:false,
                plid:'2',
                dataList:[],
                total:0,
                pageSize:8,
                currentPage: 1,
            }
        },
        mounted(){
            this.getData();
        },
       methods:{
            jumps(){
                this.$router.push({
                    path:"./journal_Administrator",
                    query:{
                        date:this.date,
                        id:this.plid
                    }
                })
            },
           handleSizeChange1() { // 每页条数切换
               this.pageSize = pageSize;
               this.getData()
           },
           handleCurrentChange1(currentPage) {//页码切换
               this.currentPage = currentPage;
               this.getData()
           },
           getWl(){
                this.ADDwl = true;
           },
           heidWL(){
               this.ADDwl = false;
           },
           getData(){
                let params = {plid:this.plid,p:this.pageSize,page:this.currentPage,date:this.date};
                this.api.pushlib_binds({params}).then((res)=>{
                    this.dataList = res.data;
                    this.total=res.total
                })
           },
           listenToChildEvent(id,date){
                console.log(id);
                let formData =new FormData;
                formData.append('plid',this.plid);
                formData.append('date',date);
                formData.append('bind_mfid',JSON.stringify(id));
                this.api.pushlib_add_mfinal(formData).then((res)=>{
                    this.heidWL();
                    this.getData()
                })
           },
        },
    }
</script>

<style scoped>
    a{
        display: inline-block;
        width:44px;
        height:20px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(51,119,255,1);
        line-height: 20px;
        text-align: center;
        cursor: pointer;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left: 14px;
    }
    .top_txt,.tit_name span{
        margin-left: 24px;
    }
    .top_name{
        height: 166px;
    }
    .tit_name span{
        display: inline-block;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
    }
    .tit_name{
        margin-bottom: 24px;
    }
    .search_criteria {
        padding: 0 24px;
    }
    .search_criteria div{
        display: inline-block;
    }
    .date{
        margin-right: 12px;
    }
    .num span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
    }
    .action_btn{
        float: right;
        margin-right: 250px;
    }
    .action_btn span{
        display: inline-block;
        height: 36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .manage{
        width:68px;
        background:rgba(51,119,255,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-right: 20px;
    }
    .select{
        width:144px;
        background:rgba(242,246,252,1);
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(61,73,102,1);
    }
    .box{
        margin-top: 244px;
    }
    .box_img{
        display: inline-block;
        width:380px;
        height:189px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        margin:0px 20px 24px 0;
    }
    /*.box_img:nth-child(4n){*/
        /*margin-right: 0!important;*/
    /*}*/
    .left_img{
        display: inline-block;
        width:116px;
        height:149px;
        background:rgba(227,231,235,1);
        border-radius:2px;
        margin-left: 49px;
        position: relative;
        top:50%;
        transform: translateY(-50%);
    }
    .left_img img{
        max-width: 99px;
        max-height: 149px;
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .right_txt{
        display: inline-block;
        position: relative;
        top: 25%;
        transform: translateY(-50%);
        margin-left: 20px;
    }
    .right_txt div{
        height: 40px;
    }
    .right_txt_name{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(143,155,179,1);
    }
    .right_txt_content{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-left: 10px;
    }
    .null_content{
        text-align: center;
        position: relative;
        margin-top: 400px;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .prompt_message{
        display: block;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
        text-align: center;
    }
    .dated{
        display: inline-block;
        margin-left: 10px;
        color: red!important;
    }
</style>