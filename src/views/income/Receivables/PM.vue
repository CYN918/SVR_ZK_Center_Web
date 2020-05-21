<template>
    <div>
        <div class="top_name">
            <span class="top_txt" @click='fh(-1)'>广告收款结算 /  项目管理</span>
            <div class="title_left">
                <span>项目管理</span>
            </div>
        </div>
        <div class="content">
            <div class="sum">
                <input type="text" placeholder="搜索关键词" v-model='search '  @click="setPage()">
                <span>状态</span>
                <select v-model="status" @click="setPage()">
                    <option value="">全部</option>
                    <option value="2">信息正常</option>
                    <option value="0">信息异常</option>
                    <option value="1">信息待补充</option>
                </select>
                <div style=" display: inline-block;position: relative;margin-left:15px;">
                    <span style="margin-right: 15px;">结算主体</span>
                    <input type="text" placeholder="请输入结算主体" v-model="balance_name" @input="getName()" @blur='focuson()' @focus='getName()'/>
                    <div class='names' v-if="show">
                        <span v-for="da in JSname" @click='setName(da)'>{{da.account_name}}</span>
                    </div>
                </div>
                <div style=" display: inline-block;position: relative;margin-left:15px;margin-right:15px;">
                    <span style="margin-right: 15px;">合作公司</span>
                    <input type="text" placeholder="请输入合作公司" v-model="company_name" @input="oldADD()" @blur='oldblur()'/>
                    <div class='names' v-if="old">
                        <span v-for="da in company" @click='select_check(da)'>{{da.name}}</span>
                    </div>
                </div>
                <span class='select_left'>投放形式</span>
                <select class='input_left' v-model="put_type">
                     <option value="" >请选择</option>
                     <option value="常规业务" >常规业务</option>
                     <option value="试玩业务" >试玩业务</option>
                </select>
                <div class='btn_box'>
                    <span class="cx" @click="getDataList()">查询</span>
                    <span @click='cz()'>重置</span>
                    <span @click="guideR()" v-if="isShow">导入</span>
                    <!-- <span>监控邮箱</span> -->
                </div>
            </div>
            <div>
                <template>
                    <el-table
                            :data="tableData"
                            header-align="center"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            style="width: 100%;color:#000">
                        <el-table-column
                                label="项目ID" prop="project_id"
                               >
                        </el-table-column>
                        <el-table-column
                                label="项目名称" prop="project_name"
                                >
                        </el-table-column>
                        <el-table-column
                                label="内容状态" prop="contributor_type"
                                >
                            <template slot-scope="scope">
                                <span :class="{red:tableData[scope.$index].status!=2}">{{tableData[scope.$index].status==0?'信息异常':tableData[scope.$index].status==1?"信息待补充":"信息正常"}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="更新时间" prop="updated_at"
                                >
                        </el-table-column>
                        <el-table-column
                                label="操作人员" prop="updator"
                                >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="props">
                                <el-button type="text" @click='ck(tableData[props.$index].project_id)'>查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
             <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="p"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
         <loading v-if='load'></loading>
         <div class="bg" v-if="upTxt">
            <div class="upText">
                <div class="titName">
                    <span>导入数据</span>
                </div>
                <div style="overflow-y:auto ">
                    <el-upload
                            class="uploadTxt"
                            action="222"
                            ref="upload"
                            :http-request="upLoad"
                             multiple
                            :on-remove="handleRemove"
                            :before-upload="beforeAvatarUploads"
                            :auto-upload="false"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    <!-- <a href="text/主题结算数据录入模板.xlsx" target="_blank" style="position: absolute;top:69px;left: 120px">下载模板</a> -->
                </div>
                <div class="upTxtBtn">
                    <span @click="heidUP()">取消</span>
                    <span @click="submitUpload" style="background: #3377ff;color: #fff;border: 0">确定</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import loading from '../../../components/loading'
    export default {
        components:{loading},
        name: "settlement",
        data(){
            return{
                tableData:[{toax_mney:1000}],
                total:0,
                page:1,
                p:10,
                status:'',
                search:"",
                load:true,
                upTxt:false,
                userData:{},
                isShow:true,
                JSname:[],
                show:false,
                balance_id:'',
                put_type:'',
                company:[],
                company_name:'',
                old:false,
                company_id:'',
                balance_name:'',
            }
        },
        mounted(){
            this.getDataList();
            this.getData();
        },
        methods:{
            getName(){ 
                if(this.balance_name!=''){
                    this.show=true;   
                    let params={is_receiver:'1'}
                    this.api.settle_settlement_searchall({params}).then((res)=>{
                        this.JSname=res
                    })
                }     
            },
            focuson(){
                this.show=false;
            },
            setName(da){
                this.balance_id=da.id;
                this.balance_name = da.account_name;
                this.show=false;
            },
            oldADD(){
                if(this.company_name!=''){
                    let params={search:this.company_name}
                    this.api.adproject_adcompany_list({params}).then((res)=>{
                        this.company=res; 
                    })
                    this.old=true;
                }
            },
            select_check(da){
                this.company_name=da.name;
                this.company_id = da.company_id;
                this.old=false;
            },
            oldblur(){
                this.old=false;
            },
            getData(){
                let params = {
                    email:localStorage.getItem('userAd'),
                };
                this.api.get_account({params}).then((datas)=>{
                    this.userData = datas;
                });
            },
            guideR(){
                if(this.userData.roles[0].role_name=='admin'){
                    this.upTxt=true;
                }else{
                    this.isShow = false;
                }   
            },
            upLoad(file){
                console.log(file)
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.themes_adproject_import(formData).then((res)=>{
                    this.getDataList()
                })
            },
            handleRemove(file) {
               for(var i=0;i<this.fileList.length;i++){
                   if(this.fileList[i]==file){
                       this.fileList.splice(i,1);
                   }
               }
               console.log(this.fileList);
            },
            beforeAvatarUploads(file) {
                this.file = file;
                const iszip = file.name.split('.')[(file.name.split('.')).length-1] === 'xlsx';
                if (!(iszip)) {
                    this.$message.error('只支持xlsx格式!');
                }
                return iszip;
            },
            submitUpload() {
                this.$refs.upload.submit();
                this.heidUP();
            },
            heidUP(){
                this.upTxt=false;
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(247,249,252,1);color:rgba(31,46,77,1);text-align:center;font-size:14px;font-weight:blod;font-family:PingFang-SC-Medium;height:56px'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:rgba(61,73,102,1);font-size:14px;font-weight:400;font-family:PingFangSC-Regula;'
            },
            setPage(){
                this.page=1
            },
            fh(index){
                this.$router.go(index);
            },
            cz(){
                this.search=''
                this.status=''
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getDataList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getDataList()
            },
            getDataList(){
                let params={p:this.p,page:this.page,search:this.search,status:this.status,company_id:this.company_id,put_type:this.put_type,balance_id:this.balance_id}
                this.api.adproject_listpage({params}).then((res)=>{
                    this.total=res.total;
                    this.tableData=res.data;
                    this.load=false;
                    this.balance_name = '';
                    this.company_name = '';
                    this.company_id = '';
                    this.balance_id = '';
                })
            },
            jump(data){
                this.$router.push({
                    query:{
                        data:data,
                    },
                    path:"/income/money_details"
                })
            },
            ck(id){
                this.$router.push({
                    path:"./PM_details",
                    query:{
                        project_id:id
                    }
                })
            },
            
        }
    }
</script>

<style scoped>
    .top_name{
        height:112px!important;
        background:rgba(255,255,255,1);
    }
    .title_left span{
        display: inline-block;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:bold;
        color:rgba(50,50,50,1);
        margin-left: 24px;
        text-align: right;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
        cursor: pointer;
    }
    .red{color:red}
    .content{
        margin-top: 199px!important;
    }
    .timesDate{
        display: inline-block;
        margin:24px 0 28px 24px!important;
    }
    .filtrate div{
        display: inline-block;
        margin-right: 44px;
    }
    .time_tit{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
        line-height: 36px;
    }
    .filtrate input{
        width:190px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 10px;
    }

    .dc{
        display: inline-block;
        width:96px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        float: right;
        margin: 24px 24px 0 0;
    }
    .sum{margin:0 24px 24px 24px}
    .btn_box{
        display: inline-block;
        float:right;
        margin-right: 24px;
    }
    .btn_box span{
        width: 90px!important;
        height: 36px;
        display: inline-block;
        border:1px solid #ddd;
        text-align: center!important;
        line-height: 36px;
        cursor: pointer;
        margin-left: 24px;
        border-radius: 3px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        margin-top: 24px;
    }
    .sum input{
        width:140px;
        height:36px;
        padding-left: 8px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-top: 24px;
    }
    .sum>span{
        width: 56px;
        display: inline-block;
        line-height: 36px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
        text-align: right;
    }
    .sum select{
        width:140px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        padding-left: 10px;
        border:1px solid rgba(211,219,235,1);
    }
    .or{
        width: 34px!important;
        text-align: center!important;
        margin-right: 0!important;
    }
    .zh{
         margin-left: 30px;
    }
    .cx{
       
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
        border:0!important
    }
   .timesDate .el-input__inner{
       line-height:normal!important;
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
    .upText{
        width:460px;
        height:312px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
        -webkit-box-shadow: 0px 1px 6px 0px rgba(0,0,0,0.06);
        position: relative;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
    }
    .titName span{
        display: inline-block;
        margin: 20px 20px 24px 20px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
.uploadTxt{
    margin-left:20px ;
}
.upTxtBtn{
    position: fixed;
    bottom: 0;
    width: 100%;
}
    .upTxtBtn span{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        width:80px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        float: right;
        margin:0  24px 24px 0;
    }
    a{
        color: #3377ff;
    }
    .names{
        position: absolute;
        top:65px;
        right: 0;
        height: 200px;
        width: 100%;
        overflow-y:auto;
        background: #fff;
        z-index: 100;
        border: 1px solid #ddd;
    }
    .names span{
        text-align: center;
        display: block;
        height: 36px;
        line-height: 36px;
        border-bottom:1px solid #eee 
    }
</style>