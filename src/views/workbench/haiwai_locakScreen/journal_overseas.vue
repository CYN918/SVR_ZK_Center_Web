
<template>
<div class="template">
       <div class="top_name">
                
                <span class="top_txt" @click='fh(-1)'>杂志锁屏推送审核管理  / 下发内容管理</span><div style="width:0;height:0;"><br/></div>
                <span class="top_txts" style="width: 113px;display: inline-block;">上线内容管理</span>
               
               
                <!-- <span class='qdName'>渠道</span>
                <select v-model="channel">
                        <option :value="item.channel" v-for="item in qdLists">{{item.channel}}</option>
                </select> -->
                <span class='qud'>{{this.$route.query.channel}}</span>
                
                <span class='userGl' v-if="new Date(this.date)>=new Date(new Date().getTime() - 24*60*60*1000)" @click='addWl()' style="margin: 0px 20% 0 0;">添加物料</span>
                <span class="userGl" v-if="new Date(this.date)>=new Date(new Date().getTime() - 24*60*60*1000)" @click='jump()' style="margin: 0px 1% 0 0;">一键确认</span>
                <!-- <span class="userGl" style="margin: 0px 1% 0 0;" @click="getShow()">预警设置</span> -->

        </div>
        <div class='screening'>
                <div class="date">
                    <el-date-picker
                            v-model="date"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            @change="changeDate">
                    </el-date-picker>
                </div>
                <span class='qdName'>数量:</span>
                <span>{{this.total}}</span>
                <span class="dated" v-if="new Date(this.date)<=new Date(new Date().getTime() - 24*60*60*1000)">(已过期)</span>
               
        </div>
        <div style="margin-top:85px;background:#fff;padding-bottom:30px" class='rePadding'>
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
                                prop="id"
                                label="序号">
                        </el-table-column>
                        <el-table-column
                                label="权重"
                                v-if="new Date(this.date)<=new Date(new Date().getTime() - 24*60*60*1000)">
                            <template slot-scope="scope">
                                <div><span :id='"isShow"+scope.$index'>{{tableData[scope.$index].weight}}</span></div>
                            </template>
                        </el-table-column>   
                        <el-table-column
                                label="权重"
                                v-if="new Date(this.date)>=new Date(new Date().getTime() - 24*60*60*1000)">
                            <template slot-scope="scope">
                                <div class="qzCk" @mouseover="leaver(scope.$index)">
                                    <div :id='"isShow"+scope.$index'>{{tableData[scope.$index].weight}}<i class="el-icon-edit" style="font-size: 30px;cursor: pointer;" @click="icon_click(scope.$index,scope.row)"></i></div>
                                    <div class="boxT"><input :id='"pro"+scope.$index' v-model="theWeight" @blur="InputClick(scope.$index)"/></div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="count"
                                label="杂志锁屏"
                                >
                                <template slot-scope="scope">
                                <img :src='tableData[scope.$index].mfinal.prev_uri' style="max-width:80px;max-height: 80px;cursor: pointer"  preview="1" />
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="mfid"
                                label="物料ID">
                                
                        </el-table-column>
                        
                        <el-table-column
                                label="文字链">
                                 <template slot-scope="scope">
                                    <span @click='checkAdd(scope.$index, scope.row)' style="cursor: pointer;color: #3377ff;">点击查看</span>
                                    
                                </template>
                        </el-table-column>
                        <el-table-column
                            prop="is_copyright"
                            
                            label="版权来源">
                            <template slot-scope="scope">
                                <el-switch
                                    v-if="scope.row.mfinal.type == 'f_sls_picture'"
                                    class="tablescope"
                                    :active-value="1"
                                    :inactive-value="0"
                                    active-color="#3377ff"
                                    inactive-color="#e6e9f0"
                                    v-model="scope.row.is_copyright"
                                    inactive-text="隐藏"
                                    active-text="显示"
                                    @change='changeStatus(scope.$index,scope.row.is_copyright)'>
                                </el-switch>
                                <span v-if="scope.row.mfinal.type != 'f_sls_picture'">--</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="配置状态">
                                  <template slot-scope="scope">
                                      <span v-if="tableData[scope.$index].status == 0">待确认</span>
                                      <span v-if="tableData[scope.$index].status == 2">已确认</span>
                                      <span v-if="tableData[scope.$index].status == 3" style="color:red;">已过期</span>
                                </template>
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
                                label="操作" 
                                fixed="right"
                                v-if="new Date(this.date)>=new Date(new Date().getTime() - 24*60*60*1000)">
                            <template slot-scope="scope">
                                 <!-- <el-button  type="text" size="small" v-if='tableData[scope.$index].status=="0"' @click='updateStatus(index)'>审核</el-button> -->
                                 <!-- <el-button v-if='tableData[scope.$index].status!="0"' type="text" size="small">修改结果</el-button> -->
                                <el-button  type="text" size="small" v-if="tableData[scope.$index].audit_status == 2" @click="checkreason(scope.$index, scope.row)">查看原因</el-button>
                                <el-button  type="text" size="small" @click="details(scope.row)">管理文字链</el-button>
                                <el-button  type="text" size="small" @click="deleteRow(scope.$index, scope.row)">移除</el-button>
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
        
        <div class="bg" v-if="template">
            <div class='content' style="width: 600px;">
                <div class='con_tit'>
                    <span>查看文字链</span>
                    <i class="el-icon-close" @click="closeBg" style="float: right;margin-right: 20px;margin-top: 10px;font-size: 24px;"></i>
                </div>
                <div class='sel'>
                    <span style="margin-left: 24px;width: 100px;">标题：</span>
                    <span>{{title}}</span>
                    
                    
                </div>
                <div class='sel'>
                    <span style="margin-left: 24px;width: 100px;">内容描述：</span>
                    <span>{{content}}</span>

                </div>
                <div class='sel'>
                    <span style="margin-left: 24px;width: 100px;">跳转链接：</span>
                    <span>{{url}}</span>
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
        
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            :showClose="showClo"
            :before-close="handleClose"
            width="30%">
            <span>确认将该物料从该投放库移除吗?</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="surRemove">确 认</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="一键确认"
            :visible.sync="confirmVisible"
            :showClose="showClo"
            :before-close="handleClose"
            width="30%">
            <span>将所有待确认状态的内容状态更新为已确认(已确认的内容会按排期下发到客户端)</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmSur">确 认</el-button>
                <el-button @click="confirmVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="管理文字链"
            :visible.sync="textVisible"
            width="40%"
            :showClose="showClo"
            :close-on-click-modal='false'
            :before-close="handleClose">
            <el-form label-width="120px">
                <el-form-item label="文字链类型:">
                    <select v-model="click_action">
                        <option value="3">本地资源</option>
                        <option value="0">三方资源</option>
                    </select>
                </el-form-item>
                <el-form-item label="分类:" v-if="click_action == '0'">
                    <select v-model="classFl"   @change="changeCk($event)">
                        <option v-for="(item,key) in arrObj" :value="key">{{item}}</option>
                    </select>
                </el-form-item>
                <el-form-item label="标题:" v-if="click_action == '3'">
                    <el-input type="text" maxlength="13"  placeholder="最多13字" show-word-limit v-model="title"></el-input>
                </el-form-item>
                <el-form-item label="内容描述:" v-if="click_action == '3'">
                    <el-input type="textarea" maxlength="44"  placeholder="最多44字" show-word-limit  v-model="content"></el-input>
                </el-form-item>
                <el-form-item label="跳转链接:" v-if="click_action == '3'">
                    <el-input v-model="url"></el-input>
                </el-form-item>
                <div v-if="click_action == '0'">
                    <el-table
                        :data="threeData"
                        height="400"
                        border
                        stripe
                        ref="threeData"
                        @row-click="singleElection">
                        <el-table-column label="" width="65">
                            <template slot-scope="scope">
                                <el-radio class="radio" v-model="templateSelection" :label="scope.$index">&nbsp;</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column label="标题"  :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <span v-if="threeData[scope.$index].title!=''">{{threeData[scope.$index].title}}</span>
                                <span v-if="threeData[scope.$index].title==''">--</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="内容摘要" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <span v-if="threeData[scope.$index].content!=''">{{threeData[scope.$index].content}}</span>
                                <span v-if="threeData[scope.$index].content==''">--</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="落地页">
                            <template slot-scope="scope">
                                <a :href="threeData[scope.$index].url" target="_blank" style="text-decoration: none;color: #66b1ff" v-if="threeData[scope.$index].url!=''">点击查看</a>
                                <a  v-if="threeData[scope.$index].url==''">-</a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- <el-pagination
                        @size-change="handleSizeChange1"
                        @current-change="handleCurrentChange1"
                        :current-page.sync="page"
                        :page-size="p"
                        layout="total, prev, pager, next"
                        :total="total1">
                    </el-pagination> -->

                </div>
                
                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="savePage">保存</el-button>
                <el-button @click="cancelTx">取消</el-button>
            </span>
        </el-dialog>
        <ADDWL v-if="ADDwl" @listenToChildEvent="listenToChildEvent" :date="date" :channel='channel' :material="material" :ids='ids' :gdsrc="gdsrc" :audit_type="6"></ADDWL>
        <loading v-if='load'></loading>
        
</div>
</template>

<script>
import loading from '../../../components/loading'
import ADDWL from '../Jounrnal_select'
export default {

components: {ADDWL,loading},
data() {

return {
       qdLists:[], 
       plid:this.$route.query.plid,
       channel:this.$route.query.channel,
       material:3,
       date:(new Date()).toLocaleDateString().split('/').join('-'),
       date1:(new Date()).toLocaleDateString().split('/').join('-'),
       status:'',
       tableData:[],
        page:1,
        p:10,
        total:0,
        status2:"",
        checkList:[],
        pl:false,
        value:[],
        index:'',
        advers:[],
        yy:"",
        dialogVisible: false,
        confirmVisible:false,
        showClo:false,
        ADDwl:false,
        textVisible:false,
        isShow:true,
        title: '',
        content: '',
        click_action:3,
        url: '',
        theWeight:'',
        rouelForm:{},
        textlink:[],
        rows:{},
        rowData:{},
        pkgname:'',
        deeplink:'',
        download_url:'',
        load:true,
        num: 1,
        amount: 1,
        content:'',
        value1: new Date(),
        ids:'',
        gdsrc:'',
        options:[],
        valueTs:'',
        threeData:[],
        templateSelection:'',
        classFl:'',
        arrObj:{},
        total1:0,
        view:false,
        audit_note:'',
        template:false,
};
},

methods: {
    closeBg(){
        this.template = false;
    },
    handleSizeChange1(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1(val) {
        console.log(`当前页: ${val}`);
    },
    checkAdd(index,row){
        console.log(row)
        this.template = true;
        this.url = row.url;
        this.title = row.title;
        this.content = row.content;

    },
    changeCk(event){
        let params={
            type:this.classFl,
        }  
        this.api.pushlib_oversea_textlink_list({params}).then((res)=>{
            console.log(res)
            this.threeData=res;   
            // this.total1 = res.length;    
        })
    },
    init(){
        this.api.pushlib_oversea_textlink_type_list().then((res)=>{
            if(res != false){
                this.arrObj = res;
                // for(let key in obj){
                //     console.log(key + '---' + obj[key])
                //     this.textlinkData.push(obj[key])
                // }      
            }    
        })
    },
    
    singleElection (row) {
        console.log(row)
    },
    
    
    qxView(){
        this.view = false;
    },
    checkreason(index,row){
        this.view = true;
        this.audit_note = row.audit_note;
    },
    changeStatus(a,b){
        this.api.pushlib_textlink_iscopyright_edit({tdate:this.tableData[a].tdate,is_copyright:b,sub_plid:this.sub_plid,plid:this.plid,mfid:this.tableData[a].mfinal.mfid}).then((res)=>{
            if(res != false){
                this.$parent.getData1();
            }
        })
    },
    handleChange(value) {
        console.log(value);
    },
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    //一键确认
    confirmSur(){
        let formData =new FormData;
        formData.append('plid',this.plid);
        formData.append('tdate',this.date);
        this.api.pushlib_textlink_audit(formData).then((res)=>{
            this.confirmVisible = false;
            this.getData()
        })
    },
    dJ(index){
        document.getElementById('isShow'+index).style.display = 'block';
        document.getElementById('pro'+index).style.display = 'none';
    },
    changeDate(val){
        this.page = 1;
        this.getData();
    },
    icon_click(index,rows){
        // console.log(rows)
        document.getElementById('isShow'+index).style.display = 'none';
        document.getElementById('pro'+index).style.display = 'block';
        this.theWeight = rows.weight;
        this.rouelForm = rows;
    },
    leaver(index){

    },
    InputClick(index){
        if(this.theWeight > 999 || this.theWeight < 0){
            this.$message.error('权重值范围限制为0~999')
            return false
        }
        let formData =new FormData;
        formData.append('plid',this.rouelForm.plid);
        formData.append('tdate',this.date);
        formData.append('mfid',this.rouelForm.mfid);
        formData.append('weight',this.theWeight);
        formData.append('title',this.rouelForm.title);
        formData.append('content',this.rouelForm.content);
        formData.append('url',this.rouelForm.url);
        this.load = true;
        this.api.pushlib_textlink_edit_weight(formData).then((res)=>{
            if(res==false){this.load = false;return}
            this.load = false;
            document.getElementById('isShow'+index).style.display = 'block';
            document.getElementById('pro'+index).style.display = 'none';
            this.getData()
        })
    },
    addWl(){
       this.ADDwl = true;
    },
    heidWL(){
        this.ADDwl = false;
    },
    array_diff(a, b) {
        for (var i = 0; i < b.length; i++) {
            for (var j = 0; j < a.length; j++) {
                if (a[j] == b[i]) {
                    a.splice(j, 1);
                    j = j - 1;
                }
            }
        }
        return a;
    },
    listenToChildEvent(id,date,ids){
        console.log(this.array_diff(id, ids.split(';')))
        let arr = this.array_diff(id, ids.split(';'));
        let formData =new FormData;
        formData.append('plid',this.$route.query.plid);
        formData.append('tdate',date);
        formData.append('bind_mfid',JSON.stringify(arr));
        this.api.pushlib_textlink_add(formData).then((res)=>{
            this.heidWL();
            this.getData()
        })
    },
     
    plcz(){
        this.pl=true;
    },
    fh(index){
        this.$router.go(index)
    },
    // fh(){
    //     this.$router.push({
    //         path:"./journal_list",
    //         query:{
    //             channel:this.$route.query.channel,
    //             plid:this.$route.query.plid,
    //         },
    //     })
    // },
    // fhs(){
    //     this.$router.push({
    //         path:"./journal_list"
    //     })
    // },
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
                 this.confirmVisible = true;          
             },
             remove(){
                 this.dialogVisible = true;
             },
             surRemove(){
                //  console.log(this.rows)
                let formData =new FormData;
                 
                let array={plid:"",mfid:"",tdate:""}
                     array.plid=this.rows.plid;
                     array.mfid=this.rows.mfid;
                     array.tdate=this.date;
                   this.textlink.push(array); 
                   formData.append('textlink',JSON.stringify(this.textlink))
                   formData.append('plid',this.plid)
                    this.api.pushlib_textlink_del(formData).then((res)=>{
                        this.dialogVisible = false;
                        this.textlink = [];
                        this.getData();
                    })

             },
             deleteRow(index, rows) {
                 this.dialogVisible = true;
                 this.rows = rows;
                 
                },
              
           
           
           details(row){
                this.textVisible = true;
                this.rowData = row;
                this.title = row.title;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                this.content = row.content;
                
                this.url = row.url;
                this.deeplink = row.deeplink;
                this.pkgname = row.pkgname;
                this.download_url = row.download_url;
                this.init();
           },
           cancelTx(){
               this.textVisible = false;
               this.form = {};
           },
           savePage(){
            //    var reg = /(http|https):\/\/([\w.]+\/?)\S*/;
                if(this.click_action==-1){
                    this.$message.warning('标识不能为空');
                    return
                }
               if(!this.title&&this.content!=''&&this.click_action == '3'){
                   this.$message.warning('标题和内容描述必须同时填或都不填')
                   return false
               }
               if(!this.content&&this.title!=''&&this.click_action == '3'){
                   this.$message.warning('标题和内容描述必须同时填或都不填')
                   return false
               }
           
               if(this.click_action == 0){
                   var click_action_title = '点击查看'
                   if(!this.url){
                       this.$message.warning('跳转链接不能为空!')
                       return false
                   }
                    if(!this.classFl){
                        this.$message({
                            message: '请选择分类',
                            type: 'warning'
                        });
                        return false

                    }

               }else if(this.click_action == 1){
                   var click_action_title = '打开应用'
                   if(!this.deeplink){
                       this.$message.warning('拉活链接不能为空!')
                       return false
                   }
                   if(!this.download_url){
                       this.$message.warning('下载链接不能为空!')
                       return false
                   }

               }else if(this.click_action == 2){
                   var click_action_title = '下载应用'
                   if(!this.pkgname){
                       this.$message.warning('包名不能为空!')
                       return false
                   }
                   if(!this.download_url){
                       this.$message.warning('下载链接不能为空!')
                       return false
                   }

               }else if(this.click_action == -1){
                   var click_action_title = ''
               }else if(this.click_action == 3){
                   var click_action_title ='无'
               }
              
                let formData =new FormData;
                formData.append('plid',this.plid);
                formData.append('mfid',this.rowData.mfid);
                formData.append('tdate',this.date);
                formData.append('title',this.title);
                formData.append('content',this.content);
                formData.append('click_action',click_action_title);
                formData.append('pkgname',this.pkgname);
                formData.append('download_url',this.download_url);
                formData.append('deeplink',this.deeplink);
                formData.append('click_action_type',this.click_action);
                formData.append('url',this.url);
               this.api.pushlib_textlink_edit(formData).then((res)=>{  
                    this.textVisible = false;
                    this.getData();
                    this.title = '';
                    this.content = '';
                    this.click_action = '';
                    this.url = '';        
               })
           },
           getData(){
               this.load = true;
               let params={
                    p:this.p,
                    page:this.page,
                    tdate:this.date,
                    plid:this.plid,
                    type:this.$route.query.type,
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
    //  this.getChannel();
     this.getData()
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
    .tablescope >>> .el-switch__label--left {
        position: relative;
        left: 33px;
        color: #fff;
        z-index: -1111;
      }
      .tablescope >>> .el-switch__label--left span{
          width: 50px;
      }
      .tablescope >>> .el-switch__core{
        width: 70px !important;
      }
      .tablescope >>> .el-switch__label--left{
          margin-right: -25px;
      }
      .tablescope >>> .el-switch__label--right {
        position: relative;
        right: 62px;
        color: #fff;
        z-index: -1111;
      }
      .tablescope >>> .el-switch__label--right span{
          width: 50px;
      }
      .tablescope >>> .el-switch__label--right.is-active {
        z-index: 1111;
        color: #fff !important;
      }
      .tablescope >>> .el-switch__label--left.is-active {
        z-index: 1;
        color: #9c9c9c !important;
      }
      .tablescope >>> .el-switch__core{
          margin-left: -25px;

      }
   
</style>