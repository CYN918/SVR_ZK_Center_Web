<template>
 <div>
    <div>
        <div class="top_name">
            <span class="top_txt" @click='fh(-1)'>杂志锁屏推送审核管理&nbsp;/&nbsp; 账号管理</span>
            <div class="title_left">
                <span> 账号管理</span>
            </div>
            <span class='right_btn' @click="getShow('aa')">添加外部账号</span>
        </div>
        <div class='title'>
            <div>
                <span class='headline'>关键词：</span>
                <input type="text" >
                <span class='headline'>渠道：</span>
                <select v-model='channel'>
                    <option value="">全部</option>
                    <option :value="item.channel" v-for='item in qdLists'>{{item.channel}}</option>
                </select>
                <span class='right_btn cx' @click='getData()'>查询</span>
            </div>
            <template>
                <el-table
                        :data="list"
                        style="width: 100%"
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
                >
                    <el-table-column
                            prop="num"
                            label="序号">
                        <template slot-scope="scope">
                            <span>{{scope.$index+1+((page-1)*p)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="user.email"
                            label="账号">
                    </el-table-column>
                    <el-table-column
                            prop="channel.channel"
                            label="渠道">
                    </el-table-column>

                    <el-table-column
                            label="操作"
                            width="150"
                    >
                        <template slot-scope="scope">
                            <el-button  type="text"  @click="getShow(scope.$index)"  size="small">编辑</el-button>
                            <el-button  type="text"    size="small" @click="del()">删除</el-button>
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
    </div>
     <div class="bg" v-if="show">
            <div class="bg_con">
                <div class="tit_con">
                    <span>{{name}}外部账号</span>
                </div>
                 <div class="set">
                    <span>角色</span>
                    <select v-model="role" @change="getRoleUser()" disabled v-if="this.name=='编辑'">
                        <option v-for='(item,index) in user' :value="item.role_id" >{{item.role_name}}</option>
                    </select>
                     <select v-model="role" @change="getRoleUser()" v-if="this.name=='添加'">
                        <option v-for='(item,index) in user' :value="item.role_id" >{{item.role_name}}</option>
                    </select>
                </div>
                <div class="set">
                    <span>账号</span>
                    <select v-model="email" disabled v-if="this.name=='编辑'">
                        <option :value="da.email" v-for='(da,key) in userEmail'>{{da.email}}</option>
                    </select>
                    <select v-model="email" v-if="this.name=='添加'">
                        <option :value="da.email" v-for='(da,key) in userEmail'>{{da.email}}</option>
                    </select>
                </div>
                <div class="set">
                    <span>分配渠道</span>
                    <select v-model="channel">
                        <option :value="item.channel" v-for="item in qdLists">{{item.channel}}</option>
                    </select>
                </div>
                <div class="bg_btn">
                    <span class="qd" @click="addUser()">确定</span>
                    <span @click="heidShow()">取消</span>
                </div>
            </div>
        </div>
        <div class='bg' v-if='remove'>
            <div class='del'>
                <div class='del_tit'>
                    <span>删除</span>
                </div>
                <div style="padding:0px 0 24px 24px">
                    <span>删除后，该账号在该功能内权限对应删除，是否确认？</span>
                </div>
                <div class="bg_btn">
                    <span class="qd" >确定</span>
                    <span @click="qx()" style="margin-right:24px">取消</span>
                </div>
            </div>
        </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
            tableData:[],
            p:10,
            page:1,
            total:0,
            show:false,
            name:"",
            role:"",
            email:"",
            channel:"",
            qdLists:[],
            userEmail:[],
            user:[],
            list:[],
            remove:false
            
     }
   },
   mounted(){
       this.getData()
   },
   methods:{
       getData(){
                let params = {p:this.p,page:this.page};
                this.api.pushlib_configs_channel_user_list({params}).then((res)=>{
                    this.list=res.data;
                    this.total=res.total;
                    this.getChannel()
                })
        },
        fh(index){
            this.$router.go(index)
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
        getSize(){
            this.api.template_config_size().then((res)=>{
                this.sizeList=res
            })
        },
        handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getData()
        },
        handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getData()
        },
        getShow(index){
            
                if(index!='aa'){
                    this.name='编辑';
                    this.role=this.list[index].role.role_id;
                    this.email=this.list[index].user.email;
                    this.channel=this.list[index].channel.channel;
                    this.getExternalUser();
                    this.getRoleUser()
                }else {
                    this.name='添加';
                    this.getExternalUser();
                }
                this.show=true;
               
        },
         getRoleUser(){
                let params={role_id:this.role,p:100,page:1}
                this.api.role_user_list({params}).then((res)=>{
                    this.userEmail=res.data;
                })
        },
        getChannel(){
                this.api.pushlib_configs_channel().then((res)=>{
                    this.qdLists=res;
                })
        },
         getExternalUser(){
                this.api.role_external_roles().then((res)=>{
                    this.user=res;
                })
            },
        heidShow(){
                this.show=false;
                this.userEmail=[];
                this.user=[];
                this.role='';
                this.channel='';
                this.email=''
        },
        addUser(){
                if(!this.role){ 
                    this.$message.error('角色不能为空')
               }
               if(!this.channel){
                   this.$message.error('渠道不能为空')
               }
                if(!this.email){
                    this.$message.error('邮箱不能为空')
                }
                let formData = new FormData;
                formData.append('email',this.email);
                formData.append('channel',this.channel);
                formData.append('role_id',this.role);
                this.api.pushlib_configs_channel_user_add(formData).then((res)=>{
                    this.getData();
                    this.heidShow()
                })
        },
        del(){
            this.remove=true
        },
        qx(){
            this.remove=false
        },    
   },
   components: {

   }
 }
</script>

<style scoped>

    .top_name{height: 112px}
    .top_txt,.title_left span{
        margin-left: 24px;
    }
    .top_txt{cursor: pointer;}
    .title{
        margin-top: 145px;
        background: #fff;
        padding: 24px;
    }
    .title_left span{
        font-weight: bold;
    }
    .right_btn{
        float:right;
        margin-right: 20%;
         display: inline-block;
        cursor: pointer;
        text-align: center;
        width:100px;
        height: 36px;
        line-height: 36px;
        background: #3377ff;
        color:#FFF;
        border-radius: 3px;
        margin-left: 24px;
        font-size: 14px;
        margin-top: -30px;
    }
    .cx{
        margin-top: 0!important;
        width: 90px!important;
        margin-right: auto!important;
    }
    .title{
        margin-top: 196px;
        padding: 24px;
    }
    .headline{
        display: inline-block;
        font-size: 14px;

    }
    input{
        width: 195px;
        padding-left: 5px;
        height: 32px;
        margin-right: 30px;
        border-radius: 3px;
    }
    select{
        width: 200px;
        height: 36px;
        border-radius: 3px;
        margin-bottom: 40px;
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
    .bg_con{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        padding: 20px;
        width:450px;
        min-height:203px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
    }
    .tit_con{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-bottom: 20px;
    }
    /* .set{
       margin-bottom: 20px;
    } */
    .set span{
        display: inline-block;
        font-size:14px;
        width: 60px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        margin-right: 14px;
    }
    .set input{
        width:341px;
        height:36px;
        padding-left: 14px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .set select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .bg_btn{text-align: right}
    .bg_btn span{
        display: inline-block;
        width:80px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        line-height: 36px;
        text-align: center;
        cursor: pointer;
    }
    .qd{
        background:rgba(51,119,255,1)!important;
        color: #fff!important;
        border: 0!important;
        margin-right: 20px;
    }
    .log_url{
        cursor: pointer;
    }
    .del_tit{
        height:50px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 30px;
    }
    .del_tit span{
        display: inline-block;
        line-height: 50px;
        font-size: 14px;
        font-weight: bold;
        margin-left: 24px;
    }
    .del{
        width: 400px;
        height: 200px;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        background: #fff;
        border-radius: 5px;
    }
</style>
