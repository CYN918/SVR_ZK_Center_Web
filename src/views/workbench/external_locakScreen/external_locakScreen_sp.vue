<template>
    <div class="template">
        <div class='screening'>
            <div class="date" v-if='pl==false'>
                <el-date-picker
                    v-model="date"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    @change="changeDate">
                </el-date-picker>
            </div>
            <span class='qdName' v-if='pl==false'>状态</span>
            <select v-model="status" v-if='pl==false'>
                <option value="">全部</option>
                <option value="0">待审核</option>
                <option value="1">审核通过</option>
                <option value="2">审核不通过</option>
            </select> 
            <div class='btn_sx'>
                <span class='cx' v-if='pl==false' @click='getData()'>查询</span>
                <span class='cz' @click='plcz()' v-if='pl==false'>批量操作</span>
                <!-- <span class='dc' v-if='pl==false'>导出</span> -->
                <span class='cz'  v-if='pl' @click='updateStatus("aa")'>批量审核</span>
                <span class='dc' @click='Qxplcz()' v-if='pl'>取消</span>
            </div> 
        </div>
        <div style="margin-top:85px;background:#fff;padding-bottom:30px" class='rePadding'>
            <template>
                <el-table
                    ref="tab"
                    :data="tableData"
                    style="width: 100%"
                    :header-cell-style="getRowClass"
                    :cell-style="cell"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        v-if='pl'
                        :selectable='checkboxT'
                        width="50">
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        label="序号">
                    </el-table-column>
                    <el-table-column
                        prop="count"
                        label="杂志锁屏">
                        <template slot-scope="scope">
                            <img :src='tableData[scope.$index].mfinal.prev_uri' style="max-width:80px;max-height: 80px;cursor: pointer"  preview="1" />
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="mfid"
                        label="物料ID">      
                    </el-table-column>
                    <el-table-column
                        label="审核状态">
                        <template slot-scope="scope">
                            <span v-if="tableData[scope.$index].audit_status == 0">待审核</span>
                            <span v-if="tableData[scope.$index].audit_status == 1">审核通过</span>
                            <span v-if="tableData[scope.$index].audit_status == 2" style="color:red;">审核不通过</span>
                        </template>
                    </el-table-column>
                        <el-table-column
                        prop="updated_at"
                        label="更新时间">
                    </el-table-column>
                        <el-table-column
                        prop="creator"
                        label="操作人员">
                        <template slot-scope="scope">
                            <span>{{tableData[scope.$index].updator==''?'--':tableData[scope.$index].updator}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope"> 
                            <el-button  type="text" size="small" @click="updateStatus(scope.$index, scope.row)" v-if="tableData[scope.$index].audit_status == 0">审核</el-button>
                            <el-button  type="text" size="small" @click="download(scope.$index, scope.row)">下载</el-button>
                            <el-button  type="text" size="small" v-if="tableData[scope.$index].audit_status == 2" @click="checkreason(scope.$index, scope.row)">查看原因</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page"
                    :page-sizes="[10, 50, 100, 200]"
                    :page-size="p"
                    layout="total, sizes, prev, pager, next, jumper"
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
                    <select v-model="status2" style="margin-left:24px;">
                        <option value="1">审核通过</option>
                        <option value="2">审核不通过</option>
                    </select>
                    <div class='sel_1' v-if="status2=='2'">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="测试不通过" class='aaa'></el-checkbox>
                            <el-checkbox label="内容差"  class='aaa'></el-checkbox>
                            <el-checkbox label="屏蔽竞品"  class='aaa'></el-checkbox>
                            <el-checkbox label=""  class='aaa bb'>
                                <template>
                                    <span style="margin-right:10px">其他</span>
                                    <textarea placeholder="最多20字" maxlength="20" v-model="yy"></textarea>
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
        <div class="bg" v-if="view">
            <div class='content'>
                <div class='con_tit'>
                    <span>查看原因</span>
                </div>
                <div class='sel'>
                    <span style="margin-left: 24px;">{{audit_note}}</span>
                </div>
                <div class='sel_btn'>
                    <span @click='qxView()' style="margin-left: 24px;">取消</span>
                </div>
            </div>
        </div>
        <loading v-if='load'></loading>    
    </div>
</template>

<script>
    import loading from '../../../components/loading'
    export default {
        props:['plid'],
        components: {loading},
        data() {
            return { 
                date:(new Date()).toLocaleDateString().split('/').join('-'),
                tableData:[],
                page:1,
                p:10,
                total:0,
                tc:false,
                status2:"",
                status:'',
                checkList:[],
                value:[],
                yy:"",   
                load:false,  
                pl:false,  
                view:false,   
                audit_note:'',
            };
        },
        methods: {
            changeDate(){

            },
            qxView(){
                this.view = false;
            },
            plcz(){
                this.pl=true;
            },
            download(index,row){
                window.open(row.mfinal.attach_uri);
            },
            checkreason(index,row){
                this.view = true;
                this.audit_note = row.audit_note;
            },
            checkboxT(row, rowIndex){
                if(row.audit_status!=0){
                    return false;//禁用
                }else{
                    return true;//不禁用
                }
            },
            pushLib(){
                if(this.index=='aa'){
                    let array={mfid:""}
                    for(var i=0;i<this.value.length;i++){
                            array.mfid=this.value[i].mfid;
                            this.advers.push(array);
                        }
                        if(!this.status2){
                            this.$message.error('状态不能为空')
                        }
                        let formData =new FormData;
                        formData.append('audit_status',this.status2),
                        formData.append('plid',this.plid),
                        formData.append('tdate',this.date),
                        formData.append('audit_note',this.checkList.join(',')+this.yy) 
                        formData.append('mfids',JSON.stringify(this.advers))
                        this.api.pushlib_oversea_audit(formData).then((res)=>{
                            if(res!=false){
                                this.getData();
                                this.qx();
                                this.Qxplcz();
                                this.advers=[];
                            }
                    })
                }else{
                    let array={mfid:""}
                        array.mfid=this.tableData[this.index].mfid;
                        this.advers.push(array);
                        if(!this.status2){
                                this.$message.error('状态不能为空')
                            }
                        let formData =new FormData;
                        formData.append('audit_status',this.status2),
                        formData.append('plid',this.plid),
                        formData.append('tdate',this.date),
                        formData.append('audit_note',this.checkList.join(',')+this.yy) 
                        formData.append('mfids',JSON.stringify(this.advers))
                            this.api.pushlib_oversea_audit(formData).then((res)=>{
                                if(res!=false){
                                    this.getData();
                                    this.qx();
                                    this.Qxplcz();
                                    this.advers=[];
                                }
                        })
                }
                
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
            deleteRow(index, rows) {
                this.tc = true;
                this.rows = rows;  
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
            getData(){
                this.load = true;
                let params={
                    p:this.p,
                    page:this.page,
                    tdate:this.date,
                    plid:this.plid,
                    status:this.status,
                }
                
                this.api.pushlib_textlink_search({params}).then((res)=>{
                    this.tableData=res.data;
                    this.total=res.total;
                    this.load = false;
                    this.mJs.scTop(0);
                    var a = [];
                    for(let i=0;i<this.tableData.length;i++){
                        a.push(this.tableData[i].mfid);   
                    }
                    this.ids=a.join(';');
                //    this.$previewRefresh()
               })
           },
            
        },

        created() {
        

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.getData();
            console.log(this.plid)
        },

    }
</script>
<style  scoped>
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
       
    }
    .compile{
        position: absolute;
        top:50%;
        left:50%;
        width:550px;
        min-height: 200px;
        max-height: 800px;
        overflow-y: auto;
        background: #fff;
        transform: translate(-50%,-50%);
        border-radius: 5px;
    }
    .ts{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
    }
    .ts span{
        font-size: 14px;
        font-weight: bold;
        margin-left: 24px;
        display: inline-block;
        line-height: 50px;

    }
    .regulation{
        padding: 0 24px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
    }
    .el-input{
        width: 180px;
    }
    .regulation>div{
        margin-bottom: 16px;
    }
    .titName{
        display: inline-block;
        width:140px;
        text-align: right;
    }
    .btn_right{
        display: inline-block;
        float:right;
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
    .top_name{
        height: 100px;
        border: 0;
    }
    .top_txts{
        margin-left: 24px;
        font-size: 18px;
        font-family: PingFang-SC;
        font-weight: 500;
        line-height: 30px;
        color: rgba(31,46,77,1);
        display: block;
        margin-top: 10px;
    }
    .qdName{
        display: inline-block;
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(50,50,50,1);
        margin-left: 40px;
        margin-right: 15px;
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
        margin-top: -10px!important
    }
    .screening{
        position: relative;
        width: 100%;
        height: 60px;
        top:75px;
        background: #fff
    }
    .date{
        margin:10px 12px 0 24px;
        display: inline-block;
    }
    .btn_sx{
        display: inline-block;
        float:right;
        margin: 10px 1% 0 0 
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
        text-align: left;
        margin-top: 35px;
        border-top: 1px solid #ddd;
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
        margin-left: 40px;
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
   .qud1{
       display: inline-block;
       padding: 5px;
       border:1px solid  rgba(51,119,255,1);
       text-align: center;
       color: rgba(51,119,255,1);
       border-radius: 5px;
       line-height: 1!important;
       margin-left: 10px;
       position: absolute;
       left: 270px;
       top:47px
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
    .select{
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
        margin: 10px 20% 0 0;
    }
    .boxT{
        display: block;
        width: 100%;
        height: 100%;  
    }
    .boxT > input{
        display: none;
        width: 80px;
        height: 25px;
    }
    .template >>> .el-textarea{
        width: 100%;
    }
    .template >>> select{
        margin-left: 0px;
    }
    .template >>> .el-button--primary{
        background: #155BD4;
    }
</style>