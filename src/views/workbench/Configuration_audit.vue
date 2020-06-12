
<template>
<div class="box">
        <div class='screening'>
                <div class='btn_sx'>
                    <span class='cx' v-if='pl==false' @click='addA()'>添加</span>
                    <span class='dc' @click='fh(-1)'>返回</span>
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
                                prop="imei"
                                label="测试机IMEI号">
                        </el-table-column>
                         <el-table-column
                                prop="created_at"
                                label="添加时间">
                        </el-table-column>
                         <el-table-column
                                prop="creator"
                                label="操作人员">
                                  <template slot-scope="scope">
                                      <span>{{tableData[scope.$index].creator==''?'--':tableData[scope.$index].creator}}</span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                
                        >
                            <template slot-scope="scope">
                                <el-button  type="text" size="small" @click="details(scope.row)">删除</el-button>
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
        <div class="bg" v-if="tc">
            <div class='content'>
                <div class='con_tit'>
                    <span>添加</span>
                </div>
                <div class='sel'>
                    <span  class='titName'>IMEI号：</span>
                    <input type="text" style="width:212px" v-model='imei'>
                </div>
                <div class='sel_btn'>
                    <el-button type="primary" @click="pushLib()" :loading="loading">确定</el-button>
                    <!-- <span class="sel_btn_qd" @click="pushLib()">确定</span> -->
                    <!-- <span @click='qx()'>取消</span> -->
                    <el-button @click='qx()' style="margin-right: 15px;">取消</el-button>
                </div>
            </div>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <span>确认是否删除?</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmDel()" :loading="loading">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <loading v-if='load'></loading>
</div>
</template>

<script>
import loading from '../../components/loading'

export default {

components: {loading},
data() {

return {
       tableData:[],
        page:1,
        p:10,
        total:0,
        pl:false,
        tc:false,
        load:true,
        imei:'',
        dialogVisible:false,
        row:'',
        loading:false,
        
};
},

methods: {
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    addA(){
        this.tc = true;
    },
    pushLib(){
        this.loading = true;
        let formData = new FormData
        if(this.$route.query.plid != undefined){
            formData.append('plid',this.$route.query.plid)
        }
        if(this.$route.query.channel != undefined){
            formData.append('channel',this.$route.query.channel)
        }
        formData.append('imei',this.imei)
        this.api.ctrlapi_test_imei_add(formData).then((res)=>{
            if(res!=false){
                this.tc = false;
                this.getData();
                this.loading = false;
                this.imei = '';
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
            }else{
                this.loading = false;
            }
        })
            
    }, 
    confirmDel(){
        this.loading = true;
        let formData = new FormData
        if(this.$route.query.plid != undefined){
            formData.append('plid',this.$route.query.plid)
        }
        if(this.$route.query.channel != undefined){
            formData.append('channel',this.$route.query.channel)
        }
        formData.append('imei',this.row.imei)
        this.api.ctrlapi_test_imei_del(formData).then((res)=>{
            if(res!=false){
                this.dialogVisible = false;
                this.getData();
                this.loading = false;
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            }else{
                this.loading = false;
            }
        })

    },
    plcz(){
        this.pl=true;
    },
    fh(index){
        this.$router.go(index)
    },
    qx(){
        this.tc = false;
        this.imei = '';
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
        jump(){
            this.$router.push({
                path:"./Journal_user"
            })
        },
    
    details(row){
        this.dialogVisible = true;
        this.row = row;      
    },
    getData(){
        let params={
            p:this.p,
            page:this.page,
            channel:this.$route.query.channel,
            plid:this.$route.query.plid,
        }
        this.api.ctrlapi_test_imei({params}).then((res)=>{
            this.tableData=res.data;
            this.total=res.total;
            this.load = false;
        //    this.$previewRefresh()
        })
    },
            
},

created() {
    console.log(this.$route.query.plid)

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    //  this.getChannel();
     this.getData()
},

}
</script>
<style  scoped>
.titName{
    margin-left: 20px;
}
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
        max-height:200px;
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