
<template>
    <div >    
        <div class='screening'>
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
                <span class='dc' @click='Wx()' v-if='pl==false'>编辑</span>
                <span class='cx' v-if='pl==false' @click='getData()'>查询</span>
            </div>     
        </div>
        <div style="margin-top:250px;background:#fff" class='rePadding'>
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
                            prop="num"
                            label="审核ID">
                        <template slot-scope="scope">
                            <span>{{scope.$index+1}}</span>
                        </template>
                    </el-table-column>
                        <el-table-column
                            prop="status"
                            label="生效状态">
                                <template slot-scope="scope">
                                    <span>{{tableData[scope.$index].status==0?"待审核":tableData[scope.$index].status==1?"审核通过":'审核不通过'}}</span>
                            </template>
                    </el-table-column>
                    <el-table-column
                            prop="audit_status"
                            label="审核状态">
                                <template slot-scope="scope">
                                    <span>{{tableData[scope.$index].audit_status==0?"待审核":tableData[scope.$index].audit_status==1?"审核通过":'审核不通过'}}</span>
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
                            <el-button  type="text" size="small" @click="details(scope.$index,scope.row)">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
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
        <loading v-if='load'></loading>
        <div class="bg" v-if="tc">
            <div class='content'>
                <div class='con_tit'>
                    <span>编辑</span>
                </div>
                <div class='sel'>
                    <div>
                        <span  class='titName'>广告壁纸显示间隔时间：(毫秒)</span>
                        <input type="text" style="width:212px" v-model='show_space_time'>
                    </div>
                    <div>
                        <span  class='titName'>广告壁纸显示频次控制：</span>
                        <input type="text" style="width:212px" v-model='show_count'>
                    </div>
                    <div>
                        <span  class='titName'>壁纸展示间隔次数控制:</span>
                        <input type="text" style="width:212px" v-model='bright_screen_times'>
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
import loading from '../../components/loading'

export default {

components: {loading},
data() {

return {
       
       status:'',
       tableData:[],
        page:1,
        p:10,
        total:0,
        checkList:[],
        pl:false,
        value:[],
        index:'',
        advers:[],
        yy:"",
        load:true,
        tc:false,
        id:'',
        audit_status:'',
        show_space_time:'',
        bright_screen_times:'',
        show_count:'',
};
},

methods: {
    plcz(){
        this.pl=true;
    },
    Wx(){
        this.tc = true;
        this.init();
    },
    pushLib(){
        this.targeted_tags.action.show_space_time = this.show_space_time;
        this.targeted_tags.action.bright_screen_times = this.bright_screen_times;
        this.targeted_tags.action.show_count = this.show_count;
        console.log(this.targeted_tags)
        let formData = new FormData;
        formData.append('plid',this.$route.query.plid);
        formData.append('channel',this.$route.query.channel);
        formData.append('targeted_tags',JSON.stringify(this.targeted_tags));
        this.api.ctrlapi_tags_action_edit(formData).then((res)=>{
            this.getData();
            this.tc = false;
        })

    },
    init(){
        let params={plid:this.$route.query.plid,channel:this.$route.query.channel}
        this.api.ctrlapi_tags_action({params}).then((res)=>{
            if(res != false){
                this.targeted_tags = res;
                this.show_space_time = res.action.show_space_time;
                this.bright_screen_times = res.action.bright_screen_times;
                this.show_count = res.action.show_count;
            }
            

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
            
            qx(){
               this.tc = false;
           }, 
           details(index,row){
                this.$router.push({
                    path:"./Journal_details",
                    query:{
                        plid:this.tableData[index].plid,
                        mfid:this.tableData[index].mfid,
                        adid:this.tableData[index].adid,
                        tags_id:this.tableData[index].tags_id,
                        auditType:this.$route.query.auditType,
                        channel:this.$route.query.channel,
                        row:row,
                        strategy:'Strategyaudit',
                    }
                })
           },
           getData(){
               let params={
                   p:this.p,
                   page:this.page,
                   plid:this.$route.query.plid,
                   audit_status:this.audit_status,
                   id:this.id,
                   channel:this.$route.query.channel,
                   status:this.status
                }
               this.api.ctrlapi_tags_action_search({params}).then((res)=>{
                   this.tableData=res.data;
                   this.total=res.total;
                   this.load = false;
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
        margin-right: 20px
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
        width: 528px;
        max-height:300px;
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
    .sel{
        width: 100%;

    }
    .sel > div{
        width: 100%;
        height: 50px;
    }
    .sel > div > .titName{
        margin-left: 20px;
        width: 200px;
        height: 50px;
        display: block;
        text-align: right;
        float: left;
    }
    
   
</style>