<template>
 <div>
    <div class="top_name">
            <span class="top_txt">杂志锁屏推送管理</span>
            <div class='right_btn'>
                <span @click='jump()'>账号管理</span>
                <span @click='popup("0")'>新建推送库</span>
            </div>
    </div> 
    <div class='title'>
            <template>
                    <el-table
                            ref="tab"
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            >
                         <el-table-column
                                prop="plid"
                                label="推送库ID">
                        </el-table-column>
                         <el-table-column
                                prop="name"
                                label="推送库名称">
                        </el-table-column>
                        <el-table-column
                                prop="channel.channel"
                                :show-overflow-tooltip="true"    
                                label="渠道">
                        </el-table-column>
                         <el-table-column
                                prop="status"
                                label="功能">
                                  <template slot-scope="scope">
                                     <span v-if="tableData[scope.$index].channel">
                                         {{backfn(tableData[scope.$index].channel)}}
                                    </span>
                                </template>
                        </el-table-column>
                         <el-table-column
                                prop="channel.channel_secret"
                                :show-overflow-tooltip="true"
                                label="渠道授权码">
                        </el-table-column>
                         <el-table-column
                                prop="num"
                                label="今日上线数">
                        </el-table-column>
                         <el-table-column
                                prop="updated_at"
                                label="最后上线时间">
                        </el-table-column>
                         <el-table-column
                                prop="status"
                                label="操作">
                                <template slot-scope="scope">
                                    <el-button type='text' @click='popup("1")'>编辑</el-button>
                                    <el-button type='text' @click="ck()">查看详情</el-button>
                                </template>
                        </el-table-column>
                    </el-table>
            </template>
            <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="page"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="10"
                            layout="sizes, prev, pager, next"
                            :total="total">
                    </el-pagination>
            </div>
    </div> 
    <div class='bg' v-if='show'>
        <div class='addBox'>
            <div class='tit_name'>
                <span>{{this.num==0?"新建推送库":'编辑推送库'}}</span>
            </div>
            <div>
                <span class='name'>推送库名称：</span>
                <input type="text" v-model='name'>
            </div>
            <div>
                <span class='name'>渠道：</span>
                 <!-- <select v-model='channel' :disabled='this.num==1'>
                    <option value="">全部</option>
                    <option :value="item.channel" v-for='item in qdLists'>{{item.channel}}</option>
                </select> -->
                <input type="text" v-model="channel">
            </div>
            <div>
                <span class='name'>功能：</span>
                 <select v-model="audit_type" :disabled='this.num==1'>
                        <option value="1">外部杂志锁屏审核</option>
                        <option value="2">外部投放内容审核</option>
                        <option value="3">内部杂志锁屏管理</option>
                    </select>
            </div>
            <div class='btn_anme'>
                <span @click='ADDlist()'>确认</span>
                <span @click='heidPopup()'>取消</span>
            </div>
        </div>
    </div>
    <!-- <loading v-if='load'></loading> -->
 </div>
</template>

<script>
// import loading from '../../components/loading'
 export default {
//   components:{loading},
   data () {
     return {
            tableData:[],
            p:10,
            page:1,
            total:0,
            num:"",
            show:false,
            qdLists:[],
            audit_type:"",
            channel:"",
            name:"",
            load:true
     }
   },
   mounted(){
       this.getData()
   },
   methods:{
         backfn(n){
            if(!n){return '--'}
            if(n.audit_type ==1){return '外部杂志锁屏审核'}
            if(n.audit_type ==2){return '外部投放内容审核'}
            if(n.audit_type ==3){return '内部杂志锁屏管理'}
        
         },
         getData(){
             this.load=true
             let params = {p:this.p,page:this.page}
             this.api.pushlib_search({params}).then((res)=>{
                 this.tableData=res.data;
                 this.total=res.total;
                 this.load=false
             })
         },
        getRowClass({row, column, rowIndex}) {
            if (rowIndex === 0) {
                return 'background:#f7f9fc;color:#1F2E4D;font-size:14px;font-weight:bold;height:48px;font-family:PingFang-SC-Regular;padding:20px 0px 20px 14px'
            } 
            else {
                return ''
            }
        },
        cell({row, column, rowIndex, columnIndex}){
                return 'padding:15px 14px;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
        },
        popup(index){
            this.show=true;
            this.num=index;
            this.getChannel()
        },
        heidPopup(){
            this.show=false
        },
        getSize(){
            this.api.template_config_size().then((res)=>{
                this.sizeList=res
            })
        },
        handleSizeChange(p) { // 每页条数切换
             this.p = p;
             this.getDate()   
        },
        handleCurrentChange(page) {//页码切换
            this.page = page;
            this.getDate()      
        },
        getChannel(){
                this.api.pushlib_configs_channel().then((res)=>{
                    this.qdLists=res;
                })
        }, 
        jump(){
            this.$router.push({
                path:"./Push_account"
            })
        },
         ADDlist(){
             if(this.channel.match(/^[\u4e00-\u9fa5]+$/)){
                  this.$message.error('渠道不能为中文')
                 return
             }
              if(!this.name){
                  this.$message.error('名称不能为空')
                 return
             }
             if(!this.channel){
                  this.$message.error('渠道不能为空')
                 return
             }
             if(!this.audit_type){
                 this.$message.error('请选择功能')
                 return
             }
             let formData=new FormData;
             formData.append('audit_type',this.audit_type);
              formData.append('name',this.name);
             formData.append('channel',this.channel)
             this.api.pushlib_channel_add(formData).then((res)=>{
                 if(res!=false){
                     this.heidPopup();
                     this.getData();
                 }
             })
         },
         ck(){
             this.$router.push({
                 path:"./Audio_configuration_management"
             })
         },
   },
   components: {

   }
 }
</script>

<style scoped>
      .top_name{
        height: 62px;
        border: 0;
    }
    .top_txt{
        margin-left: 24px;
        font-size:18px;
        font-family:PingFang-SC;
        font-weight:500;
        line-height:62px ;
        color:rgba(31,46,77,1);
    }
    .right_btn{
        display: inline-block;
        float:right;
        margin-right: 20%;
    }
    .right_btn span{
        display: inline-block;
        cursor: pointer;
        text-align: center;
        width:90px;
        height: 36px;
        line-height: 36px;
        border:1px solid #ddd;
        border-radius: 3px;
        margin-left: 24px;
        font-size: 14px;
        margin-top: 14px;
    }
    .title{
        margin-top: 145px;
        background: #fff;
        padding: 24px;
    }
    .bg{
         position: fixed;
        top: 65px;
        bottom: 0;
        right: 0;
        z-index: 999;
        background: rgba(0,0,0,.3);
        width: 100%;
        height: 100%;
    }
    .addBox{
        width: 360px;
        height: 280px;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        border-radius: 5px;
        background: #fff;
    }
    .tit_name{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ddd;
    }
    .tit_name span{
        display: inline-block;
        margin-left: 24px;
        line-height: 50px;
        font-size: 14px;
        font-weight: bold;
    }
    .name{
        display: inline-block;
        width: 90px;
        text-align: left;
        font-size: 14px;
        margin:24px 0 0 24px;
    }
    input{
        width: 195px;
        height: 32px;
        padding-left: 5px;
        border-radius: 3px;
       
    }
    select{
        width: 200px;
        height: 36px;
        border-radius: 3px;
    }
    .btn_anme{
        margin-top: 24px;
        text-align: right;
    }
    .btn_anme span{
        display: inline-block;
        cursor: pointer;
        width: 90px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        border:1px solid #ddd;
        border-radius: 3px;
        margin-right: 24px;
    }
</style>
