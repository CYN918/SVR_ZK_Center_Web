<template>
   <div>
        <div class="top_name">
            <div class="title_left">
                <span>预付金管理</span>
            </div>
        </div>
        <div class='content'>
            <div>
                <span class='fc_statuc'>项目ID：</span>
                <input type="text" v-model="project_id">
                <span class='fc_statuc' v-if='state1==""'>设计师ID：</span>
                <input type="text" v-model="id" v-if='state1==""'  @change="sJsID()">
                <span class='fc_statuc'  v-if='id==""'>结算方</span>
                    <el-autocomplete
                        v-if='id==""'
                        class="inline-input"
                        v-model="state1"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        @select="handleSelect"
                        >
                    </el-autocomplete>
                  <span class='fc_statuc'>汇款凭证状态：</span>  
                  <select v-model='is_remitted' >
                      <option value="0">全部</option>
                      <option value="2">待补充</option>
                      <option value="1">已补充</option>
                  </select>
                <div class="btn_right">
                    <span class='cx' @click='listData()'>查询</span>
                    <span @click='cz()'>重置</span>
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
                                :show-overflow-tooltip="true"
                               >
                        </el-table-column>
                        <el-table-column
                                label="设计师ID" prop="open_id"
                                :show-overflow-tooltip="true"
                                >
                        </el-table-column>
                        <el-table-column
                                label="初始预约金" prop="advance_payment"
                                >
                        </el-table-column>
                        <el-table-column
                                label="预约金余额" prop="advance_payment_left"
                                 :show-overflow-tooltip="true"
                                >
                        </el-table-column>
                        <el-table-column label="更新时间" prop="updated_at">
                            
                        </el-table-column>
                        <el-table-column label="汇款凭证状态" prop="remittance">
                             <template slot-scope="props">
                                <span :class='{red:tableData[props.$index].attach_id==0}'>{{tableData[props.$index].attach_id==0?'待补充':'已补充'}}</span>
                            </template>
                        </el-table-column>
                         <el-table-column label="操作" prop="">
                             <template slot-scope="props">
                                 <el-button type="text" v-if='tableData[props.$index].attach_id==0' @click='updata(tableData[props.$index].project_id)'>上传凭证</el-button>
                                <el-button type="text" v-if='tableData[props.$index].attach_id!=0' @click="CKimg(tableData[props.$index].attach.url)">查看凭证</el-button>
                                <el-button type="text"  @click='jump(tableData[props.$index].project_id,tableData[props.$index].open_id,tableData[props.$index].account_name,tableData[props.$index].advance_payment,tableData[props.$index].advance_payment_left)'>查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
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
        </div>
        <div class='bg' v-if='exe'>
            <div class='dr'>
                  <div class='dr_tit'>
                      <span>导入数据</span>
                  </div> 
                  <div class='file_ADD'>
                      <span class='fj'>附件：</span>
                      <el-upload
                        class="upload-demo"
                        action="1"
                        :on-preview="handlePreview"
                        :http-request="uploadFile"
                        :before-upload="beforeAvatarUpload"
                        multiple
                        >
                        <el-button size="small" type="primary">选择</el-button>
                        </el-upload> 
                  </div>
                  <div style="margin-top:16px">
                      <span class='fj'>附件名称：</span>
                      <span>{{this.file.name}}</span>
                      <img src="img/yc.png" alt="" class='del' v-if='this.file.name' @click='del()'>
                  </div>
                  <div class='btns'>
                        <span class='qr' @click='drData()'>确认</span>
                        <span @click='heid()'>取消</span>
                </div>
            </div>
        </div>
        <div class='bg' v-if='imgs' @click='gb()'>
            <img :src="url" alt="" class='img'>
        </div>
        <load v-if="load"></load>
   </div>
</template>

<script>
import load from '../../../components/loading'
export default {
    components:{load},
    props:['type'],
            data(){
                return{
                    
                    p:10,
                    page:1,
                    total:0,
                    tableData:[{time:2020}],
                    list:[],
                    project_id:"",
                    open_id:"",
                    state1:"",
                    restaurants: [],
                    id:"",
                    exe:false,
                    file:{},
                    load:true,
                    is_remitted:"0",
                    imgs:false,
                    url:"",
                }
            },
            mounted(){
                this.listData()
            },
            methods:{
                cz(){
                    this.id="";
                    this.project_id="";
                    this.open_id="";
                    this.state1='';
                    this.is_remitted="0"
                },
                updata(data){
                    this.exe=true;
                    this.project_id=data
                },
                CKimg(url){
                    this.imgs=true;
                    this.url=url
                },
                gb(){
                    this.imgs=false;
                    this.url=''
                },
                 heid(){
                    this.exe=false;
                    this.file={};
                },
                 del(){
                   this.file={}
                },
                drData(){
                    if(!this.file.name){
                        this.$message.error('附件不能为空')
                        return
                    }
                    let formData =new FormData;
                    formData.append('project_id',this.project_id);
                    formData.append('attach',JSON.stringify(this.file));
                    this.api.ds_advance_payment_upload_remittance(formData).then((res)=>{
                        if(res!=false){
                            this.heid();
                            this.listData()
                        }
                    })
                },
                 handlePictureCardPreview(file) {
                        this.dialogImageUrl = file.url;
                        this.dialogVisible = true;
                },
                       
                handlePreview(file) {
                        console.log(file);
                },
                getRowClass({row, column, rowIndex}) {
                    if (rowIndex === 0) {
                        return 'background:#f7f9fc;color:#1F2E4D;font-size:14px;font-weight:bold;height:48px;font-family:PingFang-SC-Regular;padding:20px 0px 20px 14px'
                    } else {
                        return ''
                    }
                },
                cell({row, column, rowIndex, columnIndex}){
                    return 'padding:15px 14px;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
                },
                handleSizeChange(p) { // 每页条数切换
                    this.p = p;
                    this.listData()
                },
                handleCurrentChange(page) {//页码切换
                    this.page = page;
                    this.listData()
                },
                beforeAvatarUpload(file) {
                    const isJPG = file.type === 'image/jpeg';
                    const isPNG = file.type === 'image/png';
                        
                    if (!isJPG&&!isPNG) {
                            this.$message.error('仅允许传一张格式为JPG、PNG的图片，请检查后重试');
                    }
                     return isPNG || isJPG ;

            },
                listData(){
                    this.load=true
                    let params={open_id:this.open_id,project_id:this.project_id,account_name:this.account_name,p:this.p,page:this.page,is_remitted:this.is_remitted};
                    this.api.ds_advance_payment_list({params}).then((res)=>{
                        this.tableData=res.data;
                        this.total=res.total;
                        this.load=false
                         this.getData();
                         this.getDlist();
                    })
                },
                 getData(){
                    let params={is_receiver:1};
                    this.api.settle_settlement({params}).then((res)=>{
                        this.list=res;
                    })
                },
                 getDlist(){
                    this.api.designer_settlement_list().then((res)=>{
                        this.restaurants=res;


                    })
                },
                 querySearch(queryString, cb) {
                    for(var i =0;i<this.restaurants.length;i++){
                        if(this.restaurants[i].contribute_type==1){
                            this.restaurants[i].value=this.restaurants[i].name+this.restaurants[i].id_card
                        }
                        if(this.restaurants[i].contribute_type==2){
                            this.restaurants[i].value=this.restaurants[i].company_name+this.restaurants[i].code
                        }
                    }
                    var results = queryString ? this.restaurants.filter(this.createFilter(queryString)) : this.restaurants;
                    cb(results);
                },
                createFilter(queryString) {
                    return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                    };
                },
                handleSelect(item) {
                    this.open_id=item.open_id
                },
                 sJsID(){
                    this.open_id=this.id;
                },
                 uploadFile(file){
                     let formData=new FormData;
                     formData.append('file',file.file)
                     this.api.file_private_upload(formData).then((res)=>{
                         this.file=res
                     })
                },
                jump(project_id,open_id,data,money,ye){
                    this.$router.push({
                        path:"./Advance_details",
                        query:{
                            project_id:project_id,
                            open_id:open_id,
                            account_name:data,
                            money:money,
                            ye:ye
                        }
                    })
                },
            },
}
</script>

<style scoped>
      .top_name{
        height:90px!important;
        background:rgba(255,255,255,1);
    } 
    .title_left span{
        display: inline-block;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
        margin-left: 24px;
        text-align: right;
        margin-top:30px
    }
    .content{
        margin-top: 173px;
    }  
    .times{
        display: inline-block;
        margin: 24px;
    }
    .times .el-input__inner{
        width:300px!important
    }
    .btn_right{
        display: inline-block;
        float:right;
        margin: 14px 24px 0 0;
    }
    .btn_right span{
        display: inline-block;
        cursor: pointer;
        width: 90px;
        height: 36px;
        border: 1px solid #ddd;
        border-radius: 3px;
        line-height: 36px;
        text-align: center;
        margin-left: 24px;
            
    }
    .cx{
        color: #fff!important;
        border:0!important;
        background: #3377ff!important;
    }
     select{
        width: 200px;
        height: 36px;

    }
    input{
        width: 190px;
        height: 30px;
        padding-left: 10px;
    }
   .fc_statuc{
        display: inline-block;
        margin:24px 16px 24px 24px
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
    .dr{
        width: 450px;
        min-height: 250px;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        border-radius: 3px;
        background: #fff;
        /* text-align: center */
    }
    .cx{
        color: #fff!important;
        border:0!important;
        background: #3377ff!important;
    }
    .fc_statuc{
        display: inline-block;
        margin-right: 15px;

    }
    input{
        width: 190px;
        height: 32px;
        padding-left: 10px;
        border-radius: 3px;
    }
    select{
        width: 200px;
        height: 34px;

    }
    .dr_tit{
        width:100%;
        height: 60px;
        text-align: center
    }
    .dr_tit span{
        display: inline-block;
        line-height:60px;
        font-size: 14px;
        font-weight: bold;
        
    }
    .upload-demo{
        display: inline-block;
    }
    .fj{
        font-size: 14px;
        margin-right: 16px; 
        display: inline-block;
        width: 100px;
        text-align: right;   
    }
    a{
        color:#3377ff;
        font-size: 14px;
        margin-left: 16px; 
    }
     .btns{
        margin-top: 24px;
        text-align: center
    }
    .btns span{
            width: 90px;
            height: 36px;
            display: inline-block;
            border:1px solid #ddd;
            text-align: center;
            line-height: 36px;
            border-radius: 3px;
            margin-right: 24px;
            cursor: pointer;
            margin-bottom: 24px;
    }
    .qr{
        background: #3377ff;
        border:0px!important;
        color:#fff;

    }
    .del{
        width: 16px;
        cursor: pointer;
        vertical-align: bottom;
        margin-left: 10px;
    }
    .red{
        color: red;
    }
    .img{
        max-width: 50%;
        max-height:50% ;
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
</style>