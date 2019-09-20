<template>
    <div>
        <div class="top">
           <span class="topName">锁屏主题素材</span>
           <span class="total">共299套/</span>
           <span class="total">200套已使用</span>
            <span class="upLock" @click="jump">上传锁屏</span>
        </div>
        <div class="seach">
             <div class="tagSeach">
                <span class="tagSeachName">内容标题</span>
             </div>
            <div class="seachIiput">
                <img  src="../../../public/img/ss.png"/>
                <input type="text" placeholder="搜索名称或ID" v-model="search"/>
                <span class="seachSelect">状态</span>
                <select v-model="status">
                    <option value="">全部</option>
                    <option value="1">已使用</option>
                    <option value="0">未使用</option>
                </select>
                <span class="cx" @click="dataList()">查询</span>
            </div>
        </div>
        <div>
            <div class="box" v-for="item in list">
                <div class="boxImgs">
                    <img src>
                </div>
                <div class="boxName">
                    <span>最多十个字</span>
                </div>
                <div class="boxTag">
                    <span></span>
                    <span class="addTags"><span>+</span>标签</span>
                </div>
            </div>
        </div>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page"
                    :page-size="p"
                    layout="prev, pager, next,total, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "theme_lock",
        data(){
            return{
                type:'th_lock_screen',
                status:'',
                search:'',
                tags:'',
                p:10,
                page:1,
                total:0,
                list:[],
            }
        },
        mounted(){this.dataList()},
        methods:{
            dataList(){
                let params ={type:this.type,status:this.status,search:this.search,tags:this.tags,p:this.p,page:this.page};
                this.api.themes_material_list({params}).then((res)=>{
                    this.list=res.data;
                    this.total=res.total
                })
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.dataList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.dataList()
            },
            jump(){
                this.$router.push({
                    path:'./themelock_up',
                    query:{
                        type:this.type
                    }
                })
            },
        },
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:62px;
        background: rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
    }
    .topName{
        display: inline-block;
        font-size:18px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-left: 24px;
        margin-right: 10px;
        line-height: 62px;
    }
    .total{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(143,155,179,1);
    }
    .upLock{
        display: inline-block;
        width:96px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height: 36px;
        text-align: center;
        float: right;
        margin-right: 274px;
        margin-top: 13PX;
    }
    .seach{
        min-height:147px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        margin-top: 148px;
        padding: 0 24px;
        margin-bottom: 24px;
    }
    .tagSeach{
        min-height: 60px;
        border-bottom: 1px dashed #E6E9F0;
    }
    .tagSeachName{
        display: inline-block;
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(143,155,179,1);
        line-height: 60px;
    }
    .seachIiput{
        height: 84px;
    }
    .seachIiput img{
        position: relative;
        top:10px;
    }
    .seachIiput input{
        width:236px;
        height:36px;
        margin: 24px 40px 0 -30px;
        padding-left: 36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .seachSelect{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 14px;
    }
    .seachIiput select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 24px;
    }
    .cx{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
    }
    .box{
        width:189px;
        height: 411px;
    }
    .boxImgs{
        width: 189px;
        height: 315px;
        margin: 0 auto;
        background: #fff;
        padding: 0 auto!important;
    }
    .boxName{
        width: 100%;
        height: 34px;
        background:rgba(255,255,255,1);
    }
    .boxName span{
        display: inline-block;
        margin-left: 10px;
        line-height: 34px;
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .boxTag{
        width: 169px;
        height: 62px;
        background: #fff;
        padding:0 10px ;

    }
    .addTags{
        display: inline-block;
        width:56px;
        height:24px;
        border-radius:4px;
        border:1px dashed rgba(230,233,240,1);
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.45);
        line-height: 24px;
        text-align: center;
        cursor: pointer;
    }
</style>