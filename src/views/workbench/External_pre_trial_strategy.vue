
<template>
<div >
        <div class='screening'>
                 <!-- <div class="date"  v-if='pl==false'>
                    <el-date-picker
                            v-model="date"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div> -->
                <span class='qdName' v-if='pl==false'>审核状态</span>
                <select v-model="audit_status" v-if='pl==false'>
                    <option value="">全部</option>
                    <option value="0">待审核</option>
                    <option value="1">审核通过</option>
                    <option value="2">审核不通过</option>
                </select>
                <span class='qdName' v-if='pl==false'>审核ID</span>
                <input type="text" v-model="id">
                <span class='qdName' v-if='pl==false'>生效状态</span>
                <select v-model="status" v-if='pl==false'>
                    <option value="">全部</option>
                    <option value="0">未生效</option>
                    <option value="1">生效中</option>
                </select>
                <div class='btn_sx'>
                    <span class='cx' v-if='pl==false' @click='getData()'>查询</span>
                    <!-- <span class='cz' @click='plcz()' v-if='pl==false'>批量操作</span> -->
                    <!-- <span class='dc' v-if='pl==false'>导出</span> -->
                    <!-- <span class='cz'  v-if='pl' @click='updateStatus("aa")'>审核</span>
                    <span class='dc' @click='Qxplcz()' v-if='pl'>取消</span> -->
                </div>
               
        </div>
        <div style="margin-top:250px;background:#fff;padding-bottom:30px" class='rePadding'>
             <template>
                    <el-table
                            ref="tab"
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            id='padd'
                            @selection-change="handleSelectionChange"
                            >
                          
                        <el-table-column
                                prop="id"
                                label="审核ID">
                            
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="生效状态">
                                  <template slot-scope="scope">
                                      <span>{{tableData[scope.$index].status==0?"未生效":"生效中"}}</span>
                                </template>
                        </el-table-column>
                         <el-table-column
                                prop="status"
                                label="审核状态">
                                  <template slot-scope="scope">
                                      <span>{{tableData[scope.$index].adver_status==0?"待审核":tableData[scope.$index].adver_status==1?"审核通过":'审核不通过'}}</span>
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
                                 <el-button  type="text" size="small" v-if='tableData[scope.$index].adver_status=="0" && pl == false' @click='updateStatus(index,scope.row)'>审核</el-button>
                                 <!-- <el-button v-if='tableData[scope.$index].status!="0"' type="text" size="small">修改结果</el-button> -->
                                <el-button  type="text" size="small" @click="details(scope.$index,scope.row)">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                 <div class="block" style="margin-bottom:0">
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
        <div class="bg" v-if="tc">
            <div class='content'>
                <div class='con_tit'>
                    <span>审核</span>
                </div>
                <div class='sel'>
                    <select v-model="status2">
                        <option value="1">审核通过</option>
                        <option value="2">审核不通过</option>
                    </select>
                    <div class='sel_1' v-if="status2=='2'">       
                        <textarea placeholder="不通过原因,最多20字" maxlength="20" v-model="note"></textarea>
                    </div>
                </div>
                <div class='sel_btn'>
                    <span class="sel_btn_qd" @click="pushLib()">确定</span>
                    <span @click='qx()'>取消</span>
                </div>
            </div>
        </div>
</div>
</template>

<script>


export default {

components: {},
data() {

return {
       qdLists:[], 
       channel:"",
       date:(new Date()).toLocaleDateString().split('/').join('-'),
       status:'',
       tableData:[],
        page:1,
        p:10,
        total:0,
        tc:false,
        status2:1,
        checkList:[],
        pl:false,
        value:[],
        auditData: '',
        index:'',
        advers:[],
        yy:"",
        is_receiver:0,
        id:'',
        audit_status:'',
        note:'',
};
},

methods: {
    switchs(num){
        this.is_receiver=num;     
    },
    getUSER(){
        this.api.pushlib_configs_user_channel().then((res)=>{
            if(res!=false){
                this.channel=res;
                this.getData();
            }    
        })
    },
    pushLib(){ 
        let formData =new FormData;
        formData.append('audit_status',this.status2);
        formData.append('id',this.auditData.id)
        formData.append('note',this.note)
        this.api.ctrlapi_tags_action_audit(formData).then((res)=>{
            if(res!=false){
                this.getData();
                this.qx();
                this.Qxplcz();
                this.index = '';
            }
        })      
    },   
    plcz(){
        this.pl=true;
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
    handleSizeChange(p) { // 每页条数切换
        this.p = p;
        this.getData()
    },
    handleCurrentChange(page) {//页码切换
        this.page = page;
        this.getData()
    },  
    handleSelectionChange(val) {
        this.value= val;
    },  
    updateStatus(index,row){
        this.auditData = row;
        this.tc=true;   
    }, 
    qx(){
        this.tc=false;
        this.status2=1;
        this.checkList=[];
        this.yy=''
    }, 
    details(index,row){
        this.$router.push({
            path:"./External_details",
            query:{
                plid:this.tableData[index].plid,
                mfid:this.tableData[index].mfid,
                adid:this.tableData[index].adid,
                tags_id:this.tableData[index].tags_id,
                channel:this.tableData[index].channel,
                row:JSON.stringify(row),
                auditType:'Externalpretrialstrategy'
            }
        })
    },
    getData(){
        let params={
            p:this.p,
            page:this.page,
        //    plid:this.$route.query.plid,
            audit_status:this.audit_status,
            id:this.id,
            channel:this.channel.channel,
            status:this.status
        }
        this.api.ctrlapi_tags_action_search({params}).then((res)=>{
            this.tableData=res.data;
            this.total=res.total;
        //    this.$previewRefresh()
        })
    },
            
},

created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    //  this.getChannel();
     
     this.getUSER()
    // this.getData();
},

}
</script>
<style  scoped>
  input{
        width: 150px;
        border-radius: 3px;
        height: 30px!important;
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
    position: fixed;
    width: 100%;
    height: 60px;
   left: 256px;
   top:183px;
    background: #fff;
    z-index: 8 !important;
}
.date{
        margin:10px 12px 0 24px;
        display: inline-block;
    }
    .btn_sx{
        display: inline-block;
        float:right;
        margin: 10px 20% 0 0 
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
   .qud{
       display: inline-block;
       padding: 5px;
       border:1px solid  rgba(51,119,255,1);
       text-align: center;
       color: rgba(51,119,255,1);
       border-radius: 5px;
       line-height: 1!important;
       margin-left: 10px;
       position: absolute;
       left: 173px;
       top:47px
   }
    
   
</style>