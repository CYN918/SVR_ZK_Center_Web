
<template>
<div >
        <div class='screening'>
                <!-- <div class="date">
                    <el-date-picker
                            v-model="date"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div> -->
                <span class='qdName' v-if='pl==false'>审核状态</span>
                <select v-model="status" v-if='pl==false'>
                    <option value="">全部</option>
                    <option value="0">待审核</option>
                    <option value="1">审核通过</option>
                    <option value="2">审核不通过</option>
                </select>
                <span class='qdName' v-if='pl==false'>审核ID</span>
                <input type="text" v-model="check_md5" v-if='pl==false'>
                <span class='qdName' v-if='pl==false'>视觉审核标记</span>
                <select v-model="check_status" v-if='pl==false'>
                    <option value="">全部</option>
                    <option value="0">无</option>
                    <option value="1">通过</option>
                    <option value="2">不通过</option>
                </select>
                <div class='btn_sx'>
                    <span class='cx' v-if='pl==false' @click='getData()'>查询</span>
                    <span class='dc' @click='Wx()' v-if='pl==false'>壁纸管理</span>
                </div>
               
        </div>
        <div style="margin-top:85px;background:#fff" class='rePadding'>
             <template>
                    <el-table
                            ref="tab"
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            @selection-change="handleSelectionChange"
                            >
                        <el-table-column
                                prop="check_md5"
                                label="审核ID">
                        </el-table-column>
                        <el-table-column
                                prop="sdkid"
                                label="广告图">
                                <template slot-scope="scope">
                                <img  style="max-width:80px;max-height: 80px;cursor: pointer" v-if="tableData[scope.$index].adver" :src='tableData[scope.$index].adver.pict_url' preview="1" />
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="count"
                                label="落地页">
                                 <template slot-scope="scope">
                                <a  target="_blank" :href='tableData[scope.$index].adver.click_url' v-if='tableData[scope.$index].adver' style="text-decoration: none;color: #66b1ff" >点击查看</a>
                                <a  v-if='!(tableData[scope.$index].adver)'>--</a>
                            </template>
                        </el-table-column>
                         <el-table-column
                                prop="count"
                                label="杂志锁屏">
                                <template slot-scope="scope">
                                <img :src='tableData[scope.$index].mfinal.prev_uri' style="max-width:80px;max-height: 80px;cursor: pointer"  preview="1" />
                            </template>
                        </el-table-column>
                         <el-table-column
                                prop="status"
                                label="状态">
                                  <template slot-scope="scope">
                                      <span>{{tableData[scope.$index].adver_status==0?"待审核":tableData[scope.$index].adver_status==1?"审核通过":'审核不通过'}}</span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                prop="check_status"
                                label="视觉审核标记">
                                  <template slot-scope="scope">
                                      <span>{{tableData[scope.$index].check_status==0?"无":tableData[scope.$index].check_status==1?"通过":'不通过'}}</span>
                                </template>
                        </el-table-column>
                         <el-table-column
                                prop="updated_at"
                                label="更新时间">
                        </el-table-column>
                         <el-table-column
                                prop="updator"
                                label="操作人员">
                                  <template slot-scope="scope">
                                      <span>{{tableData[scope.$index].updator==''?'--':tableData[scope.$index].updator}}</span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                
                        >
                            <template slot-scope="scope">
                                 <!-- <el-button  type="text" size="small" v-if='tableData[scope.$index].status=="0"' @click='updateStatus(index)'>审核</el-button> -->
                                 <!-- <el-button v-if='tableData[scope.$index].status!="0"' type="text" size="small">修改结果</el-button> -->
                                <el-button  type="text" size="small" @click="details(scope.$index)">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                 <div class="block">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="page"
                        :page-sizes="[50, 100, 200, 500]"
                        :page-size="p"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                 </div>
        </div>
        <div class="bg" v-if="tc">
            <div class='content'>
                <div class='con_tit'>
                    <span>更新状态</span>
                </div>
                <div class='sel'>
                    <select v-model="status2">
                        <option value="1">已上线</option>
                        <option value="2">拒绝上线</option>
                    </select>
                    <div class='sel_1' v-if="status2=='拒绝上线'">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="测试不通过" class='aaa'></el-checkbox>
                            <el-checkbox label="内容差"  class='aaa'></el-checkbox>
                            <el-checkbox label="屏蔽竞品"  class='aaa'></el-checkbox>
                            <el-checkbox label="其他"  class='aaa bb'>
                                <template>
                                    <span style="margin-right:10px">其他</span>
                                    <textarea placeholder="最多20字" maxlength="20"  v-model="yy"></textarea>
                                </template>
                            </el-checkbox>
                        </el-checkbox-group>
                        
                    </div>
                </div>
                <div class='sel_btn'>
                    <span class="sel_btn_qd" @click="pushLib()">确定</span>
                    <span @click='qx()'>取消</span>
                </div>
            </div>
        </div>
        <loading v-if='load'></loading>
</div>
</template>

<script>
import loading from '../../components/loading'

export default {

components: {loading},
data() {

return {
       qdLists:[], 
       channel:"",
       date:(new Date()).toLocaleDateString().split('/').join('-'),
       status:'',
       tableData:[],
        page:1,
        p:50,
        total:0,
        tc:false,
        status2:"",
        checkList:[],
        pl:false,
        value:[],
        index:'',
        advers:[],
        yy:"",
        load:true,
        check_md5:'',
        check_status:'',
};
},

methods: {
    Wx(){
        this.$router.push({
            path:"./journal_nb",
            query:{
                channel:this.$route.query.channel,
                plid:this.$route.query.plid,
                type:'meizu_first',
            },
        })

    },
     pushLib(){
          if(this.index=='aa'){
                    let array={plid:"",adid:"",mfid:"",tags_id:""}
                    for(var i=0;i<this.value.length;i++){
                            array.plid=this.value[i].plid;
                            array.adid=this.value[i].adid;
                            array.mfid=this.value[i].mfid;
                            array.tags_id=this.value[i].tags_id;
                            this.advers.push(array);
                        }
                        if(!this.status2){
                             this.$message.error('状态不能为空')
                        }
                        let formData =new FormData;
                        formData.append('status',this.status2),
                        formData.append('note',this.checkList.join(',')+this.yy) 
                        formData.append('advers',JSON.stringify(this.advers))
                        this.api.pushlib_adver_mfinal_audit(formData).then((res)=>{
                            if(res!=false){
                                this.getData();
                                this.qx();
                                this.Qxplcz();
                            }
                    })
               }else{
                   let array={plid:"",adid:"",mfid:"",tags_id:""}
                     array.plid=this.tableData[this.index].plid;
                     array.adid=this.tableData[this.index].adid;
                     array.mfid=this.tableData[this.index].mfid;
                     array.tags_id=this.tableData[this.index].tags_id;
                    this.advers.push(array);
                       if(!this.status2){
                             this.$message.error('状态不能为空')
                        }
                     let formData =new FormData;
                      formData.append('status',this.status2),
                        formData.append('note',this.checkList.join(',')+this.yy) 
                        formData.append('advers',JSON.stringify(this.advers))
                        this.api.pushlib_adver_mfinal_audit(formData).then((res)=>{
                            if(res!=false){
                                this.getData();
                                this.qx();
                                this.Qxplcz();
                            }
                    })
               }
            
           },   
    plcz(){
        this.pl=true;
    },
    fh(){
        this.$router.push({
            path:"./journal_list"
        })
    },
    Qxplcz(){
        this.pl=false;
       if(this.value.length>0){
            this.tableData.map((option) => {
                    this.$refs.tab.toggleRowSelection(option);
                })
       }else{
           this.value=[];
       }
       
    },
    getChannel(){
                    this.api.pushlib_configs_channel().then((res)=>{
                        this.qdLists=res;
                    })
    },
    checkboxT(row, rowIndex){
        if(row.status!=0){
          return false;//禁用
        }else{
          return true;//不禁用
        }
      },

     getRowClass({row, column, rowIndex}) {
        if (rowIndex === 0) {
            return 'background:#f7f9fc;color:#1F2E4D;font-size:14px;font-weight:bold;height:48px;font-family:PingFang-SC-Regular;text-align: center;'
        } 
        else {
            return ''
        }
    },
            cell({row, column, rowIndex, columnIndex}){
                return 'color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;text-align: center;'
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.page = 1;
                this.getData();   
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getData();
            },  
             handleSelectionChange(val) {
                this.value= val;
             },  
             jump(){
                 this.$router.push({
                     path:"./Journal_user"
                 })
             },
              updateStatus(index){
                this.advers=[];
                if(index=='aa'&&this.value.length==0){
                    return
                }
               this.tc=true;
               if(index==''){
                   this.index=0;
               }else{
                   this.index=index;
               }
              
               
               
           }, 
            qx(){
               this.tc=false;
               this.status2='';
               this.checkList=[];
           }, 
           details(index){
                this.$router.push({
                    path:"./Journal_details",
                    query:{
                        plid:this.tableData[index].plid,
                        mfid:this.tableData[index].mfid,
                        adid:this.tableData[index].adid,
                        tags_id:this.tableData[index].tags_id,
                        auditType:this.$route.query.auditType,
                    }
                })
           },
           getData(){
               this.load = true;
               let params={
                   p:this.p,
                   page:this.page,
                //    tdate:this.date,
                   channel:this.$route.query.channel,
                   status:this.status,
                   check_status:this.check_status,
                   check_md5:this.check_md5
                }
               this.api.pushlib_adver_mfinal_list({params}).then((res)=>{
                   this.tableData=res.data;
                   this.total=res.total;
                   this.load = false;
                   this.mJs.scTop(0);
                //    this.$previewRefresh()
               })
           },
            
},

created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    //  this.getChannel();
     this.getData()
},

}
</script>
<style  scoped>
    input{
        width: 150px;
        border-radius: 3px;
        height: 35px!important;
        padding-left: 3px!important;
        border: 1px solid rgba(211,219,235,1)!important;
        margin-left: 20px;
    }
.qdName{
    display: inline-block;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(50,50,50,1);
    margin-left: 40px
}
 select{
    margin-left: 20px;
    width: 200px;
    height: 36px;
    border-radius: 5px;
}
.userGl{
    float: right;
    display: inline-block;
    height: 36px;
    text-align: center;
    line-height: 36px;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid rgba(211,219,235,1);
    width: 144px;
    background: rgba(242,246,252,1);
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(61,73,102,1);
    margin: 10px 20% 0 0 
}
.screening{
    position: relative;
    width: 100%;
    height: 60px;
    line-height: 60px;
   top:75px;
    background: #fff;
}
.date{
        margin:10px 12px 0 24px;
        display: inline-block;
    }
    .btn_sx{
        display: inline-block;
        float:right;
        margin: 0px 80px 0 0;
    }
    .cx{
        display: inline-block;
        height: 36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
        width: 68px;
        background: rgba(51,119,255,1);
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255,255,255,1);
        margin-right: 20px;
    }
    .cz,.dc{
            display: inline-block;
        height: 36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
            width: 144px;
        background: rgba(242,246,252,1);
        border: 1px solid rgba(211,219,235,1);
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(61,73,102,1);
    }
    .dc{
        width: 68px!important;
        margin-left: 20px
    }
     .bg{
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
    }
    .content{
        width: 400px;
        max-height:400px;
        position: absolute;
        top:30%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 10px;
    }
    .con_tit{
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #ddd;
    }
    .con_tit span{
        display: inline;
        margin-left: 24px;
        display: inline-block;
        line-height: 40px;
        font-size: 18px;
        font-weight: 500;
    }
    .sel{
        margin: 20px 0;
    }
    .sel select{
        width: 200px;
        height: 36px;
        margin-left: 24px;
        border-radius: 5px;
    }
    .sel_1{
        margin: 30px 0 0px 24px;
    }
    .aaa{
          display: block!important;
      margin: 0 0 15px 0 !important
    }
     .bb span{
        vertical-align: top;
    }
   .bb textarea{
       padding: 5px
   }
   .sel_btn{
       width: 100%;
       height: 50px;
       text-align: right;
   }
   .sel_btn span{
    margin-right: 24px;
    display: inline-block;
    width: 68px;
    height: 36px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border: 1px solid rgba(211,219,235,1);
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(61,73,102,1);
    line-height: 36px;
    cursor: pointer;
    text-align: center;
    margin-top: 7px
   }
   .sel_btn_qd{
       border: 0!important;
    background: rgba(51,119,255,1)!important;
    color: rgba(255,255,255,1)!important;
   }
    .top_txt{
        cursor: pointer; margin-left: 24px;
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153,153,153,1);
        line-height: 20px!important;
        margin-top: 15px
    }
    
   
</style>